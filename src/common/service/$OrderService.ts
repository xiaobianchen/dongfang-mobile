import AjaxUtils from "@core/http";
import { bean } from "@core/ioc";

@bean($OrderService)
export class $OrderService {

	public queryOrderList = (params = {}) => {
		return AjaxUtils.post('/mobile/sendOrder/queryByCustomerIdAndUserId', params)
	};

	public queryOrderDetails = (params) => {
		return AjaxUtils.post('/mobile/sendOrder/queryAllProduct', params);
	};

	public updateOrderStatus = (params) => {
		return AjaxUtils.post('/mobile/sendOrder/updatePurchaseStatusBySendOrderId', params);
	};

	public saveOrderProduct = (params) => {
		return AjaxUtils.post('/mobile/sendOrder/purchaseOrder/save', params);
	};

	public updateOrderRemark = (params) => {
		return AjaxUtils.post('/mobile/sendOrder/updateRemark', params);
	};

}