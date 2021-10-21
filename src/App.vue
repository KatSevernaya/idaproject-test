<template>
<div class="page">
  <div class="page__wrap">
      <h1>Добавление товара</h1>
      <div class="page__content">
        <the-aside></the-aside>
        <the-catalog></the-catalog>
      </div>
  </div>
</div>
</template>

<script>
import './assets/scss/style.scss';
import TheAside from './components/TheAside.vue';
import TheCatalog from './components/TheCatalog.vue';

export default {
  components: { TheAside, TheCatalog },
};
</script>

<style lang="scss">
  .page{
    background: #E5E5E5;
    min-height: 100vh;

    h1 {
      margin: 0;
    }
  }
  .page__wrap {
    max-width: 1440px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 32px;

  }
  .page__content {
    display: flex;
    gap: 16px;
    width: 100%;
    margin-top: 16px;
    @media screen and (max-width: 650px) {
      display: block;
    }
  }

</style>
