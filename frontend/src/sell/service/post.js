export const postSellDataApi = {
  postNewData: (
    date,
    productInput,
    quantityInput,
    priceInput,
    descriptionInput
  ) => {
    const sell_item_data = JSON.parse(localStorage.getItem("sell_item_data"));
    sell_item_data.push({
      date,
      name: "품목1",
      count: 4,
      price: 4000,
      description: "테스트",
    });
  },
};
