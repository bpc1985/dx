import { tasks } from '../mockData';

class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    } else {
      throw 'Vertex is existed';
    }
  }

  addEdge(vertex, node) {
    if (this.adjacencyList.has(vertex)) {
      if (this.adjacencyList.has(node)){
        let array = this.adjacencyList.get(vertex);
        if (!array.includes(node)) {
          array.push(node);
        } else{
          throw `Can't add '${node}', it already exists`;
        }
      } else {
        throw `Can't add non-existing vertex ->'${node}'`;
      }
    } else {
      throw `You should add '${vertex}' first`;
    }
  }

  _createVisitedObject(){
    let arr = {};
    for (let key of this.adjacencyList.keys()){
      arr[key] = false;
    }
    return arr;
  }

  bfsSearch(startingNode) {
    let visited = this._createVisitedObject();
    let queue = [];

    visited[startingNode] = true;
    queue.push(startingNode);

    while (queue.length) {
      let current = queue.pop();
      let arr = this.adjacencyList.get(current);

      for (let item of arr) {
        if (!visited[item]) {
          visited[item] = true;
          queue.unshift(item)
        }
      }
    }
  }
};

let graph = new Graph();


export default graph;
