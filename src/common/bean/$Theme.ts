import { bean } from "@core/ioc";
import { observable } from "mobx";

@bean($Theme)
export class $Theme {

	@observable
	public theme: {
		themeColor: string;
		noticeColor: string;
	} = {
		themeColor: '#108ee9',
		noticeColor: '#ff7c7c'
	};

}