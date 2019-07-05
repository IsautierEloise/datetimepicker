<template>
	<div class="timepicker">
	</div>
</template>

<script>


	import moment from 'moment';
	export default 
	{
		props: 
		{
			hour: {},
		},
		mounted()
		{
			console.log(moment())
		}
	};

</script>