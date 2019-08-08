const RegConst = {
	checkReg: (reg: RegExp, value: any) => {
		return reg.test(value);
	},

	checkRegPort: (port: number) => {
		const pattern = /^(\d)+$/g;
		if (RegConst.checkReg(pattern, port)) {
			return port <= 65535 && port >= 0
		} else {
			return false;
		}
	},

	checkRegIP: (ip: any) => {
		const reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
		if (RegConst.checkReg(reSpaceCheck, ip)) {
			ip.match(reSpaceCheck);
			return parseInt(RegExp.$1) <= 255 && parseInt(RegExp.$1) >= 0
				&& parseInt(RegExp.$2) <= 255 && parseInt(RegExp.$2) >= 0
				&& parseInt(RegExp.$3) <= 255 && parseInt(RegExp.$3) >= 0
				&& parseInt(RegExp.$4) <= 255 && parseInt(RegExp.$4) >= 0;
		} else {
			return false;
		}
	},
	REG_INTEGER: /^-?[0-9]\d*$/,
	REG_TWO_FRACTION: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
	REG_NOT_ZERO_TWO_BITS_INTEGER: /^([1-9]\d*)(\.\d{1,2})?$/,
	REG_MOBILE: /^1[3456789]\d{9}$/,
	REG_DISCOUNT: /^0.[0-9]{1,2}$/,
	REG_POSITIVE_INTEGER: /^[0-9]\d*$/,
	REG_NOT_ZERO_POSITIVE_INTEGER: /^[1-9]\d*$/,
	REG_TWO_BITS_POSITIVE_INTEGER: /^[1-9]{1}[0-9]{0,1}$/,
	REG_POSTAL_CODE: /^[1-9]{1}[0-9]{5}$/,
	REG_TEL: /^([0-9]{3,4}-)?[0-9]{7,8}$|^400-([0-9]{4}-)[0-9]{3}$/,
	REG_TEL_MOBILE: /^([0-9]{3,4}-)?[0-9]{7,8}$|^1[3456789]\d{9}$|^400-([0-9]{4}-)[0-9]{3}$/,
	REG_EMAIL: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
	REG_URL: /^(((https|http|ftp|rtsp|mms):\/\/)?)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
};

export default RegConst;