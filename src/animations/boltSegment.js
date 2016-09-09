
export default class BoltSegment {
	constructor(drawContainer, a, b, thickness, color, startTime, lifeSpan){		
		this.drawContainer = drawContainer;
		this.shape = new createjs.Shape();
		this.a = a;
		this.b = b;
		this.thickness = thickness;
		this.lifeSpan = lifeSpan;
		this.lifeTime = lifeSpan;
		this.startTime = startTime;
		this.color = color;
		this.alive = true;

		this.setupGraphics();
	}

	setupGraphics() {
		this.shape.graphics.setStrokeStyle(this.thickness).beginStroke(this.color);
		this.shape.graphics.moveTo(this.a.x, this.a.y);
		this.shape.graphics.lineTo(this.b.x, this.b.y);

		this.drawContainer.addChild(this.shape);
	}

	destroy(){
		this.drawContainer.removeChild(this.shape);
	}

	update(time){
		if(!this.alive)
			return;

		this.startTime -= time.delta;
		if(this.startTime < 1){
			this.lifeTime -= time.delta;
			if(this.lifeTime < 1){
				this.alive = false;
			}	
		}

		this.draw(time);
	}

	draw(time) {
		if(!this.alive || this.startTime > 0)
			return;

		this.shape.alpha = this.lifeTime / this.lifeSpan;

		//this.graphics.endStroke();
	}
}