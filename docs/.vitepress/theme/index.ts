import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ConveyorBelt from './components/ConveyorBelt.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ConveyorBelt', ConveyorBelt)
  },
}
