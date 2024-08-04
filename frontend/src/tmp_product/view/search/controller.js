import { item_data } from '../../data/data.js';

// 현재 페이지
let currentPageNumberState = 1;
// 전체 페이지 개수
let totalPageCountState = 1;
// 현재 input
let inputState = {
  code: '',
  name: '',
};
// 체크박스
let checkedState = [];

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

function getCheckedState() {
  return checkedState;
}
function setCheckedState(newCheckedState) {
  checkedState = newCheckedState;

  renderCheckBox();
}

// 메인 로직
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem(`item_data`)) {
    localStorage.setItem(`item_data`, JSON.stringify(item_data));
  }

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
  events.search(setInputState, setCheckedState);

  // 적용 이벤트
  events.apply(getCheckedState, renderInput);

  // 신규 이벤트
  events.new(getCheckedState, renderInput);
});
