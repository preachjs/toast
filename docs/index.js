import { h, render } from 'preact'
import { Toaster, toast } from './bundle/toast.js'

let counter = 0

const App = () => {
  return h(
    'div',
    {},
    h(
      'div',
      {
        class: 'min-h-[80vh] flex flex-col gap-10 items-center justify-center',
      },
      h(
        'div',
        {
          className: 'flex items-center gap-4',
        },
        h(
          'button',
          {
            class: 'btn',
            onClick: () => {
              toast(`hello ${counter++}`, {
                position: 'top-left',
              })
            },
          },
          'top-left'
        ),
        h(
          'button',
          {
            class: 'btn',
            onClick: () => {
              toast('hello', {
                position: 'top-center',
              })
            },
          },
          'top-center'
        ),
        h(
          'button',
          {
            class: 'btn',
            onClick: () => {
              toast('hello', {
                position: 'top-right',
              })
            },
          },
          'top-right'
        ),
        h(
          'button',
          {
            class: 'btn',
            onClick: () => {
              toast('hello', {
                position: 'bottom-left',
              })
            },
          },
          'bottom-left'
        ),
        h(
          'button',
          {
            class: 'btn',
            onClick: () => {
              toast('hello', {
                position: 'bottom-center',
              })
            },
          },
          'bottom-center'
        ),
        h(
          'button',
          {
            class: 'btn',
            onClick: () => {
              toast('hello', {
                position: 'bottom-right',
              })
            },
          },
          'bottom-right'
        )
      ),
      h(
        'div',
        {
          className: 'flex items-center gap-4',
        },
        h(
          'button',
          {
            class: 'btn !bg-[#98e4c9] text-[#1a472a]',
            onClick: () => {
              toast.success('success')
            },
          },
          'success'
        ),
        h(
          'button',
          {
            class: 'btn !bg-[#ffb3b3] text-[#8b0000]',
            onClick: () => {
              toast.error('error')
            },
          },
          'error'
        ),
        h(
          'button',
          {
            class: 'btn !bg-[#ffe5b4] text-[#805300]',
            onClick: () => {
              toast.warning('warning')
            },
          },
          'warning'
        ),
        h(
          'button',
          {
            class: 'btn !bg-[#b3e0ff] text-[#004d80]',
            onClick: () => {
              toast.info('info')
            },
          },
          'info'
        ),
        h(
          'button',
          {
            class: 'btn ',
            onClick: async () => {
              const valueFromPromise = await toast.promise(
                async () => {
                  return new Promise((resolve, reject) => {
                    setTimeout(() => {
                      resolve(1)
                    }, 4000)
                  })
                },
                {
                  error: 'Failed',
                  done: 'Completed',
                  loading: 'Loading...',
                }
              )
              console.log({ valueFromPromise })
            },
          },
          'promise'
        ),
        h(
          'button',
          {
            class: 'btn ',
            onClick: () => {
              toast(() =>
                h(
                  'h1',
                  {
                    ref: node => {
                      if (!node) return
                      // you don't have to do this, doing this
                      // since I have styled the toast message
                      // globally
                      node.parentNode.classList.remove(
                        'preachjs-toast--message'
                      )
                      node.parentNode.classList.remove('toast-removed')
                    },
                    class:
                      'flex border items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-sm',
                  },
                  'Random JSX Styled Element'
                )
              )
            },
          },
          'jsx message'
        )
      )
    ),
    h(Toaster, {})
  )
}

render(h(App, {}), document.getElementById('app'))
