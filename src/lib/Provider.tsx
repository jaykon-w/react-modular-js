import { useContext, useMemo, createContext, useEffect } from 'react';

const Ctx = createContext([] as any);

export interface IDispose {
  dispose(): any;
}

export type ProviderBinds = (
  | ((inject: <T>(cls: any) => T) => any)
  | [(inject: <T>(cls: any) => T) => any, { forwardRef: any }]
)[];

interface Props {
  binds: ProviderBinds;
  children: React.ReactElement;
}

export const Provider: React.FC<Props> = ({ children, binds }) => {
  const _bindsMemo = useDependency(binds);

  useEffect(() => {
    return () => {
      _bindsMemo.forEach((e) => e.dispose?.());
    };
  });

  return <Ctx.Provider value={_bindsMemo}>{children}</Ctx.Provider>;
};

function useDependency(binds: Props['binds']) {
  let parentCtx: any;
  try {
    parentCtx = useContext(Ctx);
  } catch {}

  const fn = () => {
    let _binds: any[] = [];

    function inject<T>(cls: any): T {
      return (
        (parentCtx && parentCtx.find((e: any) => e instanceof (cls as any))) ||
        _binds.find((e: any) => e instanceof (cls as any))
      );
    }

    // binds.forEach
    for (let e of binds) {
      const injected: [(inject: <T>(cls: any) => T) => any, { forwardRef: any }?] = Array.isArray(e)
        ? e
        : [e];
      const [dependency, options] = injected;
      if (parentCtx && options?.forwardRef) {
        try {
          const instance = parentCtx.find((e: any) => e instanceof options.forwardRef);
          if (instance) _binds.push(instance);
          else _binds.push(dependency(inject));
        } catch (err) {
          _binds.push(dependency(inject));
        }
      } else {
        _binds.push(dependency(inject));
      }
    }

    return _binds;
  };

  return useMemo(fn, [binds]);
}

export function useProvider<T>(cls: Function & { prototype: T }): T {
  const ctx = useContext(Ctx);

  return useMemo(() => {
    const instance = ctx.find((e: any) => e instanceof cls);
    if (!instance) throw Error(`instance of ${cls.name} is not provided in this context`);
    return instance;
  }, [cls]);
}
