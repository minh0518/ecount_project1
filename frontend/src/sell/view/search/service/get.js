import { item_data } from '../../../data/data.js';

export const getSearchDataApi = {
  getSearchList: (startOffset, endOffset) => {
    // fetch 변경 예정
    const response = item_data.slice(startOffset, endOffset);
    return response;
  },
};
