/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dijkstra.js":
/*!*************************!*\
  !*** ./src/dijkstra.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tile_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile_node */ \"./src/tile_node.js\");\n\n//Dijkstra, bfs \n// 1\n// Mark all nodes unvisited.Create a set of all the unvisited nodes called the unvisited set.\n// 2\n// Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes.\n//  Set the initial node as current.\n// 3\n// For the current node, consider all of its unvisited neighbours and calculate their tentative distances through the current\n// node.Compare the newly calculated tentative distance to the current assigned value and assign the smaller one.For example, \n// if the current node A is marked with a distance of 6, and the edge connecting it with a neighbour B has length 2, then the\n// distance to B through A will be 6 + 2 = 8. If B was previously marked with a distance greater than 8 then change it to 8.\n// Otherwise, the current value will be kept.\n// 4\n// When we are done considering all of the unvisited neighbours of the current node, mark the current node as visited and\n// remove it from the unvisited set.A visited node will never be checked again.\n// 5\n// If the destination node has been marked visited(when planning a route between two specific nodes) or if the smallest\n// tentative distance among the nodes in the unvisited set is infinity(when planning a complete traversal; occurs when\n// there is no connection between the initial node and remaining unvisited nodes), then stop.The algorithm has finished.\n// 6\n// Otherwise, select the unvisited node that is marked with the smallest tentative distance, set it as the new \"current node\",\n//   and go back to step 3.\n\n\n/// NEW NOTE THIS ISNT ENTIRELY DIJKSTRA, so possible name change in the works \nclass Dijkstra{\n  constructor(options){\n    this.startPos = options.startPos;\n    this.endPos = options.endPos;\n    this.height = options.height;\n    this.width = options.width;\n    this.$el = options.$el;\n    this.hit = options.hit || false;\n  }\n\n  // Mark all nodes unvisited.Create a set of all the unvisited nodes called the unvisited set.\n  unvisited(){\n    let unvisited = []\n    for (let rowIdx = 0; rowIdx < this.height; rowIdx++) {\n      for (let coldIdx = 0; coldIdx < this.width; coldIdx++) {\n        let position = [rowIdx, coldIdx];\n        if (position[0] === this.startPos[0] && position[1] === this.startPos[1]){\n          let nothing = \"happen\"\n        } else if (!$(`li[pos='${rowIdx},${coldIdx}']`).hasClass(\"visted\")){\n          unvisited.push(position);\n        }\n      }\n    }\n    return unvisited;\n  }\n  deltaNum(num1, num2) {\n    if (num1 > num2){\n      return num1 - num2\n    }else{\n      return num2 - num1\n    }\n  }\n  deltaPos(pos1, pos2){\n    let x = this.deltaNum(pos1[0], pos2[0]);\n    let y = this.deltaNum(pos1[1], pos2[1]);\n    return (x + y);\n  }\n  // Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes.\n  //  Set the initial node as current.\n  assignDistance(){\n    let positions = []\n    for (let rowIdx = 0; rowIdx < this.height; rowIdx++) {\n      for (let coldIdx = 0; coldIdx < this.width; coldIdx++) {\n       \n        if ($(`li[pos='${rowIdx},${coldIdx}']`).hasClass(\"visited\")){\n          positions.push([rowIdx, coldIdx]);\n        }\n\n      }\n    }\n\n    //go through every \"node\" in unvisted, assign a distance value, value will added via .data(\"distance\", \"${}\") also add to the center so it can be visible\n    for (let i = 0; i < positions.length; i++) {\n      let position = positions[i];\n      let x = position[0];\n      let y = position[1];\n      // let $p = $(`<p>${this.deltaPos(this.endPos, position)}</p>`)\n      $(`li[pos='${x},${y}']`).data(\"distance\", `${this.deltaPos(this.startPos, position)}`);\n      // debugger\n      $(`li[pos='${x},${y}']`).append('<p>' + this.deltaPos(this.startPos, position) + '</p>');\n\n    }\n    // For the current node, consider all of its unvisited neighbours and calculate their tentative distances through the current\n    // node.Compare the newly calculated tentative distance to the current assigned value and assign the smaller one.For example, \n    // if the current node A is marked with a distance of 6, and the edge connecting it with a neighbour B has length 2, then the\n    // distance to B through A will be 6 + 2 = 8. If B was previously marked with a distance greater than 8 then change it to 8.\n    // Otherwise, the current value will be kept.\n  }\n  // checkNeighbors(pos){\n  //   let adjacents = this.neighbors(pos);\n  //   adjacents.forEach(neighbor => {\n  //     // debugger \n  //     if (neighbor[0] === this.endPos[0] && neighbor[1] === this.endPos[1]){\n  //       console.log(\"HIT\");\n  //       this.hit = true\n  //       return true;\n  //     }\n  //   });\n  //   // debugger\n  //   if (!this.hit){\n  //     adjacents.forEach(neighbor => {\n  //       this.checkNeighbors(neighbor);\n  //     });\n  //   }\n\n  // }\n  makePath(){\n    let positions = [this.endPos]\n    // debugger\n    while(!positions.includes(this.startPos)){\n      positions.unshift(this.whoIsMyParentCoord(positions[0]))\n    }\n    positions.forEach(pos => {\n      $(`li[pos='${pos[0]},${pos[1]}']`).addClass(\"path\")\n    })\n\n    \n  }\n  whoIsMyParent(pos){\n    parent = $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;\n    return $(`li[pos='${parent[0]},${parent[1]}']`)\n  }\n  whoIsMyParentCoord(pos) {\n    return $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;\n  }\n\n\n  children(pos){\n\n  }\n  searchCheck(pos, target){\n    return (pos[0] === target[0] && pos[1] === target[1]);\n  }\n  search(pos, target) {\n    let queue = [pos]\n\n    while (!this.hit){\n      let currPos = queue.shift();\n      if (this.searchCheck(currPos, target)) {\n        this.hit = true;\n        console.log(\"HIT\")\n      }else{\n        // this.wait(500);\n        let positions = this.neighbors(currPos);\n        //this next line assigns each li a neighbors set, of the neighbor(s) they discover\n        $(`li[pos='${currPos[0]},${currPos[1]}']`).data(\"children\", positions);\n        // $(`li[pos='${currPos[0]},${currPos[1]}']`).data(\"dist\", dist);\n        // debugger\n\n\n        queue = queue.concat(positions);\n     \n      }\n    }\n    // this.assignDistance();\n    // debugger\n    this.makePath()\n    \n  }\n  validMoves(pos){\n\n    return (pos[0] >= 0 && pos[0] < this.height && pos[1] >= 0 && pos[1] < this.width)\n  }\n  wait(ms) {\n    let start = new Date().getTime();\n    let end = start;\n    while (end < start + ms) {\n      end = new Date().getTime();\n    }\n  }\n\n\n  neighbors(pos){\n    // let moves = [[0, 1], [0, -1], [1, 0], [-1, 0]];//non diag\n    let moves = [[0, 1], [0, -1], [1, 0], [-1, 0],[1,1], [-1,-1],[1,-1], [-1,1]] //diag but iffy\n    let neighbors = []\n    for (let i = 0; i < moves.length; i++) {\n      const move = moves[i]\n      const neighbor = [pos[0] + move[0], pos[1] + move[1]];\n      if (!$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"wall\") && !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"visited\") && !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"frog\")&& this.validMoves(neighbor)){\n        // debugger\n        neighbors.push(neighbor)\n        //testing\n        $(`li[pos='${neighbor[0]},${neighbor[1]}']`).data(\"class\", \"visted\")\n        $(`li[pos='${neighbor[0]},${neighbor[1]}']`).addClass(\"visited\")\n        $(`li[pos='${neighbor[0]},${neighbor[1]}']`).data(\"parent\", pos).data(\"dist\", (this.whoIsMyParent(neighbor).data().dist + 1))\n        $(`li[pos='${neighbor[0]},${neighbor[1]}']`).append('<p>' + $(`li[pos='${neighbor[0]},${neighbor[1]}']`).data().dist + '</p>')\n\n\n        // debugger\n\n        // if ($(`li[pos='${neighbor[0]},${neighbor[1]}']`).data().parent === this.startPos){\n        //   $(`li[pos='${neighbor[0]},${neighbor[1]}']`).data(\"dist\", 1)\n        // }\n        //testing over\n      }\n    }\n    // debugger\n    return neighbors;\n  }\n  foo(){\n    return true\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Dijkstra);\n\n//# sourceURL=webpack:///./src/dijkstra.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_app_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main_app_logic */ \"./src/main_app_logic.js\");\n/* harmony import */ var _main_app_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main_app_view */ \"./src/main_app_view.js\");\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  console.log(\"working\")\n  // const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n  // canvasEl.width = MainAppLogic.DIM_X;\n  // canvasEl.height = MainAppLogic.DIM_Y;\n\n  const ctx = $('.pathfinder');\n  const mainApp = new _main_app_logic__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  window.mainApp = mainApp;\n  new _main_app_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"](mainApp, ctx);\n  // const game = new Game();\n  // window.game = game;\n  // new GameView(game, ctx).start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/main_app_logic.js":
