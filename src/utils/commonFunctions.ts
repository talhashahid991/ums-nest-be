import { isEmpty, isEqual } from 'lodash';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

export const addStandardParameters = (user: any, item: any): any => {
  item = {
    ...item,
    dmlUserId: user?.userId,
  };
  return item;
};

export const stringValidation = (stringName: string): boolean => {
  let check = true;
  if (!stringName && !isEmpty(stringName) && !isEqual(stringName, '')) {
    check = false;
  }
  return check;
};

export const formatDate = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const date = dayjs().get('date');
  const month = dayjs().get('month') + 1;
  const year = dayjs().get('year');
  const hours = dayjs().get('hour');
  const minutes = dayjs().get('minute');
  const seconds = dayjs().get('second');

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};
