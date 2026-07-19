import { useContext } from 'react'
import { BuilderContext } from '../context/builderContext'

export const useBuilder = () => {
  const context = useContext(BuilderContext)
  if (!context) throw new Error('useBuilder must be used inside BuilderProvider')
  return context
}
