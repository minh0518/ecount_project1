
export const postSellDataApi = {
  /**
   * 
   * @param {Date} date - 신규 판매 품목 날짜
   * @param {string} codeInput - 신규 판매 품목 코드
   * @param {string} nameInput - 신규 판매 품목 이름
   * @param {number} quantityInput - 신규 판매 품목 수량
   * @param {number} priceInput - 신규 판매 품목 가격
   * @param {string} descriptionInput - 신규 판매 품목 적요
   * @return null
   */
  postNewData: (
    date,
    codeInput,
    nameInput,
    quantityInput,
    priceInput,
    descriptionInput
  ) => {
    const sell_item_data = JSON.parse(localStorage.getItem("sell_item_data"));
    sell_item_data.push({
      date, // 어차피 직렬화 하면 ISO로 바뀜
      code: codeInput,
      number: Math.floor(Math.random() * 100) + 1,
      name: nameInput,
      quantity: quantityInput,
      price: priceInput,
      description: descriptionInput,
    });

    localStorage.setItem("sell_item_data", JSON.stringify(sell_item_data));
  },
};
