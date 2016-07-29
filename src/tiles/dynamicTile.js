
import GrassTile from './grassTile';
import TowerTile from './towerTile';

const tileClasses = {
	GrassTile,
	TowerTile
};

export default class DynamicTile {
	constructor(className, ...args){
		return new tileClasses[className](...args);
	}
}