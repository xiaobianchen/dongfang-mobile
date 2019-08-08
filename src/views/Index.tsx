import { $Theme } from "@common/bean/$Theme";
import { $UserInfoMV } from "@common/mv/$UserInfoMV";
import Page from "@components/page/Page";
import UserImage from "@components/user/UserImage";
import { autowired } from "@core/ioc";
import { getAssetPath, setDocumentTitle } from "@helper/Helper";
import { goToPath } from "@helper/RouteHelper";
import { Paths, RoutePaths } from "@routers/const";
import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

const items = [
	{
		"functionEntryName": "我的订单",
		"code": "orderList",
		"linkedUrl": RoutePaths[Paths.ORDER_LIST],
		"oid": 369087208,
		"functionEntryIconUrl": "http://wsctest.witpos.cn/group1/M00/02/AF/wKhmIluPk32AWHiFAAAw06Z5DrA554.png"
	}
];

@observer
class Index extends React.Component<any, any> {

	@autowired($UserInfoMV)
	public $userInfoMV: $UserInfoMV;

	@autowired($Theme)
	public $theme: $Theme;

	constructor(props) {
		super(props);
		this.state = {};
	}

	public componentDidMount() {
		setDocumentTitle("个人中心");
	}

	public renderHeader = () => {
		const { $userInfo } = this.$userInfoMV;
		return $userInfo && <SHeader theme={this.$theme.theme}>
        <div>
            <UserImage src={$userInfo.imagePath}
                       onClick={() => goToPath(this.props, RoutePaths[Paths.USER_CENTER])}/>
            <div>{$userInfo.name}</div>
        </div>
    </SHeader>
	};

	public renderFuncItem = (items) => {
		return items.map((item, index) =>
			<SFuncItem key={item.oid}
								 onClick={this.onItemClick.bind(this, item)}
								 theme={this.$theme.theme}>
				<img src={item.functionEntryIconUrl} alt=""/>
				<div>{item.functionEntryName}</div>
			</SFuncItem>);
	};

	public onItemClick = (item) => {
		// window.location.href = item.linkedUrl;
		const query = this.props.location.query;
		goToPath(this.props, item.linkedUrl, query)
	};

	public render() {
		return (
			<Page showBottom={false}>
				<SPage>
					{this.renderHeader()}
					<List>
						{
							this.renderFuncItem(items)
						}
					</List>
				</SPage>
			</Page>
		);
	}
}

export default withRouter(Index);

const SPage = styled.div`// styled
  & {
    position: relative;
  }
`;

const SHeader = styled.div`// styled
  & {
    position: relative;
		background-image: url(${getAssetPath('header.png')});
		background-size: 100% 100%;
		height: 3.2rem;
		background-color: ${props => props.theme.themeColor};
    > div:nth-child(1) {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0.42rem 0.52rem;
      > img {
        width: 1.36rem;
        height: 1.36rem;
        background: white;
        min-width: 1.36rem;
        border-radius: 50%;
        border: 0.04rem solid white;
        margin-right: 0.42rem;
        box-shadow: 0 0.04rem 0.12rem 0 rgba(0,0,0,0.10);
      }
      > div {
        flex: 1;
        font-size: 0.32rem;
        color: white;
      }
    } 
  }
`;

const List = styled.div`// styled
  & {
    position: relative;
    margin: 0.98rem 0.3rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 0 0.2rem 0 rgba(10, 10, 10, 0.11);
    border-radius: 0.16rem;
    display: flex;
  }
`;

const SFuncItem = styled.div`// styled
  & {
    flex-basis: 25%;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.3rem;
    margin-bottom: 0.3rem;
    position: relative;
    > img {
      width: 0.96rem;
      height: .96rem;
      border-radius: .16rem;
    }
    > div:nth-child(2) {
      height: .34rem;
      font-size: .24rem;
      margin-top: .16rem;
      color: rgba(39, 38, 43, 1);
      line-height: .34rem;
    }
    > i {
      position: absolute;
      right: 0.08rem;
      top: -0.16rem;
      font-size: 0.32rem;
			color: ${props => props.theme.themeColor};
    }
  }
`;

