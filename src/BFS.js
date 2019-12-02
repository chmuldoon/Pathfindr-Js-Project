class BFS {
  constructor(options) {
    this.startPos = options.startPos;
    this.endPos = options.endPos;
    this.height = options.height;
    this.width = options.width;
    this.$el = options.$el;
    this.hit = options.hit || false;
    this.diag = options.diag;
    this.visitArr = [this.startPos];
    this.spaceError = false;
  }
  async makePath() {
    let positions = [this.endPos];
    // debugger
    while (!positions.includes(this.startPos)) {
      positions.unshift(this.whoIsMyParentCoord(positions[0]));
    }
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      await this.sleep(30).then(() => {
        $(`li[pos='${pos[0]},${pos[1]}']`).addClass("path");
        // .append('<p class="message">' + $(`li[pos='${pos[0]},${pos[1]}']`).data().dist + '</p>')
      });
    }
  }
  async vistedSearch(start, target) {
    // debugger
    let queue = [start];
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
    this.makePath();
  }
  visitedNeighbors(pos) {
    let moves = this.diag
      ? [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
          [1, 1],
          [-1, -1],
          [1, -1],
          [-1, 1]
        ]
      : [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0]
        ];
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
        .data("dist", this.whoIsMyParent(neighbor).data().dist + 1);
    });
    return neighbors;
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
  //       $(`li[pos='${pos[0]},${pos[1]}']`).addClass("path");
  //     });
  //   }
  // }
  whoIsMyParent(pos) {
    parent = $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;
    return $(`li[pos='${parent[0]},${parent[1]}']`);
  }
  whoIsMyParentCoord(pos) {
    return $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;
  }

  searchCheck(pos, target) {
    if (pos === undefined) {
      debugger;
      this.spaceError = true;
      return false;
    }
    return pos[0] === target[0] && pos[1] === target[1];
  }

  async search(pos, target) {
    let queue = [pos];

    while (!this.hit && !this.spaceError) {
      let currPos = queue.shift();
      if (this.searchCheck(currPos, target)) {
        this.hit = true;
      } else {
        if (!this.spaceError) {
          let positions = this.neighbors(currPos);
          $(`li[pos='${currPos[0]},${currPos[1]}']`).data(
            "children",
            positions
          );
          queue = queue.concat(positions);
        }
      }
    }
    for (let i = 0; i < this.visitArr.length; i++) {
      const pos = this.visitArr[i];
      await this.sleep(20).then(() => {
        $(`li[pos='${pos[0]},${pos[1]}']`)
          .data("class", "colored")
          .addClass("colored");
      });
    }
    if (this.spaceError) {
      $(".Errors").append(
        "<b>No possible route, clear path, edit walls and try again.</b>"
      );
      this.spaceError = false;
    } else {
      this.hit = false;
      this.vistedSearch(this.startPos, this.endPos);
    }
  }
  subPos(pos, nextPos) {
    let dir = [nextPos[0] - pos[0], nextPos[1] - pos[1]];
    let sub1 = [pos[0] + dir[0], pos[1]];
    let sub2 = [pos[0], pos[1] + dir[1]];
    return [sub1, sub2];
  }

  validMoves(pos, nextPos) {
    if (!(nextPos[0] >= 0)) {
      return false;
    }
    if (!(nextPos[0] < this.height)) {
      return false;
    }
    if (!(nextPos[1] >= 0)) {
      return false;
    }
    if (!(nextPos[1] < this.width)) {
      return false;
    }
    if ($(`li[pos='${nextPos[0]},${nextPos[1]}']`).hasClass("wall")) {
      return false;
    }
    if (
      this.subPos(pos, nextPos).every(os =>
        $(`li[pos='${os[0]},${os[1]}']`).hasClass("wall")
      )
    ) {
      return false;
    }
    return true;
  }
  sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  neighbors(pos) {
    let moves = [[0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
          [1, 1],
          [-1, -1],
          [1, -1],
          [-1, 1]];

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
        this.visitArr.push(neighbor);
        neighbors.push(neighbor);
        // .data("parent", pos)
        // .data("dist", this.whoIsMyParent(neighbor).data().dist + 1);
      }
    }
    return neighbors;
  }
}

export default BFS;