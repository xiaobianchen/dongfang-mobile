import { $Order } from "@common/bean/$Order";
import { $Product } from "@common/bean/$Product";
import { $OrderService } from "@common/service/$OrderService";
import { resultHelper } from "@core/http/helper";
import { autowired, bean } from "@core/ioc";
import MessageHelper from "@core/msg";
import { ListView } from "antd-mobile";
import { action, computed, observable } from "mobx";

@bean($OrderListMV)
export class $OrderListMV {

	@autowired($OrderService)
	public $orderService: $OrderService;

	@observable
	public dataSource = new ListView.DataSource({
		getRowData: (dataBlob, sectionID) => dataBlob[sectionID],
		getSectionHeaderData: (dataBlob, sectionID, rowID) => dataBlob[rowID],
		rowHasChanged: (row1, row2) => row1 !== row2,
		sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
	});

	@observable
	public dataSourceProducts = new ListView.DataSource({
		getRowData: (dataBlob, sectionID) => dataBlob[sectionID],
		getSectionHeaderData: (dataBlob, sectionID, rowID) => dataBlob[rowID],
		rowHasChanged: (row1, row2) => row1 !== row2,
		sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
	});

	@observable
	public list: $Order[] = [];

	@observable
	public listProduct: $Product[] = [];

	@observable
	public index = 0;

	@observable
	public showStatus = null;

	@observable
	public remarkVisible: boolean = false;

	@observable
	public overVisible: boolean = false;

	@observable
	public remarkValue: string = '';

	@observable
	public orderRemarkValue: string = '';

	@computed
	public get isOver() {
		return this.listProduct.filter(item => !item.status).length === 0;
	}

	@computed
	public get noData() {
		return this.list.length === 0;
	}

	@observable
	public orderRemarkVisible: boolean = false;

	@observable
	public orderItem: $Order = null;

	@action
	public setRemarkVisible = (remarkVisible) => {
		this.remarkVisible = remarkVisible;
		this.remarkValue = '';
	};


	@action
	public setOrderRemarkVisible = (orderRemarkVisible, item) => {
		this.orderRemarkVisible = orderRemarkVisible;
		this.orderItem = item;
		this.orderRemarkValue = item && item.remark || '';
	};

	@action
	public setOrderRemarkValue = (orderRemarkValue) => {
		this.orderRemarkValue = orderRemarkValue;
	};

	@action
	public setOrderItemRemarkValue = (callback?) => {
		if (!this.orderRemarkValue) {
			MessageHelper.show('请填写备注信息');
			return;
		}
		this.$orderService.updateOrderRemark({
			id: this.orderItem.id,
			remark: this.orderRemarkValue
		}).then(resultHelper)
			.then(data => {
				this.orderRemarkVisible = false;
				this.queryOrders({})
			})
	};

	@action
	public setOverVisible = (overVisible) => {
		this.overVisible = overVisible;
	};

	@action
	public setIndex = (index) => {
		this.index = index;
	};

	@action
	public setRemarkValue = (remarkValue) => {
		this.remarkValue = remarkValue;
	};

	@action
	public setItemRemarkValue = (isCustom,callback?) => {
		if (!this.remarkValue) {
			MessageHelper.show('请填写备注信息');
			return;
		}
		const item = this.listProduct[this.index];
		this.$orderService.saveOrderProduct({
			...item,
			remark: this.remarkValue
		}).then(resultHelper)
			.then(data => {
				this.listProduct[this.index].remark = this.remarkValue;
				this.remarkVisible = false;
				this.remarkValue = '';
				this.dataSourceProducts = this.dataSourceProducts.cloneWithRows([]);
				this.dataSourceProducts = this.dataSourceProducts.cloneWithRows(this.listProduct);
			})
	};

	@action
	public updatePicture = (index, imagePathShow, callback?) => {
		const item = this.listProduct[index];
		this.$orderService.saveOrderProduct({
			...item,
			imagePathShow: imagePathShow || []
		}).then(resultHelper)
			.then(data => {
				this.listProduct[this.index].imagePathShow = imagePathShow || [];
				this.dataSourceProducts = this.dataSourceProducts.cloneWithRows([]);
				this.dataSourceProducts = this.dataSourceProducts.cloneWithRows(this.listProduct);
			})
	};

	@action
	public queryOrders = (params) => {
		this.$orderService.queryOrderList(params)
			.then(resultHelper)
			.then(data => {
				this.list = data;
				this.dataSource = this.dataSource.cloneWithRows(this.list);
			})
	};

	@action
	public setShowStatus = (showStatus, callback?) => {
		this.showStatus = showStatus;
		callback && callback();
	};

	@action
	public queryOrderDetails = (params) => {
		this.$orderService.queryOrderDetails(params)
			.then(resultHelper)
			.then((data: $Product[]) => {
				this.listProduct = data.map(item => {
					if (!item.status) {
						item.showMore = true;
					}
					return item;
				});

				this.dataSourceProducts = this.dataSourceProducts.cloneWithRows(this.listProduct);
			})
	};

	@action
	public onShowMore = (index) => {
		this.listProduct[index].showMore = !this.listProduct[index].showMore;
		this.dataSourceProducts = this.dataSourceProducts.cloneWithRows(this.listProduct);
	};

	@action
	public overItem = (index, callback?) => {
		const item = this.listProduct[index];
		this.$orderService.updateOrderStatus({ id: item.id, status: 1 })
			.then(res => resultHelper(res, true))
			.then(data => {
				this.listProduct[index].status = 1;
				this.listProduct[index].showMore = false;
				this.dataSourceProducts = this.dataSourceProducts.cloneWithRows([]);
				this.dataSourceProducts = this.dataSourceProducts.cloneWithRows(this.listProduct);
				callback && callback();
				if (this.isOver) {
					this.setOverVisible(true)
				}
			});
	};

	@action
	public overOrder = (params, callback?) => {
		this.$orderService.updateOrderStatus(params)
			.then(res => resultHelper(res, true))
			.then(data => {
				this.setOverVisible(false);
				this.dataSourceProducts = this.dataSourceProducts.cloneWithRows([]);
				this.dataSourceProducts = this.dataSourceProducts.cloneWithRows(this.listProduct);
			})
	}

}