class TileNode{
  constructor(options){
    
    this.pos = options.pos;
    this.value = options.value || null;
    this.parents = options.parents || null;
    this.children = options.children || [];
  }
  


}


export default TileNode 