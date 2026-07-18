import React, { useState, useEffect } from 'react'
import { productServices } from '../services/ProductService';
function ProductForm({ onProductAdded, selectedProduct, clearSelection }) {
    const INITIAL_FORM_STATE = {
        name: "",
        price: 0,
        quantity: 0,
        category: ""
    };
    const [data, setData] = useState(INITIAL_FORM_STATE);

    useEffect(() => {
        if (selectedProduct) {
            setData(selectedProduct);;
        } else {
            setData(INITIAL_FORM_STATE);
        }
    }, [selectedProduct]);

    async function handleClick(e) {
        e.preventDefault();
        try {
            if (selectedProduct) {
                await productServices.updateProduct(selectedProduct.id, data);
                clearSelection();
            } else {
                await productServices.addProduct(data);
            }
            onProductAdded();
            setData(INITIAL_FORM_STATE);
        } catch (error) {
            console.error("Failed to save product:", error);
        }
    }

    return (
        <div>
            <form onSubmit={handleClick}>

                <label>Name</label>
                <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} /> <br />

                <label>Price</label>
                <input type="number" value={data.price} onChange={(e) => setData({ ...data, price: e.target.value })} /> <br />

                <label>Quantity</label>
                <input type="number" value={data.quantity} onChange={(e) => setData({ ...data, quantity: e.target.value })} /> <br />

                <label>Category</label>
                <input type="text" value={data.category} onChange={(e) => setData({ ...data, category: e.target.value })} /> <br />

                <button type="submit">{selectedProduct ? 'Update' : 'Submit'}</button>
                {selectedProduct && (
                    <button type="button" onClick={() => {
                        clearSelection();
                        setData(INITIAL_FORM_STATE);
                    }}>
                        Cancel
                    </button>
                )}

            </form>
        </div>
    );
}

export default ProductForm