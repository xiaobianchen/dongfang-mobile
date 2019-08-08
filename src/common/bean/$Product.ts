import { bean } from "@core/ioc";
import { $BaseEntity } from "@core/ioc/$BaseEntity";
import { observable } from "mobx";

@bean($Product)
export class $Product extends $BaseEntity {
	@observable
	public id: number;
	@observable
	public number: number;
	@observable
	public impa: string;
	@observable
	public description: string;
	@observable
	public remark: string;
	@observable
	public unit: string;
	@observable
	public qty: string;
	@observable
	public unitPrice: number;
	@observable
	public amount: number;
	@observable
	public imagePath: string;
	@observable
	public imagePathShow:string[];
	@observable
	public comment: string;
	@observable
	public sendOrderId: string;
	@observable
	public status: number;

	@observable
	public showMore:boolean;
}