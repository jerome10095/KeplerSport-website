import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTeam, useSaveTeam } from '../hooks/useTeamsAdmin';
import MediaField from '../components/MediaField';
import { STORAGE_BUCKETS } from '../lib/supabase';

export default function TeamEditorPage() {
  const { id } = useParams(); const isNew = !id || id === 'new'; const navigate = useNavigate();
  const { data: team, isLoading } = useTeam(isNew ? null : id); const save = useSaveTeam();
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({ defaultValues: { name: '', slug: '', sport: 'basketball', category: 'men', logo_url: null, cover_image_url: null, description: '', founded_year: '', home_venue: '', is_active: true } });
  useEffect(() => { if (team) reset(team); }, [team, reset]);
  if (!isNew && isLoading) return <div className="page"><p>Loading...</p></div>;
  return <div className="page"><header className="page-head"><div><h1>{isNew ? 'New Team' : 'Edit Team'}</h1><p className="muted">{team?.name || 'Create a new team'}</p></div></header><form className="form" onSubmit={handleSubmit(async (values) => { const payload = { ...values, id: isNew ? undefined : id, slug: values.slug || values.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }; const saved = await save.mutateAsync(payload); navigate(`/teams/${saved.id}`); })}><div className="form-grid"><div className="form-col"><label>Team Name *<input {...register('name', { required: true })} />{errors.name && <span className="error-text">Required</span>}</label><label>Slug<input {...register('slug')} /></label><label>Sport<select {...register('sport')}><option>basketball</option><option>volleyball</option><option>football</option><option>athletics</option><option>swimming</option></select></label><label>Category<select {...register('category')}><option>men</option><option>women</option><option>mixed</option></select></label><label>Founded Year<input type="number" {...register('founded_year')} /></label><label>Home Venue<input {...register('home_venue')} /></label><label className="checkbox"><input type="checkbox" {...register('is_active')} /> Active</label></div><div className="form-col"><MediaField bucket={STORAGE_BUCKETS.TEAM_LOGOS} value={watch('logo_url')} onChange={(value) => setValue('logo_url', value)} label="Team Logo" /><MediaField bucket={STORAGE_BUCKETS.TEAM_LOGOS} value={watch('cover_image_url')} onChange={(value) => setValue('cover_image_url', value)} label="Cover Image" /></div></div><label>Description<textarea rows="6" {...register('description')} /></label><div className="form-actions"><button type="button" className="btn btn--ghost" onClick={() => navigate('/teams')}>Cancel</button><button className="btn btn--primary" disabled={save.isPending}>{save.isPending ? 'Saving...' : 'Save Team'}</button></div></form></div>;
}
