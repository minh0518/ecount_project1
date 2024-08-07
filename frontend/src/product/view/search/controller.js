import { product_item_data } from '../../data/data.js';
import { getSearchDataApi } from '../../service/get.js';

const params = new URLSearchParams(window.location.search);
const from = params.get('from');
// const product_code = params.get("code");

// TODO: 필요한 기능인지 확인
// const codeQueryArr =
//   product_code === "none" ? [] : product_code.split(",").map((i) => i.trim());

let currentPage = 1;
let totalCount = 1;

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
    const htmlSting = `
                <td><input type="checkbox" class="checkbox"/></td>
                <td><button class="codeButton">${code}</button></td>
                <td>${name}</td>
                <td><button class="editButton">수정</button></td>
              `;
    newTr.innerHTML = htmlSting;
    tbody.appendChild(newTr);

    const checkbox = newTr.querySelector('.checkbox');

    checkbox.addEventListener('change', () => {
      const allCheckboxes = document.querySelectorAll('.checkbox');
      // 판매 입력(1개만 선택)
      if (from === 'add') {
        allCheckboxes.forEach((i) => {
          if (i.checked) i.checked = false;
        });
        checkbox.checked = true;
      }

      // 판매 조회(3개까지)
      if (from === 'search') {
        let count = 0;
        allCheckboxes.forEach((i) => {
          if (i.checked) count += 1;
        });

        if (count > 3) {
          alert('최대 3개까지 선택 가능합니다');
          checkbox.checked = false;
          return;
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

  // document.querySelector(".codeInput").value = codeQueryArr.length
  //   ? codeQueryArr.join(",")
  //   : "";

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
    // 판매 입력(1개만 선택)
    if (from === 'add') {
      const allCheckboxes = document.querySelectorAll('.checkbox');
      for (let row of allCheckboxes) {
        if (row.checked) {
          const targetTr = row.closest('tr');
          const codeValue = targetTr.querySelectorAll('td')[1].innerText;
          const nameValue = targetTr.querySelectorAll('td')[2].innerText;
          opener.document.querySelector('.codeInput').value = `${codeValue},${nameValue}`;
          window.close();
          break;
        }
      }
    }
    // 판매 조회(3개까지)
    if (from === 'search') {
      const parent = window.opener.document.querySelector('.codeList');
      parent.innerHTML = '';
      const allCheckboxes = document.querySelectorAll('.checkbox');
      allCheckboxes.forEach((row) => {
        if (row.checked) {
          const targetTr = row.closest('tr');
          const codeValue = targetTr.querySelectorAll('td')[1].innerText;
          const nameValue = targetTr.querySelectorAll('td')[2].innerText;

          const dataDiv = document.createElement('div');
          dataDiv.classList.add('singleSearchedData');
          dataDiv.innerHTML = `<span>${codeValue}</span> <span>${nameValue}</span> <button class="deleteSearchedData">x</button>`;

          parent.appendChild(dataDiv);
        }
      });
      window.close();
    }
  });

  const newButton = document.querySelector('.new');
  newButton.addEventListener('click', () => {
    window.open(`../add/productAdd.html?mode=new`, '_blank', 'width=500,height=300');
  });
});
