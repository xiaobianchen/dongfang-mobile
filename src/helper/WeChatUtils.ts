const wx = require('weixin-js-sdk');
/**
 * 图片预览
 * @param urls
 * @param index
 */
export const previewImages = (urls = [], index = 0) => {
	wx.previewImage({
		current: urls[index], // 当前显示图片的http链接
		urls // 需要预览的图片http链接列表
	});
};

/**
 * 跳到小程序支付页面
 * @param params
 * @constructor
 */
export const NavigateToPay = (params = {}) => {
	let query = `?`;
	const keys = Object.keys(params);
	keys.forEach(key => {
		query += `${key}=${params[key]}&`
	});
	wx.miniProgram.navigateTo({ url: `../pages/pay${query}` })
};