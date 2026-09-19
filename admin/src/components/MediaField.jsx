import { useState } from 'react';
import { publicUrl } from '../lib/supabase';

export default function MediaField({ value, onChange, bucket, mediaType = 'image', label = 'Media' }) {
  const [file, setFile] = useState(null);
  const url = value ? publicUrl(bucket, value) : file ? URL.createObjectURL(file) : null;
  return <div className="media-field"><label className="media-field__label">{label}</label>{url ? <div className="media-field__preview">{mediaType === 'video' ? <video src={url} controls /> : <img src={url} alt={label} />}<button type="button" className="media-field__remove" onClick={() => { setFile(null); onChange(null); }}>×</button></div> : <label className="media-field__empty">Choose media<input hidden type="file" accept={mediaType === 'video' ? 'video/*' : 'image/*'} onChange={(event) => { const next = event.target.files?.[0]; if (next) setFile(next); }} /></label>}</div>;
}
