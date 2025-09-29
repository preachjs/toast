import { Options, ToastHelper } from './types.js'

export type PromiseOptions = {
  error?: string
  loading?: string
  done?: string
  toast?: Options
}

export function createToastPromise(toast: ToastHelper) {
  return function toastPromise<T>(
    promise: Promise<T> | (() => Promise<T>),
    options: PromiseOptions
  ): Promise<T> {
    const _options = {
      loading: '',
      error: '',
      done: '',
      ...options,
    }

    const ctx = toast(_options.loading, {
      ...options.toast,
      closeDelay: 99999,
    })

    let chain = Promise.resolve() as Promise<T>
    if (promise instanceof Promise) {
      chain = promise
    } else if (typeof promise === 'function') {
      chain = promise()
    }

    return chain
      .then(data => {
        ctx.update(_options.done)
        setTimeout(() => {
          ctx.close()
        }, options.toast?.closeDelay ?? 3000)
        return data
      })
      .catch(err => {
        ctx.update(_options.error)
        setTimeout(() => {
          ctx.close()
        }, options.toast?.closeDelay ?? 3000)
        throw err
      })
  }
}
