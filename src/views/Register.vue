<template>
  <section class="register">
    <div class="container">
      <v-form @submit.prevent="onSubmit">
        <div class="block-form">
          <h1 class="title-h1">Регистрация</h1>
          <v-col cols="12" md="4">
            <v-text-field
              class="input-custom"
              v-model.trim="form.username"
              label="Введите ваше имя"
              type="text"
              required
            ></v-text-field>
            <span class="span-invalid" v-if="v$.form.username.$error"
              >Имя обязательно</span
            >
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              class="input-custom"
              v-model.trim="form.email"
              label="Введите ваш e-mail"
              type="email"
              required
            ></v-text-field>
            <span class="span-invalid" v-if="v$.form.email.$error"
              >E-mail введен неверно</span
            >
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              class="input-custom"
              v-model.trim="form.password"
              type="password"
              label="Введите ваш пароль"
              required
            ></v-text-field>
            <span class="span-invalid" v-if="v$.form.password.$error"
              >Пароль введен неверно</span
            >
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              class="input-custom"
              :class="v$.form.confirmPassword.$error ? 'input-invalid' : ''"
              v-model.trim="form.confirmPassword"
              :counter="10"
              type="password"
              label="Повторите ваш пароль"
              required
            ></v-text-field>
            <span
              class="span-invalid"
              v-if="
                v$.form.confirmPassword.$error ||
                !v$.form.confirmPassword.sameAs
              "
              >Повторный пароль неправильный</span
            >
          </v-col>
          <v-btn class="btn_question-user"
            >Уже есть аккаунт? Авторизоваться?</v-btn
          >
          <v-btn type="submit">Регистрация</v-btn>
        </div>
      </v-form>
      <v-btn @click="getData">CLICK</v-btn>
    </div>
  </section>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'
import { actionType } from '../store/auth'
export default {
  name: 'app-register',
  data: () => ({
    form: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  }),
  setup: () => ({ v$: useValidate() }),
  validations () {
    return {
      form: {
        password: { required },
        confirmPassword: { required, sameAs: sameAs(this.form.password) },
        email: { required, email },
        username: { required }
      }
    }
  },
  methods: {
    getData () {
      this.$store.dispatch('getUser')
      console.log('ss')
    },
    onSubmit () {
      this.v$.$validate()
      if (!this.v$.$error) {
        this.$store
          .dispatch(actionType.register, {
            username: this.form.username,
            email: this.form.email,
            password: this.form.password
          })
          .then((res) => {
            console.log(res)
            this.$router.push({ name: 'home' })
          })
      } else {
        console.log('not ok')
      }
      console.log('sub')
    }
  }
}
</script>
