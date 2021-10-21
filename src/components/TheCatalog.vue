<template>
  <div class="catalog">
    <v-select
      :options="sortOptions"
      v-model="selectDefault"
      class="v-select"
      @option:selected="sortSelected"
    >
    </v-select>
    <div class="catalog__list">
      <product-card
        v-for="product in catalog"
        :key="product.id"
        :product="product"
        @mouseover="product.isHover = true"
        @mouseleave="product.isHover = false"
        @to-delete="toDelete"
      >
      </product-card>
    </div>
  </div>
</template>
<script>
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import ProductCard from './ProductCard.vue';

export default {
  components: { ProductCard, vSelect },
  data() {
    return {
      selectDefault: 'По умолчанию',
      sortType: 'none',
      sortOptions: [
        {
          label: 'По алфавиту \u2191',
          code: 'alphUp',
        },
        {
          label: 'По алфавиту \u2193',
          code: 'alphDown',
        },
        {
          label: 'По цене \u2191',
          code: 'prcUp',
        },
        {
          label: 'По цене \u2193',
          code: 'prcDown',
        },
      ],
    };
  },
  computed: {
    catalog() {
      this.$store.getters.catalog.forEach((el) => {
        el.isHover = false;
      });
      const cat = this.$store.getters.catalog;
      if (this.sortType === 'alphUp') {
        cat.sort((a, b) => (a.title > b.title ? 1 : -1));
      }
      if (this.sortType === 'alphDown') {
        cat.sort((a, b) => (a.title < b.title ? 1 : -1));
      }
      if (this.sortType === 'prcUp') {
        cat.forEach((el) => {
          el.price = parseInt(el.price.replace(/\s+/g, ''), 10);
        });
        cat.sort((a, b) => (a.price > b.price ? 1 : -1));
        cat.forEach((el) => {
          el.price = el.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        });
      }
      if (this.sortType === 'prcDown') {
        cat.forEach((el) => {
          el.price = parseInt(el.price.replace(/\s+/g, ''), 10);
        });
        cat.sort((a, b) => (a.price < b.price ? 1 : -1));
        cat.forEach((el) => {
          el.price = el.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        });
      }
      return cat;
    },
  },
  methods: {
    toDelete(id) {
      this.$store.commit('delete_item_to_catalog', id);
    },
    sortSelected(option) {
      this.sortType = option.code;
    },
  },
};
</script>
<style lang='scss' scoped>
  .catalog {
    position: relative;
    width: 74%;
    @media screen and (max-width: 1140px) {
      width: 67%;
    }
    @media screen and (max-width: 850px) {
      width: 50%;
    }
    @media screen and (max-width: 650px) {
      width: 100%;
    }
  }
  .catalog__list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
   .v-select {
     margin-top: -55px;
     margin-bottom: 18px;
     max-width: 200px;
     margin-left: auto;
  //   position: absolute;
  //   top: -55px;
  //   right: 0;
 }
</style>
