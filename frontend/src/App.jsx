import React, { useState, useEffect } from 'react';
import ProductForm from './components/Product/ProductForm';
import ProductTable from './components/Product/ProductTable';
import EmployeeForm from './components/Employee/EmployeeForm';
import EmployeeTable from './components/Employee/EmployeeTable';
import { productServices } from './services/ProductService';
import { employeeServices } from './services/EmployeeService';

function App() {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' or 'employee'
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [notification, setNotification] = useState(null);

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

  useEffect(() => {
    if (activeTab === 'inventory') {
      fetchProducts();
    } else {
      fetchEmployees();
    }
  }, [activeTab]);

  return (
    <div className="app-container">
      {notification && (
        <div className={`notification-toast ${notification.type}`}>
          {notification.text}
        </div>
      )}

      <header className="app-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <h1 className="header-title">📊 EMS Dashboard</h1>
            <p className="header-subtitle">Enterprise Management System</p>
          </div>
          <div className="tab-navigation" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button 
              className={`btn ${activeTab === 'inventory' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('inventory')}
              style={{ width: 'auto' }}
            >
              📦 Inventory Module
            </button>
            <button 
              className={`btn ${activeTab === 'employee' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('employee')}
              style={{ width: 'auto' }}
            >
              👥 Employee Module
            </button>
          </div>
        </div>
      </header>

      {activeTab === 'inventory' ? (
        <main className="dashboard-grid">
          <div className="column-form">
            <ProductForm
              onProductAdded={fetchProducts}
              selectedProduct={selectedProduct}
              clearSelection={() => setSelectedProduct(null)}
              showNotification={showNotification}
            />
          </div>

          <div className="column-table">
            <ProductTable
              products={products}
              onEdit={handleProductEdit}
              onDelete={handleProductDelete}
            />
          </div>
        </main>
      ) : (
        <main className="dashboard-grid">
          <div className="column-form">
            <EmployeeForm
              onEmployeeAdded={fetchEmployees}
              selectedEmployee={selectedEmployee}
              clearSelection={() => setSelectedEmployee(null)}
              showNotification={showNotification}
            />
          </div>

          <div className="column-table">
            <EmployeeTable
              employees={employees}
              onEdit={handleEmployeeEdit}
              onDelete={handleEmployeeDelete}
            />
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
