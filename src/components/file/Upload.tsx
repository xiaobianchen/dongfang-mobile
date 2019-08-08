import { $UserService } from "@common/service/$UserService";
import { resultHelper } from "@core/http/helper";
import { autowired } from "@core/ioc";
import MessageHelper from "@core/msg";
import { previewImages } from "@helper/WeChatUtils";
import { ImagePicker } from "antd-mobile";
import { ImagePickerPropTypes } from "antd-mobile/lib/image-picker";
import React from "react";
import styled from "styled-components";

export interface ImageProps extends ImagePickerPropTypes {
	value?: any;
	maxCount?: number;
	onChange?: any;
}

class Upload extends React.Component<ImageProps, any> {

	protected static defaultProps = {
		maxCount: 8
	};

	@autowired($UserService)
	public $userService: $UserService;

	constructor(props) {
		super(props);
		this.state = {
			files: [],
			value: props.value || []
		};
	}

	public componentDidMount() {
		const { value = [] } = this.state;
		if (value.length > 0) {
			const files = value.map((item, index) => {
				return {
					url: item,
					responseUrl: item,
					id: String(index)
				}
			});
			this.setState({ files })
		}
	}

	public componentWillReceiveProps(nextProps) {
		const { value = [] } = this.state;
		console.log(nextProps);
		if (nextProps.value && nextProps.value !== value) {
			if (nextProps.value.length > 0 && value.length === 0) {
				const files = nextProps.value.map((item, index) => {
					return {
						url: item,
						responseUrl: item,
						id: String(index)
					}
				});
				this.setState({ files, value: nextProps.value })
			}
		} else if (nextProps.value && nextProps.value.length === 0) {
			this.setState({ files: [], value: [] })
		} else if (!nextProps.value) {
			this.setState({ files: [], value: [] })
		}
	}

	public uploadImage = (file: any) => {
		const formData = new FormData();
		formData.append('file', file.file);
		this.$userService.uploadFile(formData)
			.then(resultHelper)
			.then((res: any) => this.addFile(file, res.url))
			.catch(() => {
				MessageHelper.show('图片上传失败');
				const value = this.state.value || [];
				const files = value.map((item, index) => {
					return {
						url: item,
						responseUrl: item,
						id: String(index)
					}
				});
				this.setState({ files, value })

				this.props.onChange(value)
			})
	};

	public changeToProps = (files) => {
		const { onChange } = this.props;
		const value = files.map(item => item.responseUrl);
		this.setState({
			files, value
		}, () => {
			onChange && onChange(value.length > 0 ? value : undefined);
		});
	};

	public addFile = (file, url) => {
		const { files } = this.state;
		file.responseUrl = url;
		files[files.length - 1] = file;
		this.changeToProps(files);
	};

	public onChange = (files, type, index) => {
		if (type === 'add') {
			this.setState({ files }, () => this.uploadImage(files[files.length - 1]));
		} else {
			this.changeToProps(files);
		}
	};

	public onPreview = (index, fs) => {
		const urls = fs.map(item => item.responseUrl).filter(item => item);
		if (urls[index]) {
			previewImages(urls, index);
		}
	};

	public render() {
		const { files } = this.state;
		const { maxCount } = this.props;
		return (
			<SDiv>
				<ImagePicker
					files={files}
					onChange={this.onChange}
					onImageClick={(index, fs) => this.onPreview(index, fs)}
					selectable={files.length < maxCount}
					accept="image/*"
				/>
			</SDiv>
		);
	}
}

export default Upload;

const SDiv = styled.div`// styled
  & {
    position: relative;
    .am-image-picker-list {
      padding: 0;
    }
  }
`;