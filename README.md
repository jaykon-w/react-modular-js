# Stringmask-js

[![https://nodei.co/npm/stringmask-js.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/stringmask-js.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/stringmask-js)

A tiny javascript library to mask strings

## Instalation

```
npm i stringmask-js -s
```

or

```
yarn add stringmask-js
```

### Examples

#### Phone number

```js
stringMask("(00) 0000-00000")("12726323132"); // (12) 7263-23132
```

#### Only numbers

```js
stringMask("0$")("12312312W"); // 12312312
```

#### Date

```js
stringMask("0000-00-00")("19981001"); // 1998-10-01
```

#### CPF

```js
stringMask("000.000.000-00")("12345678910"); // 123.456.789-10
```

### Special Characteres

- 0 - Numbers
- \$ - Any caractere (if is the last charactere it will repeat the previous Special Character forever)
- A - Alphanumerics
- S - Letters
- U - Letters (it will transform any letter to upper case)
- L - Letters (it will transform any letter to lower case)

#### Mask inputs with React

```jsx
const MaskedInput = (props) => {
  const { mask, cleaner, value: _, ...rest } = props;
  const [ value, setValue ] = useState(props.value);

  useEffect(() => {
    setValue(stringMask(mask, cleaner)(props.value));
  }, [props.value]);

  return <input {...rest} value={value} />
}

...

<MaskedInput
  name="phone"
  value={testValue}
  cleaner={/\D/g}
  mask="(00) 0000-00000"
  onChange={({target: {value}}) => setTestValue(value)}
/>
```
