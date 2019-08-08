import { getAssetPath } from "@helper/Helper";
import React from "react";

export const userDefaultImage = getAssetPath('user-default.png');

class UserImage extends React.Component<any, any> {

	public render() {
		const { src, ...otherProps } = this.props;
		return (
			<img src={src || userDefaultImage} {...otherProps}/>
		);
	}
}

export default UserImage;
