import React from 'react'
import ProductRow  from './ProductRow' 

function ProductTable({products, onEdit, onDelete, currentUser}) {
  console.log("ProductTable received currentUser:", currentUser);
  const canEdit = ['Admin', 'Manager'].includes(currentUser?.role);
  const canDelete = currentUser?.role === 'Admin';
  const showActions = canEdit || canDelete;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white m-0">📦 Product Inventory</h2>
        <span className="bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400 border border-violet-200/30 dark:border-violet-800/30 rounded-full px-3 py-1 text-xs font-semibold">
          {products.length} Products Total
        </span>
      </div>
      <div className="overflow-x-auto border border-slate-200/60 dark:border-slate-800/60 rounded-xl">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quantity</th>
              {showActions && <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800/60">
            {products.length === 0 ? (
              <tr>
                <td colSpan={showActions ? 6 : 5} className="px-6 py-8 text-center text-sm text-slate-500 dark:text-slate-400 italic">
                  No products found. Add a product to get started.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <ProductRow 
                  key={product.id} 
                  product={product} 
                  onEdit={onEdit} 
                  onDelete={onDelete} 
                  canEdit={canEdit}
                  canDelete={canDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductTable;
