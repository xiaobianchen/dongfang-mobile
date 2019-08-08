import { $UserInfo } from "@common/bean/$UserInfo";
import { RoleType } from "@common/enum/RoleType";
import { $UserService } from "@common/service/$UserService";
import { resultHelper } from "@core/http/helper";
import { autowired, bean } from "@core/ioc";
import { action, computed, observable } from "mobx";

@bean($UserInfoMV)
export class $UserInfoMV {

	@autowired($UserService)
	public $userService: $UserService;

	@observable
	public $userInfo: $UserInfo = null;

	@action
	public getUserInfo = () => {
		if (this.$userInfo) {
			return;
		}
		this.$userService.getUserInfo()
			.then(resultHelper)
			.then(data => this.$userInfo = data)
	};

	@computed
	public get isEmployee() {
		return this.$userInfo && this.$userInfo.source === RoleType.employee
	}

	@computed
	public get isManage() {
		return this.$userInfo && this.$userInfo.source === RoleType.admin
	}

	@computed
	public get isCustom() {
		return this.$userInfo && this.$userInfo.source === RoleType.custom
	}
}