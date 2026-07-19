import { useBuilder } from '../hooks/useBuilder'
import { AlertIcon, CheckIcon } from './Icons'

export default function ToastContainer() {
  const { toasts } = useBuilder()
  return <div className="toast-stack" aria-live="polite">{toasts.map((toast) => <div className={`toast ${toast.type}`} key={toast.id}>{toast.type === 'success' ? <CheckIcon /> : <AlertIcon />}<span>{toast.message}</span></div>)}</div>
}
