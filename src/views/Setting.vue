<template>
  <section class="setting-profile">
    <div v-if="isLoading">dsada</div>
    <div class="container">
      <v-form @submit.prevent="onSubmit" v-if="currentUser">
        <div class="block-form">
          <h1 class="title-h1">Редактирование профиля</h1>
          <v-col cols="12" md="6">
            <v-text-field
              class="input-custom"
              v-model.trim="form.image"
              label="Ваше фото профиля URL"
              type="text"
              required
            ></v-text-field>
            <span class="span-invalid" v-if="v$.form.image.$error"
              >Введен неверно</span
            >
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              class="input-custom"
              v-model.trim="form.username"
              label="Ваше имя"
              type="text"
              required
            ></v-text-field>
            <span class="span-invalid" v-if="v$.form.username.$error"
              >Введен неверно</span
            >
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              class="input-custom"
              v-model.trim="form.bio"
              label="Описание профиля"
              type="text"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              class="input-custom"
              v-model.trim="form.email"
              type="text"
              label="Ваше email"
              required
            ></v-text-field>
            <span class="span-invalid" v-if="v$.form.email.$error"
              >Введен неверно</span
            >
          </v-col>
          <v-btn type="submit">Редактировать</v-btn>
        </div>
      </v-form>
    </div>
  </section>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { mapGetters, mapState } from 'vuex'
import {
  gettersType as gettersTypeAuth,
  actionType as actionTypeAuth
} from '../store/auth'

export default {
  name: 'appSettingProfile',
  data: () => ({
    form: {
      username: '',
      email: '',
      bio: '',
      image: ''
    }
  }),
  computed: {
    ...mapState({
      isSubmitting: (state) => state.settings.isSubmitting,
      isLoading: (state) => state.auth.isLoading
    }),
    ...mapGetters({
      currentUser: gettersTypeAuth.currentUser
    })
  },
  mounted () {
    setTimeout(() => {
      this.getValueUser()
    }, 1500)
  },
  setup: () => ({ v$: useValidate() }),
  validations () {
    return {
      form: {
        username: { required },
        image: { required },
        email: { required }
      }
    }
  },
  methods: {
    getValueUser () {
      if (this.currentUser) {
        this.form.username = this.currentUser.username
        this.form.email = this.currentUser.email
        this.form.bio = this.currentUser.bio
        this.form.image = this.currentUser.image
      }
    },
    onSubmit () {
      this.v$.$validate()
      if (!this.v$.$error) {
        console.log(this.form)
        this.$store.dispatch(actionTypeAuth.updateCurrentUser, {
          userInputs: this.form
        })
      } else {
        console.log('not ok')
      }
      console.log('sub')
    }
  }
}
</script>
