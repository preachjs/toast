# @preachjs/toast

> Simple toasts for preact

[![NPM](https://img.shields.io/npm/v/@preachjs/toast.svg)](https://www.npmjs.com/package/@preachjs/toast)

[Demo &rarr;][https://preachjs.github.io/toast/]

## Install

```sh
npm i @preachjs/toast
```



## Usage

```js
import { Toaster, toast } from '@preachjs/toast'

const App = () => {
  return (
    <div>
      <button onClick={() => toast('hello')}>toast</button>
      <Toaster />
    </div>
  )
}
```

## API

### `toast(message: string, options: Options)`

Shows a toast with the given message.

#### Options

| Name       | Type   | Default      | Description                        |
| ---------- | ------ | ------------ | ---------------------------------- |
| position   | string | 'top-center' | The position of the toast.         |
| closeDelay | number | 3000         | The delay before the toast closes. |

### `Toaster`

Renders the toasts.

## License

MIT
