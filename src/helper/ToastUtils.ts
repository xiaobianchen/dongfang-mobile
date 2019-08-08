import { Toast } from 'antd-mobile';

export const ToastHide = () => {
	Toast.hide();
};

export const ToastLoading = (msg = '加载中…') => {
	Toast.hide();
	Toast.loading(msg, 0);
};

export const ToastError = (msg = '网络故障', onClose?) => {
	Toast.hide();
	Toast.info(msg, 2, onClose);
};

export const ToastSuccess = (msg, onClose?) => {
	Toast.hide();
	Toast.success(msg, 2, onClose);
};

export const ToastInfo = (msg, onClose?) => {
	Toast.hide();
	Toast.info(msg, 2, onClose);
};
