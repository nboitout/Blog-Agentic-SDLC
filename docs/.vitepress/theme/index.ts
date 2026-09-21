import DefaultTheme from 'vitepress/theme'
import './custom.css'
import Layout from './Layout.vue'
import ContextEngineeringLab from './components/ContextEngineeringLab.vue'
import SelfAssessmentSubmit from './components/SelfAssessmentSubmit.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ContextEngineeringLab', ContextEngineeringLab)
    app.component('SelfAssessmentSubmit', SelfAssessmentSubmit)
  },
}
