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
class Dijkstra{
  constructor(options){
    this.startPos = options.startPos;
    this.endPos = options.endPos;
    this.height = options.height;
    this.width = options.width;
    this.$el = options.$el;
  }
  search(){

  }
  // Mark all nodes unvisited.Create a set of all the unvisited nodes called the unvisited set.
  unvisited(){
    let unvisited = []
    for (let rowIdx = 0; rowIdx < this.height; rowIdx++) {
      for (let coldIdx = 0; coldIdx < this.width; coldIdx++) {
        let position = [rowIdx, coldIdx];
        if (position[0] === this.startPos[0] && position[1] === this.startPos[1]){
          let nothing = "happen"
        } else if (!$(`li[pos='${rowIdx},${coldIdx}']`).hasClass("visted")){
          unvisited.push(position);
        }
      }
    }
    return unvisited;
  }
  deltaNum(num1, num2) {
    if (num1 > num2){
      return num1 - num2
    }else{
      return num2 - num1
    }
  }
  deltaPos(pos1, pos2){
    let x = this.deltaNum(pos1[0], pos2[0]);
    let y = this.deltaNum(pos1[1], pos2[1]);
    return (x + y);
  }
  // Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes.
  //  Set the initial node as current.
  assignDistance(){
    let positions = this.unvisited();
    //go through every "node" in unvisted, assign a distance value, value will added via .data("distance", "${}") also add to the center so it can be visible
    for (let i = 0; i < positions.length; i++) {
      let position = positions[i];
      let x = position[0];
      let y = position[1];
      $(`li[pos='${x},${y}']`).data("distance", `${this.deltaPos(this.startPos, position)}`);
    }
    // For the current node, consider all of its unvisited neighbours and calculate their tentative distances through the current
    // node.Compare the newly calculated tentative distance to the current assigned value and assign the smaller one.For example, 
    // if the current node A is marked with a distance of 6, and the edge connecting it with a neighbour B has length 2, then the
    // distance to B through A will be 6 + 2 = 8. If B was previously marked with a distance greater than 8 then change it to 8.
    // Otherwise, the current value will be kept.
  }
  checkNeighbors(pos){
    let adjacents = this.neighbors(pos);
    let hit = false
    adjacents.forEach(neighbor => {
      // debugger
      if (neighbor[0] === this.endPos[0] && neighbor[1] === this.endPos[1]){
        console.log("HIT");
        hit = true
        return true;
      }
    });
    // debugger
    if (!hit){
      adjacents.forEach(neighbor => {
        this.checkNeighbors(neighbor);
      });
    }

  }
  neighbors(pos){
    let moves = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    let neighbors = []
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i]
      const neighbor = [pos[0] + move[0], pos[1] + move[1]];
      if (!$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass("wall") && !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass("visited")){
        // debugger
        neighbors.push(neighbor)
        //testing
        $(`li[pos='${neighbor[0]},${neighbor[1]}']`).data("class", "visted")
        $(`li[pos='${neighbor[0]},${neighbor[1]}']`).addClass("visited")
        //testing over
      }
    }
    // debugger
    return neighbors;
  }

}

export default Dijkstra;