/*!*******************************!*\
  !*** ./src/main_app_logic.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass MainAppLogic {\n  constructor() {\n    this.tiles = []\n\n  }\n\n\n\n\n\n\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MainAppLogic);\n\n//# sourceURL=webpack:///./src/main_app_logic.js?");

/***/ }),

/***/ "./src/main_app_view.js":
/*!******************************!*\
  !*** ./src/main_app_view.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dijkstra__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dijkstra */ \"./src/dijkstra.js\");\n\n\nclass MainAppView {\n  constructor(appLogic, $el) {\n    this.appLogic = appLogic;\n    this.$el = $el;\n    this.helDown = false;\n    this.over = false;\n    this.height = 20;\n    this.width = 40;\n    //testing \n    //add frogs finish and dijkstra when you can\n    this.makeGrid();\n    this.addFrog([9, 10]);\n    this.addFinish([9, 30]);\n    this.bindEvents();\n\n\n  }\n  bindEvents() {\n    // install a handler on the `li` elements inside the board.\n    //tests click and logs position and info \n    this.$el.on(\"click\", \"li\", event => {\n      console.log($(event.currentTarget).data().pos)\n      console.log($(event.currentTarget).data())\n      console.log((event.currentTarget))\n\n    })\n    //changes heldown boolean, useful for creating walls\n    this.$el.on(\"mousedown\", \"li\", event => {\n      this.helDown = true\n    })\n    this.$el.on(\"mouseup\", \"li\", event => {\n      this.helDown = false\n    })\n    //draws walls and removes\n    this.$el.on(\"mouseenter\", \"li\", (event => {\n      this.toggleWall(event.currentTarget)\n      this.over = true\n    }));\n    this.$el.on(\"mouseleave\", \"li\", event => {\n      this.over = false;\n    })\n    //places frogs also deletes, ideally I could replace that with drag and drop\n    //but thats hard as of now\n    //NOTES: PLACEMENT WORKS HOWEVER still need to limit amount for now,\n    // \n\n    this.$el.on(\"dblclick\", \"li\", event => {\n      if (event.shiftKey){\n        if ($(event.currentTarget).data().class === \"finish\") {\n          $(event.currentTarget).removeClass(\"finish\")\n          $(event.currentTarget).data(\"class\", \"blank\");\n        } else {\n          let pos = $(event.currentTarget).data().pos\n          this.addFinish(pos);\n        }\n      } else{\n        if ($(event.currentTarget).data().class === \"frog\") {\n          $(event.currentTarget).removeClass(\"frog\")\n          $(event.currentTarget).data(\"class\", \"blank\");\n        } else {\n          let pos = $(event.currentTarget).data().pos\n          this.addFrog(pos);\n        }\n      }\n    })\n    const that = this;\n    // this.dijkstra([9, 10])\n    $(document).keydown(function(e){\n      if(e.keyCode == '32'){\n        \n        that.dijkstra();\n      }\n    })\n    \n    console.log(event.currentTarget.className)\n  }\n  addPath(pos){\n    let x = pos[0];\n    let y = pos[1];\n    // $(\"li[pos='9,19']\").data().node.value = \"frog\";\n    $(`li[pos='${x},${y}']`).addClass(\"path\")\n    $(`li[pos='${x},${y}']`).data(\"class\", \"path\");\n  }\n\n  addFrog(pos) {\n    let x = pos[0];\n    let y = pos[1];\n    if (this.over) {\n    }\n    // $(\"li[pos='9,19']\").data().node.value = \"frog\";\n    $(`li[pos='${x},${y}']`).addClass(\"frog\").addClass(\"special\")\n    $(`li[pos='${x},${y}']`).data(\"class\", \"frog\").data(\"dist\", 1);\n  }\n  addFinish(pos) {\n    let x = pos[0];\n    let y = pos[1];\n    // $(\"li[pos='9,19']\").data().node.value = \"frog\";\n    $(`li[pos='${x},${y}']`).addClass(\"finish\").addClass(\"special\")\n    $(`li[pos='${x},${y}']`).data(\"class\", \"finish\");\n\n  }\n  //testing\n  dijkstra(){\n    // $(\".frog\")\n    // debugger\n    let start = $(\".frog\").data().pos\n    let end = $(\".finish\").data().pos\n    let dijkstra = new _dijkstra__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ startPos: start, endPos: end, width: this.width, height: this.height, $el: this.$el})\n    // debugger\n    return dijkstra.search(start, end);\n  }\n\n  //end of testing\n  toggleWall(eventTarget){\n    if (this.helDown && !$(eventTarget).hasClass(\"wall\") && !$(eventTarget).hasClass(\"special\")) {\n      $(eventTarget).addClass(\"wall\");\n      $(eventTarget).data(\"class\", \"wall\");\n\n      // $(eventTarget).data().node.value = \"obstacle\";\n    \n    } else if (this.helDown && ($(eventTarget).hasClass(\"wall\"))) {\n      $(eventTarget).removeClass(\"wall\")\n      $(eventTarget).data(\"class\", \"blank\");\n\n      // $(eventTarget).data().node.value = null;\n    }\n  }\n  // addFinish() {\n  //   // $(\"li[pos='9,30']\").data().node.value = \"finish\";\n  //   $(\"li[pos='9,30']\").addClass(\"finish\").addClass(\"special\");\n  //   $(\"li[pos='9,30']\").data(\"class\", \"finish\");\n\n  // }\n\n\n  moveFrog(){\n\n  }\n  \n  // addWall(){\n  //   if (!$(eventTarget).hasClass(\"wall\")) {\n  //     $(eventTarget).addClass(\"wall\")\n  //   }\n  // }\n  // removeWall(){\n  //   if ($(eventTarget).hasClass(\"wall\")) {\n  //     $(eventTarget).removeClass(\"wall\")\n  //   }\n  // }\n\n\n  makeGrid() {\n    //creates the grid\n    const $ul = $(\"<ul>\")\n    for (let rowIdx = 0; rowIdx < this.height; rowIdx++) {\n      for (let coldIdx = 0; coldIdx < this.width; coldIdx++) {\n        let $li = $(\"<li>\");\n        // let node = new TileNode({ pos: [rowIdx, coldIdx] })\n        $li.attr(\"pos\", [rowIdx, coldIdx]);\n        $li.data(\"pos\", [rowIdx, coldIdx]);\n        $li.data(\"class\", \"blank\")\n        $ul.append($li);\n        // console.log($li.data())\n      }\n    }\n    this.$el.append($ul);\n  }\n  addClear() {\n    const $button = $(\"<button>\")\n    this.$el.append($button);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MainAppView);\n\n//# sourceURL=webpack:///./src/main_app_view.js?");

/***/ }),

/***/ "./src/tile_node.js":
/*!**************************!*\
  !*** ./src/tile_node.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass TileNode{\n  constructor(options){\n    \n    this.pos = options.pos;\n    this.value = options.value || null;\n    this.parents = options.parents || null;\n    this.children = options.children || [];\n  }\n  \n \n\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TileNode); \n\n//# sourceURL=webpack:///./src/tile_node.js?");

/***/ })

/******/ });