import TileNode from "./tile_node";


class DrijkstraPF{
  constructor(startPos){
    this.start_pos = startPos;
    this.considered_positions = [startPos];
    this.rootNode = new TileNode({ pos: startPos })
  }
  valid_moves(pos){
    //checks if adjacent positions are 
    let validMoves = [];
    let curX = pos[0];
    let curY = pos[1];
    for (let i = 0; i < MOVES.length; i++) {
      const delta = MOVES[i];
      newPos = [delta[0] + curX, delta[1] + curY];

      if (newPos[0] >= 0 && newPos[0] <= 39){
        if (newPos[1] >= 0 && newPos[1] <= 19) {
          validMoves.push(newPos);
        }
      }
    };
    return validMoves;
  }

  buildMoveTree(){
   
    let nodes = [this.rootNode];
    while (nodes.length > 0){
      let currNode = nodes.shift();
      let currPos = currNode.pos;

    }
  }
  newMovePos(pos) {
    this.valid_moves(pos).filter(moves => {
      !this.considered_positions.includes(moves)
    })
  }

}
const MOVES = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1]
];

export default DrijkstraPF;