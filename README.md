# @preachjs/toast

> Simple toasts for preact

[![NPM](https://img.shields.io/npm/v/@preachjs/toast.svg)](https://www.npmjs.com/package/@preachjs/toast)

[Demo &rarr;](https://preachjs.github.io/toast/)

## Highlights

- 💅 CSS based
- ⚡️ Built on @preact/signals
- 📦 Tiny bundle size (~1KB GZipped)
- 🤌 Simple API

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

### `Toaster`

Component that acts a container for the toasts.

### `toast(message: string, options?: Options)`

Displays a toast with the provided message.

#### Options

| Name       | Type   | Default      | Description                                                     |
| ---------- | ------ | ------------ | --------------------------------------------------------------- |
| position   | string | 'top-center' | Position of the toast (e.g., 'top-left', 'bottom-right', etc.). |
| closeDelay | number | 3000         | Delay in milliseconds before the toast automatically closes.    |

#### Toast Variants

- `toast.success(message: string, options?: Options)`
- `toast.error(message: string, options?: Options)`
- `toast.info(message: string, options?: Options)`
- `toast.warning(message: string, options?: Options)`
- `async toast.promise(message: string, options?: PromiseOptions)`

### `toast.promise(promise: Promise, options: PromiseOptions)`

Displays toasts for different promise states.

#### PromiseOptions

| Name    | Type   | Description                                      |
| ------- | ------ | ------------------------------------------------ |
| loading | string | Message to display while the promise is pending. |
| success | string | Message to display if the promise resolves.      |
| error   | string | Message to display if the promise rejects.       |

## License

MIT
