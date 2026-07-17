import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import { productServices } from './services/ProductService'; 

function App() {
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    try {
      const data = await productServices.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Could not fetch data from Express:', error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <ProductForm/>
      <ProductTable products={products} />
    </div>
  );
}

export default App;
