
import Victor from 'victor';

// Override CreateJs point to be Victor lib
window.createjs.Point = Victor;

let CreateJs = window.createjs,
	Vector = CreateJs.Point;

class App {
	constructor(){
		let stage = new CreateJs.Stage("demoCanvas");
		var circle = new CreateJs.Shape();
		circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
		circle.x = 100;
		circle.y = 100;
		stage.addChild(circle);

		stage.update();

		// Check so override works
		/*console.log(new Vector(10, 10).add(new Vector(20, 20)));
		let test = new Vector(10, 10).add(new Vector(20, 20));
		console.log(CreateJs.Matrix2D.identity.rotate(20).transformPoint(10, 10, test));*/
	}
}

let EffectiveGuacamoleTD = new App();