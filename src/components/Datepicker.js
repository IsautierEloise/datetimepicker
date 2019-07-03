import moment from 'moment'

//create component
const Datepicker = Vue.extend({
	//properties
	props: {
		value: { type: String, required: true },
		format: { type: String, default: 'YYYY-MM-DD' }
	},
	data: function () {
		return {
			date: moment(this.value, 'YYYY-MM-DD')
		}
	},
	//formatting
	computed: {
		date_formatted: function () {
			return this.date.format(this.format)
		},
		date_raw: function () {
			return this.date.format('YYYY-MM-DD')
		}
	},
	template: '<input type="text" :value="date_formatted"><input type="text" :value="date_raw">'
})
