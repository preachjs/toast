import { h, render } from 'preact'
import { Toaster, toast } from './bundle/index.js'

let counter = 0

const App = () => {
  return h(
    'div',
    {},
    h(
      'div',
      {
        class: 'min-h-screen flex gap-10 items-center justify-center',
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
    h(Toaster, {})
  )
}

render(h(App, {}), document.getElementById('app'))
