export class Node {
  constructor(public text: string, public children?: Node[]) {}

  addChild(node: Node) {
    if (this.children) {
      this.children.push(node);
    } else {
      this.children = [node];
    }
  }

  deleteChild(node: Node) {
    if (this.children) {
      const index = this.children.indexOf(node);
      if (index !== -1) {
        this.children.splice(index, 1);
        if (this.children.length === 0) {
          this.children = undefined;
        }
      }
    }
  }
}
