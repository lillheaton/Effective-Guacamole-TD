
const AnimationManager = {
	animations: [],

	add(animation){
		this.animations.push(animation);
	},

	update(time){
		for (var i = this.animations.length - 1; i >= 0; i--) {
			if(this.animations[i].done){
				this.animations[i].destroy();
				this.animations.splice(i, 1);
				return;
			}

			this.animations[i].update(time);
		}
	}
};

export default AnimationManager;