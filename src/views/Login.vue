<template>
  <section class="register">
    <div class="container">
      <v-form @submit.prevent="onSubmit">
        <div class="block-form">
          <h1 class="title-h1">Авторизоваться</h1>
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
          <router-link :to="{name:'register'}">Зарегистрироваться?</router-link>
          <v-btn type="submit">Авторизоваться</v-btn>
        </div>
      </v-form>
    </div>
  </section>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { actionType } from '../store/auth'
export default {
  name: 'app-login',
  data: () => ({
    form: {
      email: '',
      password: ''
    }
  }),
  setup: () => ({ v$: useValidate() }),
  validations () {
    return {
      form: {
        email: { required },
        password: { required }
      }
    }
  },
  methods: {
    onSubmit () {
      this.v$.$validate()
      if (!this.v$.$error) {
        this.$store.dispatch(actionType.login, {
          email: this.form.email,
          password: this.form.password
        }).then(() => {
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
