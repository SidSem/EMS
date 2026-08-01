import { faker } from "@faker-js/faker";

export const seedProducts = async (db) => {
    const query = (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.query(sql, params, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    };

    console.log("Clearing existing products...");
    await query("DELETE FROM products");
    await query("ALTER TABLE products AUTO_INCREMENT = 1").catch(() => {});

    console.log("Generating 100 products...");
    const categories = [
        "Electronics",
        "Clothing & Apparel",
        "Home & Kitchen",
        "Books & Stationery",
        "Sports & Outdoors",
        "Beauty & Personal Care",
        "Toys & Games",
        "Automotive Accessories",
        "Office Supplies"
    ];

    const products = [];
    for (let i = 0; i < 100; i++) {
        const name = faker.commerce.productName();
        const price = parseFloat(faker.commerce.price({ min: 5, max: 1000, dec: 2 }));
        const quantity = faker.number.int({ min: 5, max: 150 });
        const category = faker.helpers.arrayElement(categories);
        products.push([name, price, quantity, category]);
    }

    console.log("Inserting products into database...");
    const sql = "INSERT INTO products (name, price, quantity, category) VALUES ?";
    await query(sql, [products]);
    console.log("Successfully seeded products.");
};
