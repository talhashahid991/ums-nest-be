import { isEmpty, isEqual } from 'lodash';

export const addStandardParameters = (user: any, item: any): any => {
  item = {
    ...item,
    dmlUserId: user?.userId,
  };
  return item;
};

export const stringValidation = (stringName: string): boolean => {
  let check = false;
  if (!stringName && !isEmpty(stringName) && !isEqual(stringName, '')) {
    check = true;
  }
  return check;
};
