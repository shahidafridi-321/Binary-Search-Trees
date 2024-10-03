# Binary Search Tree Implementation

This project implements a balanced binary search tree (BST) with various tree traversal methods, insertion, deletion, and balance-checking functionalities. It also includes functions for tree visualization and testing with random numbers.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
- [Functions](#functions)
- [Testing](#testing)
- [License](#license)

## Introduction

This project demonstrates how to build and manipulate a binary search tree. It includes functions for creating a balanced binary search tree from an array of numbers, as well as methods to insert, delete, and rebalance the tree. You can also visualize the tree's structure and traverse it in various ways (in-order, pre-order, post-order, and level-order).

## Features

- **Node Factory**: Easily create nodes with data and left/right pointers.
- **Tree Factory**: Build a binary search tree from an array of numbers.
- **Balanced BST Creation**: Sorts the input array and removes duplicates before constructing a balanced tree.
- **Tree Traversals**: Supports in-order, pre-order, post-order, and level-order traversal.
- **Insertion & Deletion**: Insert new values and delete existing values from the tree.
- **Tree Visualization**: Pretty-print the tree structure for better understanding.
- **Tree Rebalancing**: Rebalances an unbalanced tree after insertion of new nodes.
- **Height & Depth Calculation**: Get the height of the tree and depth of individual nodes.
- **Balance Check**: Check whether the tree is balanced.

## Usage

1. Clone the repository.
2. Run the script to build a balanced binary search tree from an array of random numbers.
3. Test the various functions to traverse, insert, delete, and rebalance the tree.

To run the script, open it in your JavaScript environment and use the `console` for outputs.

```javascript
let array = arrayOfRandomNumbers();
let binarySearchTree = buildTree(array);

prettyPrint(binarySearchTree); // Visualize the tree

// Unbalance the tree
insert(binarySearchTree, 120);
insert(binarySearchTree, 130);
prettyPrint(binarySearchTree);

// Check if the tree is balanced
console.log(isBalance(binarySearchTree));

// Rebalance the tree
binarySearchTree = rebalance(binarySearchTree);
console.log(isBalance(binarySearchTree));
prettyPrint(binarySearchTree);
```

## Functions

### Node Factory

```javascript
function Node(data)
```

Creates a node with the given data and initializes `left` and `right` pointers to `null`.

### Tree Factory

```javascript
function Tree(array)
```

Takes an array, sorts it, removes duplicates, and builds a balanced BST.

### Tree Traversals

- **In-order Traversal**: `inOrder(root, callBack)`
- **Pre-order Traversal**: `preOrder(root, callBack)`
- **Post-order Traversal**: `postOrder(root, callBack)`
- **Level-order Traversal**: `levelOrder(root, callBack)`

### Insertion and Deletion

- **Insert**: `insert(root, value)` - Inserts a node with the given value into the tree.
- **Delete**: `deleteItem(root, value)` - Deletes a node with the given value from the tree.

### Tree Visualization

- **Pretty Print**: `prettyPrint(node)` - Prints the tree structure to the console.

### Tree Rebalancing

- **Rebalance**: `rebalance(tree)` - Rebuilds the tree in a balanced form.

### Height and Depth

- **Height**: `height(node)` - Returns the height of the tree.
- **Depth**: `depth(root, value)` - Returns the depth of a node in the tree.

### Balance Check

- **isBalance**: `isBalance(root)` - Checks if the tree is balanced.

## Testing

Use the following function to generate random numbers for testing:

```javascript
function arrayOfRandomNumbers() {
	let array = [];
	for (let i = 0; i < 10; i++) {
		array.push(Math.floor(Math.random() * 100));
	}
	return array;
}
```

You can unbalance the tree by inserting several large numbers (> 100), and then rebalance it using the `rebalance` function.

## License

This project is open-source and available for personal or educational use.

---
