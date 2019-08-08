import { getTimestamp } from "@helper/DateHelper";
import { ToastInfo } from "./ToastUtils";

/**
 * 处理表单错误信息
 * @param error
 * @constructor
 */
export const ToastFormError = (error: any) => {
	let keys = Object.keys(error);
	ToastInfo(error[keys[0]].errors[0].message);
};

/**
 * 转换表单原始值
 * @param formData
 * @param {any} date
 * @param {any} array
 */
export const convertFormData = (formData = {}, { date = [], array = [] }: any) => {
	const keys = Object.keys(formData);
	const newFormData = {};
	keys.forEach(key => {
		if (date.indexOf(key) !== -1) {
			newFormData[key] = formData[key] && getTimestamp(formData[key]);
		} else if (array.indexOf(key) !== -1 && formData[key].length > 0) {
			newFormData[key] = formData[key] && formData[key][0];
		} else {
			newFormData[key] = formData[key];
		}
	});
	return newFormData;
};
