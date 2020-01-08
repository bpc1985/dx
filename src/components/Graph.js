import { tasks } from '../mockData';

class Graph {
  constructor() {
    this.dataList = [];
    this.adjacencyList = new Map();
  }

  getNode(vertex) {
    return this.dataList.find(item => item.id === vertex);
  }

  addVertex(node) {
    if (!this.adjacencyList.has(node.id)) {
      this.dataList.push(node);
      this.adjacencyList.set(node.id, []);
    } else {
      throw 'Vertex is existed';
    }
  }

  addEdge(firstVertex, secondVertex) {
    if (this.adjacencyList.has(firstVertex)) {
      if (this.adjacencyList.has(secondVertex)){
        let array = this.adjacencyList.get(firstVertex);
        if (!array.includes(secondVertex)) {
          array.push(secondVertex);
        } else{
          throw `Can't add '${secondVertex}', it already exists`;
        }
      } else {
        throw `Can't add non-existing firstVertex ->'${secondVertex}'`;
      }
    } else {
      throw `You should add '${firstVertex}' first`;
    }
  }

  _createVisitedObject(){
    let arr = {};
    for (let key of this.adjacencyList.keys()){
      arr[key] = false;
    }
    return arr;
  }

  bfsSearch(startingVertex) {
    let visited = this._createVisitedObject();
    let queue = [];

    visited[startingVertex] = true;
    queue.push(startingVertex);

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

  print() {
    console.log(this.adjacencyList);
    for (let [key, value] of this.adjacencyList) {
      console.log(key, value);
    }
  }
};

let graph = new Graph();
// Add Root Vertex
// const root = { id: 't0', text: "Root" };
// graph.addVertex(root);

// Add Vertex List
tasks.forEach(task => graph.addVertex(task));

// tree.addNode(tasks[0]);
// tree.addNode(tasks[1]);

// tree.addNode(tasks[4], 't1');
// tree.addNode(tasks[2], 't1');

// tree.addNode(tasks[6], 't3');
// tree.addNode(tasks[7], 't3');

// tree.addNode(tasks[8], 't7');
// tree.addNode(tasks[9], 't7');

// tree.addNode(tasks[10], 't8');

// tree.addNode(tasks[3], 't2');
// tree.addNode(tasks[5], 't2');
// tree.addNode(tasks[4], 't4');

// Add Edges
// graph.addEdge('t0', 't1');
// graph.addEdge('t0', 't2');
graph.addEdge('t1', 't3');
graph.addEdge('t1', 't5');
graph.addEdge('t2', 't4');
graph.addEdge('t2', 't6');
graph.addEdge('t3', 't7');
graph.addEdge('t3', 't8');
graph.addEdge('t7', 't9');
graph.addEdge('t7', 't10');

// graph.print();

export default graph;
