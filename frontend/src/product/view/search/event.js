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

  search: (setInputState, setCheckedState) => {
    const searchButton = document.querySelector('.searchButton');
    searchButton.addEventListener('click', () => {
      const codeInput = document.querySelector('.codeInput').value;
      const nameInput = document.querySelector('.nameInput').value;

      const newInputState = {
        code: codeInput,
        name: nameInput,
      };
      setInputState(newInputState);
      setCheckedState(codeInput.length === 0 ? [] : codeInput.split(','));
    });
  },

  apply: (getCheckedState, renderInput) => {
    const applyButton = document.querySelector('.apply');
    applyButton.addEventListener('click', () => {
      if (getCheckedState().length === 0) {
        alert('체크된 항목이 없습니다');
        return;
      }
      renderInput();
    });
  },

  new: () => {
    const newButton = document.querySelector('.new');
    newButton.addEventListener('click', () => {
      window.open(`../add/productAdd.html?mode=new`, 'modalWindow', 'width=500,height=300');
    });
  },
};
