import { item_data } from '../../data/data.js';
import { events } from './event.js';
import { getSearchDataApi } from './service/get.js';

// 상태
let currentPage = 1;

// 상태 가져오기
function getCurrentPage() {
  return currentPage;
}

// 상태 업데이트(리렌더링 포함)
function setCurrentPage(targetPageNumber, pageCount) {
  currentPage = targetPageNumber; // 업데이트

  // 업데이트된 state를 기반으로 페이지 계산,
  // 해당 페이지에 해당하는 데이터 패칭
  // (=useEffect 콜백)
  if (currentPage > pageCount) currentPage = pageCount;
  if (currentPage <= 0) currentPage = 1;
  const startOffset = (currentPage - 1) * 10;
  const endOffset = startOffset + 10;
  const currentPageData = getSearchDataApi.getDataList(startOffset, endOffset);

  // 리렌더링
  render(currentPageData);
}

// 리렌더링 함수 (현재 페이지에 해당하는 데이터를 테이블에 추가)
export const render = (currentPageData) => {
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

document.addEventListener('DOMContentLoaded', () => {
  const totalCount = item_data.length;
  const pageCount = totalCount % 10 === 0 ? Math.floor(totalCount / 10) : Math.floor(totalCount / 10) + 1;

  // 첫페이지 테이블 세팅
  const currentPageData = getSearchDataApi.getDataList(0, 10);
  render(currentPageData);

  // 페이지네이션 버튼 이벤트
  events.pageButtons(pageCount);

  // 이전, 다음 버튼 이벤트
  events.moveButton('left', getCurrentPage, setCurrentPage, pageCount);
  events.moveButton('right', getCurrentPage, setCurrentPage, pageCount);

  // 검색 이벤트
  // events.search();
});
