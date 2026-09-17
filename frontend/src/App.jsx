import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Employees from './pages/Employees';
import Login from './pages/Login';
import { productServices } from './services/ProductService';
import { employeeServices } from './services/EmployeeService';
import { authService } from './services/AuthService';

function App() {
  const [currentUser, setCurrentUser] = useState({ username: 'Admin', role: 'admin' });
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [notification, setNotification] = useState(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const showNotification = (text, type = 'success') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  async function fetchProducts() {
    try {
      const data = await productServices.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Could not fetch products:', error);
      showNotification('❌ Could not connect to the database', 'error');
    }
  }

  async function fetchEmployees() {
    try {
      const data = await employeeServices.getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Could not fetch employees:', error);
      showNotification('❌ Could not connect to the database', 'error');
    }
  }

  function handleProductEdit(product) {
    setSelectedProduct(product);
  }

  async function handleProductDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await productServices.deleteProduct(id);
      showNotification("✅ Product Deleted Successfully", "error");
      fetchProducts();
    } catch (error) {
      showNotification("❌ Failed to delete product", 'error');
      console.error('Could not delete product:', error);
    }
  }

  function handleEmployeeEdit(employee) {
    setSelectedEmployee(employee);
  }

  async function handleEmployeeDelete(id) {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee record?");
    if (!confirmDelete) return;

    try {
      await employeeServices.deleteEmployee(id);
      showNotification("✅ Employee Record Deleted Successfully", "error");
      fetchEmployees();
    } catch (error) {
      showNotification("❌ Failed to delete employee", 'error');
      console.error('Could not delete employee:', error);
    }
  }

  // Load both resources on mount or when user authenticates
  useEffect(() => {
    if (currentUser) {
      fetchProducts();
      fetchEmployees();
    }
  }, [currentUser]);

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
    setProducts([]);
    setEmployees([]);
    showNotification("🔒 Logged out successfully.", "success");
  };



  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans">
      {notification && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-xl border text-white font-medium ${notification.type === 'success'
            ? 'bg-emerald-600 border-emerald-500'
            : 'bg-rose-600 border-rose-500'
            }`}
        >
          <span>{notification.text}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              📊 EMS Dashboard
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Enterprise Employee & Inventory Management System
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="hidden sm:flex flex-col text-right mr-2 bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 px-3.5 py-1.5 rounded-xl">
              <span className="text-xs font-bold text-slate-800 dark:text-white flex items-center justify-end gap-1">
                👤 {currentUser.username}
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                {currentUser.role}
              </span>
            </div>

            <button
              onClick={toggleTheme}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-sm font-semibold flex items-center gap-2 shadow-sm"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>

            <nav className="flex gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${currentPage === 'dashboard'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                  }`}
                onClick={() => setCurrentPage('dashboard')}
              >
                🏠 Dashboard
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${currentPage === 'products'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                  }`}
                onClick={() => setCurrentPage('products')}
              >
                📦 Products
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${currentPage === 'employees'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                  }`}
                onClick={() => setCurrentPage('employees')}
              >
                👥 Employees
              </button>
            </nav>
          </div>
        </header>

        {currentPage === 'dashboard' && (
          <Dashboard products={products} employees={employees} />
        )}

        {currentPage === 'products' && (
          <Products
            products={products}
            fetchProducts={fetchProducts}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            handleProductEdit={handleProductEdit}
            handleProductDelete={handleProductDelete}
            showNotification={showNotification}
            currentUser={currentUser}
          />
        )}

        {currentPage === 'employees' && (
          <Employees
            employees={employees}
            fetchEmployees={fetchEmployees}
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
            handleEmployeeEdit={handleEmployeeEdit}
            handleEmployeeDelete={handleEmployeeDelete}
            showNotification={showNotification}
            currentUser={currentUser}
          />
        )}
      </div>
    </div>
  );
}

export default App;
