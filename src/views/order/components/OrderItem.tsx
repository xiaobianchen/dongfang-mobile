import { $Order } from "@common/bean/$Order";
import { $Theme } from "@common/bean/$Theme";
import { autowired } from "@core/ioc";
import { getDateString, getDateTimeString } from "@helper/DateHelper";
import { Icon } from "antd-mobile";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

export interface OrderItemProps {
	item?: $Order;
	onItemClick?: any;
	onRemarkClick?: any;
}

enum Status {
	ing = 0, // 配货中
	over = 1 // 完成
}

export const StatusMap = {
	[Status.ing]: '配货中',
	[Status.over]: '已完成',
};

@observer
class OrderItem extends React.Component<OrderItemProps, any> {

	@autowired($Theme)
	public $theme: $Theme;

	constructor(props) {
		super(props);
		this.state = {};
	}

	public render() {
		const { item, onItemClick, onRemarkClick } = this.props;
		const color = !!item.status ? this.$theme.theme.themeColor : this.$theme.theme.noticeColor;
		return (
			<SItem theme={{ color }} onClick={onItemClick}>
				<div>
					<div>单号:{item.orderNumber}</div>
					<div>{StatusMap[item.status]}</div>
				</div>
				<div>
					<div><span>配货人：</span>
						<div>{item.creator}</div>
					</div>
					<div><span>收货人：</span>
						<div>{item.receiver}</div>
					</div>
					<div><span>备&#12288;注：</span>
						<div>{item.remark}</div>
					</div>
					<div>
						<div>创建日期:{getDateString(item.createTime)}</div>
						<div>更新时间:{getDateTimeString(item.createTime)}</div>
					</div>
				</div>
				<div>
					查看详情
					<Icon type={'right'}/>
				</div>
				<div className="remark" onClick={e => {
					e.stopPropagation();
					onRemarkClick();
				}}>+备注
				</div>
			</SItem>
		);
	}
}

export default OrderItem;

const SItem = styled.div`// styled
  & {
    position: relative;
    margin: 15px;
    background:rgba(255,255,255,1);
		box-shadow:0px 0px 10px 0px rgba(10,10,10,0.1);
		border-radius:8px;
    > div:nth-child(1) {
      padding: 14px 15px;
      border-radius:8px 8px 0px 0px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #DDDDDD;
			
      justify-content: space-between;
      > div:nth-child(1) {
        height: 21px;
        border-left:4px solid ${props => props.theme.color};
        font-size: 15px;
        padding-left: 6px;
        font-weight: 400;
        color:rgba(51,51,51,1);
        line-height: 21px;
        word-break: break-all;
        overflow: hidden;
      }
      >div:nth-child(2){
      	//background:rgba(255,255,255,1);
      	font-size:12px;
				font-weight:400;
				//background-color: ${props => props.theme.color};
				color:${props => props.theme.color};
				border-radius: 4px;
				padding: 2px 8px;
				min-width: 3em;
				text-align: center;
				height: 17px;
				line-height:17px;
      }
    }
    > div:nth-child(2){
    	position: relative;
    	padding: 15px;
    	border-bottom: 1px solid #DDDDDD;
    	>div{
					position: relative;
					display: flex;
					align-items: flex-start;
					min-height:18px;
					font-size:13px;
					font-weight:300;
					color:rgba(51,51,51,1);
					line-height:18px;
					>span{
						min-width: 4em;
					}
					>div{
						color:${props => props.theme.color};
					}
				}
			>div:not(:last-child){
				margin-bottom: 8px;
			}
			> div:nth-child(4){
				position: relative;
				display: flex;
				background: white;
				flex-wrap: wrap;
				align-items: center;
				font-size:12px;
				font-weight:300;
				line-height:17px;
				justify-content: space-between;
				>div{
						color:rgba(102,102,102,1);
				}
    	}
    }
    > div:nth-child(3){
    	position: relative;
    	padding: 11px 15px;
    	display: flex;
    	background: white;
    	border-radius:0px 0px 8px 8px;
    	align-items: center;
    	height:18px;
			font-size:13px;
			font-weight:300;
			color:rgba(51,51,51,1);
			line-height:18px;
			justify-content: space-between;
    }
     >.remark{
    	position: absolute;
    	right: 20px;
    	top: 72px;
    	background-color: ${props => props.theme.color};
    	color: white;
    	padding: 4px 8px;
    	border-radius: 8px;
    }
  }
`;
