import { $UserInfoMV } from "@common/mv/$UserInfoMV";
import PortraitNotice from '@components/notice/PortraitNotice';
import { autowired } from "@core/ioc";
import { observer } from "mobx-react";
import * as React from 'react';
import { withRouter } from 'react-router';

@observer
class App extends React.Component<any, any> {

	@autowired($UserInfoMV)
	public $userInfoMV: $UserInfoMV;

	constructor(props) {
		super(props);
		this.state = {
			isPortrait: true,
		};
	}

	public componentDidMount() {
		this.$userInfoMV.getUserInfo();
		const isPortrait = (window.orientation || 0) === 0;
		if (!isPortrait) {
			this.setState({ isPortrait });
		}
		window.addEventListener(
			'orientationchange',
			() => {
				const isPortrait = window.orientation === 0;
				this.setState({ isPortrait });
			},
			false
		);
	}

	public render() {
		const { isPortrait } = this.state;
		const { $userInfo } = this.$userInfoMV;
		return (
			<div>
				{isPortrait && !!$userInfo && this.props.children}
				{!isPortrait && <PortraitNotice/>}
			</div>
		);
	}
}

export default withRouter(App);
