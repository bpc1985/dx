import { includes, union, difference, head, uniqBy } from 'lodash';

const createResultElement = (id, children) => {
  return children ? { id, children } : { id };
}

const getChildren = (parent, edges, seen) => {
  let list = [];
  edges.forEach(e => {
    if (e[0] === parent && !includes(seen, e[1])) {
      const elem = createResultElement(
        e[1],
        getChildren(e[1], edges, union(seen, [e[1]]))
      );
      list.push(elem);
    }
  });
  return list;
}

export const createTree = (edges) => {
  const sourceArr = [];
  const targetArr = [];
  edges.forEach(e => {
    sourceArr.push(e[0]);
    targetArr.push(e[1]);
  });

  const diffNodes = difference(sourceArr, targetArr);

  const nested = [];
  diffNodes.forEach(node => {
    const elem = createResultElement(node, getChildren(node, edges, [nested]))
    nested.push(elem);
  });
  return head(uniqBy(nested, 'id')).children;
}
