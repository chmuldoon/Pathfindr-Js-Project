import Dijkstra from "./dijkstra";
import AStar from "./a*";


class MainAppView {
  constructor(appLogic, $el) {
    this.appLogic = appLogic;
    this.$el = $el;
    this.helDown = false;
    this.over = false;
    this.height = 20;
    this.width = 40;
    this.diag = false;
    //testing 
    //add frogs finish and dijkstra when you can
    this.makeGrid();
    this.addFrog([9, 10]);
    this.addFinish([9, 30]);
    this.bindEvents();


  }
  bindEvents() {
    // install a handler on the `li` elements inside the board.
    //tests click and logs position and info 
    this.$el.on("click", "li", event => {
      // console.log($(event.currentTarget).data().pos)
      console.log($(event.currentTarget).data())
      console.log((event.currentTarget))

    })
    //changes heldown boolean, useful for creating walls
    this.$el.on("mousedown", "li", event => {
      this.helDown = true
    })
    this.$el.on("mouseup", "li", event => {
      this.helDown = false
    })
    //draws walls and removes
    this.$el.on("mouseenter", "li", (event => {
      this.toggleWall(event.currentTarget)
      this.over = true
    }));
    this.$el.on("mouseleave", "li", event => {
      this.over = false;
    })
    //places frogs also deletes, ideally I could replace that with drag and drop
    //but thats hard as of now
    //NOTES: PLACEMENT WORKS HOWEVER still need to limit amount for now,
    // 

    this.$el.on("dblclick", "li", event => {
      if (event.shiftKey){
        if ($(event.currentTarget).data().class === "finish") {
          $(event.currentTarget).removeClass("finish").data("class", "blank");
        } else {
          let pos = $(event.currentTarget).data().pos
          this.addFinish(pos);
        }
      } else{
        if ($(event.currentTarget).data().class === "frog") {
          $(event.currentTarget).removeClass("frog").data("class", "blank");
        } else {
          let pos = $(event.currentTarget).data().pos
          this.addFrog(pos);
        }
      }
    })
    const that = this;
    // this.dijkstra([9, 10])

    $(".clear").click(function(e){
      // debugger
      for (let rowIdx = 0; rowIdx < that.height; rowIdx++) {
        for (let coldIdx = 0; coldIdx < that.width; coldIdx++) {
          $(`li[pos='${rowIdx},${coldIdx}']`)
          .removeClass("visited wall path frog finish")
          .addClass("blank")
          .removeData("dist children parent class")
          .empty()
          that.addFrog([9, 10]);
          that.addFinish([9, 30]);
        }
      }
    })
    $(".diag").click(function (e) {
      if(that.diag === false){
        that.diag = true
        $(".diag").empty().append("Diagonal On");
      }else{
        that.diag = false
        $(".diag").empty().append("Diagonal Off");
      }
      console.log(that.diag);
    })

    $(".makePath").click(function(e){
      that.dijkstra();
    })


    
    // console.log(event.currentTarget.className)
  }
  addPath(pos){
    $(`li[pos='${pos[0]},${pos[1]}']`)
      .addClass("path")
      .data("class", "path");
  }

  addFrog(pos) {
    $(`li[pos='${pos[0]},${pos[1]}']`)
      .addClass("frog")
      .addClass("special")
      .data("class", "frog")
      .data("dist", 0);
  }
  addFinish(pos) {
    $(`li[pos='${pos[0]},${pos[1]}']`)
      .addClass("finish")
      .addClass("special")
      .data("class", "finish");

  }
  //testing
  dijkstra(){
    // $(".frog")
    // debugger
    let start = $(".frog").data().pos
    let end = $(".finish").data().pos
    let dijkstra = new Dijkstra({ startPos: start, endPos: end, width: this.width, height: this.height, $el: this.$el, diag: this.diag})
    // debugger
    return dijkstra.search(start, end);
  }
  aStart(){
    // $(".frog")
    // debugger
    let start = $(".frog").data().pos
    let end = $(".finish").data().pos
    let aStar = new AStar({ startPos: start, endPos: end, width: this.width, height: this.height, $el: this.$el, diag: this.diag})
    // debugger
    return aStar.search(start, end);
  }

  //end of testing
  toggleWall(eventTarget){
    if (this.helDown && !$(eventTarget).hasClass("wall") && !$(eventTarget).hasClass("special")) {
      $(eventTarget).addClass("wall")
        .data("class", "wall");

      // $(eventTarget).data().node.value = "obstacle";
    
    } else if (this.helDown && ($(eventTarget).hasClass("wall"))) {
      $(eventTarget).removeClass("wall")
        .data("class", "blank");

      // $(eventTarget).data().node.value = null;
    }
  }

  moveFrog(){

  }

  makeGrid() {
    //creates the grid
    const $ul = $("<ul>")
    for (let rowIdx = 0; rowIdx < this.height; rowIdx++) {
      for (let coldIdx = 0; coldIdx < this.width; coldIdx++) {
        let $li = $("<li>");
        // let node = new TileNode({ pos: [rowIdx, coldIdx] })
        $li.attr("pos", [rowIdx, coldIdx])
          .data("pos", [rowIdx, coldIdx])
          .data("class", "blank")
        $ul.append($li);
        // console.log($li.data())
      }
    }
    this.$el.append($ul);
  }
  addClear() {
    const $button = $("<button>")
    this.$el.append($button);
  }

}

export default MainAppView;