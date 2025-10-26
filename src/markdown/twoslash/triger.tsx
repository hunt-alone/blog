'use client'

import { TooltipTrigger, Button } from 'react-aria-components'

interface TwoslashTriggerProps {
  children: [React.ReactElement, React.ReactElement]
  className?: string
  open?: boolean
}

export const TwoslashTrigger = (props: TwoslashTriggerProps) => {
  const { children, className, open } = props
  const [span, tooltip] = children
  return (
    <TooltipTrigger delay={0} isOpen={open}>
      <Button className={className} {...span.props} />
      {tooltip}
    </TooltipTrigger>
  )
}
