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

/***/ "./src/a*.js":
/*!*******************!*\
  !*** ./src/a*.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass AStar {\n  constructor(options) {\n    this.startPos = options.startPos;\n    this.endPos = options.endPos;\n    this.height = options.height;\n    this.width = options.width;\n    this.$el = options.$el;\n    this.hit = options.hit || false;\n    this.diag = options.diag;\n  }\n\n  // async makePath() {\n  //   let positions = [this.endPos];\n  //   // debugger\n  //   while (!positions.includes(this.startPos)) {\n  //     positions.unshift(this.whoIsMyParentCoord(positions[0]));\n  //   }\n  //   for (let i = 0; i < positions.length; i++) {\n  //     const pos = positions[i];\n  //     await this.sleep(25).then(() => {\n  //       $(`li[pos='${pos[0]},${pos[1]}']`)\n  //         .addClass(\"path\")\n  //         .append(\n  //           '<p class=\"message\">' +\n  //             $(`li[pos='${pos[0]},${pos[1]}']`).data().dist +\n  //             \"</p>\"\n  //         );\n  //     });\n  //   }\n  // }\n  whoIsMyParent(pos) {\n    parent = $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;\n    // debugger\n    return $(`li[pos='${parent[0]},${parent[1]}']`);\n  }\n  whoIsMyParentCoord(pos) {\n    return $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;\n  }\n\n  distFromEnd(pos) {\n    let x =\n      pos[0] < this.endPos[0]\n        ? this.endPos[0] - pos[0]\n        : pos[0] - this.endPos[0];\n    let y =\n      pos[1] < this.endPos[1]\n        ? this.endPos[1] - pos[1]\n        : pos[1] - this.endPos[1];\n    return x + y;\n  }\n\n  searchCheck(pos, target) {\n    //CHANGE FROM POS TO CLASS for DIJKSTRA\n    return pos[0] === target[0] && pos[1] === target[1];\n  }\n  debugMan(nums, target){\n    let numHash = {}\n  \n    for (let i = 0; i < nums.length; i ++){\n      numHash[nums[i]] = i;\n    \n\n    }\n    let numHashVal = (Object.values(numHash))\n\n    for (let i = 0; i < nums.length; i ++){\n      let diff = target - nums[i] \n      if (numHash.hasOwnProperty(diff) && numHash[diff] !== i){\n        return [i, numHash[diff]]\n      }\n    }\n  }\n\n  preScan(pos, target) {\n    let queue = [target];\n    // debugger\n    this.debugMan([3,3], 6)\n    //  $(`li[pos='${pos[0]},${pos[1]}']`).data(\"dist\", 0);\n    while (!this.hit) {\n      let currPos = queue.shift();\n      if (this.searchCheck(currPos, pos)) {\n        this.hit = true;\n      } else {\n        let positions = this.preScanNeighbors(currPos);\n        $(`li[pos='${currPos[0]},${currPos[1]}']`).data(\"children\", positions);\n\n        // .append('<p class=\"message\">' + $(`li[pos='${currPos[0]},${currPos[1]}']`).data().scanDist + '</p>')\n\n        queue = queue.concat(positions);\n      }\n    }\n  }\n  validMoves(pos) {\n    return (\n      pos[0] >= 0 && pos[0] < this.height && pos[1] >= 0 && pos[1] < this.width\n    );\n  }\n  preScanNeighbors(pos) {\n    // $(`li[pos='${pos[0]},${pos[1]}']`).data(\"dist\", 0);\n    let moves;\n    this.diag === true\n      ? (moves = [\n          [0, 1],\n          [0, -1],\n          [1, 0],\n          [-1, 0],\n          [1, 1],\n          [-1, -1],\n          [1, -1],\n          [-1, 1]\n        ]) //diag but iffy, need to fix edge cases that allow wall hopping\n      : (moves = [\n          [0, 1],\n          [0, -1],\n          [1, 0],\n          [-1, 0]\n        ]); //non diag;\n\n    let neighbors = [];\n\n    for (let i = 0; i < moves.length; i++) {\n      const move = moves[i];\n      const neighbor = [pos[0] + move[0], pos[1] + move[1]];\n      const $li = $(`li[pos='${neighbor[0]},${neighbor[1]}']`);\n      if (\n        !$li.hasClass(\"wall\") &&\n        !$li.hasClass(\"scanned\") &&\n        !$li.hasClass(\"finish\") &&\n        this.validMoves(neighbor)\n      ) {\n        neighbors.push(neighbor);\n        $li\n        .data({parent: pos})\n        .data({scanDist: this.whoIsMyParent(neighbor).data().scanDist + 1})\n        //below is more for \n        .addClass(\"scanned\")\n        .data(\"class\", \"scanned\")\n        // .append(`<p>` + $li.data().scanDist + `</p`);\n        // debugger\n      }\n    }\n    return neighbors;\n  }\n  //\n  sleep(time) {\n    return new Promise((resolve) => setTimeout(resolve, time));\n  }\n  async search(pos, target) {\n    this.preScan(pos, target)\n    this.hit = false;\n    // debugger\n    let queue = [pos];\n\n    while (!this.hit) {\n      let currPos = queue.shift();\n      if (this.searchCheck(currPos, target)) {\n        this.hit = true;\n      } else {\n        let positions = this.neighbors(currPos);\n        await this.sleep(15).then(() => {\n          $(`li[pos='${currPos[0]},${currPos[1]}']`).data(\n            \"children\",\n            positions\n          );\n        });\n\n        queue = queue.concat(positions);\n      }\n    }\n    // this.makePath();\n  }\n  neighbors(pos) {\n    let moves;\n    this.diag === true\n      ? (moves = [\n          [0, 1],\n          [0, -1],\n          [1, 0],\n          [-1, 0],\n          [1, 1],\n          [-1, -1],\n          [1, -1],\n          [-1, 1]\n        ]) //diag but iffy, need to fix edge cases that allow wall hopping\n      : (moves = [\n          [0, 1],\n          [0, -1],\n          [1, 0],\n          [-1, 0]\n        ]); //non diag;\n\n    let neighbors = [];\n\n    for (let i = 0; i < moves.length; i++) {\n      const move = moves[i];\n      const neighbor = [pos[0] + move[0], pos[1] + move[1]];\n      const $li = $(`li[pos='${neighbor[0]},${neighbor[1]}']`);\n      const $pos = $(`li[pos='${pos[0]},${pos[1]}']`);\n      if (\n        !$li.hasClass(\"wall\") &&\n        !$li.hasClass(\"visited\") &&\n        !$li.hasClass(\"frog\") &&\n        this.validMoves(neighbor) &&\n        ($pos.data().scanDist > $li.data().scanDist)\n      ) {\n        neighbors.push(neighbor);\n        $li\n          .data(\"class\", \"visited\")\n          .addClass(\"visited\")\n          .data(\"parent\", pos)\n          .data(\"dist\", this.whoIsMyParent(neighbor).data().dist + 1);\n      }\n    }\n    return neighbors;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (AStar);\n\n//# sourceURL=webpack:///./src/a*.js?");

/***/ }),

