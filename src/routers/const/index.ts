export const BASE_PATH = '/mobile';

export enum Paths {
	INDEX = 0,
	USER_CENTER = 1,
	ORDER_LIST = 2,
	ORDER_DETAILS = 3,
}

export const RoutePaths = {
	[Paths.INDEX]: `${BASE_PATH}/index`,
	[Paths.USER_CENTER]: `${BASE_PATH}/user/center`,
	[Paths.ORDER_LIST]: `${BASE_PATH}/order/list`,
	[Paths.ORDER_DETAILS]: `${BASE_PATH}/order/details`,
};
