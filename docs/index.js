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
        )
      )
    ),
    h(Toaster, {})
  )
}

render(h(App, {}), document.getElementById('app'))
