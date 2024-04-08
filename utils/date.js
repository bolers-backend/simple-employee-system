export const dateNow = () => {
	const date = new Date();
	const [year, month, day, hours, minutes, seconds] = [
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds(),
	]
	return `${year}-${month + 1}-${day} ${hours}:${minutes}:${seconds}`;
}