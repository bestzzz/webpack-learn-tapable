// AsyncParallelHook 实现
// 思想： emitter发布订阅
// call的实现思路：类似于Promise.all。注册一个计数器，每个异步事件走完的时候让计数器++，当计数器等于事件队列的长度的时候 执行最终的回调。

class AsyncParallelHook { // 钩子是同步的
  constructor(args) {
    this.task = [];
  }

  tapAsync(name, fn) {
    this.task.push(fn);
  }

  tapPromise(name, fn) {
    this.task.push(fn);
  }

  callAsync(...args) {
    const finalCallback = args.pop();

    let index = 0;
    const done = () => {
      index++;
      if (index === this.task.length) {
        finalCallback();
      }
    };
    this.task.forEach(fn => {
      fn(...args, done);
    });
  }

  promise(...args) {
    const taskPromise = this.task.map(fn => fn(...args));
    return Promise.all(taskPromise);
  }
}

const hook = new AsyncParallelHook(['name']);

hook.tapAsync('node', (name, cb) => {
  setTimeout(() => {
    console.log('node', name);
    cb();
  }, 1000);
});
hook.tapAsync('react', (name, cb) => {
  setTimeout(() => {
    console.log('react', name);
    cb();
  }, 1000);
});
hook.callAsync('zz', () => {
  console.log('end');
});
