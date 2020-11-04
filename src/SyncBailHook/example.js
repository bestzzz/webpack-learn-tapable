// 不同于SyncHook的是：SyncBailHook是一个拦截器 当事件队列里的某个函数返回值不等于undefined时，拦截事件队列，停止执行接下来的事件。

const {SyncBailHook} = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncBailHook(['name'])
    }
  }

  /**
   * 注册监听函数
   */
  tap() {
    this.hooks.arch.tap('node', (name) => {
      console.log('node', name);
      // return undefined;
      return '不想继续执行了';
    })

    this.hooks.arch.tap('react', (name) => {
      console.log('react', name);
    })
  }

  start() {
    this.hooks.arch.call('zz');
  }
}

const l = new Lesson();

l.tap(); // 订阅
l.start(); // 发布
