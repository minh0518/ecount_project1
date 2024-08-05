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

if (mode === "new") {
  const searchButton = document.querySelector(".searchButton");

  searchButton.addEventListener("click", () => {
    const codeInput = document.querySelector(".codeInput").value;

    window.open(
      `../../../product/view/search/productSearch.html?code=${
        codeInput.length ? codeInput : "none"
      }`,
      "modalWindow",
      "width=1200,height=500"
    );
  });

  const saveButton = document.querySelector(".save");
  const deleteButton = document.querySelector(".delete");
  const rewriteButton = document.querySelector(".rewrite");
  const closeButton = document.querySelector(".close");
  closeButton.addEventListener("click", () => {
    window.close();
  });
}
if (mode === "edit") {
  const product_date = params.get("date");
  const product_code = params.get("code");
  const product_name = params.get("name");
  const product_count = params.get("count");
  const product_price = params.get("price");
  const product_description = params.get("description");
}

document.addEventListener("DOMContentLoaded", () => {
  makeSelectRange("year", 2020, 2024, 2020);
  makeSelectRange("month", 1, 12, 1);
  updateDayOptions("year", "month", "day", 1);
});
