
const Random = {
	choice(arr) {
		return arr[Math.floor((Math.random() * arr.length) + 0)];
	},

	next(min, max, floatValue) {
		let val = Math.random() * (max - min) + min;
		return floatValue ? val : Math.floor(val);
	}
}

export default Random;