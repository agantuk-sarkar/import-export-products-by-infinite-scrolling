import navBar from "../components/navbar.js";
import fetchProducts from "../components/fetchProducts.js";
import displayProducts from "../components/displayProducts.js";
import { controlPagination } from "../components/pagination.js";

// getting the html elements into js
export const productsContainer = document.querySelector(".products");

const paginationContainer = document.querySelector(".pagination");

let pageNo = 1;
let limit = 10;

// function to fetch products and display them in UI
async function getProductsData(pageNo,limit) {
  // fetchProducts("https://fakestoreapi.com/products").then((value)=>{
  //     console.log("value:",value);
  //     displayProducts(value,productsContainer);
  // })

  let totalProducts = null;

  const productDetails = await fetchProducts(pageNo, limit);

  totalProducts = productDetails.total;
  // console.log("data:", productDetails);
  showProducts(productDetails.products,pageNo,limit,totalProducts);
}

getProductsData(pageNo,limit);

// function to show products
function showProducts(products,pageNo,limit,totalProducts) {
  if (products) {
    displayProducts(products, productsContainer);
    controlPagination(pageNo,totalProducts,limit,paginationContainer)
  }
}

// function to handle pagination
export function handlePagination(currentPage,limit){
  getProductsData(currentPage,limit);

}

// TODO:This commented code will be removed later

// // fetch the products
// const fetchProducts = async () => {
//   try {
//     const response = await fetch("https://fakestoreapi.com/products");

//     if (response.ok) {
//       const data = await response.json();
//       return data;

//       // console.log(data);
//       // displayProducts(data);
//     } else {
//       throw new Error("Invalid request");
//     }
//   } catch (error) {
//     console.log("error:", error);
//   }
// };
// console.log(fetchProducts())

// // display products in UI
// const displayProducts = (data) => {
//   productsContainer.innerHTML = "";

//   data?.forEach((product) => {
//     const cardContainer = document.createElement("div");
//     cardContainer.classList.add("card-container");

//     const imageContainer = document.createElement("div");
//     imageContainer.classList.add("image-container");

//     const image = document.createElement("img");
//     image.classList.add("image");
//     image.src = product.image;

//     imageContainer.append(image);

//     const textContainer = document.createElement("div");
//     textContainer.classList.add("text-container");

//     const titleElement = document.createElement("p");
//     titleElement.classList.add("product-title");
//     titleElement.textContent = product.title;

//     const priceElement = document.createElement("p");
//     priceElement.classList.add("price-element");
//     priceElement.textContent = product.price;

//     const ratingElement = document.createElement("p");
//     ratingElement.classList.add("rating-element");
//     ratingElement.textContent = product.rating.rate;

//     textContainer.append(titleElement, priceElement, ratingElement);

//     cardContainer.append(imageContainer, textContainer);

//     productsContainer.append(cardContainer);
//   });
// };
