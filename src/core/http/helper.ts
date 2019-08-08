import MessageHelper from '@core/msg';
import { RESPONSE_CODE } from 'core/http/const';
import { isEmpty } from 'lodash';

export const resultHelper = (res, toastSuccess?) => {
	const { code, msg, data } = res;
	if (code === RESPONSE_CODE.SUCCESS) {
		if (toastSuccess) {
			MessageHelper.show(msg);
		}
		return Promise.resolve(data);
	} else {
		if (!isEmpty(msg)) {
			MessageHelper.show(msg);
		}
		return Promise.reject(res);
	}
};