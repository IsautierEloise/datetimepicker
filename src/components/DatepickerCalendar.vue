<style lang="css">
	.calendar
	{
		position: absolute;
		z-index: 5;
		background-color: #fff;
		box-shadow: 0 2px 14px 0 rgba(0, 0, 0, .40)
	}
	.calendar-header
	{
		
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
	</div>
</template>


<script>
	//Component
	export default{
		props: ['date'],
		computed: {
			year (){
				return this.date.format('YYYY')
			},
			date_formatted (){
				return this.date.format('dddd D MMM')
			}
		}
	};
</script>