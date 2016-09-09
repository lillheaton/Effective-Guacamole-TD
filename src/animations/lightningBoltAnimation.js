
import Vector from 'victor';
import Random from '../helpers/random';
import BoltSegment from './boltSegment';

const BoltLifeSpan = 50; // How long the bolt will be visible

// Single lightning bolt effect
export default class LightningBoltAnimation {
	constructor(drawContainer, position, target){
		this.drawContainer = drawContainer;
		this.segments = this.create(position, target.position.clone(), 2);
	}

	get done(){
		return this.segments.length < 1;
	}

	destroy(){
		for (var i = this.segments.length - 1; i >= 0; i--) {
			this.segments[i].destroy();
			this.segments.splice(i, 1);
		}
	}

	update(time){
		for (var i = this.segments.length - 1; i >= 0; i--) {
			this.segments[i].update(time);

			if(!this.segments[i].alive){
				this.segments[i].destroy();
				this.segments.splice(i, 1);
			}
		};

		//this.shape.graphics.endStroke();
	}

	/**
	 * Will generate random points along a line 0.0 - 1.0.
	 * The points will displaced for the jagged look.
	 * @param  {Vector} source    		Start position
	 * @param  {Vector} dest      		End position
	 * @param  {int} thickness 	  		Thickness of the segments/lines
	 * @return {Array[BoltSegments]}
	 */
	create(source, dest, thickness) {
		let results = [],
			positions = [],
			tangent = dest.clone().subtract(source),
			normal = new Vector(tangent.y, -tangent.x).normalize(),
			length = tangent.length();

		positions.push(0);

		// To many will make it to jagged
		for (var i = 0; i < length / 4; i++) {
			positions.push(Math.random());
		};

		positions.sort();

		const sway = 4000; // How much the bolt will bend. Lower value = more straight
		let jaggedness = 1 / sway;

		let prevPoint = source,
			prevDisplacement = 0;

		for (var i = 1; i < positions.length; i++) {
			
			let pos = positions[i],
				scale = ((length * jaggedness) * (pos - positions[i - 1])),
				envelope = (pos > 0.95 ? 20 * (1 - pos) : 1),
				displacement = Random.next(-sway, sway, true);

			displacement -= (displacement - prevDisplacement) * (1 - scale);
			displacement *= envelope;

			let point = source.clone().add(tangent.clone().multiplyScalar(pos)).add(normal.clone().multiplyScalar(displacement));
			results.push(new BoltSegment(this.drawContainer, prevPoint, point, thickness, "#FDFCFA", i, (BoltLifeSpan * positions.length) / i));
			prevPoint = point;
			prevDisplacement = displacement;
		};

		results.push(new BoltSegment(this.drawContainer, prevPoint, dest, thickness, "#FDFCFA", (positions.length - 1), (BoltLifeSpan * positions.length) / positions.length - 1));
		return results;
	}
}