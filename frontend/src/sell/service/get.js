export const getSellDataApi = {
  getDataLength: () => {
    const sell_item_data = JSON.parse(localStorage.getItem("sell_item_data"));
    return sell_item_data.length;
  },

  /**
   * 
   * @param {number} startOffset - 현재 페이지 데이터 시작인덱스
   * @param {number} endOffset - 현재 페이지 데이터 끝인덱스
   * @param {Date} startDate - 전표 일자 시작 날짜
   * @param {Date} endDate - 전표 일자 끝 날짜
   * @param {string[]} codeResult - 선택된 품목 ex) ['P100003','P100005','P100004']
   * @returns 현재 페이지 데이터
   */
  getDataList: (startOffset, endOffset, startDate, endDate, codeResult) => {

    const sell_item_data = JSON.parse(localStorage.getItem("sell_item_data"));

    // 완전 최초 상황에는 전체를 전부 보여주기 위해
    // 날짜와 품목코드가 없어도 전부 선택
    const filteredData = sell_item_data.filter((item) => {
      const itemDate = new Date(item.date)
      const isInRange = startDate === '' || itemDate >= startDate && endDate === '' || itemDate <= endDate;
      const isInCodeResult =
        codeResult.length === 0 || codeResult.includes(item.code);
      return isInRange && isInCodeResult;
    });

    return {
      data: filteredData.slice(startOffset, endOffset),
      length: filteredData.length,
    };
  },

  getSingleDataByCode: (targetCode) => {
    const sell_item_data = JSON.parse(localStorage.getItem("sell_item_data"));
    for (let data of sell_item_data) {
      if (data.code === targetCode) return data;
    }
  },
};
