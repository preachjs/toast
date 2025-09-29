import { Signal, computed, effect, signal } from '@preact/signals'
import { Fragment, Ref, VNode, h, options } from 'preact'
import type { JSX } from 'preact'
import { useCallback, useMemo } from 'preact/hooks'
import { createToastPromise } from './promise.js'
import {
  MessageInput,
  Options,
  ToastContext,
  ToastHelper,
  ToastMessageRendererProps,
  Type,
  _InternalMessage,
} from './types.js'

declare module 'preact' {
  interface Options {
    __b: (node: VNode) => void
  }
}

const oldDiff = options.__b
options.__b = (vnode: VNode) => {
  if (vnode.type === ToastMessageRenderer && 'ref' in vnode) {
    // @ts-expect-error force augment the value
    vnode.props.ref = vnode.ref
    vnode.ref = null
  }

  if (oldDiff) oldDiff(vnode)
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

  add(message: MessageInput, options: Options = {}): ToastContext {
    const usableOptions: Options = {
      position: options.position ?? 'top-center',
      type: options.type ?? 'default',
    }

    const id = Date.now() + '-' + this.id++

    const config = {
      id,
      message: signal(message),
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

    return {
      update(message) {
        config.message.value = message
      },
      close: () => {
        config.visible.value = false
        const stillExists = this.toasts.value.findIndex(d => {
          return d.id === id
        })
        if (stillExists > -1) {
          this.toasts.value = this.toasts.value.slice().splice(stillExists, 1)
        }
      },
    }
  }
}

export const ToastMessageRenderer = ({
  message,
  visible,
  type,
  ref,
}: ToastMessageRendererProps) => {
  const elm = useMemo(() => {
    let _message: JSX.Element
    if (typeof message === 'function') {
      _message = message()
    } else {
      _message = <>{message}</>
    }
    return _message
  }, [message])
  return (
    <div
      ref={ref}
      style={{
        opacity: visible === false ? '0' : '1',
      }}
      data-type={type}
      class={`preachjs-toast--message ${visible === false ? 'toast-removed' : 'toast-added'}`}
    >
      {elm}
    </div>
  )
}

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
            message={d.message.value}
            visible={d.visible.value}
            type={d.type}
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
            message={d.message.value}
            visible={d.visible.value}
            type={d.type}
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
            message={d.message.value}
            visible={d.visible.value}
            type={d.type}
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
            message={d.message.value}
            visible={d.visible.value}
            type={d.type}
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
            message={d.message.value}
            visible={d.visible.value}
            type={d.type}
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
            message={d.message.value}
            visible={d.visible.value}
            type={d.type}
          />
        ))}
      </div>
    </div>
  )
}

const toastTypes: Type[] = ['success', 'error', 'info', 'warning']

export const toast = ((message: string, options?: Options) => {
  return toastsContainer.add(message, options)
}) as ToastHelper

// attach promise helper
toast.promise = createToastPromise(toast)

// type helpers
toastTypes.forEach(d => {
  toast[d] = (message: string, options?: Omit<Options, 'type'>) => {
    return toast(message, { ...options, type: d })
  }
})
