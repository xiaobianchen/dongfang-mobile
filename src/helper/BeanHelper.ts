import { forIn } from "lodash";

// attribute map : {[targetKey]: [custom source key]}
// eg. map class A {a: 1, b: 2} to class B {b, c}  expect: a -> c, B {b: 2, c: 1}
// attributeMap is { "c": "a" }
export function beanMapper(source: any, target: any, attributeMap?: Map<string, string>) {
	const sourceObj: any = { ...source };
	forIn(sourceObj, (value, key) => {
		const sourceKey = key;
		let targetKey = key;
		if (attributeMap) {
			attributeMap.forEach((aValue, aKey) => {
				if (aValue === sourceKey) {
					targetKey = aKey;
				}
			});
		}
		if (sourceKey in source) {
			target[targetKey] = source[sourceKey];
		}
	});
	return target;
}
