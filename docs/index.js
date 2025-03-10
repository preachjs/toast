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
        class: 'min-h-screen flex flex-col gap-10 items-center justify-center',
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
            class: 'btn !bg-green-500',
            onClick: () => {
              toast.success('success')
            },
          },
          'success'
        ),
        h(
          'button',
          {
            class: 'btn !bg-red-500',
            onClick: () => {
              toast.error('error')
            },
          },
          'error'
        ),
        h(
          'button',
          {
            class: 'btn !bg-yellow-500',
            onClick: () => {
              toast.warning('warning')
            },
          },
          'warning'
        ),
        h(
          'button',
          {
            class: 'btn !bg-blue-500',
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
