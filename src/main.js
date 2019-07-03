const Vue = require('vue').default

/* eslint-disable spaced-comment */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable no-new */
/* eslint-disable eol-last */

//créer le component
const Datepicker = Vue.extend({
	//propriétés
	props: {
		value: { type: String, required: true },
		format: { type: String, default: 'YYYY-MM-DD' }
	},
	data: function () {
		return {
			date: 'Salut les gens'
		}
	},
	template: '<input type="text" :value="value">'
})

new Vue({
	//propriétés
	el: '.wrap',
	components: {
		datepicker: Datepicker
	}
})