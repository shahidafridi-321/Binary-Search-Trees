// Node factory for creating new nodes
function Node(data) {
	return {
		data,
		left: null,
		right: null,
	};
}

// Tree Factory creates tree of the given array
function Tree(array) {
	let tree = buildTree(array);
	return {
		tree,
	};
}

// takes array first sorts it, remove duplicates and returns a complete balance BST
function buildTree(array) {
	array.sort((a, b) => a - b);
	array = removeDuplicates(array);
	return balancedBinarySearchTree(array, 0, array.length - 1);
}

// creates BST of the given array (helper function to buildTree function)
function balancedBinarySearchTree(arr, start, end) {
	if (start > end) return null;
	let mid = Math.floor((start + end) / 2);

	let node = Node(arr[mid]);
	node.left = balancedBinarySearchTree(arr, start, mid - 1);
	node.right = balancedBinarySearchTree(arr, mid + 1, end);

	return node;
}

// Removes Duplicates of an array (helper function to buildTree function)
function removeDuplicates(array) {
	let newArray = [];
	array.forEach((element) => {
		if (!newArray.includes(element)) {
			newArray.push(element);
		}
	});
	return newArray;
}

// Visiualize the Tree
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

// Inserts value to the tree using recursive way
function insert(root, value) {
	//BASE CASE
	if (root === null) return Node(value); // if tree is empty create a ned node
	if (value > root.data) {
		root.right = insert(root.right, value); // if the value is greater than root value  insert in right sub-tree
	} else if (value <= root.data) {
		root.left = insert(root.left, value); // if the value is less than root value insert in left sub-tree
	}
	return root;
}

// Inserts value to the tree
// Using iterating approach
/* function insert(root, value) {
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
} */

// This function finds the smallest value in the right sub-tree and returns it
function findInorderSuccessor(node) {
	if (node.left !== null) {
		node = node.left;
	}
	return node;
}

// deletes item in a Tree
function deleteItem(root, value) {
	//BASE CASE
	if (root === null) return root; // if the root is empty, nothing to delete

	if (root.data > value) {
		root.left = deleteItem(root.left, value); // value less then root value delete in left sub-tree
	} else if (root.data < value) {
		root.right = deleteItem(root.right, value); // value greater then root value delete in right sub-tree
	} else {
		// having only single child or no child node
		if (root.left === null) return root.right; // if his only right child
		else if (root.right === null) return root.left; // if his only left child

		// if his both the children nodes  find the in-order successor
		// smallest value in the right sub-tree using findInorderSuccessor function
		let temp = findInorderSuccessor(root.right);

		//copy the value to the right sub-node
		root.data = temp.data;

		// delete the copied node
		root.right = deleteItem(root.right, temp.data);
	}
	return root;
}

// finds a given node in the given tree
function find(root, value) {
	//BASE CASE
	if (root == null) return root; // if tree is empty returns null/ value not found

	if (root.data > value) {
		root = find(root.left, value);
	} else if (root.data < value) {
		root = find(root.right, value);
	} else return root;

	return root;
}

// Treverse the Tree as Breadth-first
// Iterator way
function levelOrder(root, callBack) {
	if (typeof callBack !== "function") throw new Error("Callback is required"); // if no callback is provided throws error

	// BASE CASE
	if (root == null) return root; // in case the root is empty
	let queue = []; // initialize a queue

	queue.push(root); // add the input root to the queue
	while (queue.length !== 0) {
		// repeat until queue is empty
		let currentNode = queue[0]; // set current node to the first element in queue

		callBack(currentNode); // a callback function is called for the currentNode
		if (currentNode.left !== null) {
			queue.push(currentNode.left); // if currentNode left child exists add it to the queue
		}
		if (currentNode.right !== null) {
			queue.push(currentNode.right); //if currentNode right child exists add it to the queue
		}
		queue.shift(); // remove the visited/ read node
	}
}

