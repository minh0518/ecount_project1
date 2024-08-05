export const postSellDataApi = {
  postNewData: (
    date,
    codeInput,
    nameInput,
    quantityInput,
    priceInput,
    descriptionInput
  ) => {
    const sell_item_data = JSON.parse(localStorage.getItem("sell_item_data"));
    console.log(sell_item_data);
    sell_item_data.push({
      date: date.toISOString(),
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
