import React from "react";

export interface ICRMIconProps {
	icon: string;
	style?: React.CSSProperties;
	onClick?: any;
}

class CRMIcon extends React.Component<ICRMIconProps, any> {

	constructor(props) {
		super(props);
		this.state = {};
	}

	public render() {
		const { icon, style, onClick } = this.props;
		return (
			<i className={`iconfont ${icon}`}
				 onClick={onClick}
				 style={style}/>
		);
	}
}

export default CRMIcon;
