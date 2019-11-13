
class AStar {
  constructor(options) {
    this.startPos = options.startPos;
    this.endPos = options.endPos;
    this.height = options.height;
    this.width = options.width;
    this.$el = options.$el;
    this.hit = options.hit || false;
    this.diag = options.diag;
  }

  // async makePath() {
  //   let positions = [this.endPos];
  //   // debugger
  //   while (!positions.includes(this.startPos)) {
  //     positions.unshift(this.whoIsMyParentCoord(positions[0]));
  //   }
  //   for (let i = 0; i < positions.length; i++) {
  //     const pos = positions[i];
  //     await this.sleep(25).then(() => {
  //       $(`li[pos='${pos[0]},${pos[1]}']`)
  //         .addClass("path")
  //         .append(
  //           '<p class="message">' +
  //             $(`li[pos='${pos[0]},${pos[1]}']`).data().dist +
  //             "</p>"
  //         );
  //     });
  //   }
  // }
  whoIsMyParent(pos) {
    parent = $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;
    // debugger
    return $(`li[pos='${parent[0]},${parent[1]}']`);
  }
  whoIsMyParentCoord(pos) {
    return $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;
  }

  distFromEnd(pos) {
    let x =
      pos[0] < this.endPos[0]
        ? this.endPos[0] - pos[0]
        : pos[0] - this.endPos[0];
    let y =
      pos[1] < this.endPos[1]
        ? this.endPos[1] - pos[1]
        : pos[1] - this.endPos[1];
    return x + y;
  }

  searchCheck(pos, target) {
    //CHANGE FROM POS TO CLASS for DIJKSTRA
    return pos[0] === target[0] && pos[1] === target[1];
  }
  debugMan(nums, target){
    let numHash = {}
  
    for (let i = 0; i < nums.length; i ++){
      numHash[nums[i]] = i;
    

    }
    let numHashVal = (Object.values(numHash))

    for (let i = 0; i < nums.length; i ++){
      let diff = target - nums[i] 
      if (numHash.hasOwnProperty(diff) && numHash[diff] !== i){
        return [i, numHash[diff]]
      }
    }
  }

  preScan(pos, target) {
    let queue = [target];
    // debugger
    this.debugMan([3,3], 6)
    //  $(`li[pos='${pos[0]},${pos[1]}']`).data("dist", 0);
    while (!this.hit) {
      let currPos = queue.shift();
      if (this.searchCheck(currPos, pos)) {
        this.hit = true;
      } else {
        let positions = this.preScanNeighbors(currPos);
        $(`li[pos='${currPos[0]},${currPos[1]}']`).data("children", positions);

        // .append('<p class="message">' + $(`li[pos='${currPos[0]},${currPos[1]}']`).data().scanDist + '</p>')

        queue = queue.concat(positions);
      }
    }
  }
  validMoves(pos) {
    return (
      pos[0] >= 0 && pos[0] < this.height && pos[1] >= 0 && pos[1] < this.width
    );
  }
  preScanNeighbors(pos) {
    // $(`li[pos='${pos[0]},${pos[1]}']`).data("dist", 0);
    let moves;
    this.diag === true
      ? (moves = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
          [1, 1],
          [-1, -1],
          [1, -1],
          [-1, 1]
        ]) //diag but iffy, need to fix edge cases that allow wall hopping
      : (moves = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0]
        ]); //non diag;

    let neighbors = [];

    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      const neighbor = [pos[0] + move[0], pos[1] + move[1]];
      const $li = $(`li[pos='${neighbor[0]},${neighbor[1]}']`);
      if (
        !$li.hasClass("wall") &&
        !$li.hasClass("scanned") &&
        !$li.hasClass("finish") &&
        this.validMoves(neighbor)
      ) {
        neighbors.push(neighbor);
        $li
        .data({parent: pos})
        .data({scanDist: this.whoIsMyParent(neighbor).data().scanDist + 1})
        //below is more for 
        .addClass("scanned")
        .data("class", "scanned")
        // .append(`<p>` + $li.data().scanDist + `</p`);
        // debugger
      }
    }
    return neighbors;
  }
  //
  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  async search(pos, target) {
    this.preScan(pos, target)
    this.hit = false;
    // debugger
    let queue = [pos];

    while (!this.hit) {
      let currPos = queue.shift();
      if (this.searchCheck(currPos, target)) {
        this.hit = true;
      } else {
        let positions = this.neighbors(currPos);
        await this.sleep(15).then(() => {
          $(`li[pos='${currPos[0]},${currPos[1]}']`).data(
            "children",
            positions
          );
        });

        queue = queue.concat(positions);
      }
    }
    // this.makePath();
  }
  neighbors(pos) {
    let moves;
    this.diag === true
      ? (moves = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
          [1, 1],
          [-1, -1],
          [1, -1],
          [-1, 1]
        ]) //diag but iffy, need to fix edge cases that allow wall hopping
      : (moves = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0]
        ]); //non diag;

    let neighbors = [];

    for (let i = 0; i < moves.length; i++) {
      const move = moves[i];
      const neighbor = [pos[0] + move[0], pos[1] + move[1]];
      const $li = $(`li[pos='${neighbor[0]},${neighbor[1]}']`);
      const $pos = $(`li[pos='${pos[0]},${pos[1]}']`);
      if (
        !$li.hasClass("wall") &&
        !$li.hasClass("visited") &&
        !$li.hasClass("frog") &&
        this.validMoves(neighbor) &&
        ($pos.data().scanDist > $li.data().scanDist)
      ) {
        neighbors.push(neighbor);
        $li
          .data("class", "visited")
          .addClass("visited")
          .data("parent", pos)
          .data("dist", this.whoIsMyParent(neighbor).data().dist + 1);
      }
    }
    return neighbors;
  }
}

export default AStar;