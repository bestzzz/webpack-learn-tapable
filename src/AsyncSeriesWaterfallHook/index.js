// AsyncSeriesWaterfallHook 实现
// 思想： emitter发布订阅
// callAsync的实现思路：声明一个中间函数，当每次执行完一个事件将中间函数传递给下一个事件cb，让下一个事件控制这个中间函数的执行。

class AsyncSeriesWaterfallHook { // 钩子是同步的
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

    const next = (control, res) => {
      if (index === this.task.length || control) {
        return finalCallback();
      }

      const fn = this.task[index];
      if (!index) {
        fn(...args, next);
      } else {
        fn(res, next);
      }

      index++;
    };

    next();
  }

  promise(...args) {
    const [first, ...other] = this.task;
    return other.reduce((res, cur) => res.then(() => cur(...args)), first(...args));
  }
}

const hook = new AsyncSeriesWaterfallHook(['name']);

hook.tapAsync('node', (name, cb) => {
  setTimeout(() => {
    console.log('node', name);
    cb(null, '结果');
  }, 1000);
});
hook.tapAsync('react', (data, cb) => {
  setTimeout(() => {
    console.log('react', data);
    cb(null, '结果2');
  }, 1000);
});
hook.tapAsync('webpack', (data, cb) => {
  setTimeout(() => {
    console.log('webpack', data);
    cb();
  }, 1000);
});
hook.callAsync('zz', () => {
  console.log('end');
});
