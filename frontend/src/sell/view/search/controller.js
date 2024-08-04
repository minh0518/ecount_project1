import { events } from './event.js';
import { getSearchDataApi } from './service/get.js';

// # state

// 현재 페이지
let currentPageNumberState = 1;
// 전체 페이지 개수
let totalPageCountState = 1;
// 현재 input
let inputState = {
  code: '',
  name: '',
};

function getInputState() {
  return inputState;
}
function setInputState(newInputState) {
  inputState = {
    ...newInputState,
  };
  const totalCount = getSearchDataApi.getDataLength(inputState.code, inputState.name);
  const pageCount = totalCount % 10 === 0 ? Math.floor(totalCount / 10) : Math.floor(totalCount / 10) + 1;

  // 전체 리렌더링
  setTotalPageCountState(pageCount);
  setCurrentPageNumberState(1);
}

function getTotalPageCountState() {
  return totalPageCountState;
}
function setTotalPageCountState(targetValue) {
  totalPageCountState = targetValue;
  renderPageButtons();
}

function getCurrentPageNumberState() {
  return currentPageNumberState;
}

function setCurrentPageNumberState(targetPageNumber) {
  const toalPageCount = getTotalPageCountState();
  const inputState = getInputState();

  currentPageNumberState = targetPageNumber;

  if (currentPageNumberState > toalPageCount) currentPageNumberState = toalPageCount;
  if (currentPageNumberState <= 0) currentPageNumberState = 1;
  const startOffset = (currentPageNumberState - 1) * 10;
  const endOffset = startOffset + 10;
  const currentPageStateData = getSearchDataApi.getDataList(inputState.code, inputState.name, startOffset, endOffset);

  renderTable(currentPageStateData);
}

// # 렌더링
export const renderPageButtons = () => {
  const toalPageCount = getTotalPageCountState();
  const pageButtons = document.querySelector('.pageButtons');
  pageButtons.innerHTML = '';

  // 1페이지 : slice index 0~9
  let currentPage = 1;
  while (currentPage <= toalPageCount) {
    let page = currentPage; // 클로저 방지

    const singlePageButton = document.createElement('button');
    singlePageButton.innerText = currentPage;

    singlePageButton.addEventListener('click', () => {
      setCurrentPageNumberState(page);
    });
    pageButtons.appendChild(singlePageButton);

    currentPage += 1;
  }
};

export const renderTable = (currentPageData) => {
  const tbody = document.querySelector('.tbody');

  tbody.innerHTML = '';
  for (let { code, name } of currentPageData) {
    const newTr = document.createElement('tr');
    const htmlSting = `
                <td><input type="checkbox"/></td>
                <td>${code}</td>
                <td>${name}</td>
                <td>수정</td>
              `;
    newTr.innerHTML = htmlSting;
    tbody.appendChild(newTr);
  }
};

// 메인 로직
document.addEventListener('DOMContentLoaded', () => {
  const totalCount = getSearchDataApi.getDataLength('', '');
  const pageCount = totalCount % 10 === 0 ? Math.floor(totalCount / 10) : Math.floor(totalCount / 10) + 1;

  // 페이지네이션 버튼 세팅
  setTotalPageCountState(pageCount);

  // 첫페이지 테이블 세팅
  setCurrentPageNumberState(1);

  // 이전, 다음 버튼 이벤트
  events.moveButton('left', getCurrentPageNumberState, setCurrentPageNumberState);
  events.moveButton('right', getCurrentPageNumberState, setCurrentPageNumberState);

  // 검색 이벤트
  events.search(setInputState);
});
