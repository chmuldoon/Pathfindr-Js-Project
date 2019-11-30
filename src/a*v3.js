import TileNode from "./tile_node";

class AStar3 {
  constructor(options) {
    this.startPos = options.startPos;
    this.endPos = options.endPos;
    this.height = options.height;
    this.width = options.width;
    this.$el = options.$el;
    this.hit = options.hit || false;
    this.diag = options.diag;
  }

  async makePath() {
    let positions = [this.endPos];
    // debugger
    while (!positions.includes(this.startPos)) {
      positions.unshift(this.whoIsMyParentCoord(positions[0]));
    }
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      await this.sleep(25).then(() => {
        $(`li[pos='${pos[0]},${pos[1]}']`)
          .addClass("path")
          .append(
            '<p class="message">' +
              $(`li[pos='${pos[0]},${pos[1]}']`).data().dist +
              "</p>"
          );
      });
    }
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
  secondBestSpot(pos) {
    let hash = {}
    this.softNeighbors(pos).forEach(os => hash[this.closeness(os)] = os)
    return Object.values(hash)[0]
  }
  async lineSearch(currPos) {
    let nextPos = this.bestDirectionSpot(currPos);
    if (!this.validMoves(nextPos)){
      nextPos = this.secondBestSpot(currPos)
    }
    while(!$(`li[pos='${nextPos[0]},${nextPos[1]}']`).hasClass("wall")){
      // debugger
      // await this.sleep(15).then(() => {

        $(`li[pos='${nextPos[0]},${nextPos[1]}']`)
          .data("class", "visited")
          .addClass("visited")
        if(this.searchCheck(nextPos, this.endPos)){
          this.hit = true
          return;
        }
        nextPos = this.bestDirectionSpot(nextPos)
      // })
      // this.secondBestSpot(nextPos);
    }
  }

  spotNeighbors(pos) {
    let output = [];
    let moves = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1]
    ];
    moves.forEach(dir => {
      let newPos = [pos[0] + dir[0], pos[1] + dir[1]];
      if (
        !$(`li[pos='${newPos[0]},${newPos[1]}']`).hasClass("visited") &&
        !$(`li[pos='${newPos[0]},${newPos[1]}']`).hasClass("frog") &&
        this.validMoves(newPos)
      ) {
        output.push(newPos);
      }
    });
    return output;
  }
  closeness(pos) {
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

    while (!this.hit) {
      // debugger
      this.lineSearch(currPos)
      this.searchGrow();
      currPos = this.closestCheck();
      // debugger
      // let neighbors = [];
      // visited.forEach(pos => {
      //   neighbors = neighbors.concat(this.neighbors(pos));
      // });
      // visited = visited.concat(neighbors);
      // currPos = this.closest(neighbors);

    }
    console.log("hit");
    // this.makePath();
  }
  closestCheck(){
    if(this.hit) {return}

    this.closest().forEach(pos => {
      this.softNeighbors(pos).forEach(os => {
        $(`li[pos='${os[0]},${os[1]}']`)
          .data("class", "visited")
          .addClass("visited");
      })
    })
    let ss = {}
    this.closest().forEach(pos => {
      this.softNeighbors(pos).forEach(os => { 
        ss[this.closeness(os)] = os ;
      }) 
    })
    let best = Object.values(ss)[0];
       $(`li[pos='${best[0]},${best[1]}']`)
         .data("class", "visited")
         .addClass("visited");
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
        this.validMoves(neighbor)
      ) {
        neighbors.push(neighbor);
      }
    }

    return neighbors 
  }
  searchGrow() {
    if(this.hit) {return}
    let nodesToSearch = this.edgeVisted();

    nodesToSearch.forEach(pos => {
      // debugger
      this.neighbors(pos)
    });
  }

  validMoves(pos) {
    return (
      pos[0] >= 0 &&
      pos[0] < this.height &&
      pos[1] >= 0 &&
      pos[1] < this.width &&
      !$(`li[pos='${pos[0]},${pos[1]}']`).hasClass("wall")
    );
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
        !this.validMoves(move)
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
        this.validMoves(neighbor)
      ) {
        $(`li[pos='${neighbor[0]},${neighbor[1]}']`)
          .data("class", "visited")
          .addClass("visited");
        neighbors.push(neighbor);
      }
    }

    return neighbors
  }
  // OLDneighbors(pos) {
  //   let moves = [
  //     [0, 1],
  //     [0, -1],
  //     [1, 0],
  //     [-1, 0]
  //   ]; //non diag;

  //   let neighbors = [];

  //   for (let i = 0; i < moves.length; i++) {
  //     const move = moves[i];
  //     const neighbor = [pos[0] + move[0], pos[1] + move[1]];
  //     if (
  //       !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass("visited") &&
  //       !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass("frog") &&
  //       this.validMoves(neighbor)
  //     ) {
  //       neighbors.push(neighbor);
  //       $(`li[pos='${neighbor[0]},${neighbor[1]}']`)
  //         .data("class", "visited")
  //         .addClass("visited")
  //         .data("parent", pos)
  //         .data("dist", this.whoIsMyParent(neighbor).data().dist + 1);
  //     }
  //   }
  //   return neighbors;
  // }
}

export default AStar3;
