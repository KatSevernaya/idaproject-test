import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state() {
    return {
      catalog: [
        {
          title: 'аааНаименование товара',
          link: 'http://lorempixel.com/400/200/technics/1/',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          price: '10 000',
          id: 'id-1',
        },
        {
          title: 'бббНаименование товара 2',
          link: 'http://lorempixel.com/400/200/technics/2/',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          price: '10 000',
          id: 'id-2',
        },
        {
          title: 'вввНаименование товара 3',
          link: 'http://lorempixel.com/400/200/technics/3/',
          description: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          price: '10 000',
          id: 'id-3',
        },
      ],
    };
  },
  getters: {
    catalog(state) {
      return state.catalog;
    },
  },
  mutations: {
    add_item_to_catalog(state, data) {
      const id = state.catalog.length + 1;
      data.id = `id-${id}`;
      state.catalog.push(data);
    },
    delete_item_to_catalog(state, data) {
      const idx = state.catalog.findIndex((prod) => prod.id === data);
      console.log(idx);
      state.catalog.splice(idx, 1);
      console.log(idx);
    },
  },
  plugins: [createPersistedState()],
});
