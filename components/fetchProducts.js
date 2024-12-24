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

  export default fetchProducts
