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
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 pb-3 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
                {selectedProduct ? '✏️ Modify Product' : '➕ Create New Product'}
            </h2>
            <form onSubmit={handleClick} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="input-name" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</label>
                    <input 
                        id="input-name"
                        type="text" 
                        name="name" 
                        value={data.name} 
                        onChange={handleChange} 
                        placeholder="Enter product name"
                        className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="input-price" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Price ($)</label>
                        <input 
                            id="input-price"
                            type="number" 
                            name="price" 
                            value={data.price} 
                            onChange={handleChange} 
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="input-quantity" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quantity</label>
                        <input 
                            id="input-quantity"
                            type="number" 
                            name="quantity" 
                            value={data.quantity} 
                            onChange={handleChange} 
                            placeholder="0"
                            min="0"
                            className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label htmlFor="input-category" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</label>
                    <input 
                        id="input-category"
                        type="text" 
                        name="category" 
                        value={data.category} 
                        onChange={handleChange} 
                        placeholder="e.g. Electronics, Clothing"
                        className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2.5 mt-2">
                    <button type="submit" className="w-full py-2.5 px-4 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-150 cursor-pointer">
                        {selectedProduct ? '✏️ Update Product' : '➕ Add Product'}
                    </button>
                    {selectedProduct && (
                        <button 
                            type="button" 
                            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg transition-all duration-150 cursor-pointer" 
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
