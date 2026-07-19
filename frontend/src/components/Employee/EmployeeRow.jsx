import React from 'react'

function EmployeeRow({ employee, onEdit, onDelete }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return dateStr.substring(0, 10);
  };

  return (
    <tr>
      <td>{employee.id}</td>
      <td className="emp-name">{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.phone}</td>
      <td><span className="dept-badge">{employee.department}</span></td>
      <td>{employee.role}</td>
      <td className="salary-col">${Number(employee.salary).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      <td>{formatDate(employee.joining_date)}</td>
      <td>
        <span className={`status-badge ${employee.status ? employee.status.toLowerCase().replace(/\s+/g, '-') : ''}`}>
          {employee.status}
        </span>
      </td>
      <td className="actions-cell">
        <button className="btn btn-edit" onClick={() => onEdit(employee)}>✏️ Edit</button>
        <button className="btn btn-delete" onClick={() => onDelete(employee.id)}>🗑️ Delete</button>
      </td>
    </tr>
  )
}

export default EmployeeRow;
