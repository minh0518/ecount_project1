export const patchSellDataApi = {
  /**
   * 판매 조회 목록 수정 메소드. 수정 불가한 항목이라도 전부 param으로 넘겨줘야함
   * @param {string} targetCode - 수정할 판매 품목의 코드
   * @param {Date} date - 기존 판매 품목 날짜 
   * @param {number} numberInput - 기존 전표번호 수량
   * @param {string} nameInput - 기존 판매 품목 이름
   * @param {number} quantityInput - 수정한 수량
   * @param {number priceInput - 수정한 가격
   * @param {string} descriptionInput - 수정한 적요
   * @return null
   */
  editRowByCode: (
    targetCode,
    date,
    numberInput,
    nameInput,
    quantityInput,
    priceInput,
    descriptionInput
  ) => {
    const newData = {
      code,
      date: date,
      number: numberInput,
      name: nameInput,
      quantity: quantityInput,
      price: priceInput,
      description: descriptionInput,
    }
    const sell_item_data = JSON.parse(localStorage.getItem("sell_item_data"));
    for (let i = 0; i < sell_item_data.length; i++) {
      const { code } = sell_item_data[i];
      if (code !== targetCode) continue;
      sell_item_data[i] = { ...newData };
      break;
    }

    localStorage.setItem("sell_item_data", JSON.stringify(sell_item_data));
  },
};
