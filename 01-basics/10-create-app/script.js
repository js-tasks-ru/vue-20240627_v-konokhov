import { defineComponent, createApp } from 'vue/dist/vue.esm-bundler.js'

const App = defineComponent({
  name: 'App',
  setup() {
    return {
      date: new Date().toLocaleString(navigator.language, {dateStyle: 'long'})
    }
  },
  template: `
    <div id="app">
      <p>Сегодня {{ date }}</p>
    </div>
  `
})

createApp(App).mount('#app')
