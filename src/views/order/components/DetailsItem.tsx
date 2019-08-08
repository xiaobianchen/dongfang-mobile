import { $Product } from "@common/bean/$Product";
import { $Theme } from "@common/bean/$Theme";
import { $OrderListMV } from "@common/mv/$OrderListMV";
import { $UserInfoMV } from "@common/mv/$UserInfoMV";
import ImagePreview from "@components/file/ImagePreview";
import Upload from "@components/file/Upload";
import CRMIcon from "@components/icon/CRMIcon";
import { autowired } from "@core/ioc";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

export interface DetailsItemProps {
	item?: $Product;
	index?: any;
	onShowMore?: any;
	onItemRemark?: any;
	onItemOver?: any;
	onRefresh?: any;
}

enum Status {
	ing = 0, // 配货中
	over = 1 // 完成
}

@observer
class DetailsItem extends React.Component<DetailsItemProps, any> {

	@autowired($Theme)
	public $theme: $Theme;

	@autowired($UserInfoMV)
	public $userInfoMV: $UserInfoMV;

	@autowired($OrderListMV)
	public $orderListMV: $OrderListMV;

	constructor(props) {
		super(props);
		this.state = {};
	}

	public renderMore = () => {
		const { onShowMore, item } = this.props;
		return <div onClick={onShowMore}>{
			`${item.showMore ? '收起' : '详情'}`}
			<CRMIcon icon={item.showMore ? 'icon-up' : 'icon-down'}/>
		</div>;
	};

	public onChange = (values) => {
		const { item, index, onRefresh } = this.props;
		const { updatePicture } = this.$orderListMV;
		updatePicture(index, values, onRefresh)
	};

	public render() {
		const { item, onItemRemark, onItemOver } = this.props;
		const { isCustom, isEmployee, isManage } = this.$userInfoMV;
		const color = !!item.status ? this.$theme.theme.themeColor : this.$theme.theme.noticeColor;
		return (
			<SItem theme={{ color, showMore: !!item.showMore }}>
				<div>
					<div>
						{item.impa}
					</div>
					{
						this.renderMore()
					}
				</div>
				{
					!!item.showMore && <div>
              <div className={'item'}>Description：
                  <div>{item.description}</div>
              </div>
						{!isCustom && <div className={'item'}>UNIT：
                <div>{item.unit}</div>
            </div>}
						{
							!isCustom && <div className={'item'}>QTY：
                  <div>{item.qty}</div>
              </div>
						}
              <div className={'item'}>Remark：
                  <div>
										{item.remark}
										{
											!isCustom && <span onClick={onItemRemark} className="remark">+添加备注</span>
										}
                  </div>
              </div>
              <div className={'item'}>图片：</div>
						{
							!isCustom && <Upload maxCount={6}
                                   value={item.imagePathShow || []}
                                   onChange={this.onChange}/>
						}
						{
							isCustom && item.imagePath && <ImagePreview
                  urls={item.imagePath && [item.imagePath] || []}/>
						}
						{
							item.status === Status.ing && !isCustom && <div
                  className={'over'}
                  onClick={onItemOver}>完成</div>
						}
          </div>
				}
			</SItem>
		);
	}
}

export default DetailsItem;

const SItem = styled.div`// styled
  & {
    position: relative;
    margin: 15px;
    background:rgba(255,255,255,1);
		box-shadow:0px 0px 10px 0px rgba(10,10,10,0.1);
		border-radius:8px;
    > div:nth-child(1) {
      padding: 14px 15px;
      border-radius:${props => props.theme.showMore ? '8px 8px 0px 0px' : '8px'};
      display: flex;
      border-bottom: ${props => props.theme.showMore ? '1px' : '0px'} solid #DDDDDD;
      align-items: center;
      justify-content: space-between;
      > div:nth-child(1) {
        height: 21px;
        font-size: 15px;
        font-weight: 400;
        border-left:4px solid ${props => props.theme.color};
        padding-left: 6px;
        color: ${props => props.theme.color};
        line-height: 21px;
        >i{
        	margin-right: 4px;
        }
      }
      >div:nth-child(2){
      	// background:${props => props.theme.color};
      	font-size:12px;
				font-weight:400;
				color:${props => props.theme.color};
				border-radius: 4px;
				padding: 2px 8px;
				min-width: 3em;
				text-align: center;
				height: 17px;
				line-height:17px;
				>i{
					font-size: 10px;
				}
      }
    }
    > div:nth-child(2){
    	position: relative;
    	padding: 15px;
    	>div.item{
    		position: relative;
    		display: flex;
    		align-items: center;
    		height:18px;
				font-size:13px;
				font-weight:300;
				color:rgba(51,51,51,1);
				line-height:18px;
				>div{
					flex: 1;
					display: flex;
					justify-content: space-between;
					color:${props => props.theme.color};
					>span.remark{
						margin-left: 12px;
					}
				}
    	}
    	>div.over{
    		position: relative;
    		margin: 0 auto;
    		background-color:${props => props.theme.color};
    		color: white;
    		width: 160px;
    		height: 36px;
    		line-height: 36px;
    		text-align: center;
    		border-radius: 8px;
    	}
    	>div:not(:last-child){
    		margin-bottom: 8px;
    	}
    }
    > div:nth-child(3){
    	position: relative;
    	padding: 11px 15px;
    	display: flex;
    	background: white;
    	border-radius:0px 0px 8px 8px;
    	align-items: center;
    	height:17px;
			font-size:12px;
			font-weight:300;
			color:rgba(102,102,102,1);
			line-height:17px;
			justify-content: space-between;
    }
   
  }
`;
