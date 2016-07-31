
const ArrayHelper = {

	/**
	 * Switch place on i & j
	 * @param  {Array[][]} arr
	 * @return {Array[][]}     		The rotated array
	 */
	rotate(arr){
		let n = [];

		for (var i = 0; i < arr[0].length; i++) {
			n[i] = [];
			for (var j = 0; j < arr.length; j++) {
				n[i][j] = arr[j][i];
			};
		};

		return n;
	}
};

export default ArrayHelper;