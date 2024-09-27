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
	return balancedBinarySearchTree(array, 0, array.length - 1);
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
let data1 = [1, 2, 3, 4];
let data2 = [];
let tree = buildTree(data1);

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

/* function insert(root, value) {
	if (root === null) return Node(value);
	if (value > root.data) {
		root.right = insert(root.right, value);
	} else if (value <= root.data) {
		root.left = insert(root.left, value);
	}
	return root;
} */

// Using iterating approach
function insert(root, value) {
	if (root === null) return Node(value);
	let parent = null;
	let currentRoot = root;
	while (currentRoot !== null) {
		parent = currentRoot;
		if (currentRoot.data > value) currentRoot = currentRoot.left;
		else if (currentRoot.data < value) currentRoot = currentRoot.right;
		else return root;
	}
	if (parent.data < value) parent.right = Node(value);
	else parent.left = Node(value);
	return root;
}

insert(tree, 5);
insert(tree, 33);
insert(tree, 13);
prettyPrint(tree);
