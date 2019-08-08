import React from "react";
import styled from "styled-components";

export const CRMTabs = (props) => {
	return <SCRMTabs theme={props.theme || {}}>
		{props.children}
	</SCRMTabs>
};

const SCRMTabs = styled.div`// styled
  & {
    position: relative;
    .am-tabs-default-bar-tab {
      height: 0.98rem;
      font-weight:300;
      color:rgba(102,102,102,1);
    }
		.am-tabs-default-bar-tab-active{
			font-weight: 400;
      color:${props => props.theme.themeColor};
		}
		.am-tabs-default-bar-underline{
			border: 0.02rem ${props => props.theme.themeColor} solid;
		}
  }
`;