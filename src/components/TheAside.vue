<template>
    <form class="the-aside__form" @submit.prevent="addProduct()">
      <div class="custom-input required">
        <label for="nameInput">Наименование товара</label>
        <input
          type="text"
          placeholder="Введите наименование товара"
          id="nameInput"
          v-model="title"
          @blur="ifInvalid($event)"
        >
        <div class="custom-input-error d-none ">
          <p>Поле является обязательным</p>
        </div>
      </div>
      <div class="custom-input">
        <label for="descInput">Описание товара</label>
        <textarea
          type="text"
          id="descInput"
          v-model="description"
          placeholder="Введите описание товара"
        >
        </textarea>
      </div>
      <div class="custom-input required">
        <label for="linkInput">Ссылка на изображение товара</label>
        <input
          type="text"
          id="linkInput"
          v-model="link"
          @blur="ifInvalid($event)"
          placeholder="Введите ссылку"
        >
        <div class="custom-input-error d-none ">
          <p>Поле является обязательным</p>
        </div>
      </div>
      <div class="custom-input required">
        <label for="priceInput">Цена товара</label>

        <input
          type="text"
          id="priceInput"
          placeholder="Введите цену"
          v-model="price"
          @input="ifNumb($event)"
          @blur="ifInvalid($event),formatPrice()"
        >
        <div class="custom-input-error d-none ">
          <p>Поле является обязательным</p>
        </div>
      </div>
      <button type="submit" class="btn" :disabled="formsValid">Добавить товар</button>
    </form>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      price: '',
      description: '',
      link: '',
    };
  },
  computed: {
    formsValid() {
      let isValid = true;
      if ((this.title.trim().length > 0)
      && (this.link.trim().length > 0)
      && (this.price.trim().length > 0)) {
        isValid = false;
      }
      return isValid;
    },
  },
  methods: {
    ifInvalid(event) {
      const input = event.target.value.trim().length;
      if (input === 0) {
        event.path[0].classList.add('invalid');
        event.path[1].querySelector('.custom-input-error').classList.remove('d-none');
      } else {
        event.path[0].classList.remove('invalid');
        event.path[1].querySelector('.custom-input-error').classList.add('d-none');
      }
    },
    ifNumb(event) {
      event.target.value = event.target.value.replace(/[^\d.]/g, '');
    },
    formatPrice() {
      this.price = this.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      console.log(this.price);
    },
    addProduct() {
      const product = {};
      product.title = this.title;
      product.description = this.description;
      product.link = this.link;
      product.price = this.price;
      this.$store.commit('add_item_to_catalog', product);
      this.title = '';
      this.price = '';
      this.link = '';
      this.description = '';
    },
  },
};
</script>
<style lang='scss' scoped>

  form {
    background: #FFFEFB;
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
    border-radius: 4px;
    padding: 24px;
    width: 23%;
    max-height: 440px;
    box-sizing: border-box;
    @media screen and (max-width: 1140px) {
      width: 32%;
    }
    @media screen and (max-width: 850px) {
      width: 49%;
    }
    @media screen and (max-width: 650px) {
      width: 100%;
      margin-bottom: 75px;
    }
  }
  .custom-input {
    position: relative;
    margin-bottom: 16px;
    width: calc(100% - 48px);
    &:last-of-type {
      margin-bottom: 24px;
    }
    label {
      display: block;
      font-size: 10px;
      line-height: 13px;
      letter-spacing: -0.02em;
      color: #49485E;
    }

    input, textarea {
      background: #FFFEFB;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      padding: 10px 16px 11px;
      width: 100%;
      outline: none;
      border: none;
      font-size: 12px;
      line-height: 15px;
      color: #3F3F3F;
      &:hover, &:focus, &:active {
        outline: none;
        border: none;
      }

      &::placeholder {
        font-size: 12px;
        line-height: 15px;
        color: #B4B4B4;
      }
    }
    textarea {
      padding-bottom: 53px;
    }
  }
  .required {
    label {
      position: relative;
      &::after {
        position: absolute;
        content: '';
        width: 4px;
        height: 4px;
        background: #FF8484;
        border-radius: 4px;
      }
    }
  }
  .btn {
    background: #7BAE73;
    border-radius: 10px;
    width: 100%;
    outline: none;
    border: none;
    padding-top: 10px;
    padding-bottom: 11px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    letter-spacing: -0.02em;
    cursor: pointer;
    color: #FFFFFF;
    transition: all .3s ease-in-out;
    &:disabled {
      background: #EEEEEE;
      color: #B4B4B4;
      cursor: default;
      &:hover, &:focus, &:active {
       background: #EEEEEE;
      color: #B4B4B4;
    }

    }
    &:hover, &:focus, &:active {
      outline: none;
      border: none;
      background: darken($color: #7BAE73, $amount: 10%);
    }
  }
  .custom-input-error {
    // position: absolute;
    // right: 0;
    // bottom: -14px;
    // height: 10px;
    margin-top: 4px;
    margin-bottom: -14px;
    p {
      margin: 0;
      font-size: 8px;
      line-height: 10px;
      letter-spacing: -0.02em;
      color: #FF8484;
    }
  }
  .invalid {
    border: 1px solid #FF8484 !important;
  }
  .d-none {
    display: none;
  }
</style>
