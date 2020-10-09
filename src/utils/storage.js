class storage {
  static getItem = key => localStorage.getItem(key);

  static setItem = (key, value) => localStorage.setItem(key, value);

  //清空全部的AsyncStorage数据
  static clear = () => localStorage.clear();

  //获取所有本应用可以访问到的数据
  // static getAllKeys = () => AsyncStorage.getAllKeys();

  //清除所有进行中的查询操作
  // static flushGetRequests = () => AsyncStorage.flushGetRequests();

  //获取 keys 所包含的所有字段的值
  // static multiGet = (keys) => AsyncStorage.multiGet(keys);
}

export { storage }
