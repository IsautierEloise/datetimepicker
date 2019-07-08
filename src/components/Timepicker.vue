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

	.halfday-timepicker
	{

		button
		{
			width: 100%;
			color: $color-grey-dark;
			position: relative;
			z-index: 5;
			font-size: $font-base;
			font-weight: $weight-light;
			cursor: pointer
		};

		button.active
		{
			color: white;
		};
			
		.halfday-switch
		{
			position: absolute;
			z-index: 4;
			height: 100%;
			width: 50%;
			background-color: $color-blue-vivid;
			transform: translateX(-50%);
			transition: all 300ms cubic-bezier(.17,.67,.54,.91); 
		};

		.halfday-switch.active
		{
			transform: translateX(50%);
		}

	}

	.minute-timepicker, .hour-timepicker
	{

		.hour, .minute
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

		.minute input
		{
			width: 40%;
		};


		.byminute.hour .timepicker-controls, .minute .timepicker-controls
		{
			right: 0.5rem
		}

		.byminute input, .byminute.hour input
		{
			width: 40%
		}
		
	}

	.hour:hover .timepicker-controls, .minute:hover .timepicker-controls
	{
		opacity:1
	}

</style>

<template>
	<div class="timepicker-wrap">
		<div class="halfday-timepicker timepicker" v-show="byHalfDay">
			<button :class="{ active: activeMorning }" @click="toggleHalfday()">Matin</button>
			<button :class="{ active: activeAfternoon }" @click="toggleHalfday()">Après-midi</button>
			<div class="halfday-switch" v-bind:class="{ active: activeAfternoon }" @click="toggleHalfday()"></div>
		</div>
		<div class="hour-timepicker timepicker" v-show="byHour">
			<div class="hour">		
				<input type="text" v-model="hour_formatted" @change="emitTime()">
				<div class="timepicker-controls">
					<button class="timepicker-controls-add" @click="addHour()">
						<img src="../assets/caret-up.svg" alt="add" >
					</button>
					<button class="timepicker-controls-sub" @click="subHour()">
						<img src="../assets/caret-down.svg" alt="substract" >
					</button>
				</div>
				<span>H</span>
			</div>
		</div>
		<div class="minute-timepicker timepicker"  v-show="byMinute">
			<div class="byminute hour">	
				<input type="text" v-model="hour_formatted" @change="emitTime()">			
				<div class="timepicker-controls">
					<button class="timepicker-controls-add" @click="addHour()">
						<img src="../assets/caret-up.svg" alt="add" >
					</button>
					<button class="timepicker-controls-sub"  @click="subHour()">
						<img src="../assets/caret-down.svg" alt="substract" >
					</button>
				</div>
			<span>H</span>
			</div> 
			:
			<div class="byminute minute">	
				<input type="text" v-model='minute_formatted' v-on:change="emitTime()">		
				<div class="timepicker-controls">
					<button class="timepicker-controls-add">
						<img src="../assets/caret-up.svg" alt="add"  @click="addQuarter()">
					</button>
					<button class="timepicker-controls-sub" @click="subQuarter()">
						<img src="../assets/caret-down.svg" alt="substract">
					</button>
				</div>
				<span>min</span>
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
	    		activeMorning: true,
	    		activeAfternoon: false,
	    		hourProp: moment(this.value),
	    		byHalfDay: false,
	    		byHour: false,
	    		byMinute: false,
			}
		},
		methods:
		{
			toggleHalfday()
			{
				this.activeMorning = !this.activeMorning;
				this.activeAfternoon = !this.activeAfternoon;
			},
			addHour()
			{
				this.hourProp=this.hourProp.add(1,'hours').clone();
			},
			subHour()
			{
				this.hourProp=this.hourProp.subtract(1,'hours').clone();
			},
			addQuarter()
			{
				this.hourProp=this.hourProp.add(15,'minutes').clone();
			},
			subQuarter()
			{
				this.hourProp=this.hourProp.subtract(15,'minutes').clone();
			},
			isHalfDay ()
			{
				if(this.statut === 'byHalfDay') 
				{	
					this.byHalfDay = true
				} else
				{
					this.byMinute = false
				}
			},
			isHour ()
			{
				if(this.statut === 'byHour') 
				{	
					this.byHour = true
				}else
				{
					this.byMinute = false
				}
			},
			isMinute ()
			{
				if(this.statut === 'byMinute') 
				{	
					this.byMinute = true
				} else
				{
					this.byMinute = false
				}
			},
			emitTime()
			{
				console.log(this.hourProp)
			}
		},
		computed:
		{
			hour_formatted ()
			{
				return this.hourProp.format('HH');
			},
			minute_formatted ()
			{
				return this.hourProp.format('mm');
			}
		},
		mounted()
		{
			this.isHalfDay();
			this.isHour();
			this.isMinute();
		}
	};

</script>