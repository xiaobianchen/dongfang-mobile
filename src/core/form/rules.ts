import RegConst from './reg';

const FormRule = {
	RULE_REQUIRED: {
		required: true,
		message: '必填'
	},
	RULE_INTEGER: {
		pattern: RegConst.REG_INTEGER,
		message: '只能填写整数'
	},
	RULE_POSITIVE_INTEGER: {
		pattern: RegConst.REG_POSITIVE_INTEGER,
		message: '只能填写零或正整数'
	},
	RULE_NOT_ZERO_POSITIVE_INTEGER: {
		pattern: RegConst.REG_NOT_ZERO_POSITIVE_INTEGER,
		message: '只能填写正整数'
	},
	RULE_TWO_BITS_POSITIVE_INTEGER: {
		pattern: RegConst.REG_TWO_BITS_POSITIVE_INTEGER,
		message: '最多两位正整数'
	},
	RULE_TWO_BITS_DECIMALS: {
		pattern: RegConst.REG_TWO_FRACTION,
		message: '最多两位小数'
	},
	RULE_NOT_ZERO_TWO_BITS_INTEGER: {
		pattern: RegConst.REG_NOT_ZERO_TWO_BITS_INTEGER,
		message: '只能填写大于零并且最多两位小数'
	},
	RULE_PHONE: {
		pattern: RegConst.REG_MOBILE,
		message: '请填写正确的手机号'
	},
	RULE_TEL_MOBILE: {
		pattern: RegConst.REG_TEL_MOBILE,
		message: '请填写正确的号码'
	},
	RULE_TEL: {
		pattern: RegConst.REG_TEL,
		message: '请填写正确电话号码'
	},
	RULE_DISCOUNT: {
		pattern: RegConst.REG_DISCOUNT,
		message: '请填写正确的折扣'
	},
	RULE_POSTAL_CODE: {
		pattern: RegConst.REG_POSTAL_CODE,
		message: '请填写正确的邮政编码'
	},
	RULE_EMAIL: {
		pattern: RegConst.REG_EMAIL,
		message: '请填写正确的邮箱'
	},
	RULE_URL: {
		pattern: RegConst.REG_URL,
		message: '请填写正确的网址'
	},
	RULE_MAX: (ct: number) => {
		return {
			max: ct, message: `最多可填写${ct}个字符`
		}
	},
	RULE_N_BITS_POSITIVE_INTEGER: (n: number) => {
		return {
			pattern: new RegExp(`^[1-9]{1}[0-9]{0,${n - 1}}$`),
			message: `最多${n}位正整数`
		}
	},
	RULE_REQUIRED_MSG: (msg: string) => {
		return {required: true, message: msg}
	},
};

export default FormRule;
