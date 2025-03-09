import { h, render } from 'preact'
import { Toaster, toast } from './bundle/index.js'

const App = () => {
  return h(
    'div',
    {},
    h(
      'div',
      {
        class: 'flex gap-10 items-center',
      },
      h(
        'button',
        {
          onClick: () => {
            toast('hello', {
              position: 'top-left',
            })
          },
        },
        'top-left'
      ),
      h(
        'button',
        {
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
