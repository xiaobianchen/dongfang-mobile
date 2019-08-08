import { $Order } from "@common/bean/$Order";
import { $OrderListMV } from "@common/mv/$OrderListMV";
import { $UserInfoMV } from "@common/mv/$UserInfoMV";
import NoData from "@components/list/NoData";
import Page from "@components/page/Page";
import { autowired } from "@core/ioc";
import { setDocumentTitle } from "@helper/Helper";
import { goToPath } from "@helper/RouteHelper";
import { Paths, RoutePaths } from "@routers/const";
import OrderItem from "@views/order/components/OrderItem";
import { ListView, Modal, SearchBar, TextareaItem } from "antd-mobile";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

@observer
class OrderList extends React.Component<any, any> {

	@autowired($OrderListMV)
	public $orderListMV: $OrderListMV;

	@autowired($UserInfoMV)
	public $userInfoMV: $UserInfoMV;

	constructor(props) {
		super(props);
		this.state = {};
	}

	public componentDidMount() {
		setDocumentTitle('我的订单');
		this.$orderListMV.queryOrders({});
	}

	public goToDetails = (item: $Order) => {
		const query = this.props.location.query;
		goToPath(this.props, RoutePaths[Paths.ORDER_DETAILS], { ...query, id: item.id })
	};

	public onRemark = (item: $Order) => {
		this.$orderListMV.setOrderRemarkVisible(true, item);
	};

	public onSearch = () => {
		this.$orderListMV.queryOrders({});
	};

	public render() {
		const {
			dataSource, noData, orderRemarkValue, orderRemarkVisible,
			setOrderRemarkValue, setOrderRemarkVisible, setOrderItemRemarkValue
		} = this.$orderListMV;
		const { isManage } = this.$userInfoMV;
		const row = (rowData, sectionID, rowID) => {
			const item = rowData[rowID];
			return (
				<OrderItem item={item}
									 onRemarkClick={this.onRemark.bind(this, item)}
									 onItemClick={this.goToDetails.bind(this, item)}
				/>
			);
		};
		return (
			<Page>
				<SMain>
					{
						isManage && false && <STop>
                <SearchBar
                    placeholder={'输入公司名称进行查询'}
                    onSubmit={this.onSearch}
                    style={{ margin: '0.3rem', backgroundColor: 'transparent' }}
                />
            </STop>
					}
					<ListView
						dataSource={dataSource}
						renderFooter={() => null}
						renderRow={row}
						pageSize={10000}
						scrollRenderAheadDistance={500}
						onEndReachedThreshold={10}
					/>
					{
						noData && <NoData message={'暂无数据'}/>
					}
				</SMain>
				<Modal
					visible={orderRemarkVisible}
					transparent={true}
					maskClosable={false}
					onClose={null}
					title="添加备注"
					footer={[{
						text: '取消', onPress: () => setOrderRemarkVisible(false, null)
					}, {
						text: '确认', onPress: () => setOrderItemRemarkValue()
					}]}
				>
					<TextareaItem
						autoHeight={true}
						placeholder={'请填写备注信息'}
						value={orderRemarkValue}
						onChange={setOrderRemarkValue}
						labelNumber={5}
					/>
				</Modal>
			</Page>
		);
	}
}

export default OrderList;

const SMain = styled.div`// styled
  & {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    > div:last-child {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
`;

const STop = styled.div`// styled
  & {
    background: #F4F4F4;

    .am-search-input {
      height: 0.88rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0rem 0rem 0.12rem 0rem rgba(0, 0, 0, 0.05);
      border-radius: 0.47rem;

      .am-search-synthetic-ph {
        top: 50%;
        transform: translateY(-50%);
      }

      .am-search-clear {
        top: 50%;
        transform: translateY(-50%);
      }

      input[type='search'] {
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`;

