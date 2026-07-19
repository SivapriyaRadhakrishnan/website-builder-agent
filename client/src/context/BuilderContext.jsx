import { useState } from 'react'
import { generateWebsite } from '../services/api'
import { agents, emptyStatuses } from '../constants/agents'
import { BuilderContext } from './builderContext'

export function BuilderProvider({ children }) {
  const [prompt, setPrompt] = useState('')
  const [statuses, setStatuses] = useState(emptyStatuses)
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState(null)
  const [toasts, setToasts] = useState([])

  const notify = (message, type = 'success') => {
    const id = Date.now()
    setToasts((current) => [...current, { id, message, type }])
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 4000)
  }

  const clear = () => {
    setPrompt('')
    setStatuses(emptyStatuses())
    setResult(null)
  }

  const generate = async () => {
    if (!prompt.trim()) {
      notify('Describe the website you would like to build first.', 'error')
      return
    }

    setIsGenerating(true)
    setResult(null)
    setStatuses(emptyStatuses())
    let currentStep = 0
    setStatuses((current) => ({ ...current, [agents[currentStep]]: 'running' }))
    const progressTimer = window.setInterval(() => {
      setStatuses((current) => {
        if (currentStep >= agents.length - 1) return current
        const next = agents[++currentStep]
        return { ...current, [agents[currentStep - 1]]: 'completed', [next]: 'running' }
      })
    }, 850)

    try {
      const data = await generateWebsite(prompt.trim())
      if (!data?.success) throw new Error(data?.message || 'Generation could not be completed.')
      window.clearInterval(progressTimer)
      setStatuses(Object.fromEntries(agents.map((agent) => [agent, 'completed'])))
      setResult(data)
      notify(data?.frontend?.message || 'Your website was generated successfully.')
    } catch (error) {
      window.clearInterval(progressTimer)
      setStatuses((current) => ({ ...current, [agents[currentStep]]: 'pending' }))
      notify(error.response?.data?.message || error.message || 'Unable to connect to the generator.', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  const value = { prompt, setPrompt, statuses, isGenerating, result, toasts, generate, clear, notify }
  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>
}
