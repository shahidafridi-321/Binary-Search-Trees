function Node(data) {
	return {
		data,
		left: null,
		right: null,
	};
}

function Tree(array) {
	let root = buildTree(array);
	return {
		root,
	};
}

function buildTree(array) {
	array.sort((a, b) => a - b);
	array = removeDuplicates(array);
	let balancedBinaryTree = balancedBinarySearchTree(array, 0, array.length - 1);
	return balancedBinaryTree;
}

function balancedBinarySearchTree(arr, start, end) {
	if (start > end) return null;
	let mid = Math.floor((start + end) / 2);

	let node = Node(arr[mid]);
	node.left = balancedBinarySearchTree(arr, start, mid - 1);
	node.right = balancedBinarySearchTree(arr, mid + 1, end);

	return node;
}

function removeDuplicates(array) {
	let newArray = [];
	array = array.forEach((element) => {
		if (!newArray.includes(element)) {
			newArray.push(element);
		}
	});
	return newArray;
}

let data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let node = buildTree(data);

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};
// prettyPrint(node);
