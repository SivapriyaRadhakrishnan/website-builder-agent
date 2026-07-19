import { useBuilder } from '../hooks/useBuilder'
import AgentProgress from './AgentProgress'
import { SparklesIcon } from './Icons'

export default function PromptPanel() {
  const { prompt, setPrompt, generate, clear, isGenerating } = useBuilder()
  return <aside className="sidebar"><div className="brand"><span className="brand-mark"><SparklesIcon /></span><span>Teqid</span></div><div><span className="eyebrow">AI website builder</span><h1 className="prompt-title">Turn your idea into a website.</h1><p className="muted">Describe what you want to create. Our agents will plan and build the frontend for you.</p><textarea className="prompt-box" value={prompt} disabled={isGenerating} onChange={(event) => setPrompt(event.target.value)} placeholder="Build a modern portfolio for a product designer with a case studies section, about page, and contact form..." aria-label="Website requirements" /><div className="button-row"><button className="primary-button" type="button" disabled={isGenerating} onClick={generate}>{isGenerating ? <span className="spinner" /> : <SparklesIcon />}{isGenerating ? 'Generating...' : 'Generate Website'}</button><button className="secondary-button" type="button" disabled={isGenerating} onClick={clear}>Clear</button></div></div><AgentProgress /></aside>
}
