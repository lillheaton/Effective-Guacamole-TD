
import Vector from 'victor';

const defaultSettings = {
	maxForce: 5.4 * 1000,
	maxVelocity: 3.5 * 1000,
	mass: 20,
	slowingRadious: 70,
	pathRadious: 20,

	maxSeeAhead: 40,
	maxAvoidanceForce: 2000
}


export default class Steering {
	constructor(boid, settings){
		this.settings = Object.assign(defaultSettings, settings);
		this.boid = boid;

		this.steering = new Vector(0,0);
		this.velocity = this.truncate(new Vector(-1,-2), this.settings.maxVelocity);
		this.desiredVelocity = new Vector(1,0);
		this.avoidanceForce = new Vector(0,0);

		this.currentNodePath = 0;
	}

	/**
	 * Truncate the vector to the max value
	 * @param  {vector} vector 
	 * @param  {float} max    
	 * @return {vector}         Value will be set on vector and the vector will be returned
	 */
	truncate(vector, max){
		let i = max / vector.length();
		i = i < 1.0 ? i : 1.0;
		vector.multiplyScalar(i);
		return vector;
	}

	resetPath(){
		this.currentNodePath = 0;
	}

	intersectsRectangle(ahead, rect){
		let scalar = this.settings.maxSeeAhead * 0.5 * this.velocity.length() / this.settings.maxVelocity,
			tv = this.velocity.clone().normalize().multiplyScalar(scalar),
			ahead2 = this.boid.position.clone().add(tv); // ahead2 is half the length of ahead

		return rect.contains(ahead.x, ahead.y) || 
			rect.contains(ahead2.x, ahead2.y) || 
			rect.intersects(this.boid.rect);
	}

	mostThreatingObstacle(ahead, obstacles){
		let collision = false,
			mostThreating = null;

		for (var i = 0; i < obstacles.length; i++) {
			collision = false;

			if(obstacles[i].rect){

				if(this.intersectsRectangle(ahead, obstacles[i].rect)){
					if(mostThreating == null ||
						this.boid.position.distance(obstacles[i].center) < 
						this.boid.position.distance(mostThreating.center)){
						mostThreating = obstacles[i];
					}
				}
			}
		}

		return mostThreating;
	}


	collisionAvoidance(obstacles){
		this.steering.add(this.doCollisionAvoidance(obstacles));
	}

	/**
	 * The public method to be used. See doFollowPath() for more information
	 */
	followPath(path){
		if(this.currentNodePath > path.length)
			throw new Error("Needs to reset path before setting a new one");

		let slowingRadious = this.currentNodePath == path.length - 1 ? this.settings.slowingRadious : 0
		this.seek(this.doFollowPath(path), slowingRadious);
	}

	/**
	 * The public method to be used. See doSeek() for more information
	 */
	seek(target, slowingRadious) {
		this.steering.add(this.doSeek(target, slowingRadious));
	}


	/**
	 * Move the boid closer to the target. This method alone should not be used
	 * @param  {vector} target         
	 * @param  {float} slowingRadious  (Arrive behaviour) If in radious the boid will slowdown before reaching the target. Allows null
	 * @return {vector}                Force vector for pushing closer to target
	 */
	doSeek(target, slowingRadious) {
		let distance;

		this.desiredVelocity = target.clone().subtract(this.boid.position);

		distance = this.desiredVelocity.length();
		this.desiredVelocity.normalize();

		if(distance <= slowingRadious){
			this.desiredVelocity.multiplyScalar(this.settings.maxVelocity * distance / slowingRadious);
		}else{
			this.desiredVelocity.multiplyScalar(this.settings.maxVelocity);
		}

		// Return force
		return this.desiredVelocity.clone().subtract(this.velocity);
	}

	/**
	 * Follow path by increment to the next node if node inside Settigs.pathRadious
	 * @param  {vector[]} path  Vector array of the path
	 * @return {vector}         current target node
	 */
	doFollowPath(path){
		let target = path[this.currentNodePath];
		if(this.boid.position.distance(target) <= this.settings.pathRadious && this.currentNodePath < path.length - 1)
			this.currentNodePath++;

		return target;
	}

	doCollisionAvoidance(obstacles){
		let tvScalar = this.settings.maxSeeAhead * this.velocity.length() / this.settings.maxVelocity,
			tv = this.velocity.clone().normalize().multiplyScalar(tvScalar),
			ahead = this.boid.position.clone().add(tv); // Ahead is the velocity vector, but longer
			
		let threat = this.mostThreatingObstacle(ahead, obstacles);

		if(threat){
			this.avoidanceForce.x = ahead.x - threat.center.x;
			this.avoidanceForce.y = ahead.y - threat.center.y;

			this.avoidanceForce.normalize().multiplyScalar(this.settings.maxAvoidanceForce);
		}else {
			this.avoidanceForce = new Vector(0,0);
		}

		return this.avoidanceForce;
	}
 


	/**
	 * Update boids position by adding all the forces that was pushed to the steering
	 * @param  {createjs.tickEvent} time Game loop time
	 * @return {void}      
	 */
	update(time){
		this.truncate(this.steering, this.settings.maxForce);
		this.steering.multiplyScalar(1.0 / this.settings.mass);

		this.velocity.add(this.steering);
		this.truncate(this.velocity, this.settings.maxVelocity);
		this.velocity.multiplyScalar(time.delta / 1000.0);

		this.boid.position.add(this.velocity)
	}
}