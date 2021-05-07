import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

const Ctx = createContext(new Map() as any);
const controlledMappedInstances = new Map();
let debug = false;

export const setDebug = (val: boolean) => (debug = val);

export interface IDispose {
  dispose(): any;
}

export type ProviderBinds = (
  | ((inject: <T>(cls: any) => T) => any)
  | [(inject: <T>(cls: any) => T) => any, { forwardRef: any }]
)[];

interface Props {
  binds: ProviderBinds;
  children: () => React.ReactElement;
}

export const Provider: React.FC<Props> = ({ children, binds }) => {
  let dependencyMap = useRef(new Map());
  const [initialized, setInitialized] = useState(false);
  const parentCtx = useContext(Ctx);

  useEffect(() => {
    getDependencies(binds, dependencyMap.current, parentCtx);
    controlledMappedInstances.set(dependencyMap.current, dependencyMap.current);
    setInitialized(true);

    return () => {
      [...dependencyMap.current!.values()].forEach((e) => {
        if (e.dispose) {
          e.dispose();
          if (debug) console.log(`DISPOSE: ${e.__proto__.constructor.name}`);
        }
      });
      controlledMappedInstances.delete(dependencyMap.current);
      dependencyMap.current!.clear();
      dependencyMap = undefined as any;
    };
  }, [binds]);

  return initialized ? (
    <Ctx.Provider value={dependencyMap.current}>{children()}</Ctx.Provider>
  ) : null;
};

function getDependencies(
  binds: Props['binds'],
  dependecyMap: Map<any, any>,
  parentCtx: Map<any, any>,
) {
  function inject<T>(cls: any): T {
    return (
      [...dependecyMap.values()].find((e: any) => e instanceof (cls as any)) ||
      (parentCtx && [...parentCtx.values()].find((e: any) => e instanceof (cls as any)))
    );
  }

  if (parentCtx) {
    dependecyMap.set('parent', parentCtx);
  }

  for (let e of binds) {
    const injected: [(inject: <T>(cls: any) => T) => any, { forwardRef: any }?] = Array.isArray(e)
      ? e
      : [e];
    const [dependency, options] = injected;

    function factoryInstance() {
      const depInstance = dependency(inject);
      dependecyMap.set(depInstance, depInstance);
      if (debug) console.log(`INITIALIZE: ${depInstance.__proto__.constructor.name}`);
    }

    if (parentCtx && options?.forwardRef) {
      try {
        const instance = [...parentCtx.values()].find((e: any) => e instanceof options.forwardRef);
        if (instance) dependecyMap.set(instance, instance);
        else factoryInstance();
      } catch (err) {
        factoryInstance();
      }
    } else {
      factoryInstance();
    }
  }

  return dependecyMap;
}

export function useProvider<T>(cls: Function & { prototype: T }): T {
  const ctx = useContext(Ctx);

  return useMemo(() => {
    function find(_ctx: any): any {
      const instance = [..._ctx.values()].find((e: any) => e instanceof cls);
      if (instance) return instance;
      if (!instance && !_ctx.has('parent'))
        throw Error(`instance of ${cls.name} is not provided in this context`);
      if (!instance && _ctx.has('parent')) return find(_ctx.get('parent'));
    }

    return find(ctx);
  }, [cls]);
}
