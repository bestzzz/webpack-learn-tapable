// SyncHook 实现
// 思想： emitter发布订阅

class SyncHook { // 钩子是同步的
  constructor(args) {
    this.task = [];
  }

  tap(name, task) {
    this.task.push(task);
  }

  call(...args) {
    this.task.forEach(fn => fn(...args));
  }
}

const hook = new SyncHook(['name']);

hook.tap('node', (name) => {
  console.log('node', name);
});
hook.tap('react', (name) => {
  console.log('react', name);
});
hook.call('zz');
