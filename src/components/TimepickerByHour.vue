<style lang="scss">

	$picker-height: 3rem;

	$color-blue: #0075BF;
	$color-blue-vivid: #3499d9;
	$color-grey-dark: #8795a1;

	$font-sm: 0.86rem;
	$font-base: 1rem;

	$weight-light: 300;
	$weight-normal: 400;

	.timepicker
	{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: $picker-height;
		position: relative;
		margin: 1em 0;

		button
		{
			border: none;
			outline: none;
			background-color: transparent;
		};

		input
		{
			outline: none;
			border: none; 
			text-align: center;
			font-size: $font-base;
			width: 50%;
			height: 100%;
		}
	}

	.hour-timepicker
	{

		.hour
		{
			position: relative;
			height: 100%;
			width: 100%;
		    display: flex;
		    flex-direction: row;
		    justify-content: center;
		    align-items: center;


			.timepicker-controls
			{
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				position: absolute;
				opacity: 0;
				
				img
				{
					height: 0.75rem;
					cursor: pointer;
				}
			};
			span
			{
				color: $color-grey-dark;
			};
		}

		.hour input  
		{
			width: 70%;
		};

		.hour .timepicker-controls
		{
			right: 1rem
		}
		
	}

	.hour:hover .timepicker-controls
	{
		opacity:1
	}

</style>

<template>
	<div class="timepicker-wrap">
		<div class="hour-timepicker timepicker" >
			<div class="hour">		
				<input type="text" name="hourInput" autocomplete="off" v-model="hour" @keyup="getInput" @focus="focusedHour">
				<div class="timepicker-controls">
					<button class="timepicker-controls-add" @click="addHour">
						<img src="../assets/caret-up.svg" alt="add" >
					</button>
					<button class="timepicker-controls-sub" @click="subHour">
						<img src="../assets/caret-down.svg" alt="substract" >
					</button>
				</div>
				<span>H</span>
			</div>
		</div>
	</div>
</template>

<script>

	import moment from 'moment';

	export default 
	{
		props: 
		{
			value: { type: String, required: true },
			statut: { type: String },
		},
		data()
		{
			return{		
	    		hourProp: this.value,
	    		hour: 5
			}
		},
		methods:
		{
			addHour()
			{
				this.hourProp=moment(this.hourProp).add(1,'hours').clone();
			},
			subHour()
			{
				this.hourProp=moment(this.hourProp).subtract(1,'hours').clone();
			},
			focusedHour()
			{
				this.hourFocused= true;
			},
			getInput()
			{
				console.log(this.hour_formatted);
				let hourminuteInput = document.querySelector("input[name=hourminuteInput]").getAttribute('value');
        		console.log(hourminuteInput)
			}
		},
		watch:
		{
			hourProp ()
			{
				this.$emit('change', this.hourProp);
			}
		},
		computed:
		{
			// hour_formatted ()
			// {
			// 	if (this.hourFocused)
			// 	{
			// 		""
			// 		// const validInput = moment(this.hourminuteInput, 'HH').isValid()
			// 		// if(validInput)
			// 		// {
			// 		// 	return moment(this.hourInput).format('HH')
			// 		// } else
			// 		// {
			// 		// 	console.log('test-invalid')
			// 		// }
			// 	} else
			// 	{
			// 		return moment(this.hourProp).format('HH');
			// 	}
			// },
			// minute_formatted ()
			// {
			// 	if (this.minuteFocused)
			// 	{
			// 		return ""
			// 	} else
			// 	{
			// 		return moment(this.hourProp).format('mm').toString();	
			// 	}
			// }
		},
	};

</script>