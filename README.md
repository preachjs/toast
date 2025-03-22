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
import { toast, Toaster } from '@preachjs/toast'

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

| Name       | Type   | Default      | Description                                                                                                                     |
| ---------- | ------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| position   | string | 'top-center' | Position of the toast. Available options: 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right' |
| closeDelay | number | 3000         | Delay in milliseconds before the toast automatically closes.                                                                    |

#### MessageInput

Can be either a string or a JSX element:

```tsx
type MessageInput = string | JSX.Element
```

#### Toast Variants

- `toast.success(message: MessageInput, options?: Options)` - Green success
  toast
- `toast.error(message: MessageInput, options?: Options)` - Red error toast
- `toast.info(message: MessageInput, options?: Options)` - Blue info toast
- `toast.warning(message: MessageInput, options?: Options)` - Yellow warning
  toast

### `toast.promise(promise: Promise, options: PromiseOptions)`

Displays toasts for different promise states.

#### PromiseOptions

| Name    | Type   | Description                                      |
| ------- | ------ | ------------------------------------------------ |
| loading | string | Message to display while the promise is pending. |
| success | string | Message to display if the promise resolves.      |
| error   | string | Message to display if the promise rejects.       |

### Promise Example

```tsx
const saveData = async () => {
  const promise = fetch('/api/data')

  toast.promise(promise, {
    loading: 'Saving...',
    success: 'Data saved!',
    error: 'Failed to save data',
  })
}
```

## License

MIT
