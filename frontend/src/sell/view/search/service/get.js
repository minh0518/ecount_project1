import { item_data } from '../../../data/data.js';

export const getSearchDataApi = {
  getDataLength: (searchCode, searchName) => {
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

    if (searchCode === '' && searchName === '') {
      return item_data.slice(startOffset, endOffset);
    }

    const queryData = [];
    for (let { code, name } of item_data) {
      if ((searchCode === '' || searchCode === code) && (searchName === '' || searchName === name)) {
        queryData.push({ code, name });
      }
    }
    return queryData.slice(startOffset, endOffset);
  },

  getSearchList: (searchCode, searchName) => {
    // fetch 변경 예정
    const response = [];
    for (let { code, name } of item_data) {
      if (code === searchCode && name === searchName) {
        response.push({ code, name });
      }
    }
    return response;
  },
};
