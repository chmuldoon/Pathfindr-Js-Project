class BFS{
  constructor(options){
    this.startPos = options.startPos;
    this.endPos = options.endPos;
    this.height = options.height;
    this.width = options.width;
    this.$el = options.$el;
    this.hit = options.hit || false;
    this.diag = options.diag;
  }

  async makePath(){
    let positions = [this.endPos]
    // debugger
    while(!positions.includes(this.startPos)){
      positions.unshift(this.whoIsMyParentCoord(positions[0]))
    }
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      await this.sleep(25).then(() => {
        $(`li[pos='${pos[0]},${pos[1]}']`).addClass("path")
          .append('<p class="message">' + $(`li[pos='${pos[0]},${pos[1]}']`).data().dist + '</p>')
      })
    }
  }
  whoIsMyParent(pos){
    parent = $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;
    return $(`li[pos='${parent[0]},${parent[1]}']`)
  }
  whoIsMyParentCoord(pos) {
    return $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;
  }

  searchCheck(pos, target){
    return (pos[0] === target[0] && pos[1] === target[1]);
  }

  async search(pos, target) {
    debugger
    let queue = [pos]

    while (!this.hit){
      let currPos = queue.shift();
      if (this.searchCheck(currPos, target)) {
        this.hit = true;
      }else{
        let positions = this.neighbors(currPos)
        await this.sleep(15).then(() => {
          $(`li[pos='${currPos[0]},${currPos[1]}']`).data("children", positions);
        });
     
        queue = queue.concat(positions);
      }
    }
    this.makePath()
  }
  
  validMoves(pos){
    return (pos[0] >= 0 && pos[0] < this.height && pos[1] >= 0 && pos[1] < this.width)
  }
  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  neighbors(pos){
    let moves = [[0, 1], 
      [0, -1], [1, 0], 
      [-1, 0], [1, 1], 
      [-1, -1], [1, -1], 
      [-1, 1]]
    let neighbors = [];
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i]
      const neighbor = [pos[0] + move[0], pos[1] + move[1]];
      if (!$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass("wall") && !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass("visited") && !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass("frog")&& this.validMoves(neighbor)){
        neighbors.push(neighbor)
        $(`li[pos='${neighbor[0]},${neighbor[1]}']`)
          .data("class", "visited")
          .addClass("visited")
          .data("parent", pos).data("dist", (this.whoIsMyParent(neighbor).data().dist + 1))
      }
    }
    return neighbors;
  }


}

export default BFS;