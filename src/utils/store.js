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
  nickname: '',
  openKeys: [], // 当前展开的 SubMenu 菜单项 key 数组
  selectedKeys: [], // 当前选中的菜单项 key 数组
  permissions: [],
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
