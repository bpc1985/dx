import Graph from './Graph';
import Node from './Node';
import { tasks } from '../mockData';

const graph = new Graph();
graph.addNode(new Node({
  id: 't0',
  isRoot: true
}));

const savedData = JSON.parse(localStorage.getItem(`savedTodos`));
if (savedData) {
  graph.set(savedData);
} else {
  tasks.forEach(task => graph.addNode(new Node({...task})));
  graph.addConnection('t0', 't1');
  graph.addConnection('t1', 't3');
  graph.addConnection('t1', 't5');
  graph.addConnection('t3', 't7');
  graph.addConnection('t7', 't9');
  graph.addConnection('t7', 't10');
  graph.addConnection('t3', 't8');
  graph.addConnection('t8', 't11');

  graph.addConnection('t0', 't2');
  graph.addConnection('t2', 't4');
  graph.addConnection('t2', 't5');
  graph.addConnection('t2', 't6');
}

export default graph;
export { Node };