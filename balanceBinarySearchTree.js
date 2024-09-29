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

function findInorderSuccessor(node) {
	if (node.left !== null) {
		node = node.left;
	}
	return node;
}

function deleteItem(root, value) {
	if (root === null) return root;

	if (root.data > value) {
		root.left = deleteItem(root.left, value);
	} else if (root.data < value) {
		root.right = deleteItem(root.right, value);
	} else {
		if (root.left === null) return root.right;
		else if (root.right === null) return root.left;

		let temp = findInorderSuccessor(root.right);
		root.data = temp.data;

		root.right = deleteItem(root.right, temp.data);
	}
	return root;
}

let data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let data1 = [50, 30, 70, 20, 40, 60, 80];
let data2 = [];
let tree = buildTree(data1);

/* insert(tree, 5);
insert(tree, 33);
insert(tree, 13);*/
let res = deleteItem(tree, 30);
prettyPrint(tree);
