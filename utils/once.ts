import { Schmidt, Handler } from '../index';

export function once(schmidt: Schmidt<any>, name: any, fn: Handler) {
  let cb = (data: any) => {
    fn(data);
    schmidt.off(name, cb);
  };
  schmidt.on(name, cb);
  return () => schmidt.off(name, cb);
}
