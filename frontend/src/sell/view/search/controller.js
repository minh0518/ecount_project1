import { item_data } from '../../data/data.js';
import { events } from './event.js';
import { getSearchDataApi } from './service/get.js';

// 상태
let currentPage = 1;

// 상태 업데이트(리렌더링 포함)
function setCurrentPage(target, pageCount, tbody) {
  // 상태 업데이트
  currentPage += target;
  if (currentPage > pageCount) currentPage = pageCount;
  if (currentPage <= 0) currentPage = 1;

  // 리렌더링
  render(currentPage, tbody);
}

export const render = (page, tbody) => {
  const startOffset = (page - 1) * 10;
  const endOffset = startOffset + 10;

  const currentPageData = getSearchDataApi.getSearchList(startOffset, endOffset);

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
  const tbody = document.querySelector('.tbody');
  const pageButtons = document.querySelector('.pageButtons');
  const controlButtons = document.querySelector('.controlButtons').children;
  const goLeftButton = controlButtons[0];
  const goRightButton = controlButtons[1];

  const totalCount = item_data.length;
  const pageCount = totalCount % 10 === 0 ? Math.floor(totalCount / 10) : Math.floor(totalCount / 10) + 1;

  // 첫페이지 테이블 세팅
  render(currentPage, tbody);

  // 페이지네이션 버튼 이벤트
  events.pageButtons(tbody, pageCount, pageButtons);

  // 이전, 다음 버튼 이벤트
  events.moveButton(goLeftButton, () => setCurrentPage(-1, pageCount, tbody));
  events.moveButton(goRightButton, () => setCurrentPage(1, pageCount, tbody));
});
