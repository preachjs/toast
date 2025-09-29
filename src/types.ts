import { Signal } from '@preact/signals'
import { Ref } from 'preact'
import type { JSX } from 'preact'
import { PromiseOptions } from './promise.js'

export type MessageInput = string | (() => JSX.Element)

export type ToastMessageRendererProps = {
  message: MessageInput
  visible: boolean
  type: Type
  ref: Ref<HTMLDivElement>
}

export type Type = 'success' | 'error' | 'info' | 'warning' | 'default'

export type ToastHelper = ((
  message: MessageInput,
  options?: Options
) => ToastContext) & {
  [k in Type]: (
    message: MessageInput,
    options?: Omit<Options, 'type'>
  ) => ToastContext
} & {
  promise: <T>(
    fn: Promise<T> | (() => Promise<T>),
    options: PromiseOptions
  ) => Promise<T>
}

export type Options = {
  position?:
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-center'
    | 'bottom-left'
    | 'bottom-right'
  type?: Type
  closeDelay?: number
}

export type Message = Options & {
  id: string
  message: MessageInput
  visible: boolean
}

export type ToastContext = {
  update(message: MessageInput): void
  close(): void
}

export type _InternalMessage = Omit<Message, 'visible' | 'message'> & {
  visible: Signal<undefined | boolean>
  message: Signal<MessageInput>
}
