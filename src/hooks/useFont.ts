import { useContext } from 'react'

import { fontContext } from '@/context/font'

export const useFont = () => useContext(fontContext)
