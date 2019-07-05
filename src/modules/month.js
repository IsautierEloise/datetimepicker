import moment from 'moment';
import 'moment-range';

export default class Month
{
	constructor(month,year)
	{
		let firstDay = this.firstDay = moment([year, month]);
		this.lastDay = this.firstDay.clone().endOf('month');
		this.month = month;
		this.year = year;
	}
	getWeekBeginning () 
	{
		return this.firstDay.weekday();
	}
	getMonthDays ()
	{
		return moment.range(this.firstDay, this.lastDay).toArray('days');
	}
	getFormatted ()
	{
		return this.firstDay.format('MMMM');
	}
}
