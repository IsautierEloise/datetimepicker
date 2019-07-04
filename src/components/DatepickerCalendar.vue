<style lang="scss">

	$header-height: 6rem;
	$header-width: 16rem;
	$weekday-size: 2rem;

	$weight-thin: 200;
	$weight-light: 300;
	$weight-normal: 400;

	$font-sm: 0.86rem;
	$font-base: 1rem;
	$font-3xl: 1.875rem;

	$color-blue: #0075BF;

	.calendar
	{
		position: absolute;
		z-index: 5;
		background-color: #fff;
		box-shadow: 0 2px 14px 0 rgba(0, 0, 0, .40)
	}
	.calendar-header
	{
		background-color: $color-blue;
		color: #fff;
		padding: 1rem;
		font-weight: $weight-light;
		height: $header-height;
		width: $header-width

	}
	.calendar-year
	{
		font-size: $font-sm;
		line-height: $font-sm;
		margin-bottom: 0.5rem
	}
	.calendar-date
	{
		font-size: $font-3xl;
		line-height: $font-3xl;
	}
	.calendar-weekdays
	{
		font-size: $font-base;
		line-height: $font-base;
		color: $color-blue;
		padding: 0 1rem
	}
	.calendar-weekday
	{
		display: inline-block;
		width: $weekday-size;
		text-align: center;
	}
	.calendar-days
	{
		padding: 0 1em;
		width: $header-width
	}
	.calendar-day
	{
		width: $weekday-size;
		height: $weekday-size;
		display: inline-block;
		text-align: center;
	}
</style>

<template>
	<div class="calendar">
		<div class="calendar-header">
			<div class="calendar-year">
				{{year}}
			</div>
			<div class="calendar-date">
				{{date_formatted}}
			</div>
		</div>
		<div class="calendar-weekdays">
			<div v-for="weekday in weekdays" class="calendar-weekday">	
				{{weekday}}
			</div>
		</div>
		<div class="calendar-days">
			<div class="calendar-day" v-bind:style="{ width: (month.getWeekBeginning()*2) + 'rem'}">
			</div>
			<div class="calendar-day" v-for="day in month.getMonthDays()">
				{{day.format('D')}}
			</div>
		</div>
	</div>
</template>


<script>

	import Month from '../modules/month.js';

	//Functions
	String.prototype.capitalize = function() 
	{
    	return this.charAt(0).toUpperCase() + this.slice(1);
	}

	//Component
	export default
	{
		props: ['date'],
		data ()
		{
			return {
				weekdays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
				month: new Month(this.date.month(), this.date.year())
			}
		},
		computed: 
		{
			year ()
			{
				return this.date.format('YYYY')
			},
			date_formatted ()
			{
				return this.date.format('ddd, D MMMM').capitalize()
			}
		}
	};
</script>