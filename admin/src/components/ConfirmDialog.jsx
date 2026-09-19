export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return <div className="modal-backdrop" onClick={onCancel}><div className="modal" onClick={(event) => event.stopPropagation()}><h3>{title}</h3><p className="muted">{message}</p><div className="modal__actions"><button className="btn btn--ghost-dark" onClick={onCancel}>Cancel</button><button className="btn btn--primary" onClick={onConfirm}>Confirm</button></div></div></div>;
}
