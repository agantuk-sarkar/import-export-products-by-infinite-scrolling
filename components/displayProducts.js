// display products in UI
const displayProducts = (data,productsContainer) => {
    productsContainer.innerHTML = "";
  
    data?.forEach((product) => {
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("card-container");
  
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
  
      const image = document.createElement("img");
      image.classList.add("image");
      image.src = product.thumbnail;
  
      imageContainer.append(image);
  
      const textContainer = document.createElement("div");
      textContainer.classList.add("text-container");
  
      const titleElement = document.createElement("p");
      titleElement.classList.add("product-title");
      titleElement.textContent = product.title;
  
      const priceElement = document.createElement("p");
      priceElement.classList.add("price-element");
      priceElement.textContent = product.price;
  
      const ratingElement = document.createElement("p");
      ratingElement.classList.add("rating-element");
      ratingElement.textContent = product.rating;
  
      textContainer.append(titleElement, priceElement, ratingElement);
  
      cardContainer.append(imageContainer, textContainer);
  
      productsContainer.append(cardContainer);
    });
  };

  export default displayProducts


