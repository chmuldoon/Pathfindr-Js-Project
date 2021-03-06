import TileNode from "./tile_node";
// import PathMaker from "./pathmaker";

class AStar {
  constructor(options) {
    this.startPos = options.startPos;
    this.endPos = options.endPos;
    this.height = options.height;
    this.width = options.width;
    this.$el = options.$el;
    this.hit = options.hit || false;
    this.diag = options.diag;
    this.visitArr = [this.startPos]
    this.spaceError = false
  }
  async makePath(){
    let positions = [this.endPos]
    // debugger
    while(!positions.includes(this.startPos)){
      positions.unshift(this.whoIsMyParentCoord(positions[0]))
    }
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      await this.sleep(30).then(() => {
        $(`li[pos='${pos[0]},${pos[1]}']`).addClass("path")
          // .append('<p class="message">' + $(`li[pos='${pos[0]},${pos[1]}']`).data().dist + '</p>')
      })
    }
  }
  async vistedSearch(start, target){
    // debugger
    let queue = [start]
    while (!this.hit) {
      let currPos = queue.shift();
      if (this.searchCheck(currPos, target)) {
        this.hit = true;
      } else {
        let positions = this.visitedNeighbors(currPos);

        $(`li[pos='${currPos[0]},${currPos[1]}']`).data("children", positions);
        queue = queue.concat(positions);
      }
    }
    this.makePath()
  }
  visitedNeighbors(pos){
    let moves = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]]
    let neighbors = moves
      .map(move => [move[0] + pos[0], move[1] + pos[1]])
      .filter(
        os =>
          this.validMoves(pos, os) &&
          $(`li[pos='${os[0]},${os[1]}']`).hasClass("visited") &&
          !$(`li[pos='${os[0]},${os[1]}']`).hasClass("prescan")
      );
      neighbors.forEach(neighbor => {
        $(`li[pos='${neighbor[0]},${neighbor[1]}']`)
          .addClass("prescan")
          .data("parent", pos)
          .data("dist", (this.whoIsMyParent(neighbor).data().dist + 1))
      })
    return neighbors;
  }

  whoIsMyParent(pos) {
    parent = $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;
    return $(`li[pos='${parent[0]},${parent[1]}']`);
  }
  whoIsMyParentCoord(pos) {
    return $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;
  }

  searchCheck(pos, target) {
    return pos[0] === target[0] && pos[1] === target[1];
  }
  compareOperator(curr, targ) {
    return targ > curr ? 1 : curr > targ ? -1 : 0;
  }
  bestDirection(pos) {
    // debugger
    if (pos === undefined) {
      return [-1, -1];
    }
    let target0 = this.endPos[0];
    let target1 = this.endPos[1];
    return [
      this.compareOperator(pos[0], target0),
      this.compareOperator(pos[1], target1) 
    ];

  }
  bestDirectionSpot(pos) {
    let bestDirection = this.bestDirection(pos)
    let spot = [pos[0] + bestDirection[0], pos[1] + bestDirection[1]];
    // if(!this.validMoves(spot)) {spot = this.secondBestSpot(pos)}
    return spot
  }
  dye(pos){
    $(`li[pos='${pos[0]},${pos[1]}']`)
      .data("class", "dye")
      .addClass("dye");

  }
  secondBestSpot(pos) {
    let hash = {}
    this.softNeighbors(pos).forEach(os => hash[this.closeness(os)] = os)
    return Object.values(hash)[0]
  }
  lineSearch(currPos) {
    let nextPos = this.bestDirectionSpot(currPos); 
    if (!this.validMoves(currPos, nextPos)){
      nextPos = this.secondBestSpot(currPos)
    } 
    // debugger
    if (nextPos === undefined) {
      // debugger;
      // this.spaceError = true;
      return this.currPos;
    }
    while(!$(`li[pos='${nextPos[0]},${nextPos[1]}']`).hasClass("wall")){
        if (!this.validMoves(currPos, nextPos)) {
          nextPos = this.secondBestSpot(currPos);
        }

        $(`li[pos='${nextPos[0]},${nextPos[1]}']`)
          .data("class", "visited")
          .addClass("visited")
        this.visitArr.push(nextPos)
        if(this.searchCheck(nextPos, this.endPos)){
          this.hit = true
          return;
        }
        currPos = nextPos
        nextPos = this.bestDirectionSpot(nextPos)

    }
  }
  closeness(pos) {
    if(pos === undefined){
      // debugger
      this.spaceError = true
      return this.startPos
    }
    return (
      Math.abs(this.endPos[0] - pos[0]) + Math.abs(this.endPos[1] - pos[1])
    );
  }
  xDiff(pos) {
    return Math.abs(Math.abs(this.endPos[1] - pos[1]))
  }
  yDiff(pos) {
    return Math.abs(Math.abs(this.endPos[1] - pos[1]))
  }
  closest(){
    let output = {}
    this.edgeVisted().forEach(pos =>  {
      output[this.closeness(pos)] = pos;
    })
    let best = parseInt(Object.keys(output)[0])
    let answer = this.edgeVisted().filter(pos => this.closeness(pos) === best);
    // debugger
    return answer

  }
  async search(currPos, target) {
    $(".Errors").empty()
    // debugger
    while (!this.hit && !this.spaceError) {
      // debugger
      this.lineSearch(currPos)
      // debugger
      this.searchGrow();
      // debugger
      if(!this.spaceError){
        currPos = this.closestCheck();
      }
    }
    for (let i = 0; i < this.visitArr.length; i++) {
      const pos = this.visitArr[i];
      // debugger
      await this.sleep(25).then(() => { 
        $(`li[pos='${pos[0]},${pos[1]}']`)
          .data("class", "colored")
          .addClass("colored")
      })
    }
    if(this.spaceError){
      $(".Errors").append("<b>No possible route, clear path, edit walls and try again.</b>")
      this.spaceError = false;

    }else{
      this.hit = false;
      this.vistedSearch(this.startPos, this.endPos);
    }
  }


  closestCheck(){
    if(this.hit) {return}
    // debugger
    this.closest().forEach(pos => {
      this.softNeighbors(pos).forEach(os => {
        $(`li[pos='${os[0]},${os[1]}']`)
          .data("class", "visited")
          .addClass("visited");
        this.visitArr.push(os);
      })
    })
    let ss = {}
    this.closest().forEach(pos => {
      this.softNeighbors(pos).forEach(os => { 
        ss[this.closeness(os)] = os ;
      }) 
    })
    let best = Object.values(ss)[0];
    if (best === undefined) {
      // debugger;
      this.spaceError = true;
      return this.startPos;
    }
       $(`li[pos='${best[0]},${best[1]}']`)
         .data("class", "visited")
         .addClass("visited");
        this.visitArr.push(best);

    return best;

  }
  softNeighbors(pos){
    let moves = [[0, 1], [0, -1], [1, 0], [-1, 0]]

    let neighbors = [];
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      const neighbor = [pos[0] + move[0], pos[1] + move[1]];
      if (
        !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass("visited") &&
        !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass("frog") &&
        this.validMoves(pos, neighbor)
      ) {
        neighbors.push(neighbor);
      }
    }

    return neighbors 
  }
  searchGrow() {
    // debugger
    if(this.hit) {return}
    let closest = this.closeness(this.closest()[0])
    if (this.spaceError) {return}
    let nodesToSearch = this.edgeVisted();
    nodesToSearch = nodesToSearch.filter(
      os => (this.closeness(os) - closest) <= 6
    );
    // debugger

    nodesToSearch.forEach(pos => {
      // debugger
      this.neighbors(pos)
    });
  }
  subPos(pos, nextPos){
    let dir = [nextPos[0] - pos[0], nextPos[1] - pos[1]]
    let sub1 = [pos[0] + dir[0], pos[1]]
    let sub2 = [pos[0], pos[1] + dir[1]];
    return [sub1, sub2]

  }

  validMoves(pos, nextPos) {

    if (!(nextPos[0] >= 0)) {return false}
    if (!(nextPos[0] < this.height)) {return false}
    if (!(nextPos[1] >= 0)) {return false}
    if (!(nextPos[1] < this.width)) {return false}
    if ($(`li[pos='${nextPos[0]},${nextPos[1]}']`).hasClass("wall")) {return false}
    if (this.subPos(pos, nextPos).every(os => $(`li[pos='${os[0]},${os[1]}']`).hasClass("wall"))){return false}
    return true;

  }
  sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  visited(){
    return $("li.visited")
      .toArray()
      .map(li =>
        li.attributes[0].nodeValue.split(",").map(num => parseInt(num))
      );
  }
  amIedge(pos){
    let moves = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    return !moves
      .map(move => [move[0] + pos[0], move[1] + pos[1]])
      .every(move =>
        $(`li[pos='${move[0]},${move[1]}']`).hasClass("visited") ||
        !this.validMoves(pos, move)
      );
  }
  edgeVisted(){
    let output = this.visited().filter(pos => this.amIedge(pos))
    return output;
  }
  neighbors(pos) {
    let moves = [[0, 1], [0, -1], [1, 0], [-1, 0]]

    let neighbors = [];
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      const neighbor = [pos[0] + move[0], pos[1] + move[1]];
      if (
        !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass("visited") &&
        !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass("frog") &&
        this.validMoves(pos, neighbor)
      ) {
        $(`li[pos='${neighbor[0]},${neighbor[1]}']`)
          .data("class", "visited")
          .addClass("visited");
        this.visitArr.push(neighbor)
        neighbors.push(neighbor);
      }
    }

    return neighbors
  }
}

export default AStar;
