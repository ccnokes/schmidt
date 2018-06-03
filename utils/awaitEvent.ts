import { Schmidt, Handler } from '../index';

export function awaitEvent<T>(schmidt: Schmidt<any>, name: any) {
  return new Promise<T>((resolve, reject) => {
    schmidt.on(name, function eventToPromise(data: any) {
      schmidt.off(name, eventToPromise);
      resolve(data);
    });
  });
}
