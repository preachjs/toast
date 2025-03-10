import { Signal, computed, effect, signal } from '@preact/signals'
import { forwardRef } from 'preact/compat'
import { useCallback } from 'preact/hooks'

export type Options = {
  position?:
    | 'top-start'
    | 'top-end'
    | 'top-center'
    | 'bottom-center'
    | 'bottom-start'
    | 'bottom-end'
  offset?: number
  closeDelay?: number
}

export type Message = Options & {
  id: string
  message: string
  visible: boolean
}

type _InternalMessage = Omit<Message, 'visible'> & {
  visible: Signal<undefined | boolean>
}

class Toast {
  id = 0
  toasts: Signal<_InternalMessage[]> = signal([])
  byPosition = computed(() => {
    return this.toasts.value.reduce(
      (acc, d) => {
        const pos = d.position ?? 'top-center'
        acc[pos] ||= []
        acc[pos] = acc[pos].concat(d)
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

  add(message: string, options: Options) {
    const usableOptions: Options = {
      position: options.position ?? 'top-center',
      offset: options.offset ?? 2,
    }

    const id = Date.now() + '-' + this.id++

    const config = {
      id,
      message: message,
      visible: signal(undefined),
      ...usableOptions,
    }

    const closeDelay = options.closeDelay ?? 3000

    const dispose = effect(() => {
      if (config.visible.value === undefined) return
      if (config.visible.value) {
        setTimeout(() => {
          config.visible.value = false
          dispose()
        }, closeDelay - 300)

        setTimeout(() => {
          this.toasts.value = this.toasts.value.filter(d => {
            return d.id !== id
          })
        }, closeDelay)
      }
    })

    this.toasts.value = [config].concat(this.toasts.value)
  }
}

export const ToastMessageRenderer = forwardRef<
  HTMLDivElement,
  { message: string; visible: boolean }
>(({ message, visible }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        opacity: visible === false ? '0' : '1',
      }}
      class={`preachjs-toast--message ${visible === false ? 'toast-removed' : 'toast-added'}`}
    >
      {message}
    </div>
  )
})

const toastsContainer = new Toast()

export const Toaster = () => {
  const byPosition = toastsContainer.byPosition.value

  const refMonitor = useCallback(d => {
    return node => {
      if (!node) return
      if (d.visible.value === undefined) {
        d.visible.value = true
      }
    }
  }, [])

  return (
    <div
      id="preachjs-toast--container"
      style={{
        position: 'fixed',
        'z-index': 9999,
        top: '16px',
        left: '16px',
        right: '16px',
        bottom: '16px',
        'pointer-events': 'none',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      }}
    >
      <div
        class="preachjs-toast--aligner"
        data-position="top"
        data-align="left"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'flex-start',
        }}
      >
        {byPosition['top-left'].map(d => (
          <ToastMessageRenderer
            ref={refMonitor(d)}
            message={d.message}
            visible={d.visible.value}
          />
        ))}
      </div>
      <div
        class="preachjs-toast--aligner"
        data-position="top"
        data-align="center"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        {byPosition['top-center'].map(d => (
          <ToastMessageRenderer
            ref={refMonitor(d)}
            message={d.message}
            visible={d.visible.value}
          />
        ))}
      </div>
      <div
        class="preachjs-toast--aligner"
        data-position="top"
        data-align="right"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'flex-end',
        }}
      >
        {byPosition['top-right'].map(d => (
          <ToastMessageRenderer
            ref={refMonitor(d)}
            message={d.message}
            visible={d.visible.value}
          />
        ))}
      </div>
      <div
        class="preachjs-toast--aligner"
        data-position="bottom"
        data-align="left"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
        }}
      >
        {byPosition['bottom-left'].map(d => (
          <ToastMessageRenderer
            ref={refMonitor(d)}
            message={d.message}
            visible={d.visible.value}
          />
        ))}
      </div>
      <div
        class="preachjs-toast--aligner"
        data-position="bottom"
        data-align="center"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        {byPosition['bottom-center'].map(d => (
          <ToastMessageRenderer
            ref={refMonitor(d)}
            message={d.message}
            visible={d.visible.value}
          />
        ))}
      </div>
      <div
        class="preachjs-toast--aligner"
        data-position="bottom"
        data-align="right"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}
      >
        {byPosition['bottom-right'].map(d => (
          <ToastMessageRenderer
            ref={refMonitor(d)}
            message={d.message}
            visible={d.visible.value}
          />
        ))}
      </div>
    </div>
  )
}

export const toast = (message: string, options: Options) => {
  return toastsContainer.add(message, options)
}
