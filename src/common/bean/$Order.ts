import { bean } from "@core/ioc";
import { $BaseEntity } from "@core/ioc/$BaseEntity";
import { observable } from "mobx";

@bean($Order)
export class $Order extends $BaseEntity {
	@observable
	public id: number;
	@observable
	public orderNumber: string;
	@observable
	public creator: string;
	@observable
	public status: number;
	@observable
	public userId: number;
	@observable
	public receiver: number;
	@observable
	public remark: string;
	@observable
	public createTime: number;
	@observable
	public updateTime: number;
	@observable
	public customerId: number;
}