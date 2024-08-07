import { getDateStringByDate } from "../../../utils/date.js";
import { deleteSellDataApi } from "../../service/delete.js";
import { getSellDataApi } from "../../service/get.js";
import { patchSellDataApi } from "../../service/patch.js";
import { postSellDataApi } from "../../service/post.js";

const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");


// 추가
if (mode === "new") {
  const searchButton = document.querySelector(".searchButton");

  searchButton.addEventListener("click", () => {
    window.open(
      `../../../product/view/search/productSearch.html?code=none&from=add`,
      "_blank",
      "width=1200,height=500"
    );
  });

  const saveButton = document.querySelector(".save");
  saveButton.addEventListener("click", () => {
    const date = document.getElementById('date').value
    const quantityInput = document.querySelector(".quantityInput").value;
    const priceInput = document.querySelector(".priceInput").value;
    const descriptionInput = document.querySelector(".descriptionInput").value;
    const [codeInput, nameInput] = document
      .querySelector(".codeInput")
      .value.split(",");

    postSellDataApi.postNewData(
      new Date(date),
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

// 수정 모드
if (mode === "edit") {
  const code = params.get("code");


  const title = document.querySelector('.title')
  title.innerText = '■ 판매 수정'


  // code기반 데이터 기존 조회
  let { date = new Date(date), description, name, number, price, quantity } =
    getSellDataApi.getSingleDataByCode(code);
  const originDateStr = getDateStringByDate(date)

  // 기존 데이터 입력
  document.getElementById('date').value = originDateStr
  document.getElementById('date').disabled = true
  document.querySelector(".numberInput").disabled = true;
  document.querySelector(".quantityInput").value = quantity;
  document.querySelector(".priceInput").value = price;
  document.querySelector(".descriptionInput").value = description;
  document.querySelector(".codeInput").value = `${code},${name}`;
  document.querySelector(".codeInput").disabled = true;
  document.querySelector(".searchButton").disabled = true;
  document.querySelector(".numberInput").value = number;

  // 검색하기 버튼
  // const searchButton = document.querySelector(".searchButton");
  // searchButton.addEventListener("click", () => {
  //   const codeInput = document.querySelector(".codeInput").value;
  //   window.open(
  //     `../../../product/view/search/productSearch.html?code=${codeInput.length ? codeInput : "none"
  //     }&from=add`,
  //     "_blank",
  //     "width=1200,height=500"
  //   );
  // });

  // 다시 작성 버튼
  const rewriteButton = document.querySelector(".rewrite");
  rewriteButton.addEventListener("click", () => {
    document.getElementById('date').value = originDateStr;
    document.querySelector(".codeInput").value = `${code},${name}`;
    document.querySelector(".quantityInput").value = quantity;
    document.querySelector(".priceInput").value = price;
    document.querySelector(".descriptionInput").value = description;
    document.querySelector(".numberInput").value = number;
  });

  // 저장 버튼
  const saveButton = document.querySelector(".save");
  saveButton.addEventListener("click", () => {
    const date = document.getElementById('date').value
    const quantityInput = document.querySelector(".quantityInput").value;
    const priceInput = document.querySelector(".priceInput").value;
    const descriptionInput = document.querySelector(".descriptionInput").value;
    const [_, nameInput] = document
      .querySelector(".codeInput")
      .value.split(",");
    const numberInput = document.querySelector(".numberInput").value;

    patchSellDataApi.editRowByCode(
      code,
      new Date(date),
      Number(numberInput),
      nameInput,
      Number(quantityInput),
      Number(priceInput),
      descriptionInput
    );
    window.close();
    opener.parent.location.reload();
  });

  // 삭제 버튼
  const deleteButton = document.querySelector(".delete");
  deleteButton.addEventListener("click", () => {
    deleteSellDataApi.delteRowByCode(originCode);
    window.close();
    opener.parent.location.reload();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const date = document.getElementById('date')
  date.max = getDateStringByDate(new Date())
});
