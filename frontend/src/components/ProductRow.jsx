import React from 'react'

function ProductRow({ product }) {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.category}</td>
    </tr>
  )
}

export default ProductRow