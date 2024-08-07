import { sell_item_data } from "../../data/data.js";
import { getSellDataApi } from "../../service/get.js";
import { deleteSellDataApi } from "../../service/delete.js";
import { getDateStringByDate } from "../../../utils/date.js";

// 상태
let currentPage = 1;
let totalCount = 1;

// const convertDate = (date) => {
//   date = new Date(date);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0"); // 월을 2자리로 맞춤
//   const day = String(date.getDate()).padStart(2, "0"); // 일을 2자리로 맞춤

//   const formattedDate = `${year}-${month}-${day}`;
//   return formattedDate;
// };

// 테이블 렌더링
export const renderTable = (currentPage) => {

  const startDate = document.getElementById('startDate').value
  const endDate = document.getElementById('endDate').value

  const descriptionInput = document.querySelector(`.descriptionInput`).value;
  const codeList = document.querySelector(".codeList");

  // codeList 내부의 모든 singleSearchedData 요소를 선택
  const dataItems = codeList.querySelectorAll(".singleSearchedData");
  // 결과를 저장할 배열
  const codeResult = [];
  // 각 singleSearchedData 요소를 순회
  dataItems.forEach((item) => {
    const firstSpan = item.querySelector("span");
    if (firstSpan) {
      codeResult.push(firstSpan.innerText);
    }
  });



  const startOffset = (currentPage - 1) * 10;
  const endOffset = startOffset + 10;


  const { data: currentPageStateData, length } = getSellDataApi.getDataList(
    startOffset,
    endOffset,
    startDate === '' ? '' : new Date(startDate),
    endDate === '' ? '' : new Date(endDate),
    codeResult
  );


  totalCount = length; // 상태 업데이트

  const tbody = document.querySelector(".tbody");

  tbody.innerHTML = "";

  for (let {
    date,
    code,
    number,
    name,
    quantity,
    price,
    description,
  } of currentPageStateData) {


    const newTr = document.createElement("tr");
    const htmlSting = `
                <td><input type="checkbox" class="checkbox"/></td>
                <td><button class="dateButton">${getDateStringByDate(
      date)}-${number}</button></td>
                <td>${code}</td>
                <td>${name}</td>
                <td>${quantity}</td>
                <td>${price}</td>
                <td>${description}</td>
              `;
    newTr.innerHTML = htmlSting;
    tbody.appendChild(newTr);
  }

  const dateButtons = document.querySelectorAll(".dateButton");
  dateButtons.forEach((row) => {
    row.addEventListener("click", () => {
      const parentRow = row.closest("tr");
      const codeValue = parentRow.querySelectorAll("td")[2].innerText;

      window.open(
        `../add/sellAdd.html?mode=edit&code=${codeValue}`,
        "_blank",
        "width=1200,height=500"
      );
    });
  });
};


// 메인 로직
document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem(`sell_item_data`)) {
    localStorage.setItem(`sell_item_data`, JSON.stringify(sell_item_data));
  }

  // 최대 선택 날짜 오늘까지
  const startDate = document.getElementById('startDate')
  startDate.max = getDateStringByDate(new Date())
  const endDate = document.getElementById('endDate')
  endDate.max = getDateStringByDate(new Date())

  // startDate의 다음날을 endDate의 시작값으로 지정
  startDate.addEventListener('change', () => {
    const endDate = document.getElementById('endDate')
    const startDateValue = new Date(startDate.value)
    const nextDay = new Date(startDateValue.getTime() + (24 * 60 * 60 * 1000));
    endDate.min = getDateStringByDate(nextDay)
  })

  // 1페이지 테이블 렌더링
  renderTable(currentPage);

  const leftButton = document.querySelector(".leftButton");
  const rightButton = document.querySelector(".rightButton");

  leftButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage -= 1; // 상태 업데이트
      console.log(`currentPage2 ${currentPage}`);
      renderTable(currentPage);
    }
  });

  rightButton.addEventListener("click", () => {
    const totalPageCount =
      totalCount % 10 === 0
        ? Math.floor(totalCount / 10)
        : Math.floor(totalCount / 10) + 1;
    if (currentPage < totalPageCount) {
      currentPage += 1; // 상태 업데이트

      renderTable(currentPage);
    }
  });

  // document.querySelector(".codeInput").addEventListener("keypress", (e) => {
  //   if (e.key === "Enter") {
  //     const input = e.target;
  //     const value = input.value.trim();
  //     if (value) {
  //       const categoryList = document.querySelector(".codeList");
  //       const newCategory = document.createElement("span");
  //       newCategory.className = "code-item";
  //       newCategory.textContent = value;
  //       newCategory.addEventListener("click", function () {
  //         categoryList.removeChild(newCategory);
  //       });
  //       categoryList.appendChild(newCategory);
  //       input.value = "";
  //     }
  //     e.preventDefault();
  //   }
  // });

  const searchButton = document.querySelector(".searchButton");
  searchButton.addEventListener("click", () => {
    if (document.querySelector(".codeList").innerHTML === "") {
      alert("선택된 항목이 없습니다");
      return;
    }

    currentPage = 1;

    renderTable(currentPage);
  });
});

const checkAll = document.getElementById("checkAll");
checkAll.addEventListener("change", () => {
  const allCheckboxes = document.querySelectorAll(".checkbox");
  allCheckboxes.forEach((checkbox) => {
    checkbox.checked = checkAll.checked ? true : false;
  });
});

const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener("click", () => {
  const checkAll = document.getElementById("checkAll");
  const allCheckboxes = document.querySelectorAll(".checkbox");

  allCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const targetTr = checkbox.closest("tr");
      const codeValue = targetTr.querySelectorAll("td")[2].innerText;
      deleteSellDataApi.delteRowByCode(codeValue);
    }
  });

  checkAll.checked = false;
  renderTable(currentPage);
});

const newButton = document.querySelector(".new");
newButton.addEventListener("click", () => {
  window.open(
    `../add/sellAdd.html?mode=new`,
    "_blank",
    "width=1200,height=500"
  );
});

const searchProductDataButton = document.querySelector(
  ".searchProductDataButton"
);
searchProductDataButton.addEventListener("click", () => {
  window.open(
    `../../../product/view/search/productSearch.html?from=search`,
    "_blank",
    "width=1200,height=500"
  );
});
