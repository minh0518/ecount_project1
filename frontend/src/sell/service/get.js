export const getSellDataApi = {
  getDataLength: () => {
    const sell_item_data = JSON.parse(localStorage.getItem("sell_item_data"));
    return sell_item_data.length;
  },
  getDataList: (startOffset, endOffset, startDate, endDate, searchValues) => {
    // startDate : { startYear:2023, startMonth:4, startDay:2 }
    // endDate : { endYear:2024, endMonth:12, endDay:5 }
    // searchValues : ['P100003','P100005','P100004']

    const sell_item_data = JSON.parse(localStorage.getItem("sell_item_data"));
    // return sell_item_data.slice(startOffset, endOffset);

    const start = new Date(
      startDate.startYear,
      startDate.startMonth - 1,
      startDate.startDay
    );
    const end = new Date(endDate.endYear, endDate.endMonth - 1, endDate.endDay);

    const filteredData = sell_item_data.filter((item) => {
      const itemDate = new Date(item.date);
      const isInRange = itemDate >= start && itemDate <= end;
      const isInSearchValues =
        searchValues.length === 0 || searchValues.includes(item.code);

      return isInRange && isInSearchValues;
    });

    console.log(filteredData);
    return {
      data: filteredData.slice(startOffset, endOffset),
      length: filteredData.length,
    };
  },
};
