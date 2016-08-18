import Vector from 'victor';
import keyMirror from 'keyMirror';
import ArrayHelper from './helpers/arrayHelper';

import Assets from './assets';
import Game from './game';
import Grid from './grid';

export default class Dock {
	constructor(stage){
		this.colors = Assets.get('color', false).colors;
		this.tileTypes = ArrayHelper.rotate([this.extractTileTypes(Assets.get("world"))]);
		this.grid = [];
		this.stage = stage;
		this.rect = new createjs.Rectangle(0, stage.canvas.height - this.height, stage.canvas.width, this.height);

		this.selectedTower = null;

		this.drawContainer = this.createDrawContainer(stage);
		this.drawContainer.addEventListener("click", this.onDockClick.bind(this));
		this.createCashLabel();
	}

	static get Events() {
		return keyMirror({
			TOWER_SELECTED: null
		});
	}

	get tileSize(){ return 60; } //TODO: Make this a settting 
	get padding(){ return 20; }
	get height() { return this.tileSize + (this.padding * 2) }

	init(){
		this.grid = new Grid(
			this.tileTypes.length, 
			this.tileTypes[0].length,
			this.tileSize, 
			this.tileJudger.bind(this));

		this.stage.addChild(this.drawContainer);
	}

	/**
	 * Search through the different tile types for the ones who can attack
	 * @param  {json} worldSettings World JSON settings
	 * @return {object[]}               List of the attacking tile types
	 */
	extractTileTypes(worldSettings) {
		let types = [];
		for (var prop in worldSettings.tileTypes) {
			if(worldSettings.tileTypes.hasOwnProperty(prop)){
				if(worldSettings.tileTypes[prop].attacks){
					types.push({name: prop, settings: worldSettings.tileTypes[prop]});	
				}
			}
		}
		return types;
	}

	/**
	 * Create a container for the docker graphics
	 * @param  {createjs.Stage} stage Game main stage
	 * @return {createjs.Container}       
	 */
	createDrawContainer(stage) {
		let container = new createjs.Container();
		container.y = this.rect.y;

		let background = new createjs.Shape();
		background.graphics
			.setStrokeStyle(2).beginStroke(this.colors["dockBorder"])
			.beginFill(this.colors["dock"])
			.drawRect(0, 0, this.rect.width, this.rect.height);

 		container.addChild(background);
		return container;
	}

	createCashLabel(){
		this.cashLabel = new createjs.Text("Cash: " + Game.props.cash, "20px Arial", "#fff");
		this.cashLabel.y = this.height / 2;
		this.cashLabel.x = this.rect.width - this.cashLabel.getMeasuredWidth() - 20;

		this.drawContainer.addChild(this.cashLabel);
	}

	/**
	 * Decides and create the tile
	 * @param  {int} gridX X in grid array
	 * @param  {int} gridY Y in grid array
	 * @return {Tile}      
	 */
	tileJudger(gridX, gridY){
		let tilePos = new Vector(gridX * this.tileSize + this.padding, this.padding),
			tileType = this.tileTypes[gridX][gridY],
			text = new createjs.Text(tileType.name, "20px Arial", this.colors["greyWhite"]),
			shape = new createjs.Shape();
 		
 		shape.graphics
 			.setStrokeStyle(1).beginStroke("#fff")
 			.beginFill(this.colors["TealColor"])
 			.drawRect(tilePos.x, tilePos.y, this.tileSize, this.tileSize);

		text.x = tilePos.x + (this.tileSize / 2) - (text.getMeasuredWidth() / 2);
		text.y = tilePos.y + (this.tileSize / 2) + (text.getMeasuredHeight() / 2);	
		text.textBaseline = "alphabetic";

 		this.drawContainer.addChild(shape);
 		this.drawContainer.addChild(text);
 		return tileType;
	}

	onDockClick(click){
		let gridPos = this.grid.getArrayPos(this.drawContainer.globalToLocal(click.stageX, click.stageY), this.padding);

		if(gridPos) {
			this.selectedTower = this.tileTypes[gridPos.x][gridPos.y];
		}
	}

	update(time){
		this.cashLabel.text = "Cash: " + Game.props.cash;
	}
}