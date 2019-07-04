<style lang="scss">

	$header-height: 6rem;
	$header-width: 24rem;
	$weekday-size: 3rem;

	$weight-thin: 200;
	$weight-light: 300;
	$weight-normal: 400;

	$font-sm: 0.86rem;
	$font-base: 1rem;
	$font-3xl: 1.875rem;

	$color-blue: #0075BF;
	$color-blue-light: #3499D9;

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
		padding: 1.5rem;
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
		padding: 1.5rem;
		display: flex;
	}
	.calendar-weekday
	{
		width: $weekday-size;
		text-align: center;
	}
	.calendar-days
	{
		padding: 0 1.5em;
		width: $header-width;
		display: flex;
		flex-wrap: wrap;
	}
	.calendar-day
	{
		position: relative;
		width: $weekday-size;
		height: $weekday-size;
		line-height: $weekday-size;
		cursor: pointer;
		text-align: center
	}
	.calendar-day-text
	{
		position: relative;
		z-index: 2;
	}
	.calendar-day-effect
	{
		position: absolute;
		left: 0.25rem;
		top: 0.25rem;
		z-index: 0;
		height: 2.5rem;
		width: 2.5rem;
		border-radius: 50%;
		background-color: $color-blue-light;
		transition: all 450ms cubic-bezier(0.14, 0.82, 0.4, 0.94);
		transform: scale(0);
		opacity: 0
	}

	.calendar-day:hover 
	{
		color: #fff
	}


	.calendar-day:hover .calendar-day-effect
	{
		transform: scale(1);
		opacity: 0.6
	}

	.calendar-day.selected 
	{
		color: #fff
	}


	.calendar-day.selected .calendar-day-effect
	{
		transform: scale(1);
		background-color: $color-blue;
		opacity: 1
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
			<div class="calendar-day" v-bind:style="{ width: ((month.getWeekBeginning()*2) - 1) + 'rem'}">
			</div>
			<div class="calendar-day" v-on:click="selectDate(day)" v-for="day in month.getMonthDays()" :class="{selected: isSelected(day)}">
				<span class="calendar-day-text">{{day.format('D')}}</span>
				<span class="calendar-day-effect"></span>
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
				month: new Month(this.date.month(), this.date.year()),
				date_selected: this.date
			}
		},
		methods:
		{
			isSelected: function (day)
			{
				return this.date.unix() === day.unix()
			},
			selectDate: function (date_selected)
			{
				this.date_selected = date_selected.clone()
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