import React from 'react'

function ProductRow({ product, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{product.id}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">{product.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">${product.price}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-md px-2 py-0.5 text-xs font-semibold border border-slate-200/40 dark:border-slate-700/40">
          {product.category}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300">{product.quantity}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
        <div className="flex gap-2 justify-center">
          <button 
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-violet-50 text-violet-700 hover:bg-violet-600 hover:text-white dark:bg-violet-950/40 dark:text-violet-400 dark:hover:bg-violet-600 dark:hover:text-white transition-all duration-150 cursor-pointer" 
            onClick={() => onEdit(product)}
          >
            ✏️ Edit
          </button>
          <button 
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-600 dark:hover:text-white transition-all duration-150 cursor-pointer" 
            onClick={() => onDelete(product.id)}
          >
            🗑️ Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default ProductRow;
