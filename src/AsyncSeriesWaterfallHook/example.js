const {AsyncSeriesWaterfallHook} = require('tapable');

/**
 * 异步的钩子 分为串行/并行
 * 串行：一个异步事件执行完再执行下一个事件
 * 并行：需要等待所有的异步事件执行完
 * 注册方法：tap/tapAsync/tapPromise 发布方法: call/callAsync/promise
 */

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesWaterfallHook(['name'])
    }
  }

  /**
   * 注册监听函数
   */
  tap() {
    this.hooks.arch.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('node', name);
        cb(null, 'res');
      }, 2000);
    })

    this.hooks.arch.tapAsync('react', (data, cb) => {
      setTimeout(() => {
        console.log('react', data);
        cb();
      }, 2000);
    })

    // this.hooks.arch.tapPromise('node', (name) => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       console.log('node', name);
    //       resolve('res');
    //     }, 1000);
    //   });
    // });

    // this.hooks.arch.tapPromise('react', (data) => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       console.log('react', data);
    //       resolve();
    //     }, 1000);
    //   });
    // });
  }

  start() {
    this.hooks.arch.callAsync('zz', () => {
      console.log('end');
    });

    // this.hooks.arch.promise('zz').then(() => {
    //   console.log('end');
    // });
  }
}

const l = new Lesson();

l.tap(); // 订阅
l.start(); // 发布
