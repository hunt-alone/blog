'use client'

import { currentTabContext, type CurrentTab } from '@/context/current-tab'

export const CurrentTabProvider = ({
  value,
  children,
}: {
  value: CurrentTab
  children: React.ReactNode
}) => {
  return (
    <currentTabContext.Provider value={value}>
      {children}
    </currentTabContext.Provider>
  )
}
