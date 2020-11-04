// SyncWaterfallHook 实现
// 思想： emitter发布订阅
// call的实现思路：使用reduce迭代事件队列，将上一个函数的返回值作为参数传递给下一个函数。

class SyncWaterfallHook { // 钩子是同步的
  constructor(args) {
    this.task = [];
  }

  tap(name, task) {
    this.task.push(task);
  }

  call(...args) {
    const [first, ...other] = this.task;
    const firstRet = first(...args);
    other.reduce((res, cur) => {
      return cur(res);
    }, firstRet);
  }
}

const hook = new SyncWaterfallHook(['name']);

hook.tap('node', (name) => {
  console.log('node', name);
  return 'node ok';
});
hook.tap('react', (data) => {
  console.log('react', data);
  return 'react ok';
});
hook.tap('webpack', (data) => {
  console.log('webpack', data);
});

hook.call('zz');
