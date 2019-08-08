import moment from 'moment';

export const FORMAT_DATE = 'YYYY-MM-DD';
export const FORMAT_TIMESTAMP = 'x';
export const FORMAT_DATETIME = 'YYYY-MM-DD HH:mm:ss';
export const FORMAT_TIME = 'HH:mm:ss';

export const getDateString = (date: any) => {
	return moment(date).format(FORMAT_DATE);
};

export const getDateTimeString = (date: any) => {
	return moment(date).format(FORMAT_DATETIME);
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