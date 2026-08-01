import { faker } from "@faker-js/faker";

export const seedEmployees = async (db) => {
    const query = (sql, params = []) => {
        return new Promise((resolve, reject) => {
            db.query(sql, params, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    };

    console.log("Clearing existing employees...");
    await query("DELETE FROM employees");
    await query("ALTER TABLE employees AUTO_INCREMENT = 1").catch(() => {});

    const employeeCount = faker.number.int({ min: 40, max: 50 });
    console.log(`Generating ${employeeCount} employees...`);

    const departments = [
        "Engineering",
        "Human Resources",
        "Sales",
        "Marketing",
        "Finance",
        "Operations",
        "Customer Support"
    ];

    const departmentRoles = {
        "Engineering": ["Software Engineer", "QA Engineer", "DevOps Engineer", "Tech Lead", "Product Manager"],
        "Human Resources": ["HR Generalist", "Recruiter", "HR Manager", "Talent Acquisition"],
        "Sales": ["Sales Representative", "Account Executive", "Sales Manager", "Sales Associate"],
        "Marketing": ["Marketing Specialist", "Content Writer", "SEO Specialist", "Marketing Manager"],
        "Finance": ["Accountant", "Financial Analyst", "Finance Manager", "Controller"],
        "Operations": ["Operations Coord", "Logistics Specialist", "Operations Manager"],
        "Customer Support": ["Support Rep", "Customer Success", "Support Team Lead"]
    };

    const employees = [];
    for (let i = 0; i < employeeCount; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const name = `${firstName} ${lastName}`;
        const email = faker.internet.email({ firstName, lastName }).toLowerCase();
        
        const phone = faker.number.int({ min: 6000000000, max: 9999999999 });
        
        const department = faker.helpers.arrayElement(departments);
        const roles = departmentRoles[department];
        const role = faker.helpers.arrayElement(roles);
        
        const salary = parseFloat(faker.finance.amount({ min: 35000, max: 150000, dec: 2 }));
        
        const joiningDateObj = faker.date.past({ years: 5 });
        const joining_date = joiningDateObj.toISOString().split("T")[0];
        
        const status = faker.helpers.weightedArrayElement([
            { value: "Active", weight: 8 },
            { value: "On Leave", weight: 1 },
            { value: "Inactive", weight: 1 }
        ]);

        employees.push([name, email, phone, department, role, salary, joining_date, status]);
    }

    console.log("Inserting employees into database...");
    const sql = "INSERT INTO employees (name, email, phone, department, role, salary, joining_date, status) VALUES ?";
    await query(sql, [employees]);
    console.log("Successfully seeded employees.");
};
