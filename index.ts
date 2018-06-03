export type Handler = (data: any) => void

function createNode(fn: Handler) {
  return { next: null, fn };
}

export class Schmidt<T = string> {
  map = Object.create(null);

  on(name: T, handler: Handler) {
    let head = this.map[name];
    let node = createNode(handler);
    if (head) {
      node.next = head;
      this.map[name] = node;
    } else {
      this.map[name] = node;
    }
  }

  off(name: T, handler: Handler) {
    let next = this.map[name];
    let last;
    while (next) {
      if (next.fn === handler) {
        if (last) {
          last.next = next.next;
        } else {
          this.map[name] = next.next;
        }
      }
      last = next;
      next = next.next;
    }
  }

  emit(name: T, data?: any) {
    let nextNode = this.map[name];
    while (nextNode) {
      nextNode.fn(data);
      nextNode = nextNode.next;
    }
  }
}
