
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
	},

	neighbors(array, element, diagonals){
		if(	typeof array == 'undefined' ||
			typeof array[0] == 'undefined' ||
			typeof array[0][0] == 'undefined') {
			throw new Error("Not a two dimensional array");
		}

		let ret = [], x, y;

		if(element.x && parseInt(element.x) < array.length && 
			element.y && parseInt(element.y) < array[0].length){
			x = element.x;
			y = element.y;
		} else{
			for (var i = 0; i < array.length; i++) {
				for (var j = 0; j < array[0].length; j++) {
					if(array[i][j] == element){
						x = i;
						y = j;
						break;
					}
				}
			}
		}		

        // West
        if(array[x-1] && array[x-1][y]) {
            ret.push(array[x-1][y]);
        }
 
        // East
        if(array[x+1] && array[x+1][y]) {
            ret.push(array[x+1][y]);
        }
 
        // South
        if(array[x] && array[x][y-1]) {
            ret.push(array[x][y-1]);
        }
 
        // North
        if(array[x] && array[x][y+1]) {
            ret.push(array[x][y+1]);
        }
 
        if (diagonals) {
 
            // Southwest
            if(array[x-1] && array[x-1][y-1]) {
                ret.push(array[x-1][y-1]);
            }

            // Southeast
            if(array[x+1] && array[x+1][y-1]) {
                ret.push(array[x+1][y-1]);
            }
 
            // Northwest
            if(array[x-1] && array[x-1][y+1]) {
                ret.push(array[x-1][y+1]);
            }
 
            // Northeast
            if(array[x+1] && array[x+1][y+1]) {
                ret.push(array[x+1][y+1]);
            }
        }

        return ret;
	}
};

export default ArrayHelper;