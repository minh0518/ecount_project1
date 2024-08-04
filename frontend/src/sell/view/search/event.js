import { render } from './controller.js';

export const events = {
  pageButtons: (tbody, pageCount, pageButtons) => {
    // 26
    // 1페이지 : slice index 0~9
    // 2페이지 : slice index 10~19
    // 3페이지 : slice index 20~25

    let currentPage = 1;
    while (currentPage <= pageCount) {
      let page = currentPage; // 클로저 방지

      const singlePageButton = document.createElement('button');
      singlePageButton.innerText = currentPage;

      // 이벤트 리스너가 등록될 당시의 변수를 계속해서 사용하는건 맞지만
      // 클로저에 의해 그 내용이 바뀔 수 있다
      singlePageButton.addEventListener('click', () => {
        render(page, tbody);
      });
      pageButtons.appendChild(singlePageButton);

      currentPage += 1;
    }
  },

  moveButton: (targetButton, updatePageCallback) => {
    targetButton.addEventListener('click', () => {
      updatePageCallback();
    });
  },
};