// Trevese the tree in inOrder deep-first-search
function inOrder(root, callBack) {
	if (typeof callBack !== "function") throw new Error("callback is required"); // in case no callback is provided throws an error
	if (root == null) return; // BASE CASE if root is null return
	inOrder(root.left, callBack); // in inorder,go in left sub-tree
	callBack(root); // call callback for root node node
	inOrder(root.right, callBack); // go in right sub-tree
}

// Treverse the tree in preOrder DFS

function preOrder(root, callBack) {
	if (typeof callBack !== "function") throw new Error("Callback is required");
	// BASE CASE
	if (root == null) return;

	// Treverse the tree in preorder DFS
	callBack(root);
	preOrder(root.left, callBack);
	preOrder(root.right, callBack);
}

// Treverse the tree in postOrder DFS
function postOrder(root, callBack) {
	if (typeof callBack !== "function") throw new Error("Callback is required");
	// BASE CASE
	if (root == null) return;

	// Treverse the tree in preorder DFS
	postOrder(root.left, callBack);
	postOrder(root.right, callBack);
	callBack(root);
}

// Returns height of a tree ,number of edges from root-node to leaf-node
function height(node) {
	if (node == null) return -1;
	let leftHeight = height(node.left);
	let rightHeight = height(node.right);
	return (leftHeight > rightHeight ? leftHeight : rightHeight) + 1;
}

// Return depth of a node in a tree
function depth(root, value) {
	//BASE CASE
	if (root == null) return -1;

	let depth = 0;
	while (root) {
		if (value < root.data) {
			root = root.left;
			depth++;
		} else if (value > root.data) {
			root = root.right;
			depth++;
		} else {
			return depth;
		}
	}
	return -1;
}

// Returns true if the tree is balance other wise false
function isBalance(root) {
	//BASE CASE
	if (root == null) return true;

	// takes the height of left sub-tree and right sub-tree
	let leftHeight = height(root.left);
	let rightHeight = height(root.right);

	return (
		// checks the difference between height of left and right sub-trees is less or equal to 1
		// and recursively call for left and right sub-trees as they are also balanced
		Math.abs(leftHeight - rightHeight) <= 1 &&
		isBalance(root.left) &&
		isBalance(root.right)
	);
}

// Takes a tree sorts nodes of tree using inorder treversal
// Builds a new Balance binary tree and returns it
function rebalance(tree) {
	// stores node of unbalance tree in sorted order
	let sortedNodes = [];
	// treverse the tree in inorder DFS
	inOrder(tree, (node) => {
		sortedNodes.push(node.data);
	});
	// build new balance binary tree
	let balancedTree = buildTree(sortedNodes);
	return balancedTree;
}

// Some data for testing

// Returns an array of random numbers
function arrayOfRandomNumbers() {
	let array = [];
	for (let i = 0; i < 10; i++) {
		array.push(Math.floor(Math.random() * 100));
	}
	return array;
}

let array = arrayOfRandomNumbers();
let binarySearchTree = buildTree(array);

/* levelOrder(binarySearchTree, (node) => console.log(node));
inOrder(binarySearchTree, (node) => console.log(node));
preOrder(binarySearchTree, (node) => console.log(node));
postOrder(binarySearchTree, (node) => console.log(node)); */

// Unbalancing the tree
insert(binarySearchTree, 120);
insert(binarySearchTree, 130);
insert(binarySearchTree, 140);
insert(binarySearchTree, 150);
insert(binarySearchTree, 160);

console.log(isBalance(binarySearchTree));
prettyPrint(binarySearchTree);

// Rebalancing the tree
binarySearchTree = rebalance(binarySearchTree);
console.log(isBalance(binarySearchTree));
prettyPrint(binarySearchTree);

levelOrder(binarySearchTree, prettyPrint);
inOrder(binarySearchTree, prettyPrint);
preOrder(binarySearchTree, prettyPrint);
postOrder(binarySearchTree, prettyPrint);
