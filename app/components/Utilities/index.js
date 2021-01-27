/* eslint-disable no-param-reassign */
import { Fragment as Wrapper } from 'react';
// import traverse from 'traverse';
import isEqual from 'lodash/isEqual';
import entries from 'lodash/entries';
import isNumber from 'lodash/isNumber';
import isStringANumber from 'is-string-a-number';
import isString from 'lodash/isString';
import keys from 'lodash/keys';

export const isEmpty = obj => {
  if (typeof obj === 'number') return false;
  if (typeof obj === 'string') return obj.length === 0;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object')
    return (
      obj == null ||
      (Object.keys(obj).length === 0 && obj.constructor === Object)
    );
  if (typeof obj === 'boolean') return false;
  return !obj;
};
export const exportableData = (exportables, sortedData) => {
  if (isEmpty(sortedData)) return null;
  return sortedData.map(item => {
    const preparedItem = {};
    entries(item)
      // eslint-disable-next-line no-unused-vars
      .filter(([key, value]) => exportables.includes(key))
      .sort(
        (pair1, pair2) =>
          exportables.indexOf(pair1[0]) - exportables.indexOf(pair2[0]),
      )
      .forEach(([key, value]) => {
        preparedItem[key] = value;
      });
    return preparedItem;
  });
};

export const scrubPhoneMask = data => {
  if (data) {
    return data.replace(/\D/g, '');
  }
  return data;
};
export const notEmpty = x => !isEmpty(x);
export const addElements = (elements, data) =>
  new Promise(resolve =>
    resolve(
      data.map(item => ({
        ...item,
        ...elements,
      })),
    ),
  );
const colComparator = (a, b, desc) => {
  a = a || '';
  b = b || '';
  if (isNumber(a) && isNumber(b)) {
    return desc > 0 ? a - b : b - a;
  }
  if (isStringANumber(a) && isStringANumber(b)) {
    return desc > 0
      ? parseInt(a, 10) - parseInt(b, 10)
      : parseInt(b, 10) - parseInt(a, 10);
  }
  if (isString(a) && isString(b)) {
    return desc > 0 ? a.localeCompare(b) : b.localeCompare(a);
  }
  a = isNumber(a) ? a.toString() : a;
  b = isNumber(b) ? b.toString() : b;
  return desc > 0 ? a.localeCompare(b) : b.localeCompare(a);
};

export const ColumnSorter = (item1, item2, col, desc) => {
  const a = item1[col];
  const b = item2[col];
  const res = colComparator(a, b, desc);
  return res;
};
export const sortTableData = ({ orderby }, data) => {
  const [col, dir] = orderby.split(' ');
  const desc = dir ? -1 : 1;
  return new Promise(resolve =>
    resolve(data.sort((item1, item2) => ColumnSorter(item1, item2, col, desc))),
  );
};

export const searchTableData = ({ filter = '' }, data, searchables) => {
  let filtered = data;
  const searchFor = filter.toLowerCase();
  if (!isEmpty(filtered) && !isEmpty(searchFor) && !isEmpty(searchables)) {
    filtered = filtered.filter(
      item =>
        entries(item).filter(
          ([k, v]) =>
            searchables.includes(k) &&
            (v || '')
              .toString()
              .toLowerCase()
              .indexOf(searchFor) >= 0,
        ).length > 0,
    );
  }
  if (isEmpty(filtered)) filtered = [{}];
  return new Promise(resolve => resolve(filtered));
};
export const serializise = source => {
  const cloned = {};
  keys(source).forEach(key => {
    if (typeof source[key] !== 'function' && typeof source[key] !== 'object')
      cloned[key] = source[key];
  });
  return cloned;
};

export { keys, isEqual, Wrapper };
