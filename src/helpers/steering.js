
const Steering = {

	/**
	 * Will move the position vector closer to the target
	 * @param  {Vector} position    
	 * @param  {Vector} maxVelocity 
	 * @param  {Vector} target      
	 * @return {void}             	Will set the value to the position object
	 */
	seek(position, maxVelocity, target){
		let velocity = target.clone().subtract(position).normalize().multiply(maxVelocity);
		position.add(velocity);
	}

};

export default Steering;