import MainAppLogic from "./main_app_logic";
import MainAppView from "./main_app_view";



document.addEventListener("DOMContentLoaded", function () {
  console.log("working")
  // const canvasEl = document.getElementsByTagName("canvas")[0];
  // canvasEl.width = MainAppLogic.DIM_X;
  // canvasEl.height = MainAppLogic.DIM_Y;

  const ctx = $('.pathfinder');
  const mainApp = new MainAppLogic();
  window.mainApp = mainApp;
  new MainAppView(mainApp, ctx);
  // const game = new Game();
  // window.game = game;
  // new GameView(game, ctx).start();
});