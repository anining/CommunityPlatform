import * as U from 'karet.util'
import { setter } from "./store";

class router {
  constructor(history, authRouterName) {
    this.history = history;
    this.authRouterName = authRouterName;
    this.push = this.push.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  push(path, state) {
    try {
      const arr = path.split('/')
      let v = arr[arr.length - 1].includes("edit") ? arr[arr.length - 1].substr(4) : arr[arr.length - 1]
      arr[arr.length - 1].includes("add") && (v = arr[arr.length - 1].substr(3))
      v = v.replace(v[0], v[0].toLowerCase())
      v && setter([["selectedKeys", v]]);
      this.history.push(path, state)
    } catch (e) {
      console.log(e)
      this.history.push(path, state)
    }
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
