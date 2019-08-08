import { Toast } from "antd-mobile";

enum MessageStatus {
	LOADING = 1,
	SHOW = 2,
	HIDE = 3
}

let messageStatus: MessageStatus = MessageStatus.HIDE;

const MessageHelper = {
	hide: () => {
		if (messageStatus !== MessageStatus.LOADING) {
			return;
		}
		messageStatus = MessageStatus.HIDE;
		Toast.hide();
	},
	show: (msg, onClose?) => {
		messageStatus = MessageStatus.SHOW;
		Toast.hide();
		Toast.info(msg, 2, onClose);
	},
	loading: (msg = '') => {
		if (messageStatus !== MessageStatus.HIDE) {
			return;
		}
		messageStatus = MessageStatus.LOADING;
		Toast.hide();
		Toast.loading(msg, 0);
	}
};

export default MessageHelper;