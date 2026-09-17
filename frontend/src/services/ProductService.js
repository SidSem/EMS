// import api from "./api";

// const API_URL = "/products";
const STORAGE_KEY = 'ems_mock_products';

const initialMockProducts = [
    { id: '1', _id: '1', name: 'MacBook Pro 16"', description: 'M3 Max, 36GB RAM, 1TB SSD', price: 3499, category: 'Electronics', quantity: 15, stock: 15 },
    { id: '2', _id: '2', name: 'Logitech MX Master 3S', description: 'Wireless Performance Mouse', price: 99, category: 'Accessories', quantity: 45, stock: 45 },
    { id: '3', _id: '3', name: 'Dell UltraSharp 27"', description: '4K USB-C Monitor', price: 550, category: 'Electronics', quantity: 20, stock: 20 }
];

function getStoredProducts() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed.map(p => ({
                    ...p,
                    id: p.id || p._id,
                    _id: p._id || p.id,
                    quantity: p.quantity ?? p.stock ?? 0,
                    stock: p.stock ?? p.quantity ?? 0
                }));
            }
        }
    } catch (e) {
        console.warn("Failed to load products from localStorage", e);
    }
    return [...initialMockProducts];
}

function saveProducts(products) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
        console.warn("Failed to save products to localStorage", e);
    }
}

export const productServices = {
    getAllProducts: async () => {
        return getStoredProducts();
    },

    addProduct: async (data) => {
        try {
            const products = getStoredProducts();
            const newId = String(Date.now());
            const newProd = {
                id: newId,
                _id: newId,
                name: data.name,
                price: Number(data.price),
                quantity: Number(data.quantity ?? data.stock ?? 0),
                stock: Number(data.quantity ?? data.stock ?? 0),
                category: data.category || 'General',
                description: data.description || ''
            };
            products.push(newProd);
            saveProducts(products);
            return newProd;
        } catch (error) {
            console.error("Error adding product:", error);
            throw error;
        }
    },

    updateProduct: async (id, data) => {
        try {
            const products = getStoredProducts();
            const targetId = String(id);
            const index = products.findIndex(p => String(p.id) === targetId || String(p._id) === targetId);
            if (index !== -1) {
                const updated = {
                    ...products[index],
                    ...data,
                    id: products[index].id || targetId,
                    _id: products[index]._id || targetId,
                    price: data.price !== undefined ? Number(data.price) : products[index].price,
                    quantity: data.quantity !== undefined ? Number(data.quantity) : (products[index].quantity ?? products[index].stock ?? 0),
                    stock: data.quantity !== undefined ? Number(data.quantity) : (products[index].stock ?? products[index].quantity ?? 0)
                };
                products[index] = updated;
                saveProducts(products);
                return updated;
            }
            throw new Error("Product not found");
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            const products = getStoredProducts();
            const targetId = String(id);
            const filtered = products.filter(p => String(p.id) !== targetId && String(p._id) !== targetId);
            saveProducts(filtered);
            return { message: "Deleted" };
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }
};

