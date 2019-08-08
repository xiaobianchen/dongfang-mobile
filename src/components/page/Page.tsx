import { $Theme } from "@common/bean/$Theme";
import CRMIcon from "@components/icon/CRMIcon";
import { autowired } from "@core/ioc";
import { goToPath } from "@helper/RouteHelper";
import { Paths, RoutePaths } from "@routers/const";
import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

export interface IPageProps {
	showBottom?: boolean;
	location?: any;
}

@observer
class Page extends React.Component<IPageProps, any> {

	public static defaultProps = {
		showBottom: false
	};

	@autowired($Theme)
	public $theme: $Theme;

	constructor(props) {
		super(props);
		this.state = {};
	}

	public goHome = () => {
		goToPath(this.props, RoutePaths[Paths.INDEX])
	};

	public goMemberCenter = () => {
		goToPath(this.props, RoutePaths[Paths.USER_CENTER])
	};

	public render() {
		const { showBottom } = this.props;
		const pathname = this.props.location.pathname;
		const isIndex = pathname === RoutePaths[Paths.INDEX];
		const isCenter = pathname === RoutePaths[Paths.USER_CENTER];
		return (
			<SPage>
				{this.props.children}
				{
					showBottom && <SBottom>
              <SItem theme={{ ...this.$theme.theme, selected: isIndex }}
                     onClick={() => !isIndex && this.goHome()}
              >
                  <CRMIcon icon={isIndex ? "icon-home-o" : "icon-home"}/>
                  首页
              </SItem>
              <SItem theme={{ ...this.$theme.theme, selected: isCenter }}
                     onClick={() => !isCenter && this.goMemberCenter()}
              >
                  <CRMIcon icon={isCenter ? "icon-user-o" : "icon-user"}/>
                  个人中心
              </SItem>
          </SBottom>
				}
			</SPage>
		);
	}
}

export default withRouter(Page);

const SPage = styled.div`// styled
  & {
    position: relative;
    display: flex;
    height: 100vh;
    flex-direction: column;
    > div:nth-child(1) {
      flex: 1;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
`;

const SBottom = styled.div`// styled
  & {
    position: relative;
    display: flex;
    margin-top: 0.24rem;
    height: 0.98rem;
    border-top: 0.02rem solid rgba(187, 187, 187, 1);
  }
`;

const SItem = styled.div`// styled
  & {
    flex: 1;
    flex-direction: column;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.24rem;
    color: ${props => props.theme.selected ? props.theme.themeColor : 'rgba(102, 102, 102, 1)'};
    line-height: 0.34rem;
    > i {
      font-size: 0.36rem;
      margin-bottom: 0.04rem;
    }
  }
`;