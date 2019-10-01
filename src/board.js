import TileNode from "./tile_node";

class Board{
  constructor(appLogic, $el){
    this.grid = Board.makeGrid
  }
  bindEvents() {
    // install a handler on the `li` elements inside the board.
    this.$el.on("click", "li", (e => {
      const $square = $(e.currentTarget);
    }));
  }
  static makeGrid() {
    const grid = [];

    for (let i = 0; i < 20; i++) {
      grid.push([]);
      for (let j = 0; j < 40; j++) {
        grid[i].push([i, j]);
      }
    }
    return grid;
  }



  

}


export default Board; 