import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import { productServices } from './services/ProductService'; 

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function fetchProducts() {
    try {
      const data = await productServices.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Could not fetch data from Express:', error);
    }
  }
  function handleEdit(product){
    setSelectedProduct(product);
}

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <ProductForm onProductAdded={fetchProducts} 
                   selectedProduct={selectedProduct}
                   clearSelection={() => setSelectedProduct(null)} />
      <ProductTable products={products} onEdit={handleEdit} />
    </div>
  );
}

export default App;
