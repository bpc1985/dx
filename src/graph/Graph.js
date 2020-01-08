import { isEmpty } from 'lodash';
import { createTree } from './helper';

export default class Graph {
  graph = {};

  get = (id) => {
    return this.graph[id];
  };

  set = (graph) => {
    this.graph = graph;
  }

  addNode = (task) => {
    this.graph[task.id] = task;
  };

  addConnection = (sourceId, targetId) => {
    const source = this.get(sourceId);
    if (!source.children[targetId]) {
      source.children = {
        ...source.children,
        [targetId]: { id: targetId }
      };
    }
  }

  removeNode = (taskId) => {
    delete this.graph[taskId];
    Object.keys(this.graph).forEach(key => {
      if(this.graph[key].children[taskId]) {
        delete this.graph[key].children[taskId];
      }
    });
  }

  getLastKey = () => {
    const keys = Object.keys(this.graph);
    const lastKey = keys[keys.length - 1];
    return lastKey;
  }

  getNodes = () => {
    return [
      ...Object.values(this.graph).map(node => {
        return { ...node, children: Object.keys(node.children) };
      })
    ];
  };

  getEdges = (linkedNodes) => {
    return Object.values(this.graph).reduce((acc, node) => {
      return [
        ...acc,
        ...[...Object.keys(node[linkedNodes])].map(id => {
          return [node.id, id];
        })
      ];
    }, []);
  };

  transfrom = () => {
    const edges = this.getEdges("children");
    return createTree(edges);
  };

  bfs = (start, end) => {
    const queue = [];
    queue.push([start]);
    while (!isEmpty(queue)) {
       const path = queue.pop();
       const node = path[path.length - 1];
       if (node === end) {
         return path;
       }
       Object.keys(this.graph[node].children).forEach(adjacent => {
         const newPath = [...path];
         newPath.push(adjacent);
         queue.push(newPath);
       });
    }
  }

  findPathAndOpen = (taskId) => {
    const rootId = this.graph[Object.keys(this.graph)[0]].id;
    const path = this.bfs(rootId, taskId);
    if (path) {
      const pathToOpen = path.filter(p => p !== rootId);
      pathToOpen.forEach(id => this.get(id).isOpen = true);
    }
  };
}