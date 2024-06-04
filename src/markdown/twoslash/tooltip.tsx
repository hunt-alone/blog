'use client'
import { useId } from 'react'

import { OverlayArrow } from 'react-aria-components'

import { Tooltip } from '@/components/ui'
import { useIsServer } from '@/hooks/useIsServer'

export const TwoslashTooltip = props => {
  const { noArrow, children } = props
  const id = useId()
  const isServer = useIsServer()

  return (
    <>
      <span id={id} hidden />
      <Tooltip
        placement='bottom left'
        offset={4}
        arrowBoundaryOffset={8}
        shouldFlip={false}
        className='shiki-twoslash max-w-[80vw] origin-top-left md:max-w-[90ch]'
        UNSTABLE_portalContainer={
          isServer
            ? undefined
            : // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
              document.getElementById(id)?.closest('.shiki.twoslash')!
                .parentElement!
        }
      >
        <div className='not-prose rounded border bg-surface shadow-lg'>
          {!noArrow && (
            <OverlayArrow>
              <span className='relative block border-[6px] border-transparent before:absolute before:left-0 before:top-0 before:-translate-x-1/2 before:-translate-y-1/2 before:border-[7px] before:border-transparent before:border-b-border before:content-[""] after:absolute after:left-0 after:top-px after:z-10  after:-translate-x-1/2 after:-translate-y-1/2 after:border-[6px] after:border-transparent after:border-b-surface after:content-[""]' />
            </OverlayArrow>
          )}
          {children}
        </div>
      </Tooltip>
    </>
  )
}
