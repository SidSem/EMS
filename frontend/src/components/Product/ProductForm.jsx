import React, { useState, useEffect } from 'react'
import { productServices } from '../../services/ProductService';

function ProductForm({ onProductAdded, selectedProduct, clearSelection, showNotification }) {
    const INITIAL_FORM_STATE = {
        name: "",
        price: 0,
        quantity: 0,
        category: ""
    };
    const [data, setData] = useState(INITIAL_FORM_STATE);

    useEffect(() => {
        if (selectedProduct) {
            setData(selectedProduct);
        } else {
            setData(INITIAL_FORM_STATE);
        }
    }, [selectedProduct]);

    function handleChange(e) {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleClick(e) {
        e.preventDefault();
        try {
            if (selectedProduct) {
                await productServices.updateProduct(selectedProduct.id, data);
                showNotification("✅ Product Updated Successfully", "success");
                clearSelection();
            } else {
                await productServices.addProduct(data);
                showNotification("✅ Product Added Successfully", "success");
            }
            onProductAdded();
            setData(INITIAL_FORM_STATE);
        } catch (error) {
            showNotification("❌ Failed to save product", "error");
            console.error("Failed to save product:", error);
        }
    }

    return (
        <div className="form-card">
            <h2>{selectedProduct ? '✏️ Modify Product' : '➕ Create New Product'}</h2>
            <form onSubmit={handleClick} className="product-form-layout">
                <div className="form-group">
                    <label htmlFor="input-name">Name</label>
                    <input 
                        id="input-name"
                        type="text" 
                        name="name" 
                        value={data.name} 
                        onChange={handleChange} 
                        placeholder="Enter product name"
                        required
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="input-price">Price ($)</label>
                        <input 
                            id="input-price"
                            type="number" 
                            name="price" 
                            value={data.price} 
                            onChange={handleChange} 
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="input-quantity">Quantity</label>
                        <input 
                            id="input-quantity"
                            type="number" 
                            name="quantity" 
                            value={data.quantity} 
                            onChange={handleChange} 
                            placeholder="0"
                            min="0"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="input-category">Category</label>
                    <input 
                        id="input-category"
                        type="text" 
                        name="category" 
                        value={data.category} 
                        onChange={handleChange} 
                        placeholder="e.g. Electronics, Clothing"
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        {selectedProduct ? '✏ Update Product' : '➕ Add Product'}
                    </button>
                    {selectedProduct && (
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            onClick={() => {
                                clearSelection();
                                setData(INITIAL_FORM_STATE);
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
