/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/tree.tsx":
/*!*********************!*\
  !*** ./js/tree.tsx ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar NotebookEntry = function (props) {\r\n    // TODO: Collapse\r\n    return (React.createElement(\"div\", null,\r\n        React.createElement(\"a\", { href: '' },\r\n            props.name,\r\n            \" \"),\r\n        props.files));\r\n};\r\nvar FileEntry = function (props) {\r\n    return (React.createElement(\"div\", null,\r\n        React.createElement(\"a\", { href: '' },\r\n            \" \",\r\n            props.name,\r\n            \" \")));\r\n};\r\nvar notebooks = [];\r\n/*\tGet Data From Server */\r\nfunction fetch_notebooks() {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        return __generator(this, function (_a) {\r\n            fetch('/api/notebooks/').then(function (res) { return res.json(); }).then(function (result) {\r\n                for (var i = 0; i < result.length; i++) {\r\n                    console.log(result[i]['title']);\r\n                }\r\n            });\r\n            return [2 /*return*/];\r\n        });\r\n    });\r\n}\r\nfunction fetch_files_of_notebook(notebook) {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        var payload, req;\r\n        return __generator(this, function (_a) {\r\n            payload = { \"name\": notebook };\r\n            req = new XMLHttpRequest();\r\n            req.open(\"POST\", \"http://localhost:8000/api/notebook/files\");\r\n            req.setRequestHeader(\"Content-Type\", 'application/json');\r\n            req.send(JSON.stringify(payload));\r\n            req.onreadystatechange = function () {\r\n                if (req.readyState == 4 && req.status == 200) {\r\n                    console.log(req.responseText);\r\n                }\r\n            };\r\n            return [2 /*return*/];\r\n        });\r\n    });\r\n}\r\nfunction fetch_tree() {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        var notebooks, _i, notebooks_1;\r\n        return __generator(this, function (_a) {\r\n            notebooks = fetch_notebooks();\r\n            for (_i = 0, notebooks_1 = notebooks; _i < notebooks_1.length; _i++) {\r\n                i = notebooks_1[_i];\r\n                fetch_files_of_notebook(i);\r\n            }\r\n            return [2 /*return*/];\r\n        });\r\n    });\r\n}\r\nfetch_tree();\r\n\n\n//# sourceURL=webpack://0.1/./js/tree.tsx?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/tree.tsx"](0, __webpack_exports__);
/******/ 	
/******/ })()
;