import * as Constants from "../constants/consts";
import { Entity } from "./entity";
import { randomInt } from "../utilities/utils";

const assetTypes = [
  Constants.TREE,
  Constants.TREE_CLUSTER,
  Constants.ROCK1,
  Constants.ROCK2,
];

export class Obstacle extends Entity {
  constructor(x, y) {
    super(x, y);

    const assetIdx = randomInt(0, assetTypes.length - 1);
    this.assetName = assetTypes[assetIdx];
  }
}
