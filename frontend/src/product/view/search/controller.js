import { events } from "./event.js";
import { getSearchDataApi } from "./service/get.js";
import { item_data } from "../../data/data.js";

// # state

// 현재 페이지
let currentPageNumberState = 1;
// 전체 페이지 개수
let totalPageCountState = 1;
// 현재 input
let inputState = {
  code: "",
  name: "",
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
  const totalCount = getSearchDataApi.getDataLength(
    inputState.code,
    inputState.name
  );
  const pageCount =
    totalCount % 10 === 0
      ? Math.floor(totalCount / 10)
      : Math.floor(totalCount / 10) + 1;

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

  if (currentPageNumberState > toalPageCount)
    currentPageNumberState = toalPageCount;
  if (currentPageNumberState <= 0) currentPageNumberState = 1;
  const startOffset = (currentPageNumberState - 1) * 10;
  const endOffset = startOffset + 10;
  const currentPageStateData = getSearchDataApi.getDataList(
    inputState.code,
    inputState.name,
    startOffset,
    endOffset
  );

  renderTable(currentPageStateData);
}

function getCheckedState() {
  return checkedState;
}
function setCheckedState(newCheckedState) {
  checkedState = newCheckedState;

  renderCheckBox();
}

// # 렌더링
export const renderPageButtons = () => {
  const toalPageCount = getTotalPageCountState();
  const pageButtons = document.querySelector(".pageButtons");
  pageButtons.innerHTML = "";

  // 1페이지 : slice index 0~9
  let currentPage = 1;
  while (currentPage <= toalPageCount) {
    let page = currentPage; // 클로저 방지

    const singlePageButton = document.createElement("button");
    singlePageButton.innerText = currentPage;

    singlePageButton.addEventListener("click", () => {
      setCurrentPageNumberState(page);
    });
    pageButtons.appendChild(singlePageButton);

    currentPage += 1;
  }
};

export const renderTable = (currentPageData) => {
  const tbody = document.querySelector(".tbody");

  tbody.innerHTML = "";
  for (let { code, name } of currentPageData) {
    const newTr = document.createElement("tr");
    const htmlSting = `
                <td><input type="checkbox" class="checkbox"/></td>
                <td><button class="codeButton">${code}</button></td>
                <td id="product_${name}">${name}</td>
                <td><button class="editButton">수정</button></td>
              `;
    newTr.innerHTML = htmlSting;
    tbody.appendChild(newTr);

    const checkbox = newTr.querySelector(".checkbox");
    checkbox.addEventListener("click", () => {
      const checkedState = getCheckedState();

      if (checkbox.checked === true && checkedState.length >= 3) {
        alert("최대 3개까지 선택 가능합니다");
        checkbox.checked = false;
        return;
      }

      // false인 상황에서 클릭해서 true
      if (checkbox.checked) {
        setCheckedState([...checkedState, code]);
      } else {
        setCheckedState(checkedState.filter((i) => i !== code));
      }
    });

    const codeButton = newTr.querySelector(".codeButton");

    codeButton.addEventListener("click", () => {
      setCheckedState([code]);
      renderInput();
    });

    const editButton = newTr.querySelector(".editButton");
    editButton.addEventListener("click", () => {
      window.open(
        `../add/productAdd.html?mode=edit&code=${code}&name=${name}`,
        "modalWindow",
        "width=500,height=300"
      );
    });
  }
};

const renderInput = () => {
  const codeInput = document.querySelector(".codeInput");
  const checkedState = getCheckedState();

  codeInput.value = checkedState.join(",");
};

const renderCheckBox = () => {
  const tbody = document.querySelector(".tbody");
  const rows = tbody.querySelectorAll("tr");

  const checkedState = getCheckedState();
  rows.forEach((row) => {
    const checkbox = row.querySelector(".checkbox");
    const code = row.querySelector(".codeButton").textContent;
    checkbox.checked = checkedState.includes(code);
  });
};

// 메인 로직
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem(`item_data`)) {
    localStorage.setItem(`item_data`, JSON.stringify(item_data));
  }

  const totalCount = getSearchDataApi.getDataLength("", "");
  const pageCount =
    totalCount % 10 === 0
      ? Math.floor(totalCount / 10)
      : Math.floor(totalCount / 10) + 1;

  // 페이지네이션 버튼 세팅
  setTotalPageCountState(pageCount);

  // 첫페이지 테이블 세팅
  setCurrentPageNumberState(1);

  // 이전, 다음 버튼 이벤트
  events.moveButton(
    "left",
    getCurrentPageNumberState,
    setCurrentPageNumberState
  );
  events.moveButton(
    "right",
    getCurrentPageNumberState,
    setCurrentPageNumberState
  );

  // 검색 이벤트
  events.search(setInputState, setCheckedState);

  // 적용 이벤트
  events.apply(getCheckedState, renderInput);

  // 신규 이벤트
  events.new(getCheckedState, renderInput);
});
