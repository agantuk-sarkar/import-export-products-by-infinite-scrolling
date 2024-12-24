import { handlePagination } from "../scripts/index.js";

export const controlPagination = (
  pageNo,
  totalItems,
  limit = 10,
  paginationContainer
) => {
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(totalItems / limit);

  let currentPage = pageNo;

  const prevButton = document.createElement("button");
  prevButton.textContent = "Prev";

  if (currentPage <= 1) {
    prevButton.disabled = true;
  }

  prevButton.addEventListener("click", () => {
    currentPage--;
    handlePagination(currentPage, limit);
  });

  paginationContainer.append(prevButton);

  let startPage = null;
  let endPage = null;

  if (currentPage < 3) {
    startPage = 1;
    endPage = 5;
  } else if (currentPage + 2 >= totalPages) {
    startPage = currentPage - 4;
    endPage = totalPages;
  } else {
    startPage = currentPage - 2;
    endPage = currentPage + 2;
  }

  for (let i = startPage; i <= endPage; i++) {
    const buttonEle = document.createElement("button");
    buttonEle.textContent = i;

    if (currentPage === i) {
      buttonEle.classList.add("active");
    }

    paginationContainer.append(buttonEle);

    buttonEle.addEventListener("click",()=>{
        currentPage = i;
        handlePagination(currentPage,limit);
    });
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";

  if (currentPage >= totalPages) {
    nextButton.disabled = true;
  }

  nextButton.addEventListener("click", () => {
    currentPage++;
    handlePagination(currentPage, limit);
  });

  paginationContainer.append(nextButton);
};
