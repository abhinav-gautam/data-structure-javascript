class Node{
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null
    }
    insert(value){
        const newNode = new Node(value)
        if(this.root === null){
            this.root = newNode
        }else{
            let currentNode = this.root
            while(true){
                if(value < currentNode.value){
                    // Left
                    if(!currentNode.left){
                        currentNode.left = newNode
                        return this
                    }
                    currentNode = currentNode.left
                }else{
                    // Right
                    if(!currentNode.right){
                        currentNode.right = newNode
                        return this
                    }
                    currentNode = currentNode.right
                }
            }
        }
    }
    lookup(value){
        if(!this.root){
            return false
        }
        let currentNode = this.root
        while(currentNode){
            if(value < currentNode.value){
                currentNode = currentNode.left
            }else if(value > currentNode.value){
                currentNode = currentNode.right
            }else{
                return currentNode
            }
        }
        return false
    }

    remove(value){
        if(!this.root){
            return false
        }
        let currentNode = this.root
        let parentNode = null
        while(currentNode){
            if(value > currentNode.value){
                parentNode = currentNode
                currentNode = currentNode.right
            }else if(value < currentNode.value){
                parentNode = currentNode
                currentNode = currentNode.left
            }else if(value === currentNode.value){
                // Got a match

                // Option 1 - No right child
                if (currentNode.right === null){
                    if(parentNode === null){
                        this.root = currentNode.left
                    }else{
                        if(currentNode.value > parentNode.value){
                            parentNode.right = currentNode.left
                        }else if(currentNode.value < parentNode.value){
                            parentNode.left = currentNode.left
                        }
                    }
                // Option 2 - Right child which doesn't have a left child
                }else if(currentNode.right.left === null){
                    currentNode.right.left = currentNode.left
                    if(parentNode === null){
                        this.root = currentNode.right
                    }else{
                        if(currentNode.value > parentNode.value){
                            parentNode.right = currentNode.right
                        }else if(currentNode.value < parentNode.value){
                            parentNode.left = currentNode.right
                        }
                    }
                // Option 3 - Right child which has a left child
                }else{
                    // Getting leftmost child of right child
                    let leftmost = currentNode.right
                    let leftmostParent = currentNode
                    while(leftmost.left){
                        leftmostParent = leftmost
                        leftmost = leftmost.left
                    }
                    // Make leftmost right subtree be the left child of leftmost parent
                    leftmostParent.left = leftmost.right
                    // Make leftmost left child be the current node's left child
                    // Make leftmost right child be the current node's right child
                    leftmost.left = currentNode.left
                    leftmost.right = currentNode.right

                    if(parentNode === null){
                        this.root = leftmost
                    }else{
                        if(currentNode.value > parentNode.value){
                            parentNode.right = leftmost
                        }else if(currentNode.value < parentNode.value){
                            parentNode.left = leftmost
                        }
                    }
                }
                return true
            }
        }
    }
}


const tree = new BinarySearchTree();
tree.insert(50)
tree.insert(30)
tree.insert(70)
tree.insert(60)
tree.insert(85)
tree.insert(75)
tree.insert(95)
tree.insert(99)
tree.insert(72)
tree.insert(80)
tree.insert(73)
tree.insert(74)
console.log(JSON.stringify(traverse(tree.root)))
tree.remove(70)
console.log(JSON.stringify(traverse(tree.root)))


function traverse(node) {
    const tree = { value: node.value };
    tree.left = node.left === null ? null : traverse(node.left);
    tree.right = node.right === null ? null : traverse(node.right);
    return tree;
}