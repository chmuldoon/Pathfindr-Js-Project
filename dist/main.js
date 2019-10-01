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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tile_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tile_node */ \"./src/tile_node.js\");\n\n\nclass MainAppView {\n  constructor(appLogic, $el) {\n    this.appLogic = appLogic;\n    this.$el = $el;\n    this.helDown = false\n    this.makeGrid();\n    this.addFinish();\n    this.addFrog();\n    this.bindEvents();\n  }\n  bindEvents() {\n    // install a handler on the `li` elements inside the board.\n    this.$el.on(\"click\", \"li\", event => {\n  \n      console.log($(event.currentTarget).data().node)\n    })\n    this.$el.on(\"mousedown\", \"li\", event => {\n      this.helDown = true\n    })\n    this.$el.on(\"mouseup\", \"li\", event => {\n      this.helDown = false\n    })\n\n    this.$el.on(\"mouseenter\", \"li\", (event => {\n      \n      this.toggleWall(event.currentTarget)\n    \n      \n    }));\n\n    console.log(event.currentTarget.className)\n  }\n\n  toggleWall(eventTarget){\n    if (this.helDown && !$(eventTarget).hasClass(\"wall\") && !$(eventTarget).hasClass(\"special\")) {\n      $(eventTarget).addClass(\"wall\");\n      // debugger\n      $(eventTarget).data().node.value = \"obstacle\";\n    \n    } else if (this.helDown && ($(eventTarget).hasClass(\"wall\"))) {\n      $(eventTarget).removeClass(\"wall\")\n      $(eventTarget).data().node.value = null\n      $(eventTarget).data(\"value\", null)\n    }\n  }\n\n  addFrog(){\n    $(\"li[pos='9,10']\").data().node.value = \"frog\";\n    $(\"li[pos='9,10']\").addClass(\"frog\").addClass(\"special\")\n  }\n  addFinish() {\n    $(\"li[pos='9,30']\").data().node.value = \"finish\";\n    $(\"li[pos='9,30']\").addClass(\"finish\").addClass(\"special\");\n  }\n\n\n  moveFrog(){\n\n  }\n  \n  // addWall(){\n  //   if (!$(eventTarget).hasClass(\"wall\")) {\n  //     $(eventTarget).addClass(\"wall\")\n  //   }\n  // }\n  // removeWall(){\n  //   if ($(eventTarget).hasClass(\"wall\")) {\n  //     $(eventTarget).removeClass(\"wall\")\n  //   }\n  // }\n\n\n  makeGrid() {\n    //creates the grid\n    const $ul = $(\"<ul>\")\n    for (let rowIdx = 0; rowIdx < 20; rowIdx++) {\n      for (let coldIdx = 0; coldIdx < 40; coldIdx++) {\n        let $li = $(\"<li>\");\n        // let node = new TileNode({ pos: [rowIdx, coldIdx] })\n        $li.attr(\"pos\", [rowIdx, coldIdx]);\n        $li.data(\"node\", [rowIdx, coldIdx]);\n        $ul.append($li);\n        // console.log($li.data())\n      }\n    }\n    this.$el.append($ul);\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MainAppView);\n\n//# sourceURL=webpack:///./src/main_app_view.js?");

/***/ }),

/***/ "./src/tile_node.js":
/*!**************************!*\
  !*** ./src/tile_node.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass TileNode{\n  constructor(options){\n    \n    this.pos = options.pos;\n    this.value = options.value || null;\n    this.parents = options.parents || null;\n    this.children = options.children || [];\n  }\n  \n\n\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TileNode); \n\n//# sourceURL=webpack:///./src/tile_node.js?");

/***/ })

/******/ });