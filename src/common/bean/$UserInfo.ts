import { bean } from "@core/ioc";
import { $BaseEntity } from "@core/ioc/$BaseEntity";
import { observable } from "mobx";

@bean($UserInfo)
export class $UserInfo extends $BaseEntity {
	@observable
	public id: number;
	@observable
	public customerId: number;
	@observable
	public openId: string;
	@observable
	public account: string;
	@observable
	public nickName: string;
	@observable
	public name: string;
	@observable
	public sex: number;
	@observable
	public mobile: string;
	@observable
	public type: number;
	@observable
	public source:number;
	@observable
	public birthday: number;
	@observable
	public status: number;
	@observable
	public imagePath: string;
}