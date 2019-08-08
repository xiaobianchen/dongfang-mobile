import { previewImages } from "@helper/WeChatUtils";
import React from "react";
import styled from "styled-components";

interface IPreviewProps {
	urls: string[];
}

class ImagePreview extends React.Component<IPreviewProps, any> {

	public onPreview = (urls, index) => {
		previewImages(urls, index);
	};

	public render() {
		const { urls } = this.props;
		let length = urls.length % 4;
		length = length > 0 ? length : 0;
		const block = [];
		for (let i = 0; i < 4 - length; i++) {
			block.push(i);
		}
		return (
			<SPreview>
				{
					urls.map((item, index) => <div key={index} onClick={this.onPreview.bind(this, urls, index)}>
						<div style={{ backgroundImage: `url(${item})` }}/>
					</div>)
				}
				{
					block.map((item, index) => <div key={`block${index}i`}>
						<div/>
					</div>)
				}
			</SPreview>
		);
	}
}

export default ImagePreview;

const SPreview = styled.div`// styled
  & {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    > div {
      flex-basis: 23%;
      position: relative;
      margin-right: 2%;
      margin-bottom: 8px;
      box-sizing: border-box;
      > div {
        position: absolute;
        top: 50%;
        display: flex;
        transform: translateY(-50%);
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        background-size: cover;
        background-position: center;
      }
      &::after {
        display: block;
        content: ' ';
        padding-bottom: 100%;
      }
    }
    > div:nth-child(4n) {
      margin-right: 0;
    }
  }
`;
