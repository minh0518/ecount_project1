export const getSearchDataApi = {
  getDataLength: (searchCode, searchName) => {
    const item_data = JSON.parse(localStorage.getItem('item_data'));
    const queryData = [];
    for (let { code, name } of item_data) {
      if ((searchCode === '' || searchCode === code) && (searchName === '' || searchName === name)) {
        queryData.push({ code, name });
      }
    }
    return queryData.length;
  },
  getDataList: (searchCode, searchName, startOffset, endOffset) => {
    // fetch 변경 예정
    const item_data = JSON.parse(localStorage.getItem('item_data'));

    // searchCode: "P100003,P100004,P100005"
    if (searchCode === '' && searchName === '') {
      return item_data.slice(startOffset, endOffset);
    }

    const searchCodeArr = searchCode.split(',');
    const queryData = [];
    for (let { code, name } of item_data) {
      if ((searchCode === '' || searchCodeArr.includes(code)) && (searchName === '' || searchName === name)) {
        queryData.push({ code, name });
      }
    }
    return queryData.slice(startOffset, endOffset);
  },

  getSearchList: (searchCode, searchName) => {
    // fetch 변경 예정
    const item_data = JSON.parse(localStorage.getItem('item_data'));
    const response = [];
    for (let { code, name } of item_data) {
      if (code === searchCode && name === searchName) {
        response.push({ code, name });
      }
    }
    return response;
  },
};
