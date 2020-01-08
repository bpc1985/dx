export default class Node {
  constructor(task) {
    this.id = task.id;
    this.text = task.text;
    this.isCompleted = task.isCompleted;
    this.children = {}
  }
}