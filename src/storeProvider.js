var store;

export default {
  init (configureStore) {
    store = configureStore();
  },
  getStore () {
    return store;
  }
};
