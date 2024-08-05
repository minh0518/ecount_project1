export const patchSellDataApi = {
  editRowByCode: (
    originCode,
    date,
    codeInput,
    numberInput,
    nameInput,
    quantityInput,
    priceInput,
    descriptionInput
  ) => {
    const sell_item_data = JSON.parse(localStorage.getItem("sell_item_data"));
    for (let i = 0; i < sell_item_data.length; i++) {
      const { code } = sell_item_data[i];
      if (code !== originCode) continue;

      sell_item_data[i] = {
        date: date.toISOString(),
        code: codeInput,
        number: numberInput,
        name: nameInput,
        quantity: quantityInput,
        price: priceInput,
        description: descriptionInput,
      };

      console.log(sell_item_data);
      break;
    }

    localStorage.setItem("sell_item_data", JSON.stringify(sell_item_data));
  },
};
