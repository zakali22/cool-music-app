import Vue from 'nativescript-vue'
import App from './components/App'
import './styles/index.scss'

import store from './store'
import VueDevtools from 'nativescript-vue-devtools'
import RadListView from 'nativescript-ui-listview/vue';
import RadChart from 'nativescript-ui-chart/vue'


if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
  Vue.use(RadListView);
  Vue.use(RadChart)
}
  
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

// Register plugins:
Vue.registerElement("Gradient", () => require("nativescript-gradient").Gradient);
Vue.registerElement('Carousel', () => require('nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('nativescript-carousel').CarouselItem);
Vue.registerElement('SVGImage', () => require('@exeleon/nativescript-svg').SVGImage);

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
