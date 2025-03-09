import { signal, useComputed } from '@preact/signals'

export type Options = {
  position?:
    | 'top-start'
    | 'top-end'
    | 'top-center'
    | 'bottom-center'
    | 'bottom-start'
    | 'bottom-end'
  offset?: number
}

export type Message = Options & {
  message: string
}

class Toast {
  toasts = signal<Message[]>([])

  add(message: string, options: Options) {
    const usableOptions: Options = {
      position: options.position ?? 'top-center',
      offset: options.offset ?? 2,
    }

    const config = {
      message: message,
      ...usableOptions,
    }

    this.toasts.value = [config].concat(this.toasts.value)

    setTimeout(() => {
      this.toasts.value = this.toasts.value.filter(d => {
        return !Object.is(d, config)
      })
    }, 3000)
  }
}

export const ToastMessageRenderer = ({
  position = 'top-center',
  message = '',
}) => {
  return <div class="preachjs-toast--message">{message}</div>
}

const toastsContainer = new Toast()

export const Toaster = () => {
  const byPosition = useComputed(() => {
    return toastsContainer.toasts.value.reduce(
      (acc, d) => {
        ;(acc[d.position] ||= []).push(d)
        return acc
      },
      {
        'top-left': [],
        'top-center': [],
        'top-right': [],
        'bottom-left': [],
        'bottom-center': [],
        'bottom-right': [],
      }
    )
  })

  return (
    <div
      id="preachjs-toast--container"
      style={{
        'position': 'fixed',
        'z-index': 9999,
        'top': '16px',
        'left': '16px',
        'right': '16px',
        'bottom': '16px',
        'pointer-events': 'none',
        'display': 'grid',
        'gridTemplateColumns': 'repeat(3, minmax(0, 1fr))',
      }}
    >
      <div class="top-left">
        {byPosition.value['top-left'].map(d => (
          <ToastMessageRenderer {...d} />
        ))}
      </div>
      <div
        class="top-center"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        {byPosition.value['top-center'].map(d => (
          <ToastMessageRenderer {...d} />
        ))}
      </div>
      <div
        class="top-right"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'flex-end',
        }}
      >
        {byPosition.value['top-right'].map(d => (
          <ToastMessageRenderer {...d} />
        ))}
      </div>
      <div
        class="bottom-left"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
        }}
      >
        {byPosition.value['bottom-left'].map(d => (
          <ToastMessageRenderer {...d} />
        ))}
      </div>
      <div
        class="bottom-center"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {byPosition.value['bottom-center'].map(d => (
          <ToastMessageRenderer {...d} />
        ))}
      </div>
      <div
        class="bottom-right"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        {byPosition.value['bottom-right'].map(d => (
          <ToastMessageRenderer {...d} />
        ))}
      </div>
    </div>
  )
}

export const toast = (message: string, options: Options) => {
  return toastsContainer.add(message, options)
}
