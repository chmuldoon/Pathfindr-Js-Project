import TileNode from "./tile_node";

class Board{
  constructor(appLogic, $el){
    this.appLogic = appLogic;
    this.$el = $el;

    this.setupGrid();
    this.bindEvents();
  }
  bindEvents() {
    // install a handler on the `li` elements inside the board.
    this.$el.on("click", "li", (e => {
      const $square = $(e.currentTarget);
    }));
  }

  setupGrid() {
    const $ul = $("<ul>")
    for (let rowIdx = 0; rowIdx < 20; rowIdx++) {
      for (let coldIdx = 0; coldIdx < 50; coldIdx++) {
        $li.data("pos", [rowIdx, coldIdx]);
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }

  

}
Board.DIRS = [
  [0, 1], [1, 1], [1, 0],
  [1, -1], [0, -1], [-1, -1],
  [-1, 0], [-1, 1]
];

export default Board; 