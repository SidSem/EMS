import db from "../config/db.js";
import { seedProducts } from "./productSeeder.js";
import { seedEmployees } from "./employeeSeeder.js";

const runSeeder = async () => {
    console.log("Connecting to the database...");
    db.connect(async (err) => {
        if (err) {
            console.error("Database connection failed:", err);
            process.exit(1);
        }
        console.log("Connected successfully. Starting seed script...");
        
        try {
            // Seed products
            await seedProducts(db);
            
            // Seed employees
            await seedEmployees(db);
            
            console.log("\nDatabase seeding completed successfully!");
        } catch (error) {
            console.error("\nError occurred during seeding:", error);
        } finally {
            db.end((err) => {
                if (err) {
                    console.error("Error closing connection:", err);
                } else {
                    console.log("Database connection closed gracefully.");
                }
                process.exit(0);
            });
        }
    });
};

runSeeder();
