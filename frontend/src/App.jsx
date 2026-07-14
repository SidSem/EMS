import React ,{useState,useEffect} from 'react'
import axios from 'axios'
export const App = () => {
  const [products,setProducts]=useState([]);
  async function fetchUserData() {
  try {
    const response = await axios.get('http://localhost:5000/products');
    console.log('Data fetched from Express:', response.data);

    setProducts(response.data);
  } catch (error) {
    console.error('Could not fetch data from Express:', error);
  }
}
useEffect(() => {
    fetchUserData();
}, []);

  return (
    
    <div>
      {products.map((product) => (
        <div key ={product.id}>{product.name}</div>
      ))}
    </div>
  )
}
export default App
