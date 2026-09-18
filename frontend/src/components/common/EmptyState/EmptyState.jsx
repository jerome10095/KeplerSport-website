export default function EmptyState({ title = 'Nothing here yet', message, action }) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {action}
    </div>
  );
}