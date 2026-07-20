import React from 'react';

function Dashboard({ products = [], employees = [] }) {
  // Compute metrics dynamically
  const totalProducts = products.length;
  const totalEmployees = employees.length;
  
  const inventoryValue = products.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return acc + (price * qty);
  }, 0);

  const lowStockCount = products.filter(item => Number(item.quantity) < 5).length;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          EMS Dashboard
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Overview of enterprise metrics and inventory health.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Products Metric Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Products</span>
            <span className="p-2 bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400 rounded-xl text-lg">📦</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{totalProducts}</p>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 inline-block">Total Listed Items</span>
        </div>

        {/* Employees Metric Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Employees</span>
            <span className="p-2 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 rounded-xl text-lg">👥</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{totalEmployees}</p>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 inline-block">Active Roster</span>
        </div>

        {/* Inventory Value Metric Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Inventory Value</span>
            <span className="p-2 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-xl text-lg">💰</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
            ${inventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 inline-block">Total Stock Worth</span>
        </div>

        {/* Low Stock Metric Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Low Stock</span>
            <span className="p-2 bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 rounded-xl text-lg">⚠️</span>
          </div>
          <p className="text-3xl font-extrabold text-slate-900 dark:text-white">{lowStockCount}</p>
          <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 inline-block">Items below threshold (&lt; 5)</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