/***/ "./src/dijkstra.js":
/*!*************************!*\
  !*** ./src/dijkstra.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tile_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile_node */ \"./src/tile_node.js\");\n\n//Dijkstra, bfs \n// 1\n// Mark all nodes unvisited.Create a set of all the unvisited nodes called the unvisited set.\n// 2\n// Assign to every node a tentative distance value: set it to zero for our initial node and to infinity for all other nodes.\n//  Set the initial node as current.\n// 3\n// For the current node, consider all of its unvisited neighbours and calculate their tentative distances through the current\n// node.Compare the newly calculated tentative distance to the current assigned value and assign the smaller one.For example, \n// if the current node A is marked with a distance of 6, and the edge connecting it with a neighbour B has length 2, then the\n// distance to B through A will be 6 + 2 = 8. If B was previously marked with a distance greater than 8 then change it to 8.\n// Otherwise, the current value will be kept.\n// 4\n// When we are done considering all of the unvisited neighbours of the current node, mark the current node as visited and\n// remove it from the unvisited set.A visited node will never be checked again.\n// 5\n// If the destination node has been marked visited(when planning a route between two specific nodes) or if the smallest\n// tentative distance among the nodes in the unvisited set is infinity(when planning a complete traversal; occurs when\n// there is no connection between the initial node and remaining unvisited nodes), then stop.The algorithm has finished.\n// 6\n// Otherwise, select the unvisited node that is marked with the smallest tentative distance, set it as the new \"current node\",\n//   and go back to step 3.\n\n\n/// NEW NOTE THIS ISNT ENTIRELY DIJKSTRA, so possible name change in the works \nclass Dijkstra{\n  constructor(options){\n    this.startPos = options.startPos;\n    this.endPos = options.endPos;\n    this.height = options.height;\n    this.width = options.width;\n    this.$el = options.$el;\n    this.hit = options.hit || false;\n    this.diag = options.diag;\n  }\n\n  async makePath(){\n    let positions = [this.endPos]\n    // debugger\n    while(!positions.includes(this.startPos)){\n      positions.unshift(this.whoIsMyParentCoord(positions[0]))\n    }\n    for (let i = 0; i < positions.length; i++) {\n      const pos = positions[i];\n      await this.sleep(25).then(() => {\n        $(`li[pos='${pos[0]},${pos[1]}']`).addClass(\"path\")\n          .append('<p class=\"message\">' + $(`li[pos='${pos[0]},${pos[1]}']`).data().dist + '</p>')\n      })\n    }\n  }\n  whoIsMyParent(pos){\n    parent = $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;\n    return $(`li[pos='${parent[0]},${parent[1]}']`)\n  }\n  whoIsMyParentCoord(pos) {\n    return $(`li[pos='${pos[0]},${pos[1]}']`).data().parent;\n  }\n\n  searchCheck(pos, target){\n    return (pos[0] === target[0] && pos[1] === target[1]);\n  }\n\n  async search(pos, target) {\n    let queue = [pos]\n\n    while (!this.hit){\n      let currPos = queue.shift();\n      if (this.searchCheck(currPos, target)) {\n        this.hit = true;\n      }else{\n        let positions = this.neighbors(currPos)\n        await this.sleep(15).then(() => {\n          $(`li[pos='${currPos[0]},${currPos[1]}']`).data(\"children\", positions);\n        });\n     \n        queue = queue.concat(positions);\n      }\n    }\n    this.makePath()\n  }\n  \n  validMoves(pos){\n    return (pos[0] >= 0 && pos[0] < this.height && pos[1] >= 0 && pos[1] < this.width)\n  }\n  sleep(time) {\n    return new Promise((resolve) => setTimeout(resolve, time));\n  }\n  neighbors(pos){\n    let moves;\n    (this.diag === true) ?\n      moves = [[0, 1], \n      [0, -1], [1, 0], \n      [-1, 0], [1, 1], \n      [-1, -1], [1, -1], \n      [-1, 1]] //diag but iffy, need to fix edge cases that allow wall hopping \n    :\n      moves = [[0, 1], [0, -1], \n      [1, 0], [-1, 0]];//non diag;\n    \n    let neighbors = []\n    \n    for (let i = 0; i < moves.length; i++) {\n      const move = moves[i]\n      const neighbor = [pos[0] + move[0], pos[1] + move[1]];\n      if (!$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"wall\") && !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"visited\") && !$(`li[pos='${neighbor[0]},${neighbor[1]}']`).hasClass(\"frog\")&& this.validMoves(neighbor)){\n        neighbors.push(neighbor)\n        $(`li[pos='${neighbor[0]},${neighbor[1]}']`)\n          .data(\"class\", \"visited\")\n          .addClass(\"visited\")\n          .data(\"parent\", pos).data(\"dist\", (this.whoIsMyParent(neighbor).data().dist + 1))\n      }\n    }\n    return neighbors;\n  }\n\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Dijkstra);\n\n//# sourceURL=webpack:///./src/dijkstra.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _main_app_logic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main_app_logic */ \"./src/main_app_logic.js\");\n/* harmony import */ var _main_app_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main_app_view */ \"./src/main_app_view.js\");\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  // console.log(\"working\")\n  // const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n  // canvasEl.width = MainAppLogic.DIM_X;\n  // canvasEl.height = MainAppLogic.DIM_Y;\n\n  const ctx = $('.pathfinder');\n  const mainApp = new _main_app_logic__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  window.mainApp = mainApp;\n  new _main_app_view__WEBPACK_IMPORTED_MODULE_1__[\"default\"](mainApp, ctx);\n  // const game = new Game();\n  // window.game = game;\n  // new GameView(game, ctx).start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dijkstra__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dijkstra */ \"./src/dijkstra.js\");\n/* harmony import */ var _a___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./a* */ \"./src/a*.js\");\n\n\n\n\nclass MainAppView {\n  constructor(appLogic, $el) {\n    this.appLogic = appLogic;\n    this.$el = $el;\n    this.helDown = false;\n    this.over = false;\n    this.height = 20;\n    this.width = 40;\n    this.diag = false;\n    //testing \n    //add frogs finish and dijkstra when you can\n    this.makeGrid();\n    this.addFrog([9, 10]);\n    this.addFinish([9, 30]);\n    this.bindEvents();\n\n\n  }\n  bindEvents() {\n    // install a handler on the `li` elements inside the board.\n    //tests click and logs position and info \n    this.$el.on(\"click\", \"li\", event => {\n      // console.log($(event.currentTarget).data().pos)\n      console.log($(event.currentTarget).data())\n      console.log((event.currentTarget))\n\n    })\n    //changes heldown boolean, useful for creating walls\n    this.$el.on(\"mousedown\", \"li\", event => {\n      this.helDown = true\n    })\n    this.$el.on(\"mouseup\", \"li\", event => {\n      this.helDown = false\n    })\n    //draws walls and removes\n    this.$el.on(\"mouseenter\", \"li\", (event => {\n      this.toggleWall(event.currentTarget)\n      this.over = true\n    }));\n    this.$el.on(\"mouseleave\", \"li\", event => {\n      this.over = false;\n    })\n    //places frogs also deletes, ideally I could replace that with drag and drop\n    //but thats hard as of now\n    //NOTES: PLACEMENT WORKS HOWEVER still need to limit amount for now,\n    // \n\n    this.$el.on(\"dblclick\", \"li\", event => {\n      if (event.shiftKey){\n        if ($(event.currentTarget).data().class === \"finish\") {\n          $(event.currentTarget).removeClass(\"finish\").data(\"class\", \"blank\");\n        } else {\n          let pos = $(event.currentTarget).data().pos\n          this.addFinish(pos);\n        }\n      } else{\n        if ($(event.currentTarget).data().class === \"frog\") {\n          $(event.currentTarget).removeClass(\"frog\").data(\"class\", \"blank\");\n        } else {\n          let pos = $(event.currentTarget).data().pos\n          this.addFrog(pos);\n        }\n      }\n    })\n    const that = this;\n    // this.dijkstra([9, 10])\n\n    $(\".clear\").click(function(e){\n      // debugger\n      for (let rowIdx = 0; rowIdx < that.height; rowIdx++) {\n        for (let coldIdx = 0; coldIdx < that.width; coldIdx++) {\n          $(`li[pos='${rowIdx},${coldIdx}']`)\n          .removeClass(\"visited wall path frog finish scanned\")\n          .addClass(\"blank\")\n          .removeData(\"dist children parent class scanned\")\n          .empty()\n          that.addFrog([9, 10]);\n          that.addFinish([9, 30]);\n        }\n      }\n    })\n    $(\".diag\").click(function (e) {\n      if(that.diag === false){\n        that.diag = true\n        $(\".diag\").empty().append(\"Diagonal On\");\n      }else{\n        that.diag = false\n        $(\".diag\").empty().append(\"Diagonal Off\");\n      }\n      console.log(that.diag);\n    })\n\n    $(\".makePath\").click(function(e){\n      that.dijkstra();\n    })\n\n\n    \n    // console.log(event.currentTarget.className)\n  }\n  addPath(pos){\n    $(`li[pos='${pos[0]},${pos[1]}']`)\n      .addClass(\"path\")\n      .data(\"class\", \"path\");\n  }\n\n  addFrog(pos) {\n    $(`li[pos='${pos[0]},${pos[1]}']`)\n      .addClass(\"frog\")\n      .addClass(\"special\")\n      .data(\"class\", \"frog\")\n      .data(\"dist\", 0);\n  }\n  addFinish(pos) {\n    $(`li[pos='${pos[0]},${pos[1]}']`)\n      .addClass(\"finish\")\n      .addClass(\"special\")\n      .data(\"class\", \"finish\")\n      .data(\"scanDist\", 0);\n\n\n  }\n  //testing\n  dijkstra(){\n    // $(\".frog\")\n    // debugger\n    let start = $(\".frog\").data().pos\n    let end = $(\".finish\").data().pos\n    let dijkstra = new _a___WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ startPos: start, endPos: end, width: this.width, height: this.height, $el: this.$el, diag: this.diag})\n    // debugger\n    // return dijkstra.search(end, start);\n    return dijkstra.search(start, end);\n\n  }\n  aStart(){\n    // $(\".frog\")\n    // debugger\n    let start = $(\".frog\").data().pos\n    let end = $(\".finish\").data().pos\n    let aStar = new _a___WEBPACK_IMPORTED_MODULE_1__[\"default\"]({ startPos: start, endPos: end, width: this.width, height: this.height, $el: this.$el, diag: this.diag})\n    // debugger\n    return aStar.search(start, end);\n  }\n\n  //end of testing\n  toggleWall(eventTarget){\n    if (this.helDown && !$(eventTarget).hasClass(\"wall\") && !$(eventTarget).hasClass(\"special\")) {\n      $(eventTarget).addClass(\"wall\")\n        .data(\"class\", \"wall\");\n\n      // $(eventTarget).data().node.value = \"obstacle\";\n    \n    } else if (this.helDown && ($(eventTarget).hasClass(\"wall\"))) {\n      $(eventTarget).removeClass(\"wall\")\n        .data(\"class\", \"blank\");\n\n      // $(eventTarget).data().node.value = null;\n    }\n  }\n\n  moveFrog(){\n\n  }\n\n  makeGrid() {\n    //creates the grid\n    const $ul = $(\"<ul>\")\n    for (let rowIdx = 0; rowIdx < this.height; rowIdx++) {\n      for (let coldIdx = 0; coldIdx < this.width; coldIdx++) {\n        let $li = $(\"<li>\");\n        // let node = new TileNode({ pos: [rowIdx, coldIdx] })\n        $li.attr(\"pos\", [rowIdx, coldIdx])\n          .data(\"pos\", [rowIdx, coldIdx])\n          .data(\"class\", \"blank\")\n        $ul.append($li);\n        // console.log($li.data())\n      }\n    }\n    this.$el.append($ul);\n  }\n  addClear() {\n    const $button = $(\"<button>\")\n    this.$el.append($button);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MainAppView);\n\n//# sourceURL=webpack:///./src/main_app_view.js?");

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