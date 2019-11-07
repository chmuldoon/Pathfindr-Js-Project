import TileNode from "./tile_node";
//Dijkstra, bfs 
// 1
// Mark all nodes unvisited.Create a set of all the unvisited nodes called the unvisited set.
// 2
// Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes.
//  Set the initial node as current.
// 3
// For the current node, consider all of its unvisited neighbours and calculate their tentative distances through the current
// node.Compare the newly calculated tentative distance to the current assigned value and assign the smaller one.For example, 
// if the current node A is marked with a distance of 6, and the edge connecting it with a neighbour B has length 2, then the
// distance to B through A will be 6 + 2 = 8. If B was previously marked with a distance greater than 8 then change it to 8.
// Otherwise, the current value will be kept.
// 4
// When we are done considering all of the unvisited neighbours of the current node, mark the current node as visited and
// remove it from the unvisited set.A visited node will never be checked again.
// 5
// If the destination node has been marked visited(when planning a route between two specific nodes) or if the smallest
// tentative distance among the nodes in the unvisited set is infinity(when planning a complete traversal; occurs when
// there is no connection between the initial node and remaining unvisited nodes), then stop.The algorithm has finished.
// 6
// Otherwise, select the unvisited node that is marked with the smallest tentative distance, set it as the new "current node",
//   and go back to step 3.


/// NEW NOTE THIS ISNT ENTIRELY DIJKSTRA, so possible name change in the works 
class Dijkstra{
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
    let moves;
    (this.diag === true) ?
      moves = [[0, 1], 
      [0, -1], [1, 0], 
      [-1, 0], [1, 1], 
      [-1, -1], [1, -1], 
      [-1, 1]] //diag but iffy, need to fix edge cases that allow wall hopping 
    :
      moves = [[0, 1], [0, -1], 
      [1, 0], [-1, 0]];//non diag;
    
    let neighbors = []
    
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

export default Dijkstra;