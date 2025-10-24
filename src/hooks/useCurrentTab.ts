'use client'

import { useContext } from 'react'

import { currentTabContext } from '@/context/current-tab'

export const useCurrentTab = () => useContext(currentTabContext)
