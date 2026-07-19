import React from 'react'

function ProductRow({ product, onEdit, onDelete }) {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td className="price-col">${product.price}</td>
      <td><span className="category-badge">{product.category}</span></td>
      <td>{product.quantity}</td>
      <td className="actions-cell">
        <button className="btn btn-edit" onClick={() => onEdit(product)}>✏️ Edit</button>
        <button className="btn btn-delete" onClick={() => onDelete(product.id)}>🗑️ Delete</button>
      </td>
    </tr>
  )
}

export default ProductRow;
