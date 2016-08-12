
import ArrayHelper from './arrayHelper';

const AStar = {

	search(nodes, start, end) {

		let closedSet = [],
			openSet = [],
			currentNode;

		openSet.push(start);

		while(openSet.length > 0){

			let fIndex = 0;
			for (var i = 0; i < openSet.length; i++) {
				if(openSet[i].f < openSet[fIndex].f)
					fIndex = i;
			};
			currentNode = openSet[fIndex];

			// Found goal, return the path
			if(currentNode == end){
				let curr = currentNode,
					ret = [];

				while(curr.parent){
					ret.push(curr);
					curr = curr.parent;
				}

				return ret.reverse();
			}

			openSet.splice(openSet.indexOf(currentNode), 1);
			closedSet.push(currentNode);

			let neighbors = ArrayHelper.neighbors(nodes, currentNode, false);

			for (var i = 0; i < neighbors.length; i++) {
				let neighbor = neighbors[i];

				if(closedSet.indexOf(neighbor) > -1 || neighbor.isWall){
					continue; // Not a valid node to walk to
				}

				let gScore = currentNode.g + 1, // 1 is distance to to it's neighbor
					bestG = false; 

				if(openSet.indexOf(neighbor) < 0){
					// We have not been here before therefor the best g
					bestG = true;
					neighbor.h = AStar.manhattan(neighbor, end);
					openSet.push(neighbor);
				} 
				else if(gScore < neighbor.g){
					bestG = true;
				}

				if(bestG){
					neighbor.parent = currentNode;
					neighbor.g = gScore;
					neighbor.f = neighbor.g + neighbor.h;
				}
			};
		}
		
		return []; // Did not find any path
	},

	manhattan(pos1, pos2) {
		let d1 = Math.abs(pos2.x - pos1.x);
		let d2 = Math.abs(pos2.y - pos1.y);
		return d1 + d2;
	}
}

export default AStar;