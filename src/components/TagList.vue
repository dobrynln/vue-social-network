<template>
  <div class="list-wrapper">
    <ul class="list-tags" v-if="tags.length !== 0">
      <li class="list-tags__item" v-for="tag in tags" :key="tag">
        {{ tag }}
      </li>
    </ul>
    <div class="list-tags__item" v-if="tags.length === 0">Без меток</div>
  </div>
</template>

<script>
export default {
  name: 'appTagList',
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
}
</script>
