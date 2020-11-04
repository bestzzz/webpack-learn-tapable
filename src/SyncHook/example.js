const {SyncHook} = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncHook(['name'])
    }
  }

  /**
   * 注册监听函数
   */
  tap() {
    this.hooks.arch.tap('node', (name) => {
      console.log('node', name);
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
