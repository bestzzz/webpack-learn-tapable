// SyncLoopHook 实现
// 思想： emitter发布订阅
// call实现思路：每个事件至少走一遍，所以首先循环事件队列，然后至少走一遍我们可以想到do while来解。

class SyncLoopHook { // 钩子是同步的
  constructor(args) {
    this.task = [];
  }

  tap(name, task) {
    this.task.push(task);
  }

  call(...args) {
    this.task.forEach(fn => {
      let ret;
      do {
        ret = fn(...args);
      } while (ret !== undefined);
    });
  }
}

const hook = new SyncLoopHook(['name']);

let step = 0;
hook.tap('node', (name) => {
  console.log('node', name);
  return ++step === 3 ? undefined : '继续学';
});
hook.tap('react', (name) => {
  console.log('react', name);
});
hook.call('zz');
