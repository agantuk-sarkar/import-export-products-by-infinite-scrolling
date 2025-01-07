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
  
  const { clientHeight, scrollTop, scrollHeight } =
    event.target.documentElement;

  if (clientHeight + scrollTop === scrollHeight) {
    pageNo = pageNo + 1;
    limit = 10;

    if (hasMoreData) {
      loadProducts(pageNo, limit);
    }
  }
});

// to handle search inputs by adding event for search input
searchInput.addEventListener("input", (event) => {
  const searchText = event.target.value;

  pageNo = 1;
  limit = 10;

  functionToPass(searchText, pageNo, limit);
});

// passing the function search products and time delay
const functionToPass = debounce(test, 2000);

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

  let skip = (pageNo - 1) * limit;

  const products = await getSearchProducts(searchText, skip, limit);

  totalItems = products.total;

  if (skip + limit > totalItems) {
    hasMoreData = false;
  }

  displayProducts(products.products, productsContainer);
}
