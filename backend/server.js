const express = require("express");
const cors= require("cors");

const app = express();

app.use(cors());

app.get("/",(req,res)=>{
    res.json({
        success :true,
        message: "Backend is running sucessfully",
        project :"EMS"
    });
});
app.get("/about",(req,res)=>{
    res.send("This is about page");
});
app.get("/products",(req,res)=>{
    const products = [
        {
            id:1,
            name:"Laptop",
            price :1000
        },
        {
            id:2,
            name:"Phone",
            price :500
        }
    ];
    res.json(products);
});1

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

