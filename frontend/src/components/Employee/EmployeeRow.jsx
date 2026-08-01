import React from 'react'

function EmployeeRow({ employee, onEdit, onDelete, canEdit, canDelete }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return dateStr.substring(0, 10);
  };

  const getStatusClass = (status) => {
    const s = status ? status.toLowerCase() : '';
    if (s === 'active') {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/40 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800/30';
    } else if (s === 'inactive') {
      return 'bg-rose-50 text-rose-700 border-rose-200/40 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800/30';
    } else if (s === 'on leave') {
      return 'bg-amber-50 text-amber-700 border-amber-200/40 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800/30';
    } else {
      return 'bg-slate-50 text-slate-600 border-slate-200/40 dark:bg-slate-800/30 dark:text-slate-400 dark:border-slate-700/30';
    }
  };

  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{employee.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">{employee.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">{employee.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">{employee.phone}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-md px-2 py-0.5 text-xs font-semibold border border-slate-200/40 dark:border-slate-700/40">
          {employee.department}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">{employee.role}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">${Number(employee.salary).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">{formatDate(employee.joining_date)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusClass(employee.status)}`}>
          {employee.status}
        </span>
      </td>
      {(canEdit || canDelete) && (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
          <div className="flex gap-2 justify-center">
            {canEdit && (
              <button 
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-violet-50 text-violet-700 hover:bg-violet-600 hover:text-white dark:bg-violet-950/40 dark:text-violet-400 dark:hover:bg-violet-600 dark:hover:text-white transition-all duration-150 cursor-pointer" 
                onClick={() => onEdit(employee)}
              >
                ✏️ Edit
              </button>
            )}
            {canDelete && (
              <button 
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white transition-all duration-150 cursor-pointer" 
                onClick={() => onDelete(employee.id)}
              >
                🗑️ Delete
              </button>
            )}
          </div>
        </td>
      )}
    </tr>
  )
}

export default EmployeeRow;
