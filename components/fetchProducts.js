// fetch the products
const fetchProducts = async (skip, limit = 10) => {
    try {

      const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  
      if (response.ok) {
        const data = await response.json();
        return data;

      } else {
        throw new Error("Invalid request");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };


// to search products by search text
export const getSearchProducts = async (searchText,skip,limit)=>{
  try{
    const response = await fetch(`https://dummyjson.com/products/search?q=${searchText}&skip=${skip}&limit=${limit}`);

    if(response.ok){
      const data = await response.json();
      return data;
    } else {
      throw new Error("Bad Gateway");
    }
  } catch(error){
    console.log("error:",error);
  }
}


export default fetchProducts
