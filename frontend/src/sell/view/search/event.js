import { renderTable } from './controller.js';
import { getSearchDataApi } from './service/get.js';

export const events = {
  moveButton: (direction, getCurrentPageNumberState, setCurrentPageNumberState) => {
    const controlButtons = document.querySelector('.controlButtons').children;
    const goLeftButton = controlButtons[0];
    const goRightButton = controlButtons[1];

    if (direction === 'left') {
      goLeftButton.addEventListener('click', () => {
        const currentPage = getCurrentPageNumberState();
        setCurrentPageNumberState(currentPage - 1);
      });
    }
    if (direction === 'right') {
      goRightButton.addEventListener('click', () => {
        const currentPage = getCurrentPageNumberState();
        setCurrentPageNumberState(currentPage + 1);
      });
    }
  },

  search: (setInputState) => {
    const searchButton = document.querySelector('.searchButton');
    searchButton.addEventListener('click', () => {
      const codeInput = document.querySelector('.codeInput').value;
      const nameInput = document.querySelector('.nameInput').value;

      const newInputState = {
        code: codeInput,
        name: nameInput,
      };
      setInputState(newInputState);
    });
  },
};
