<template>
  <select
    :value="modelValue"
    @change="changeOption"
    class="selector"
  >
    <option
      disabled
      value=""
    >
      Choose option
    </option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    }
  },
  methods: {
    changeOption(e) {
      this.$emit('update:modelValue', e.target.value);
    }
  }
}
</script>

<style scoped>
.selector:focus {
  outline: 1px solid teal;
}
</style>
