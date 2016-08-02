
import Creep from './creep';

const unitClasses = {
	Creep
};

/**
 * Wrapper for all the different unit types
 */
export default class DynamicUnit {
	constructor(className, ...args){
		return new unitClasses[className](...args);
	}
}