import MessageHelper from "@core/msg";
import axios from "axios";

const isProd = process.env.NODE_ENV !== 'development';

let BASE_URL = "";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(
	(config: any) => {
		MessageHelper.loading('加载中……');
		return config;
	},
	err => {
		MessageHelper.hide();
		return Promise.reject(err);
	}
);

let timeOut;

axiosInstance.interceptors.response.use(
	response => {
		if (timeOut) {
			clearTimeout(timeOut);
		}
		timeOut = setTimeout(() => {
			MessageHelper.hide();
		}, 500);
		return response;
	},
	error => {
		MessageHelper.hide();
		return Promise.reject(error);
	}
);

const AjaxUtils = {
	get: (url: string, params: any) => {
		return new Promise((resolve, reject) => {
			axiosInstance.get(`${url}`, { params }).then((response) => {
				resolve(response.data);
			}).catch((err) => {
				reject(err);
			});
		});
	},
	post: (url: string, params: any) => {
		return new Promise((resolve, reject) => {
			axiosInstance.post(`${url}`, params).then((response) => {
				resolve(response.data);
			}).catch((err) => {
				reject(err);
			});
		});
	},
};

export default AjaxUtils;