import * as U from 'karet.util'

class router {
  constructor(history, authRouterName) {
    this.history = history;
    this.authRouterName = authRouterName;
    this.push = this.push.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  push(path, state) {
    this.history.push(path, state)
  }

  goBack() {
    this.history.goBack()
  }
}

const h = U.atom()
const proxyRouter = (() => {
  return (history, authRouterName = 'login') => {
    if (history && authRouterName) {
      U.set(h, new router(history, authRouterName))
    }
    return h;
  };
})();

export { proxyRouter, h };
