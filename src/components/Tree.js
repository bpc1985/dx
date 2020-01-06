import { isEmpty, uniq } from 'lodash';
import { tasks } from '../mockData';

class Tree {
  constructor() {
    this.root = {
      count: 1,
      children: []
    };
  }

  _goThrough = (node, callback) => {
    callback(node);
    node.children.forEach((child) => this._goThrough(child, callback));
  }

  _traverse(callback) {
    this._goThrough(this.root, callback);
  }

  _traverseWithTrack(node, todoId, track) {
    track.push(node);
    if (node.id === todoId) {
      track.push(node);
      return true;
    }
    node.children.forEach(childNode => {
      if (this._traverseWithTrack(childNode, todoId, track)) {
        track.push(node);
        return true;
      }
      track.pop();
    });
    return false;
  }

  addNode(todo, parentTodoId) {
    const newNode = {
      ...todo,
      children: []
    };

    const searchNodes = this.search(parentTodoId);

    if (isEmpty(searchNodes)) {
      this.root.children.push(newNode);
    } else {
      this._traverse((node) => {
        if (node.id === parentTodoId) {
          node.children.push(newNode);
        }
      });
    }
    this.root.count++;
  }

  removeNode(todo) {
    this._traverse((node) => {
      node.children.forEach((childNode, index) => {
        if (childNode.id === todo.id) {
          node.children.splice(index, 1);
        }
      });
    })
  }

  search(todoId) {
    let returnNodes = [];
    this._traverse((node) => {
      if (node.id === todoId) {
        returnNodes.push(node);
      }
    });
    return returnNodes;
  }

  showOnlyNode(todoId) {
    const track = [];
    this._traverseWithTrack(this.root, todoId, track);
    uniq(track).forEach(node => {
      if (node.id) {
        node.isOpen = true;
      }
    });
  }

  showHideNode(todo) {
    const nodes = this.search(todo.id);
    nodes.forEach(node => {
      node.isOpen = !node.isOpen;
    });
  }

  toggleNode(todo, state) {
    const nodes = this.search(todo.id);
    nodes.forEach(node => {
      node.isCompleted = state;
      this._goThrough(node, (nde) => {
        nde.isCompleted = state;
      });
    });
  }
}

const tree = new Tree();

const savedData = JSON.parse(localStorage.getItem(`savedTodos`));
if (savedData) {
  tree.root.children = savedData;
} else {
  // Initialize mock data in the beginning when there is nothing
  tree.addNode(tasks[0]);
  tree.addNode(tasks[4], 't1');
  tree.addNode(tasks[2], 't1');

  tree.addNode(tasks[6], 't3');
  tree.addNode(tasks[7], 't3');

  tree.addNode(tasks[8], 't7');
  tree.addNode(tasks[9], 't7');

  tree.addNode(tasks[10], 't8');

  tree.addNode(tasks[1]);
  tree.addNode(tasks[3], 't2');
  tree.addNode(tasks[5], 't2');
  tree.addNode(tasks[4], 't4');
}

export default tree;