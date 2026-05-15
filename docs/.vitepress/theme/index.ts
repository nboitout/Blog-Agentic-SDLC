import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Layout from './Layout.vue'
import ConveyorBelt from './components/ConveyorBelt.vue'
import SelfAssessmentSubmit from './components/SelfAssessmentSubmit.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ConveyorBelt', ConveyorBelt)
    app.component('SelfAssessmentSubmit', SelfAssessmentSubmit)
  },
}
