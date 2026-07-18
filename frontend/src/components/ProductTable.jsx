import React from 'react'
import ProductRow  from './ProductRow' 
function ProductTable({products, onEdit}) {
  return (
    <div>
        <table>
                 <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>

                </thead>
           <tbody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} onEdit={onEdit} />
          ))}
        </tbody>
     </table>
    </div>
  )
}
export default ProductTable 