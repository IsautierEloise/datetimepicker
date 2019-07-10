import Vue from 'vue'
import Datepicker from './components/Datepicker'

Vue.use(Datepicker);

new Vue({
	el: '.wrap',
	components: {
		datepicker: Datepicker,
	}
})