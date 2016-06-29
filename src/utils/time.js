'use strict';

export default class Time {
	constructor(){
		this.reset();
	}

	start(){
		this.lastTime = Time.now();
	}

	reset(){
		this.lastTime = 0.0;
		this.elapsed = 0.0;
		this.elapsedMs = 0.0;
	}

	update(){
		let t = Time.now();
		this.elapsedMs = t - this.lastTime;
		this.elapsed = this.elapsedMs / 1000.0;
		this.lastTime = t;
	}

	static now(){
		return performance.now();
	}
}