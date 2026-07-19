import { agents } from '../constants/agents'
import { useBuilder } from '../hooks/useBuilder'
import { CheckIcon, CircleIcon } from './Icons'

function AgentIcon({ status }) {
  if (status === 'running') return <span className="spinner" />
  if (status === 'completed') return <CheckIcon />
  return <CircleIcon />
}

export default function AgentProgress() {
  const { statuses } = useBuilder()
  const completed = agents.filter((agent) => statuses[agent] === 'completed').length
  return <section className="agent-section"><div className="agent-heading"><span className="eyebrow">Build pipeline</span><span className="muted">{completed}/{agents.length}</span></div><div className="agent-list">{agents.map((agent) => <div className={`agent-row ${statuses[agent]}`} key={agent}><span className="status-icon"><AgentIcon status={statuses[agent]} /></span><span>{agent}</span></div>)}</div></section>
}
