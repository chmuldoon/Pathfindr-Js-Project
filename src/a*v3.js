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
    debugger
    let spot = [pos[0] + bestDirection[0], pos[1] + bestDirection[1]];
    if (this.validMoves(spot)){
      return false
    }else{
      return spot;
    }
  }
  singularSearchCheck(currPos, visited) {
    let newPos = this.bestDirectionSpot(currPos);

    $(`li[pos='${newPos[0]},${newPos[1]}']`)
      .data("class", "visited")
      .addClass("visited");
    if (!visited.includes(newPos)) {
      visited.push(newPos);
      visited = [...new Set(visited)];
    }
    return newPos;
  }
  neighborsToCheck(visited) {
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
    visited.forEach(pos => {
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
    });
    return output;
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
  async search(currPos, target) {
    let visited = [];

    while (!this.hit) {
      debugger
      while (this.bestDirectionSpot(currPos)) {
        debugger;

        currPos = this.singularSearchCheck(currPos, visited);
        if (this.searchCheck(currPos, target)) {
          this.hit = true;
          console.log("hit");
          this.makePath();
          return true;
        }
      }
      let bestPos = this.searchGrow(visited);
      debugger;
      currPos = bestPos;
    }
    console.log("hit");
    this.makePath();
  }
  searchGrow(visited) {
    let newVisted = {};
    let bestPos;
    let visitedLoop = visited;
    this.neighborsToCheck(visitedLoop).forEach(pos => {
      // debugger
      if (!visited.includes(pos)) {
        visited.push(pos);
      }
      visited = [...new Set(visited)];

      newVisted[this.closeness(pos)] = pos;
      $(`li[pos='${pos[0]},${pos[1]}']`)
        .data("class", "visited")
        .addClass("visited");
      bestPos = Object.values(newVisted)[0];
    });
    debugger;
    return bestPos;
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
  neighbors(pos) {
    let moves = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0]
    ]; //non diag;

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
        $(`li[pos='${neighbor[0]},${neighbor[1]}']`)
          .data("class", "visited")
          .addClass("visited")
          .data("parent", pos)
          .data("dist", this.whoIsMyParent(neighbor).data().dist + 1);
      }
    }
    return neighbors;
  }
}

export default AStar3;
