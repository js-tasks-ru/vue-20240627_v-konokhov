import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const counter = ref(0);
    const maxValueCounter = 5;
    const minValueCounter = 0;
    return { counter, maxValueCounter, minValueCounter };
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="counter <= minValueCounter"
        @click="counter--"
      >➖</button>

      <span class="count" data-testid="count">{{ counter }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="counter >= maxValueCounter"
        @click="counter++"
      >➕</button>
    </div>
  `,
})
