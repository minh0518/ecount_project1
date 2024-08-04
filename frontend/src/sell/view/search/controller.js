// import { sell_item_data } from '../../data/data.js';
// import { getSearchDataApi } from './service/get.js';

// // 현재 페이지
// let currentPageNumberState = 1;
// // 전체 페이지 개수
// let totalPageCountState = 1;
// // 현재 input
// let inputState = {
//   code: '',
//   name: '',
// };
// // 체크박스
// let checkedState = [];

// function getCurrentPageNumberState() {
//   return currentPageNumberState;
// }

// function setCurrentPageNumberState(targetPageNumber) {
//   const toalPageCount = getTotalPageCountState();
//   const inputState = getInputState();

//   currentPageNumberState = targetPageNumber;

//   if (currentPageNumberState > toalPageCount) currentPageNumberState = toalPageCount;
//   if (currentPageNumberState <= 0) currentPageNumberState = 1;
//   const startOffset = (currentPageNumberState - 1) * 10;
//   const endOffset = startOffset + 10;
//   const currentPageStateData = getSearchDataApi.getDataList(inputState.code, inputState.name, startOffset, endOffset);

//   renderTable(currentPageStateData);
// }
// function getTotalPageCountState() {
//   return totalPageCountState;
// }
// function setTotalPageCountState(targetValue) {
//   totalPageCountState = targetValue;
// }

// function getInputState() {
//   return inputState;
// }
// function setInputState(newInputState) {
//   inputState = {
//     ...newInputState,
//   };
//   const totalCount = getSearchDataApi.getDataLength(inputState.code, inputState.name);
//   const pageCount = totalCount % 10 === 0 ? Math.floor(totalCount / 10) : Math.floor(totalCount / 10) + 1;

//   setTotalPageCountState(pageCount);
//   setCurrentPageNumberState(1);
// }

// function getCheckedState() {
//   return checkedState;
// }
// function setCheckedState(newCheckedState) {
//   checkedState = newCheckedState;

//   renderCheckBox();
// }

// // 메인 로직
// document.addEventListener('DOMContentLoaded', () => {
//   if (!localStorage.getItem(`sell_item_data`)) {
//     localStorage.setItem(`sell_item_data`, JSON.stringify(sell_item_data));
//   }

//   const totalCount = getSearchDataApi.getDataLength('', '');
//   const pageCount = totalCount % 10 === 0 ? Math.floor(totalCount / 10) : Math.floor(totalCount / 10) + 1;

//   setTotalPageCountState(pageCount);

//   setCurrentPageNumberState(1);

//   // 이전, 다음 버튼 이벤트
//   events.moveButton('left', getCurrentPageNumberState, setCurrentPageNumberState);
//   events.moveButton('right', getCurrentPageNumberState, setCurrentPageNumberState);

//   // 검색 이벤트
//   events.search(setInputState, setCheckedState);

//   // 적용 이벤트
//   events.apply(getCheckedState, renderInput);

//   // 신규 이벤트
//   events.new(getCheckedState, renderInput);
// });

import { sell_item_data } from '../../data/data.js';
import { getSearchDataApi } from './service/get.js';

export const renderTable = (currentPage) => {
  const startYear = document.getElementById(`startYear`).value;
  const startMonth = document.getElementById(`startMonth`).value;
  const startDay = document.getElementById(`startDay`).value;
  const endYear = document.getElementById(`endYear`).value;
  const endMonth = document.getElementById(`endMonth`).value;
  const endDay = document.getElementById(`endDay`).value;

  const nameList = document.querySelector('.nameList');
  const spans = nameList.querySelectorAll('span');
  const searchValues = Array.from(spans).map((span) => span.textContent);

  const startOffset = (currentPage - 1) * 10;
  const endOffset = startOffset + 10;
  const currentPageStateData = getSearchDataApi.getDataList(
    startOffset,
    endOffset,
    { startYear, startMonth, startDay },
    { endYear, endMonth, endDay },
    searchValues,
  );

  const tbody = document.querySelector('.tbody');

  tbody.innerHTML = '';
  for (let { date, code, name, count, price, description } of currentPageStateData) {
    const newTr = document.createElement('tr');
    const htmlSting = `
                <td><input type="checkbox" class="checkbox"/></td>
                <td><button class="dateButton">${date}</button></td>
                <td><button class="codeButton">${code}</button></td>
                <td>${name}</td>
                <td>${count}</td>
                <td>${price}</td>
                <td>${description}</td>
              `;
    newTr.innerHTML = htmlSting;
    tbody.appendChild(newTr);
  }
};

function makeSelectRange(elementId, start, end) {
  const select = document.getElementById(elementId);
  for (let i = start; i <= end; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.text = i;
    select.appendChild(option);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem(`sell_item_data`)) {
    localStorage.setItem(`sell_item_data`, JSON.stringify(sell_item_data));
  }

  makeSelectRange('startYear', 2020, 2025);
  makeSelectRange('endYear', 2020, 2025);
  makeSelectRange('startMonth', 1, 12);
  makeSelectRange('endMonth', 1, 12);
  makeSelectRange('startDay', 1, 31);
  makeSelectRange('endDay', 1, 31);

  let currentPage = 1;
  renderTable(currentPage);

  const leftButton = document.querySelector('.leftButton');
  const rightButton = document.querySelector('.rightButton');

  // leftButton.addEventListener('click', () => {
  //   currentPage -= 1;
  //   renderTable(currentPage);
  // });

  // rightButton.addEventListener('click', () => {
  //   currentPage += 1;
  //   renderTable(currentPage);
  // });

  leftButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderTable(currentPage);
    }
  });

  rightButton.addEventListener('click', () => {
    const totalCount = getSearchDataApi.getDataLength();
    const totalPageCount = totalCount % 10 === 0 ? Math.floor(totalCount / 10) : Math.floor(totalCount / 10) + 1;
    if (currentPage < totalPageCount) {
      currentPage += 1;
      renderTable(currentPage);
    }
  });

  document.querySelector('.nameInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const input = e.target;
      const value = input.value.trim();
      if (value) {
        const categoryList = document.querySelector('.nameList');
        const newCategory = document.createElement('span');
        newCategory.className = 'name-item';
        newCategory.textContent = value;
        newCategory.addEventListener('click', function () {
          categoryList.removeChild(newCategory);
        });
        categoryList.appendChild(newCategory);
        input.value = '';
      }
      e.preventDefault();
    }
  });

  const searchButton = document.querySelector('.searchButton');
  searchButton.addEventListener('click', () => {
    currentPage = 1;

    renderTable(currentPage);
  });
});
