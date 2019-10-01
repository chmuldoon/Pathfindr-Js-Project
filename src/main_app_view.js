import TileNode from "./tile_node";

class MainAppView {
  constructor(appLogic, $el) {
    this.appLogic = appLogic;
    this.$el = $el;
    this.helDown = false
    this.makeGrid();
    this.addFinish();
    this.addFrog();
    this.bindEvents();
  }
  bindEvents() {
    // install a handler on the `li` elements inside the board.
    this.$el.on("click", "li", event => {
  
      console.log($(event.currentTarget).data().node)
    })
    this.$el.on("mousedown", "li", event => {
      this.helDown = true
    })
    this.$el.on("mouseup", "li", event => {
      this.helDown = false
    })

    this.$el.on("mouseenter", "li", (event => {
      
      this.toggleWall(event.currentTarget)
    
      
    }));

    console.log(event.currentTarget.className)
  }

  toggleWall(eventTarget){
    if (this.helDown && !$(eventTarget).hasClass("wall") && !$(eventTarget).hasClass("special")) {
      $(eventTarget).addClass("wall");
      // debugger
      $(eventTarget).data().node.value = "obstacle";
    
    } else if (this.helDown && ($(eventTarget).hasClass("wall"))) {
      $(eventTarget).removeClass("wall")
      $(eventTarget).data().node.value = null
      $(eventTarget).data("value", null)
    }
  }

  addFrog(){
    $("li[pos='9,10']").data().node.value = "frog";
    $("li[pos='9,10']").addClass("frog").addClass("special")
  }
  addFinish() {
    $("li[pos='9,30']").data().node.value = "finish";
    $("li[pos='9,30']").addClass("finish").addClass("special");
  }


  moveFrog(){

  }
  
  // addWall(){
  //   if (!$(eventTarget).hasClass("wall")) {
  //     $(eventTarget).addClass("wall")
  //   }
  // }
  // removeWall(){
  //   if ($(eventTarget).hasClass("wall")) {
  //     $(eventTarget).removeClass("wall")
  //   }
  // }


  makeGrid() {
    //creates the grid
    const $ul = $("<ul>")
    for (let rowIdx = 0; rowIdx < 20; rowIdx++) {
      for (let coldIdx = 0; coldIdx < 40; coldIdx++) {
        let $li = $("<li>");
        // let node = new TileNode({ pos: [rowIdx, coldIdx] })
        $li.attr("pos", [rowIdx, coldIdx]);
        $li.data("node", [rowIdx, coldIdx]);
        $ul.append($li);
        // console.log($li.data())
      }
    }
    this.$el.append($ul);
  }

}

export default MainAppView;