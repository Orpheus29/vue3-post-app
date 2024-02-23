<template>
  <div class="input-wrapper">
    <input
      class="input"
      type="text"
      :value="modelValue"
      @input="updateInput"
      :placeholder="placeholder"
      ref="inputField"
      required
    />
    <button
      class="clear-button"
      @click="clearInput"
      v-if="modelValue"
    >
      ✖
    </button>
  </div>
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number],
    placeholder: String,
    autoFocus: Boolean,
  },
   mounted() {
    if (this.autoFocus) {
      this.$refs.inputField.focus();
    }
  },
  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', e.target.value.trim());
    },
    clearInput() {
      this.$emit('update:modelValue', '');
      this.$refs.inputField.focus();
    },
  },
}
</script>

<style>
.input-wrapper {
  position: relative;
}

.input {
  width: 100%;
  border: 1px solid teal;
  border-radius: 5px;
  padding: 10px 15px;
}

.clear-button {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  line-height: 1;
  padding: 3px 5px;
  border-radius: 50%;
  border: none;
  color: teal;
  font-size: 12px;
  cursor: pointer;
}

.input:focus {
  outline: 1px solid teal;
}
</style>
