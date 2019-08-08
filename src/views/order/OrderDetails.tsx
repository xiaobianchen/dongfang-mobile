import { $Theme } from "@common/bean/$Theme";
import { $OrderListMV } from "@common/mv/$OrderListMV";
import { $UserInfoMV } from "@common/mv/$UserInfoMV";
import Page from "@components/page/Page";
import { CRMTabs } from "@components/tabs/CRMTabs";
import { autowired } from "@core/ioc";
import { setDocumentTitle } from "@helper/Helper";
import { goToPath } from "@helper/RouteHelper";
import { Paths, RoutePaths } from "@routers/const";
import DetailsItem from "@views/order/components/DetailsItem";
import { ListView, Modal, Tabs, TextareaItem } from "antd-mobile";
import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

const tabs = [
	{ title: '全部', value: null },
	{ title: '配货中', value: 0 },
	{ title: '已完成', value: 1 }
];

@observer
class OrderDetails extends React.Component<any, any> {

	@autowired($OrderListMV)
	public $orderListMV: $OrderListMV;

	@autowired($UserInfoMV)
	public $userInfoMV: $UserInfoMV;

	@autowired($Theme)
	public $theme: $Theme;

	constructor(props) {
		super(props);
		this.state = {
			page: 0,
			showList:true
		};
	}

	public componentDidMount() {
		setDocumentTitle('订单详情');
		this.$orderListMV.showStatus = null;
		const { id } = this.props.location.query;
		this.$orderListMV.queryOrderDetails({ id })
	}

	public onTabClick = (tab, index) => {
		this.setState({ page: index });
		this.$orderListMV.setShowStatus(tab.value,this.refresh);
	};

	public refresh = () => {
		this.setState({ showList: false }, () => {
			this.setState({ showList: true })
		});
	};

	public onItemShowMore = (index) => {
		const { onShowMore } = this.$orderListMV;
		onShowMore(index);
	};

	public onItemRemark = (index) => {
		const { setRemarkVisible, setIndex } = this.$orderListMV;
		const { isCustom } = this.$userInfoMV;
		setIndex(index);
		setRemarkVisible(true)
	};

	public onItemOver = (index) => {
		const { overItem } = this.$orderListMV;
		overItem(index, this.refresh);
	};

	public over = () => {
		const { id } = this.props.location.query;
		const { overOrder } = this.$orderListMV;
		overOrder({ id, status: 1 }, this.back);
	};

	public back = () => {
		if (history.length > 1) {
			history.back();
		} else {
			goToPath(this.props, RoutePaths[Paths.ORDER_LIST], {})
		}
	};

	public render() {
		const {
			dataSourceProducts, setRemarkValue, remarkValue, overVisible, setOverVisible,
			remarkVisible, setItemRemarkValue, setRemarkVisible, showStatus
		} = this.$orderListMV;
		const { page, showList } = this.state;
		const { isCustom } = this.$userInfoMV;
		const row = (rowData, sectionID, rowID) => {
			const item = rowData[rowID];
			const { status } = item;
			const show = showStatus === null || status === showStatus;
			return (show && <DetailsItem item={item}
                                   onRefresh={this.refresh}
                                   index={rowID}
                                   onShowMore={this.onItemShowMore.bind(this, rowID)}
                                   onItemRemark={this.onItemRemark.bind(this, rowID)}
                                   onItemOver={this.onItemOver.bind(this, rowID)}
          />
			);
		};
		return (
			<Page>
				<SMain>
					<CRMTabs theme={{ themeColor: page === 1 ? this.$theme.theme.noticeColor : this.$theme.theme.themeColor }}>
						<Tabs tabs={tabs}
									onTabClick={this.onTabClick}
									page={page}

						/>
					</CRMTabs>
					{
						showList && <ListView
                dataSource={dataSourceProducts}
                renderFooter={() => null}
                renderRow={row}
                pageSize={10000}
                scrollRenderAheadDistance={500}
                onEndReachedThreshold={10}
            />
					}
					{!isCustom && false && <SFooter theme={this.$theme.theme}
                                          onClick={() => setOverVisible(true)}
          >完成配货</SFooter>}
				</SMain>
				<Modal
					visible={remarkVisible}
					transparent={true}
					maskClosable={false}
					onClose={null}
					title="添加备注"
					footer={[{
						text: '取消', onPress: () => setRemarkVisible(false)
					}, {
						text: '确认', onPress: () => setItemRemarkValue(isCustom)
					}]}
				>
					<TextareaItem
						autoHeight={true}
						placeholder={'请填写备注信息'}
						value={remarkValue}
						onChange={value => setRemarkValue(value)}
						labelNumber={5}
					/>
				</Modal>
				<Modal
					visible={false}
					transparent={true}
					maskClosable={false}
					onClose={null}
					title="配货完成"
					footer={[{
						text: '取消', onPress: () => setOverVisible(false)
					}, {
						text: '确认', onPress: () => this.back()
					}]}
				/>
			</Page>
		);
	}
}

export default withRouter(OrderDetails);

const SMain = styled.div`// styled
  & {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    > div:nth-child(2) {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
`;

const SFooter = styled.div`// styled
  & {
    position: relative;
		height: 49px;
		line-height: 49px;
    font-size:15px;
    font-weight:500;
		text-align: center;
    color:rgba(255,255,255,1);
		background-color: ${props => props.theme.themeColor};
  }
`;