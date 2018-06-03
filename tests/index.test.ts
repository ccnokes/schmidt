import { Schmidt } from '../index';
import { awaitEvent } from '../utils/awaitEvent';
import { once } from '../utils/once';
import { eventNames } from '../utils/eventNames';
import { listenerCount } from '../utils/listenerCount';

test('core', () => {
  let schmidt = new Schmidt();

  let cbCalled = 0;
  let cb = () => {
    cbCalled++;
  };

  let cb2Called = 0;
  let cb2 = () => {
    cb2Called++;
  };

  let cb3Called = 0;
  let cb3 = () => {
    cb3Called++;
  };

  schmidt.on('test', cb);
  schmidt.on('test', cb2);
  schmidt.on('test2', cb3);

  schmidt.emit('test');
  expect(cbCalled).toEqual(1);
  expect(cb2Called).toEqual(1);
  expect(cb3Called).toEqual(0);

  schmidt.off('test', cb);
  schmidt.off('test', cb2);
  schmidt.emit('test');
  expect(cbCalled).toEqual(1);
  expect(cb2Called).toEqual(1);
  expect(cb3Called).toEqual(0);

  schmidt.emit('test2');
  expect(cb2Called).toEqual(1);
  expect(cb3Called).toEqual(1);
  schmidt.off('test2', cb3);
});

test('awaitEvent', (done) => {
  let schmidt = new Schmidt();

  awaitEvent<{a: number}>(schmidt, 'test').then((data) => {
    expect(data.a).toEqual(1);
    done();
  });

  schmidt.emit('test', { a: 1 });
});

test('once', () => {
  let schmidt = new Schmidt();
  let calledCount = 0;
  once(schmidt, 'test', (data) => {
    calledCount++;
  });
  schmidt.emit('test', { a: 1 });
  schmidt.emit('test', { a: 1 });
  schmidt.emit('test', { a: 1 });

  expect(calledCount).toEqual(1);
});

test('eventNames', () => {
  let schmidt = new Schmidt<'test' | 'test2'>();
  schmidt.on('test', () => {});
  schmidt.on('test', () => { });
  schmidt.on('test2', () => { });

  expect(eventNames(schmidt).length).toEqual(2);
});

test('listenerCount', () => {
  let schmidt = new Schmidt();
  schmidt.on('test', () => { });
  schmidt.on('test', () => { });
  schmidt.on('test2', () => { });

  expect(listenerCount(schmidt, 'test')).toEqual(2);
  expect(listenerCount(schmidt, 'test2')).toEqual(1);
});

