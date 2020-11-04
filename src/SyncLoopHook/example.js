// SyncLoopHook 循环钩子
// 遇到某个不返回undefined的监听函数会多次执行

const {SyncLoopHook} = require('tapable');

class Lesson {
  constructor() {
    this.index = 0;
    this.hooks = {
      arch: new SyncLoopHook(['name'])
    }
  }

  /**
   * 注册监听函数
   */
  tap() {
    this.hooks.arch.tap('node', (name) => {
      console.log('node', name);
      return ++this.index === 3 ? undefined : '继续走';
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
