// SyncBailHook 实现
// 思想： emitter发布订阅
// call的实现思路：使用do while循环
// do while循环讲解：https://blog.csdn.net/zyw0101/article/details/84644419

class SyncBailHook { // 钩子是同步的
  constructor(args) {
    this.task = [];
  }

  tap(name, task) {
    this.task.push(task);
  }

  call(...args) {
    let ret; // 当前函数的返回值
    let index = 0; // 指针

    do {
      ret = this.task[index](...args);
      index++;
    } while (ret === undefined && index < this.task.length);
  }
}

const hook = new SyncBailHook(['name']);

hook.tap('node', (name) => {
  console.log('node', name);
  return '不继续执行';
});
hook.tap('react', (name) => {
  console.log('react', name);
});
hook.call('zz');
