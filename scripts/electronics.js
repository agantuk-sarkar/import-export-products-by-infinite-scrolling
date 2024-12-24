import navBar from "../components/navbar.js";
import fetchProducts from "../components/fetchProducts.js";
import displayProducts from "../components/displayProducts.js";
import { productsContainer } from "./index.js";

// function to fetch products and display them in UI
function getProductsData(){
    fetchProducts("https://fakestoreapi.com/products/category/electronics").then((value)=>{
        console.log("value:",value);
        displayProducts(value,productsContainer);
    })
}
getProductsData();
