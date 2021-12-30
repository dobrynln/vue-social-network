<template>
  <div class="feed-form">
    <v-form @submit.prevent="onSubmit">
      <div class="block-form">
        <h1 class="title-h1">{{routerName === 'createArticles' ? 'Создание новости' : 'Редактирование новости'}}</h1>
        <v-col cols="12" md="6">
          <v-text-field
            class="input-custom"
            v-model.trim="title"
            label="Название новости"
            type="text"
            required
          ></v-text-field>
          <span class="span-invalid" v-if="v$.title.$error"
            >Значение введено неверно</span
          >
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="input-custom"
            v-model.trim="description"
            label="О чём новость?"
            type="text"
            required
          ></v-text-field>
          <span class="span-invalid" v-if="v$.description.$error"
            >Значение введено неверно</span
          >
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            solo
            class="textarea-custom input-custom"
            v-model.trim="body"
            label="Опишите новость..."
            multi-line
            type="text"
          ></v-textarea>
          <span class="span-invalid" v-if="v$.body.$error"
            >Значение введено неверно</span
          >
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="input-custom"
            v-model.trim="tagList"
            label="Метки(#хештеги)"
            type="text"
            required
          ></v-text-field>
        </v-col>
        <v-btn type="submit" :disabled="isSubmitting">{{routerName === 'createArticles' ? 'Создать' : 'Редактировать'}}</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { mapState } from 'vuex'
export default {
  name: 'appCreateForm',
  props: {
    initialValues: {
      type: Object,
      required: true
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    title: '',
    description: '',
    body: '',
    tagList: ''
  }),
  setup: () => ({ v$: useValidate() }),
  validations () {
    return {
      title: { required },
      description: { required },
      body: { required }
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.updateArticle.isLoading
    }),
    routerName () {
      return this.$route.name
    }
  },
  mounted () {
    this.title = this.initialValues.title
    this.description = this.initialValues.description
    this.body = this.initialValues.body
    this.tagList = this.initialValues.tagList.join(' ')
  },
  methods: {
    onSubmit () {
      this.v$.$validate()
      if (!this.v$.$error) {
        const form = {
          title: this.title,
          description: this.description,
          body: this.body,
          tagList: this.tagList.split(' ')
        }
        this.$emit('articleSubmiting', form)
      } else {
        console.log('not ok')
      }
    }
  }
}
</script>
