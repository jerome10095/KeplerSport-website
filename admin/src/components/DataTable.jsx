export default function DataTable({ columns, rows = [], loading, empty = 'No records', onRowClick }) {
  if (loading) return <div className="table-empty">Loading...</div>;
  if (!rows.length) return <div className="table-empty">{empty}</div>;
  return <div className="table-wrap"><table><thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.id} onClick={() => onRowClick?.(row)}>{columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}</tr>)}</tbody></table></div>;
}
