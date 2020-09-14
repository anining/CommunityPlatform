import * as U from 'karet.util';
import { storage } from './storage';

const localStore = {
  // user: DEFAULT_USER,
  // app: null,
  // authorization: null,
  // channel: 'crab-ios',
  // banner: null,
  // gradeSetting: null,
  // gradeRange: null,
  // nextRedLevel: null,
  // highPerformance: false, // 高性能模式默认关闭
  authorization: null,
};
const store = U.atom(localStore);

function setter (items = [], stockpile = false) {
  items.forEach(item => {
    U.set(U.view([item[0]], store), item[1]);
    stockpile && storage.setItem(item[0], JSON.stringify(item[1]));
  });
}

function getter (items = []) {
  const object = {};
  items.forEach(item => {
    const local = [...item.split('.')];
    const pop = [...local].pop();
    object[pop] = U.view(local, store);
  });
  return object;
}

function clear () {
  storage.clear();
  setter([['authorization', null]], false);
}

export { store, setter, getter, clear };
