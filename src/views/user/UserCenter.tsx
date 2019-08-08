import { $Theme } from "@common/bean/$Theme";
import { $UserInfoMV } from "@common/mv/$UserInfoMV";
import { $UserService } from "@common/service/$UserService";
import Upload from "@components/file/Upload";
import Page from "@components/page/Page";
import { RegConst } from "@core/form";
import { resultHelper } from "@core/http/helper";
import { autowired } from "@core/ioc";
import MessageHelper from "@core/msg";
import { setDocumentTitle } from "@helper/Helper";
import { goToPath } from "@helper/RouteHelper";
import { Paths, RoutePaths } from "@routers/const";
import { DatePicker, InputItem, List, Picker } from "antd-mobile";
import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

const sexMap = {
	[1]: '男',
	[2]: '女'
};

const sexData = [{
	label: '男',
	value: 1
}, {
	label: '女',
	value: 2
}];

@observer
class UserCenter extends React.Component<any, any> {

	@autowired($UserInfoMV)
	public $userInfoMV: $UserInfoMV = new $UserInfoMV();

	@autowired($Theme)
	public $theme: $Theme;

	@autowired($UserService)
	public $userService: $UserService;

	constructor(props) {
		super(props);
		this.state = {};
	}

	public componentDidMount() {
		setDocumentTitle('个人信息');
		this.$userInfoMV.getUserInfo();
	}

	public onImageChange = (value) => {
		const flag = value && value.length === 1;
		this.$userInfoMV.$userInfo.imagePath = flag ? value[0] : ''
	};

	public onNameChange = (value) => {
		this.$userInfoMV.$userInfo.name = value;
	};

	public onMobileChange = (value) => {
		this.$userInfoMV.$userInfo.mobile = value;
	};

	public onSexChange = (value) => {
		this.$userInfoMV.$userInfo.sex = value && value[0];
	};

	public onDateChange = (value) => {
		this.$userInfoMV.$userInfo.birthday = value && value.valueOf();
	};

	public onSubmit = () => {
		const { imagePath, name, mobile, sex, birthday } = this.$userInfoMV.$userInfo;
		if (!imagePath) {
			MessageHelper.show('请上传头像信息');
			return;
		}
		if (!name) {
			MessageHelper.show('请填写姓名');
			return;
		}
		if (!mobile) {
			MessageHelper.show('请填写手机号');
			return;
		}
		if (!RegConst.REG_MOBILE.test(mobile)) {
			MessageHelper.show('请填写正确的手机号');
			return;
		}
		const query = this.props.location.query;
		this.$userService.updateInfo(this.$userInfoMV.$userInfo)
			.then(res => resultHelper(res, true))
			.then(() => goToPath(this.props, RoutePaths[Paths.INDEX], query, true, true))
	};

	public render() {
		const { $userInfo } = this.$userInfoMV;
		return (
			$userInfo ? <Page>
				<SMain>
					<SInfo>
						<div style={{ paddingTop: '0.2rem' }}>
							头像
							<Upload value={$userInfo.imagePath && [$userInfo.imagePath]}
											onChange={this.onImageChange}
											maxCount={1}/>
						</div>
						<div>
							姓名
							<InputItem value={$userInfo.name}
												 onChange={this.onNameChange}
												 maxLength={20}/>
						</div>
						<div>
							手机号
							<InputItem value={$userInfo.mobile}
												 maxLength={11}
												 onChange={this.onMobileChange}
												 type={"number"}/>
						</div>
						<div style={{ paddingRight: 0 }}>
							性别
							<Picker extra="请选择"
											data={sexData}
											title="请选择"
											cols={1}
											onOk={this.onSexChange}
											value={$userInfo.sex && [$userInfo.sex]}
							>
								<List.Item arrow="horizontal"/>
							</Picker>
						</div>
						<div style={{ paddingRight: 0 }}>
							生日
							<DatePicker extra="请选择"
													title="请选择"
													mode={"date"}
													onOk={this.onDateChange}
													value={$userInfo.birthday && new Date($userInfo.birthday)}
							>
								<List.Item arrow="horizontal"/>
							</DatePicker>
						</div>
					</SInfo>
					<SFooter theme={this.$theme.theme}
									 onClick={this.onSubmit}>更新信息</SFooter>
				</SMain>
			</Page> : null
		);
	}
}

export default withRouter(UserCenter);

const SMain = styled.div`// styled
  & {
    position: relative;
    display: flex;
    flex-direction: column;
  }
`;

const SInfo = styled.div`// styled
  & {
    background: white;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    > div {
      text-align: right;
      font-size: 0.3rem;
      border-bottom: 0.01rem solid rgba(221, 221, 221, 1);
      min-height: 0.4rem;
      padding: 0.02rem 0.3rem 0.02rem 0.6rem;
      color: rgba(51, 51, 51, 1);
      line-height: 0.42rem;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > div {
        flex: 1;
      }
      > img {
        width: 1.36rem;
        height: 1.36rem;
        border-radius: 50%;
      }
      .am-image-picker-list {
        width: 1.36rem;
        height: 1.36rem;
        margin-bottom: 0;
        float: right;
        .am-flexbox {
          margin-bottom: 0;
          .am-flexbox-item:not(:first-child) {
            margin-right: 0;
            display: none;
          }
        }
        .am-image-picker-item-content {
          border-radius: 50%;
        }
      }
      .am-list-extra {
        flex: 1;
        font-size: 0.3rem !important;
        color: rgba(51, 51, 51, 1) !important;
      }
      input {
        text-align: right;
        font-size: 0.3rem !important;
      }
    }
  }
`;

const SFooter = styled.div`// styled
  & {
    position: relative;
    //bottom: 0;
    //left: 0;
    //right: 0;
		height: 49px;
		line-height: 49px;
    font-size:15px;
    font-weight:500;
		text-align: center;
    color:rgba(255,255,255,1);
		background-color: ${props => props.theme.themeColor};
  }
`;
