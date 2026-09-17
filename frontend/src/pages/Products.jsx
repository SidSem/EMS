import React from 'react';
import ProductForm from '../components/Product/ProductForm';
import ProductTable from '../components/Product/ProductTable';

function Products({
  products,
  fetchProducts,
  selectedProduct,
  setSelectedProduct,
  handleProductEdit,
  handleProductDelete,
  showNotification,
  currentUser
}) {
  const role = currentUser?.role?.toLowerCase();
  const canWrite = ['admin', 'manager'].includes(role);

  return (
    <main className={`grid ${canWrite ? 'grid-cols-1 lg:grid-cols-[380px_1fr]' : 'grid-cols-1'} gap-8 items-start`}>
      {canWrite && (
        <div className="lg:sticky lg:top-8">
          <ProductForm
            onProductAdded={fetchProducts}
            selectedProduct={selectedProduct}
            clearSelection={() => setSelectedProduct(null)}
            showNotification={showNotification}
          />
        </div>
      )}

      <div className="min-w-0">
        <ProductTable
          products={products}
          onEdit={handleProductEdit}
          onDelete={handleProductDelete}
          currentUser={currentUser}
        />
      </div>
    </main>
  );
}

export default Products;
