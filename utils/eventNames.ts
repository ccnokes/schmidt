import { Schmidt } from '../index';

export function eventNames(schmidt: Schmidt): string[] {
  return Object.keys(schmidt.map);
}
