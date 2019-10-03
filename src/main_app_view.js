import Dijkstra from "./dijkstra";

class MainAppView {
  constructor(appLogic, $el) {
    this.appLogic = appLogic;
    this.$el = $el;
    this.helDown = false;
    this.over = false;
    this.height = 20;
    this.width = 40;
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
      console.log($(event.currentTarget).data().pos)
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
          $(event.currentTarget).removeClass("finish")
          $(event.currentTarget).data("class", "blank");
        } else {
          let pos = $(event.currentTarget).data().pos
          this.addFinish(pos);
        }
      } else{
        if ($(event.currentTarget).data().class === "frog") {
          $(event.currentTarget).removeClass("frog")
          $(event.currentTarget).data("class", "blank");
        } else {
          let pos = $(event.currentTarget).data().pos
          this.addFrog(pos);
        }
      }
    })
    const that = this;
    // this.dijkstra([9, 10])
    $(document).keydown(function(e){
      if(e.keyCode == '32'){
        
        that.dijkstra([9,10]);
      }
    })
    
    console.log(event.currentTarget.className)
  }
  addPath(pos){
    let x = pos[0];
    let y = pos[1];
    // $("li[pos='9,19']").data().node.value = "frog";
    $(`li[pos='${x},${y}']`).addClass("path")
    $(`li[pos='${x},${y}']`).data("class", "path");
  }

  addFrog(pos) {
    let x = pos[0];
    let y = pos[1];
    if (this.over) {
    }
    // $("li[pos='9,19']").data().node.value = "frog";
    $(`li[pos='${x},${y}']`).addClass("frog").addClass("special")
    $(`li[pos='${x},${y}']`).data("class", "frog");
  }
  addFinish(pos) {
    let x = pos[0];
    let y = pos[1];
    // $("li[pos='9,19']").data().node.value = "frog";
    $(`li[pos='${x},${y}']`).addClass("finish").addClass("special")
    $(`li[pos='${x},${y}']`).data("class", "finish");

  }
  //testing
  dijkstra(pos){
    let dijkstra = new Dijkstra({ startPos: pos, endPos: [9, 30], height: this.height, width: this.width, $el: this.$el})

    return dijkstra.checkNeighbors(pos);
  }

  //end of testing
  toggleWall(eventTarget){
    if (this.helDown && !$(eventTarget).hasClass("wall") && !$(eventTarget).hasClass("special")) {
      $(eventTarget).addClass("wall");
      $(eventTarget).data("class", "wall");

      // $(eventTarget).data().node.value = "obstacle";
    
    } else if (this.helDown && ($(eventTarget).hasClass("wall"))) {
      $(eventTarget).removeClass("wall")
      $(eventTarget).data("class", "blank");

      // $(eventTarget).data().node.value = null;
    }
  }
  // addFinish() {
  //   // $("li[pos='9,30']").data().node.value = "finish";
  //   $("li[pos='9,30']").addClass("finish").addClass("special");
  //   $("li[pos='9,30']").data("class", "finish");

  // }


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
    for (let rowIdx = 0; rowIdx < this.height; rowIdx++) {
      for (let coldIdx = 0; coldIdx < this.width; coldIdx++) {
        let $li = $("<li>");
        // let node = new TileNode({ pos: [rowIdx, coldIdx] })
        $li.attr("pos", [rowIdx, coldIdx]);
        $li.data("pos", [rowIdx, coldIdx]);
        $li.data("class", "blank")
        $ul.append($li);
        // console.log($li.data())
      }
    }
    this.$el.append($ul);
  }

}

export default MainAppView;