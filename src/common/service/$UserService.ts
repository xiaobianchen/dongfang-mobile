import AjaxUtils from "@core/http";
import { bean } from "@core/ioc";

@bean($UserService)
export class $UserService {

	public getUserInfo = () => {
		return AjaxUtils.post('/mobile/consult/loadUserInfo', {})
	};

	public uploadFile = (params) => {
		return AjaxUtils.post("/image/mobile/upload", params);
	};

	public updateInfo=(params)=>{
		return AjaxUtils.post('/mobile/book/order/saveUser',params);
	}
}