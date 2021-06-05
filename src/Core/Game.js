import * as Constants from "../constants/consts";
import { AssetService} from "../services/assetService";
import { Canvas } from './canvas';
import { Skier } from "../models/skier";
import { ObstacleService } from "../services/obstacleService";
import { Rect } from '../utilities/utils';
import {Rhino} from '../models/rhino'

export class Game {
    gameWindow = null;

    constructor() {
        this.assetService = new AssetService();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.obstacleService = new ObstacleService();
        this.rhino = new Rhino(0, 0);

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
        this.obstacleService.placeInitialObstacles();
    }

    async load() {
        await this.assetService.loadAssets(Constants.ASSETS);
    }

    run() {
        this.canvas.clearCanvas();

        this.updateGameWindow();
        this.drawGameWindow();

        requestAnimationFrame(this.run.bind(this));
    }

    updateGameWindow() {
        this.skier.move();

        const previousGameWindow = this.gameWindow;
        this.calculateGameWindow();

        this.obstacleService.placeNewObstacle(
          this.gameWindow,
          previousGameWindow
        );

        this.skier.checkIfSkierHitObstacle(
          this.obstacleService,
          this.assetService
        );

        this.rhino.move(this.skier);
        this.rhino.destroySkier(this.assetService, this.skier);
        this.rhino.updateAction(this.skier);
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

        this.skier.draw(this.canvas, this.assetService);
        this.obstacleService.drawObstacles(this.canvas, this.assetService);
        this.rhino.drawRhino(this.canvas, this.assetService);
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    handleKeyDown(event) {
        switch(event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                event.preventDefault();
                break;
        }
    }
}