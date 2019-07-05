<style>
	.calendar-wrap
	{
		position: relative;
		top: 100%;
	}
</style>

<template>	
	<div class="calendar-wrap">
		<input type="text" :value="date_formatted" @click="showCalendar">
		<input type="hidden" :name="name" :value="date_raw">
		<datepicker-calendar :displayed="isVisible" :date.sync="date" @change="getDate" @cancel="hideCalendar"></datepicker-calendar>
		<input type="text" :value='date'>
		<timepicker-input :date.sync="date" name="hour-start"></timepicker-input>
	</div>
</template>

<script>
	//Imports
	import moment from 'moment';
	moment.locale('fr');
	import DatepickerCalendarComponent from './DatepickerCalendar.vue';
	import TimepickerInput from './TimepickerInput.vue';

	//Variables
	const defaultFormat = 'YYYY-MM-DD';

	//Component
	export default
	{
		components: 
		{
			'datepicker-calendar': DatepickerCalendarComponent,
			'timepicker-input': TimepickerInput,
		},
		props: 
		{
			value: { type: String, required: true },
			format: { type: String, default: defaultFormat },
			name: { type: String },
		},
		data () 
		{
			return {
				isVisible: false,
				date: moment(this.value, defaultFormat),
				hour: moment(this.date, 'HH:mm')
			}
		},
		methods:
		{
			getDate: function (date)
			{
				this.date=date;
				this.hideCalendar()
			},
			showCalendar ()
			{
				this.isVisible=true;
				setTimeout(() => document.addEventListener('click', this.hideCalendar), 0)
			},
			hideCalendar ()
			{
				this.isVisible=false;
				document.removeEventListener('click', this.hideCalendar)
			}
		},
		computed: 
		{
			date_formatted () 
			{
				return this.date.format(this.format)
			},
			date_raw () 
			{
				return this.date.format(defaultFormat)
			},
			hour_formatted ()
			{
				return this.date.format('HH:mm')
			}
		},
		mounted()
		{
			console.log(this.value, 'HH:mm')
		}
	};
</script>