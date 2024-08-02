import { item_data } from "../../data/data.js";
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector(".tbody");

  const totalCount = item_data.length;
  const pageCount =
    totalCount % 10 === 0
      ? Math.floor(totalCount / 10)
      : Math.floor(totalCount / 10) + 1;
  let pageNumber = 1;

  while (pageNumber <= pageCount) {
    const startIndex = (pageNumber - 1) * 10;
    const endIndex = startIndex + 10;

    const pageButtons = document.createElement("button");
    pageButtons.textContent = pageNumber;
    pageButtons.addEventListener("click", () => {
      const currentPageData = item_data.slice(startIndex, endIndex);
    });

    pageNumber += 1;
  }

  //   그룹웨어 업무관리
  //   worknew

  for (let { code, name } of item_data) {
    const newTr = document.createElement("tr");

    const checkboxTd = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkboxTd.appendChild(checkbox);
    newTr.appendChild(checkboxTd);

    const codeTd = document.createElement("td");
    codeTd.textContent = code;
    newTr.appendChild(codeTd);

    const nameTd = document.createElement("td");
    nameTd.textContent = name;
    newTr.appendChild(nameTd);

    const editTd = document.createElement("td");
    const button = document.createElement("button");
    button.innerText = "수정";
    editTd.appendChild(button);
    newTr.appendChild(editTd);

    tbody.appendChild(newTr);
  }
});
