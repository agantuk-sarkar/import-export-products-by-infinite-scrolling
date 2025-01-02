import navBar from "../components/navbar.js";
import fetchProducts from "../components/fetchProducts.js";
import displayProducts from "../components/displayProducts.js";
import { getSearchProducts } from "../components/fetchProducts.js";
import { debounce } from "../utils/debounce.js";

// getting the html elements into js
export const productsContainer = document.querySelector(".products");

const searchInput = document.getElementById("searchInput");

let pageNo = 1;
let limit = 10;
let totalItems = 0;
let hasMoreData = true;
let searchQuery = "";

// function to fetch products and display them in UI
async function getProductsData(pageNo, limit) {
  let skip = (pageNo - 1) * limit;

  const productDetails = await fetchProducts(skip, limit);

  totalItems = productDetails.total;

  if (skip + limit > totalItems) {
    hasMoreData = false;
  }

  showProducts(productDetails.products);
}

// getProductsData(pageNo, limit);
loadProducts(pageNo, limit);

// function to show products
function showProducts(products) {
  if (products) {
    displayProducts(products, productsContainer);
  }
}

// to handle infinite scrolling
window.addEventListener("scroll", (event) => {
  // console.log("event:",event);
  const { clientHeight, scrollTop, scrollHeight } =
    event.target.documentElement;

  if (clientHeight + scrollTop === scrollHeight) {
    pageNo = pageNo + 1;
    limit = 10;

    if (hasMoreData) {
      loadProducts(pageNo, limit);
    }
    // loadProducts(pageNo, limit);
  }
});

// to handle search inputs by adding event for search input
searchInput.addEventListener("input", (event) => {
  const searchText = event.target.value;

  pageNo = 1;
  limit = 10;

  functionToPass(searchText, pageNo, limit);
  // loadProducts(pageNo,limit);

  // searchProducts(searchText, pageNo, limit);
});

// passing the function search products and time delay
const functionToPass = debounce(test, 3000);

function test(searchText) {
  productsContainer.innerHTML = "";
  pageNo = 1;
  limit = 10;

  searchQuery = searchText;

  loadProducts(pageNo, limit);
}

// function to load products which will decide which API should load
function loadProducts(pageNo, limit) {
  if (searchQuery) {
    searchProducts(searchQuery, pageNo, limit);
  } else {
    getProductsData(pageNo, limit);
  }
}

// function to search products by resolving the promise
async function searchProducts(searchText, pageNo, limit) {
  // productsContainer.innerHTML = "";

  let skip = (pageNo - 1) * limit;

  const products = await getSearchProducts(searchText, skip, limit);

  totalItems = products.total;

  if (skip + limit > totalItems) {
    hasMoreData = false;
  }

  displayProducts(products.products, productsContainer);
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
