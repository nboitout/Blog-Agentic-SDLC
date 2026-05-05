import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ConveyorBelt from './components/ConveyorBelt.vue'
import SelfAssessmentSubmit from './components/SelfAssessmentSubmit.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ConveyorBelt', ConveyorBelt)
    app.component('SelfAssessmentSubmit', SelfAssessmentSubmit)
  },
}
