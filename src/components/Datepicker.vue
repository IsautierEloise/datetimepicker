<style>
	.calendar-wrap
	{
		position: relative;
		top: 100%;
	}
</style>

<template>	
	<div class="calendar-wrap">
		<input type="text" :value="date_formatted">
		<input type="text" :name="name" :value="date_raw">
		<datepicker-calendar :date.sync="date"></datepicker-calendar>
	</div>
</template>

<script>
	//Imports
	import moment from 'moment';
	moment.locale('fr');
	import DatepickerCalendarComponent from './DatepickerCalendar.vue';

	//Variables
	const defaultFormat = 'YYYY-MM-DD';

	//Component
	export default
	{
		//components
		components: 
		{
			'datepicker-calendar': DatepickerCalendarComponent
		},
		//properties
		props: 
		{
			value: { type: String, required: true },
			format: { type: String, default: defaultFormat },
			name: { type: String }
		},
		//recieved data
		data () {
			return {
				date: moment(this.value, defaultFormat)
			}
		},
		//formatting
		computed: {
			date_formatted () 
			{
				return this.date.format(this.format)
			},
			date_raw () 
			{
				return this.date.format(defaultFormat)
			}
		}
	};
</script>