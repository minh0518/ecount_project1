import { product_item_data } from '../../data/data.js';
import { getSearchDataApi } from '../../service/get.js';

const params = new URLSearchParams(window.location.search);
const from = params.get('from');

let currentPage = 1;
let totalCount = 1;
let checkedCode = new Map() // Map() {code => name, ...}

// 테이블 렌더링
export const renderTable = (currentPage) => {
  const startOffset = (currentPage - 1) * 10;
  const endOffset = startOffset + 10;
  const nameInput = document.querySelector('.nameInput').value;
  const codeInputArr = document.querySelector('.codeInput').value;

  const { data: currentPageStateData, length } = getSearchDataApi.getData(
    startOffset,
    endOffset,
    codeInputArr,
    nameInput,
  );

  totalCount = length; // 상태 업데이트

  const tbody = document.querySelector('.tbody');

  tbody.innerHTML = '';
  for (let { code, name } of currentPageStateData) {
    const newTr = document.createElement('tr');
    newTr.setAttribute('data-code', code);
    const htmlSting = `
                <td><input type="checkbox" class="checkbox"/></td>
                <td><button class="codeButton">${code}</button></td>
                <td>${name}</td>
                <td><button class="editButton">수정</button></td>
              `;
    newTr.innerHTML = htmlSting;
    tbody.appendChild(newTr);
    if (checkedCode.has(code)) {
      newTr.querySelector('.checkbox').checked = true
    }


    const codeButton = newTr.querySelector('.codeButton')
    codeButton.addEventListener('click', () => {
      checkedCode.set(code, name)
      const apllyButton = document.querySelector('.apply')
      if (apllyButton) apllyButton.click()
    })

    const checkbox = newTr.querySelector('.checkbox');
    checkbox.addEventListener('change', () => {
      // 판매 입력(1개만 선택)
      if (from === 'add') {

        if (checkedCode.size) {
          const existCode = (checkedCode.keys().next().value)
          // 같은걸 골랐다면 체크박스만 해제
          if (existCode === code) {
            checkbox.checked = false
            checkedCode.delete(existCode)
            return
          }

          // 다른걸 골랐다면 이전 선택값 체크박스 해제
          const tr = document.querySelector(`tr[data-code="${existCode}"]`);
          if (tr) {
            const deleteTargetCheckbox = tr.querySelector('input[type="checkbox"]');
            if (deleteTargetCheckbox) deleteTargetCheckbox.checked = false;
          }
          checkedCode.delete(existCode)
        }
        checkedCode = new Map([
          [code, name]
        ])
      }

      // 판매 조회(3개까지)
      if (from === 'search') {
        // 같은걸 골랐다면 체크박스만 해제
        if (checkedCode.has(code)) {
          checkbox.checked = false
          checkedCode.delete(code)
          return
        }

        if (!checkedCode.size || checkedCode.size <= 3) {
          checkedCode.set(code, name)
        }
        if (checkedCode.size > 3) {
          alert('최대 3개까지 선택 가능합니다');
          checkbox.checked = false;
          // 직전 값 삭제
          checkedCode = new Map([...checkedCode].slice(0, -1))
        }

      }
    });

    const editButton = newTr.querySelector('.editButton');
    editButton.addEventListener('click', () => {
      window.open(`../add/productAdd.html?mode=edit&code=${code}&name=${name}`, '_blank', 'width=500,height=300');
    });
  }
};

// 메인로직
document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem(`product_item_data`)) {
    localStorage.setItem(`product_item_data`, JSON.stringify(product_item_data));
  }


  renderTable(currentPage);

  const leftButton = document.querySelector('.leftButton');
  const rightButton = document.querySelector('.rightButton');

  leftButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage -= 1; // 상태 업데이트
      renderTable(currentPage);
    }
  });

  rightButton.addEventListener('click', () => {
    const totalPageCount = totalCount % 10 === 0 ? Math.floor(totalCount / 10) : Math.floor(totalCount / 10) + 1;
    if (currentPage < totalPageCount) {
      currentPage += 1; // 상태 업데이트
      renderTable(currentPage);
    }
  });

  const searchButton = document.querySelector('.searchButton');
  searchButton.addEventListener('click', () => {
    currentPage = 1;
    renderTable(currentPage);
  });

  const applyButton = document.querySelector('.apply');
  applyButton.addEventListener('click', () => {

    if (!checkedCode.size) {
      alert('체크된 항목이 없습니다');
      return;
    }

    // 판매 입력(1개만 선택)
    if (from === 'add') {
      const [codeValue, nameValue] = checkedCode.entries().next().value
      opener.document.querySelector('.codeInput').value = `${codeValue},${nameValue}`;
    }
    // 판매 조회(3개까지)
    if (from === 'search') {
      const parent = window.opener.document.querySelector('.codeList');
      parent.innerHTML = '';

      for (let [codeValue, nameValue] of checkedCode) {
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('singleSearchedData');
        dataDiv.innerHTML = `<span>${codeValue}</span> <span>${nameValue}</span> <button class="deleteSearchedData">x</button>`;
        parent.appendChild(dataDiv);
      }
    }

    window.close();

  });

  const newButton = document.querySelector('.new');
  newButton.addEventListener('click', () => {
    window.open(`../add/productAdd.html?mode=new`, '_blank', 'width=500,height=300');
  });
});
