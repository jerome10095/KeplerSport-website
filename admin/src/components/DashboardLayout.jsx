import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Trophy, Calendar, BarChart3, Newspaper, Megaphone, Building2, Settings, ScrollText, Images, LogOut } from 'lucide-react';
import { useAuth } from '../lib/auth';

const navItems = [
  ['/', 'Dashboard', LayoutDashboard], ['/teams', 'Teams', Trophy], ['/matches', 'Matches', Calendar], ['/standings', 'Standings', BarChart3], ['/news', 'News', Newspaper], ['/announcements', 'Announcements', Megaphone], ['/facilities', 'Facilities', Building2], ['/media', 'Media Library', Images], ['/settings', 'Site Settings', Settings], ['/audit-log', 'Audit Log', ScrollText],
];

export default function DashboardLayout() {
  const { profile, signOut } = useAuth(); const navigate = useNavigate();
  return <div className="layout"><aside className="sidebar"><div className="sidebar__brand"><strong>Kepler Sports</strong><span>Admin</span></div><nav className="sidebar__nav">{navItems.map(([to, label, Icon]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `sidebar__link${isActive ? ' is-active' : ''}`}><Icon size={18} /><span>{label}</span></NavLink>)}</nav><div className="sidebar__user"><strong>{profile?.full_name || 'Admin'}</strong><button className="sidebar__logout" onClick={async () => { await signOut(); navigate('/login'); }}><LogOut size={16} /></button></div></aside><main className="main"><Outlet /></main></div>;
}
