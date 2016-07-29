
import GrassTile from './grassTile';
import TowerTile from './towerTile';

const tileClasses = {
	GrassTile,
	TowerTile
};

/**
 * Wrapper for all the different tile types
 */
export default class DynamicTile {
	constructor(className, ...args){
		return new tileClasses[className](...args);
	}
}