
import ShotAnimation from './shotAnimation';
import LightningBoltAnimation from './lightningBoltAnimation';

const animationClasses = {
	ShotAnimation,
	LightningBoltAnimation
};

/**
 * Wrapper for all the different tile types
 */
export default class DynamicAnimation {
	constructor(className, ...args){
		return new animationClasses[className](...args);
	}
}