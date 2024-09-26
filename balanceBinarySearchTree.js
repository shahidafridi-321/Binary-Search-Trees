function Node(data) {
	return {
		data,
		left: null,
		right: null,
	};
}

function Tree(array) {
	let root = buildTree(array, 0, array.length - 1);
	return {
		root,
	};
}
