import { lazy } from 'react'

export { Pre } from './pre'
export { Alert } from './alert'
export { Details } from './details'
export { Blockquote } from './blockquote'
export { Heading } from './heading'
export { default as Hello } from './hello'
export { MDXImage } from './image'
export { MDXLink } from './link'
export { List } from './list'
export { Paragraph } from './paragraph'
export { Table, THead, TBody, TR, TH, TD } from './table'
export const CodeGroup = lazy(() => import('./code-group'))
