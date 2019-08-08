import moment from 'moment';
import {FORMAT_BIRTHDAY, FORMAT_DATE, FORMAT_DATETIME, FORMAT_TIME, FORMAT_TIMESTAMP} from "./const";

export const getDateString = (date: any) => {
    return moment(date).format(FORMAT_DATE);
};

export const getDateTimeString = (date: any) => {
    return moment(date).format(FORMAT_DATETIME);
};

export const getBirthdayString = (date: any) => {
    return moment(date).format(FORMAT_BIRTHDAY);
};

export const getTimeString = (date: any) => {
    return moment(date).format(FORMAT_TIME);
};

export const getTimestamp = (date: any) => {
    return parseInt(moment(date).format(FORMAT_TIMESTAMP), 10);
};

export const getCustomStr = (date: any, format: string) => {
    return moment(date).format(format);
};