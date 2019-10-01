
class MainAppView {
  constructor(appLogic, $el) {
    this.appLogic = appLogic;
    this.$el = $el;

    this.makeGrid();
    this.bindEvents();
  }
  bindEvents() {
    // install a handler on the `li` elements inside the board.
    this.$el.on("click", "li", (event => {
      const $square = $(event.currentTarget);
    }));
  }

  makeGrid() {
    const $ul = $("<ul>")
    for (let rowIdx = 0; rowIdx < 20; rowIdx++) {
      for (let coldIdx = 0; coldIdx < 40; coldIdx++) {
        let $li = $("<li>");
        $li.data("pos", [rowIdx, coldIdx]);
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }

}
// GameView.MOVES = {
//   w: 2,
//   a: -1,
//   d: 1,
// };

export default MainAppView;