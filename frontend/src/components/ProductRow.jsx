import React from 'react'

function ProductRow({ product, onEdit }) {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.category}</td>
      <td>{product.quantity}</td>
      <td>
        <button onClick={() => onEdit(product)}>Edit</button>
      </td>
    </tr>
  )
}

export default ProductRow