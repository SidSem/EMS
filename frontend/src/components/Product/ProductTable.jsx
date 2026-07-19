import React from 'react'
import ProductRow  from './ProductRow' 

function ProductTable({products, onEdit, onDelete}) {
  return (
    <div className="table-card">
      <div className="table-header-row">
        <h2>📦 Product Inventory</h2>
        <span className="product-count">{products.length} Products Total</span>
      </div>
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Quantity</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductTable;
