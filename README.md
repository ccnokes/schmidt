# Schmidt (event emitter)

Fast, small event emitter with optionally importable utility functions for more advanced functionality. TS friendly too.

### Why?
- Small (280 bytes gzipped)
- Fast (benchmarked against [mitt](https://github.com/developit/mitt) and [eventemitter3](https://github.com/primus/eventemitter3))*
- Bring in "missing" functionality as needed (see usage below)
- Even better name than [mitt](https://github.com/developit/mitt), if you know the [New Girl reference](https://media.giphy.com/media/YVoVTVZVhaVQA/giphy.gif)

Caveat: event listeners are implemented as a singly linked list (this is what gives it a bit better performance). Each time a new event listener is inserted, it's pushed to the head of the list rather than the back. So, that means when event listeners are called, they're called last first. It's a LIFO instead of a FIFO, unlike most event emitters. I think that's acceptable because it's best practice to not be dependent on the order event listeners are called in.

### Usage

The basics, which might feel familiar:
```javascript
import { Schmidt } from 'schmidt';
let eventEmitter = new Schmidt();
eventEmitter.on('foo', console.log); // { luckyNumber: 0.1542 }
eventEmitter.emit('foo', { luckyNumber: Math.random() });
```
If you want a `once` method, fret not, because it can be imported optionally:

```javascript
import { Schmidt } from 'schmidt';
import { once } from 'schmidt/utils/once';
import { awaitEvent } from 'schmidt/utils/awaitEvent';

let eventEmitter = new Schmidt();
once(eventEmitter, 'foo', console.log);
awaitEvent(eventEmitter, 'foo')
  .then(({ luckyNumber }) => console.log(`Your lucky number is ${luckyNumber}))`));
eventEmitter.emit('foo', { luckyNumber: Math.random() });
```
This is similar architecture to what projects like lodash and RxJS does. This allows you to have a slim core and import only the bits you need. This reduces the amount of unused code that's shipped to the browser.

In TypeScript, you can enumerate the allowed event names easily for a bit more safety.
```typescript
import { Schmidt } from 'schmidt';
const enum EventNames {
  foo,
  bar,
  baz
}
let eventEmitter = new Schmidt<EventNames>();
// NOTE new Schmidt<'foo' | 'bar'>() or whatever you want works here too
eventEmitter.on(EventNames.foo, console.log);
// [ts] Argument of type '"lulz"' is not assignable to parameter of type 'EventNames'.
eventEmitter.on('lulz', console.log);
```
Note you can't reliably type the emitted object. It's just the way of the world with event emitters and TypeScript. Unless you want an emitter per event type.


#### *Note on speed
Performance benchmarking is still a work in-progress. Benchmarking on mitt seems to never work reliably--I don't know why.
```
schmidt x 3,799,492 ops/sec ±0.75% (88 runs sampled)
mitt x 1,886 ops/sec ±58.97% (7 runs sampled) # this is messed up. I expected it'd be similar to eventemitter3
eventemitter3 x 3,332,177 ops/sec ±0.64% (90 runs sampled)
Fastest is schmidt
```
So about 15% performance increase, which isn't a big deal at all, but I thought it was cool that a userland data structure could outperform native arrays.
