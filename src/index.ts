import "../public/css/game.css";
import Container from "typedi";
import GameService from "./services/gameService";

const startGame = async () => {
    let gameService = new GameService();
  //const gameService = Container.get(GameService);
  gameService.load().then(() => {
    gameService.init();
    gameService.run();
  });

  console.log("Game started");
};

startGame().catch((err) => {
  console.error(err);
});
