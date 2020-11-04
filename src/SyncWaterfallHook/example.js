// SyncWaterfallHook 瀑布钩子
// 将上一个事件函数的返回值传递到下一个事件中

const {SyncWaterfallHook} = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncWaterfallHook(['name'])
    }
  }

  /**
   * 注册监听函数
   */
  tap() {
    this.hooks.arch.tap('node', (name) => {
      console.log('node', name);
      // return undefined;
      return '我要传递给react';
    })

    this.hooks.arch.tap('react', (data) => {
      console.log('react', data);
    })
  }

  start() {
    this.hooks.arch.call('zz');
  }
}

const l = new Lesson();

l.tap(); // 订阅
l.start(); // 发布
