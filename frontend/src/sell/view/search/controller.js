import { item_data } from '../../data/data.js';
import { events } from './event.js';
import { getSearchDataApi } from './service/get.js';

// 현재 페이지 상태
let currentPage = 1;

// 현재 페이지 상태 업데이트 및 리렌더링
function setCurrentPage(target, pageCount, tbody) {
  // 리렌더링
  currentPage += target;
  if (currentPage > pageCount) currentPage = pageCount;
  if (currentPage <= 0) currentPage = 1;

  // 리렌더링
  render(currentPage, tbody);
}

export const render = (page, tbody) => {
  const startOffset = (page - 1) * 10;
  const endOffset = startOffset + 10;

  // offset에 맞는 데이터 요청
  const pageData = getSearchDataApi.getSearchList(startOffset, endOffset);

  tbody.innerHTML = '';
  for (let { code, name } of pageData) {
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

  // # 1페이지 테이블 세팅
  render(currentPage, tbody);
  // render(1, tbody);

  // # 페이지네이션 버튼
  // 데이터 전체 길이
  const totalCount = item_data.length;

  // 전체 페이지 개수
  const pageCount = totalCount % 10 === 0 ? Math.floor(totalCount / 10) : Math.floor(totalCount / 10) + 1;

  // 현재 페이지의 행 추가
  events.pageButtons(tbody, pageCount, pageButtons);

  // # 이전, 다음 버튼 추가
  events.moveButton(goLeftButton, () => setCurrentPage(-1, pageCount, tbody));
  events.moveButton(goRightButton, () => setCurrentPage(1, pageCount, tbody));
});

// for (let { code, name } of item_data) {
//   const newTr = document.createElement('tr');

//   const checkboxTd = document.createElement('td');
//   const checkbox = document.createElement('input');
//   checkbox.type = 'checkbox';
//   checkboxTd.appendChild(checkbox);
//   newTr.appendChild(checkboxTd);

//   const codeTd = document.createElement('td');
//   codeTd.textContent = code;
//   newTr.appendChild(codeTd);

//   const nameTd = document.createElement('td');
//   nameTd.textContent = name;
//   newTr.appendChild(nameTd);

//   const editTd = document.createElement('td');
//   const button = document.createElement('button');
//   button.innerText = '수정';
//   editTd.appendChild(button);
//   newTr.appendChild(editTd);

//   tbody.appendChild(newTr);
// }
