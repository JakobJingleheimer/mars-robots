const generateSimpleKey = (): string => Math
	.random()
	.toString(16)
	.substr(2, 5);

export default generateSimpleKey;
