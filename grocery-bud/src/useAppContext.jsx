import { AppContext } from './contexts'
import { useContext } from 'react'

export default function useAppContext() {
  return useContext(AppContext)
}
