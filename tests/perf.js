const Benchmark = require('benchmark');
const { Schmidt } = require('../dist/index');
const mitt = require('mitt');
const EE3 = require('eventemitter3');

let schmidt = new Schmidt();
let mitter = mitt();
const ee3 = new EE3();
let noop = () => { 1 + 1; };

new Benchmark.Suite('perf')
  .add('schmidt', function () {
    schmidt.on('test', noop);
    schmidt.on('test', noop);
    schmidt.on('test', noop);
    schmidt.on('test', noop);
    schmidt.on('test', noop);

    schmidt.emit('test');
    schmidt.off('test', noop);
  })
  .add('mitt', function () {
    mitter.on('test', noop);
    mitter.on('test', noop);
    mitter.on('test', noop);
    mitter.on('test', noop);
    mitter.on('test', noop);

    mitter.emit('test');
    mitter.off('test', noop);
  })
  .add('eventemitter3', function () {
    ee3.on('test', noop);
    ee3.on('test', noop);
    ee3.on('test', noop);
    ee3.on('test', noop);
    ee3.on('test', noop);

    ee3.emit('test');
    ee3.off('test', noop);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': true });
