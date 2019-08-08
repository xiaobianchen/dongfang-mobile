import { getAssetPath } from "@helper/Helper";
import React from 'react'
import styled from "styled-components";

export interface INoDataProps {
	message: string;
}

const NoData = (props: INoDataProps) => {
	return <SNo>
		<img src={getAssetPath('no_data.png')} alt=""/>
		<div>{props.message}</div>
	</SNo>
};

export default NoData;

const SNo = styled.div`// styled
  & {
    position: relative;
    padding: 1.12rem;
		text-align: center;
    > img {
			display: block;
			margin: auto;
      width: 1.34rem;
    }
    > div {
      text-align: center;
      font-size: 0.28rem;
			margin-top: 0.2rem;
      line-height: 0.56rem;
      color: #666666;
    }
  }
`;