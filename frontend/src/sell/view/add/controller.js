import { deleteSellDataApi } from "../../service/delete.js";
import { getSellDataApi } from "../../service/get.js";
import { patchSellDataApi } from "../../service/patch.js";
import { postSellDataApi } from "../../service/post.js";

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");

function makeSelectRange(elementId, start, end, defaultValue) {
  const select = document.getElementById(elementId);
  select.innerHTML = ""; // 기존 옵션 제거
  for (let i = start; i <= end; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    select.appendChild(option);
  }
  if (defaultValue !== undefined) {
    select.value = defaultValue;
  }
}

function updateDayOptions(
  yearSelectId,
  monthSelectId,
  daySelectId,
  defaultValue
) {
  const year = document.getElementById(yearSelectId).value;
  const month = document.getElementById(monthSelectId).value;
  const daysInMonth = new Date(year, month, 0).getDate();
  makeSelectRange(daySelectId, 1, daysInMonth, defaultValue);
}

// 추가
if (mode === "new") {
  const searchButton = document.querySelector(".searchButton");

  searchButton.addEventListener("click", () => {
    const codeInput = document.querySelector(".codeInput").value;

    window.open(
      `../../../product/view/search/productSearch.html?code=${
        codeInput.length ? codeInput : "none"
      }&from=add`,
      "_blank",
      "width=1200,height=500"
    );
  });

  const saveButton = document.querySelector(".save");

  saveButton.addEventListener("click", () => {
    const year = document.getElementById("year").value;
    const month = document.getElementById("month").value;
    const day = document.getElementById("day").value;
    const quantityInput = document.querySelector(".quantityInput").value;
    const priceInput = document.querySelector(".priceInput").value;
    const descriptionInput = document.querySelector(".descriptionInput").value;
    const [codeInput, nameInput] = document
      .querySelector(".codeInput")
      .value.split(",");

    postSellDataApi.postNewData(
      new Date(Number(year), Number(month), Number(day)),
      codeInput,
      nameInput,
      Number(quantityInput),
      Number(priceInput),
      descriptionInput
    );
    window.close();
    opener.parent.location.reload();
  });

  const deleteButton = document.querySelector(".delete");
  deleteButton.style.display = "none";

  const numberInput = document.querySelector(".numberInput");
  numberInput.style.display = "none";

  const rewriteButton = document.querySelector(".rewrite");
  rewriteButton.addEventListener("click", () => {
    document.getElementById("year").value = 2020;
    document.getElementById("month").value = 1;
    document.getElementById("day").value = 1;
    document.querySelector(".codeInput").value = "";
    document.querySelector(".quantityInput").value = "";
    document.querySelector(".priceInput").value = "";
    document.querySelector(".descriptionInput").value = "";
  });

  const closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", () => {
    window.close();
  });
}

// 수정
if (mode === "edit") {
  const code = params.get("code");
  const originCode = code;

  let { date, description, name, number, price, quantity } =
    getSellDataApi.getSingleDataByCode(code);

  // Date 객체 생성
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  document.getElementById("year").disabled = true;
  document.getElementById("month").disabled = true;
  document.getElementById("day").disabled = true;
  document.querySelector(".numberInput").disabled = true;

  document.querySelector(".quantityInput").value = quantity;
  document.querySelector(".priceInput").value = price;
  document.querySelector(".descriptionInput").value = description;
  document.querySelector(".codeInput").value = `${code},${name}`;
  document.querySelector(".numberInput").value = number;

  const searchButton = document.querySelector(".searchButton");

  searchButton.addEventListener("click", () => {
    const codeInput = document.querySelector(".codeInput").value;

    window.open(
      `../../../product/view/search/productSearch.html?code=${
        codeInput.length ? codeInput : "none"
      }&from=add`,
      "_blank",
      "width=1200,height=500"
    );
  });

  const rewriteButton = document.querySelector(".rewrite");
  rewriteButton.addEventListener("click", () => {
    document.getElementById("year").value = year;
    document.getElementById("month").value = month;
    document.getElementById("day").value = day;
    document.querySelector(".codeInput").value = code;
    document.querySelector(".quantityInput").value = quantity;
    document.querySelector(".priceInput").value = price;
    document.querySelector(".descriptionInput").value = description;
    document.querySelector(".numberInput").value = number;
  });

  const saveButton = document.querySelector(".save");
  saveButton.addEventListener("click", () => {
    const year = document.getElementById("year").value;
    const month = document.getElementById("month").value;
    const day = document.getElementById("day").value;
    const quantityInput = document.querySelector(".quantityInput").value;
    const priceInput = document.querySelector(".priceInput").value;
    const descriptionInput = document.querySelector(".descriptionInput").value;
    const [codeInput, nameInput] = document
      .querySelector(".codeInput")
      .value.split(",");
    const numberInput = document.querySelector(".numberInput").value;

    patchSellDataApi.editRowByCode(
      originCode,
      new Date(Number(year), Number(month), Number(day)),
      codeInput,
      Number(numberInput),
      nameInput,
      Number(quantityInput),
      Number(priceInput),
      descriptionInput
    );
    window.close();
    opener.parent.location.reload();
  });

  const deleteButton = document.querySelector(".delete");
  deleteButton.addEventListener("click", () => {
    deleteSellDataApi.delteRowByCode(originCode);
    window.close();
    opener.parent.location.reload();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  makeSelectRange("year", 2020, 2024, 2020);
  makeSelectRange("month", 1, 12, 1);
  updateDayOptions("year", "month", "day", 1);

  document.getElementById("year").addEventListener("change", () => {
    updateDayOptions("year", "month", "day");
  });
  document.getElementById("month").addEventListener("change", () => {
    updateDayOptions("year", "month", "day");
  });
});
