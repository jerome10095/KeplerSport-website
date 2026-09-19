import { Plus } from 'lucide-react';

export default function PageHeader({ title, subtitle, action, actionLabel = 'New' }) {
  return <header className="page-head"><div><h1>{title}</h1>{subtitle && <p className="muted">{subtitle}</p>}</div>{action && <button className="btn btn--primary" onClick={action}><Plus size={16} /> {actionLabel}</button>}</header>;
}
