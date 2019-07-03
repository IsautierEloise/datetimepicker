import Vue from 'vue'
import DatepickerComponent from './components/Datepicker.js'

new Vue({
	el: '.wrap',
	components: {
		datepicker: Datepicker
	}
})