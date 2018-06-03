import { Schmidt } from '../index';

export function listenerCount(schmidt: Schmidt<any>, name: any): number {
  let count = 0;
  let nextNode = schmidt.map[name];
  if (nextNode) {
    while(!!nextNode) {
      count++;
      nextNode = nextNode.next;
    }
  }
  return count;
}
