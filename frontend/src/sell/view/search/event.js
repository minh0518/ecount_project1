import { render } from './controller.js';
import { getSearchDataApi } from './service/get.js';

export const events = {
  pageButtons: (pageCount) => {
    const pageButtons = document.querySelector('.pageButtons');

    // 26
    // 1페이지 : slice index 0~9
    // 2페이지 : slice index 10~19
    // 3페이지 : slice index 20~25
    let currentPage = 1;
    while (currentPage <= pageCount) {
      let page = currentPage; // 클로저 방지

      const singlePageButton = document.createElement('button');
      singlePageButton.innerText = currentPage;

      singlePageButton.addEventListener('click', () => {
        const startOffset = (page - 1) * 10;
        const endOffset = startOffset + 10;
        const currentPageData = getSearchDataApi.getDataList(startOffset, endOffset);
        render(currentPageData);
      });
      pageButtons.appendChild(singlePageButton);

      currentPage += 1;
    }
  },

  moveButton: (direction, getCurrentPage, setCurrentPage, pageCount) => {
    const controlButtons = document.querySelector('.controlButtons').children;
    const goLeftButton = controlButtons[0];
    const goRightButton = controlButtons[1];

    if (direction === 'left') {
      goLeftButton.addEventListener('click', () => {
        const currentPage = getCurrentPage();
        setCurrentPage(currentPage - 1, pageCount);
      });
    }
    if (direction === 'right') {
      goRightButton.addEventListener('click', () => {
        const currentPage = getCurrentPage();
        setCurrentPage(currentPage + 1, pageCount);
      });
    }
  },

  // search: () => {
  //   const searchButton = document.querySelector('.searchButton');
  //   searchButton.addEventListener('click', () => {
  //     const codeInput = document.querySelector('.codeInput').value;
  //     const nameInput = document.querySelector('.nameInput').value;

  //     const response = getSearchDataApi.getSearchList(codeInput, nameInput);
  //     render();
  //   });
  // },
};
