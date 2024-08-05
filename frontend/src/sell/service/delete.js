export const deleteSellDataApi = {
  delteRowByCode: (targetCode) => {
    const sell_item_data = JSON.parse(localStorage.getItem("sell_item_data"));

    for (let i = 0; i < sell_item_data.length; i++) {
      const { code } = sell_item_data[i];
      if (code !== targetCode) continue;
      sell_item_data.splice(i, 1);
    }
    localStorage.setItem("sell_item_data", JSON.stringify(sell_item_data));
  },
};
