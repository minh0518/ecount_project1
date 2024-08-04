import { item_data } from '../../../data/data.js';

export const getSearchDataApi = {
  getDataList: (startOffset, endOffset) => {
    // fetch 변경 예정
    const response = item_data.slice(startOffset, endOffset);
    return response;
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
