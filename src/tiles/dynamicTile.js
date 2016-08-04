
import GenericTile from './genericTile';
import TowerTile from './towerTile';

const tileClasses = {
	GenericTile,
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