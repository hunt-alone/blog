'use client'

import { TooltipTrigger, Button } from 'react-aria-components'

export const TwoslashTrigger = props => {
  const { children, className, open } = props
  const [span, tooltip] = children
  return (
    <TooltipTrigger delay={0} isOpen={open}>
      <Button className={className} {...span.props} />
      {tooltip}
    </TooltipTrigger>
  )
}
