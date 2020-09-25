require("./runtime.js");require("./vendor.js");module.exports =
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["bundle"],{

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/App.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const screen = __webpack_require__("../node_modules/@nativescript/core/platform/platform.js").screen;

const fs = __webpack_require__("../node_modules/@nativescript/core/file-system/file-system.js"); //const documents = fs.knownFolders.documents();


const audio = __webpack_require__("../node_modules/nativescript-audio/audio.js");

const playerTNS = new audio.TNSPlayer();
playerTNS.debug = true;
/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      copyRightsInfo: 'Copyright 2019 © Sylwester K. Mielniczuk',
      coverMsg: 'This will be a cover',
      playMsg: "Play",
      pauseMsg: "Pause",
      stopMsg: "Stop",
      filesMsg: "Files",
      currentVolume: 100,
      currentSpeed: 100,
      currentSongDurationInfo: '',
      currentSongDuration: 0,
      player: playerTNS,
      currentTime: playerTNS.currentTime,
      musicInfo: {
        info: "No info"
      },
      currentProgress: 0,
      playerOptions: {
        audioFile: '~/assets/audio/Czilliout_drums.mp3',
        loop: true,
        completeCallback: function () {
          console.log('finished playing');
        },
        errorCallback: function (errorObject) {
          console.log('------ errorCallback', JSON.stringify(errorObject));
        },
        infoCallback: function (args) {
          console.log('------ infoCallback', JSON.stringify(args));
        }
      },
      fileList: [],
      listOfItems: [{
        id: 1,
        _name: "Dupa"
      }, {
        id: 2,
        _name: "Cipa"
      }, {
        id: 3,
        _name: "Gowno"
      }],
      showList: false,
      progressDynColor: 'deeppink',
      progressScaleY: 4,
      imagesTurn: 80 // audio files - entities
      //_path, _name, _extension

    };
  },

  //		computed: {
  //			rotateMe(arg) {
  //				return { transform: 'rotate(' + this.imagesTurn * arg + 'turn)'}
  //			}
  //		},		
  mounted: function () {
    this.$nextTick(function () {
      console.log('entire view has been rendered');
    }), this.interval = setInterval(() => {
      this.updateTimer();
    }, 60);
    this.updateTimer();
  },
  methods: {
    showCredits() {
      alert({
        title: "Damstrin: Music Player v.0.1",
        message: "Author: Sylwester K. Mielniczuk",
        okButtonText: "That's Amazing!"
      }).then(() => {
        console.log("Alert dialog closed");
      });
    },

    rotateMe(arg) {
      return {
        transform: 'rotate(' + this.imagesTurn * arg + 'turn)'
      };
    },

    skipToNewTime(args) {
      let perc = args.getX() / screen.mainScreen.widthDIPs * 1.1;

      if (perc <= 0) {
        perc = 0;
      }

      if (perc >= 1) {
        pers = 1;
      }

      let newTime = this.currentSongDuration * perc;
      console.log('New time:', newTime);
      this.player.seekTo(newTime); //console.log('skipToNewTime', args.getX());
    },

    showAudioFilesList() {
      this.getAudioFilesList();

      if (this.showList == false) {
        this.showList = true;
      } else {
        this.showList = false;
      }
    },

    onItemTap(e) {
      //console.log('Item tap',this.listOfItems[e.index].text)
      console.log('Item tap', e);
      let audioFileName = this.listOfItems[e.index]._name;
      this.playSelectedMusic(audioFileName);
    },

    readTextFromFile(path) {
      /* this is how you get content of text file */
      // let path = './assets/data/1.txt'; 
      let file = fs.knownFolders.currentApp().getFile(path);
      file.readText().then(res => {
        console.log('file.readText:', res);
        this.musicInfo.info = res.toString();
      }).catch(err => {
        console.log('file.readText: err.stack', err.stack);
      });
    },

    getAudioFilesList() {
      let folder = fs.knownFolders.currentApp().getFolder("assets/audio");
      folder.getEntities().then(entities => {
        console.log('entities', entities);
        this.fileList = entities;
        this.listOfItems = this.fileList; //this.musicInfo.info = JSON.stringify(this.fileList);
      }).catch(err => {
        // Failed to obtain folder's contents.
        console.log('getEntities catch error: ', err.stack);
      });
    },

    updateTimer() {
      this.currentSongDurationInfo = this.formatCurrentTime(this.currentSongDuration);
      this.currentTime = this.formatCurrentTime(this.player.currentTime);
      this.currentProgress = 100 * this.player.currentTime / parseInt(this.currentSongDuration); //this.musicInfo.info = this.currentProgress;

      this.imagesTurn = this.player.currentTime;
    },

    updateInfo(str) {
      this.musicInfo.info = str;
    },

    onSliderValueChanged(e) {
      //				//console.log('slider val',e.value)
      this.currentVolume = e.value;
      this.musicInfo.info = 'New volume: ' + parseInt(this.currentVolume) + "%";
      this.player.volume = this.currentVolume * 0.01;
    },

    onSliderSpeedChanged(e) {
      //				//console.log('slider val',e.value)
      this.currentSpeed = e.value;
      this.musicInfo.info = 'New speed: ' + parseInt(this.currentSpeed, 10) + '%';
      this.player.changePlayerSpeed(this.currentSpeed * 0.01);
    },

    playSelectedMusic(audioFileName) {
      if (this.player.isAudioPlaying() == true) {
        this.player.dispose();
      }

      this.playerOptions.audioFile = '~/assets/audio/' + audioFileName, this.player.initFromFile(this.playerOptions).then(() => {
        this.player.play();
      }).catch(err => {
        console.log('initFromFile err:', err);
        this.musicInfo.info = 'Problem playing: ' + this.playerOptions.audioFile;
      });
      this.player.getAudioTrackDuration().then(duration => {
        console.log("song duration:", duration);
        this.currentSongDuration = duration;
        let mp3FileArr = this.playerOptions.audioFile.split('/');
        let mp3File = mp3FileArr[mp3FileArr.length - 1];
        this.musicInfo.info = 'Playing: ' + mp3File;
      });
      this.player.volume = this.currentVolume * 0.01;
      this.player.changePlayerSpeed(this.currentSpeed * 0.01);
    },

    playMusic() {
      if (this.player.isAudioPlaying() == true) {
        this.player.dispose();
      }

      console.log('playMusic()', this.playerOptions.audioFile);
      this.player.initFromFile(this.playerOptions).then(() => {
        this.player.play();
      }).catch(err => {
        console.log('initFromFile err:', err);
        this.musicInfo.info = 'Problem playing: ' + this.playerOptions.audioFile;
      });
      this.player.getAudioTrackDuration().then(duration => {
        console.log("song duration:", duration);
        this.currentSongDuration = duration;
        let mp3FileArr = this.playerOptions.audioFile.split('/');
        let mp3File = mp3FileArr[mp3FileArr.length - 1];
        this.musicInfo.info = 'Playing: ' + mp3File;
      });
    },

    getMusicDuration() {
      this.player.getAudioTrackDuration().then(function (duration) {
        console.log('--- duration:', duration.toString());
        return duration.toString();
      }).catch(function (err) {
        console.log('can not catch duration.', err);
      });
    },

    pauseMusic() {
      if (this.player.isAudioPlaying() == true) {
        this.musicInfo.info = 'Pausing at ' + this.formatCurrentTime(this.player.currentTime);
        this.progressDynColor = 'pink';
        this.player.pause().then(function (res) {
          console.log(res);
        }).catch(function (err) {
          console.log('pauseMusic, something went wrong...', err);
        });
      } else {
        this.progressDynColor = 'hotpink';
        this.musicInfo.info = 'Resuming from ' + this.formatCurrentTime(this.player.currentTime);
        this.player.resume();
      }
    },

    stopMusic() {
      this.musicInfo.info = 'Music stopped.';
      this.player.dispose();
    },

    formatCurrentTime(str) {
      var sec_num = parseInt(str, 10); // don't forget the second param

      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = "0" + hours;
      }

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      return hours + ':' + minutes + ':' + seconds;
    }

  }
});

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/App.vue?vue&type=style&index=0&id=45ba5ed4&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "\n@keyframes example-data-v-45ba5ed4 {\nfrom { transform: translate(400, 0);\n}\nto { transform: translate(0, 0);\n}\n}\nGridLayout[data-v-45ba5ed4] {\n\t\tpadding: 14;\n\t\tpadding-bottom: 0;\n\t\tbackground: linear-gradient(to right, rgba(255,255,255,1) 0%,rgba(255,255,255,0.6) 46%,rgba(255,255,255,0.17) 95%,rgba(255,246,0,0.13) 100%);\n}\nPage[data-v-45ba5ed4] {\n        color: deeppink;\n\t\tbackground-color: white;\n\t\tfont-family: \"proxima-nova-soft\", \"Proxima Nova Soft\", Helvetica, Arial, sans-serif;\n}\nActionBar[data-v-45ba5ed4] {\n        background-color: white;\n        color: deeppink;\n}\nProgress[data-v-45ba5ed4] {\n\t\tcolor: linear-gradient(to right, rgba(254,252,234,1) 0%,rgba(241,218,54,1) 100%);\n\t\tbackground-color: black;\n\t\ttransform: scaleY(4);\n\t\tmargin-top: 40;\n}\nButton[data-v-45ba5ed4] {\n\t\tcolor: deeppink;\n\t\tfont-size: 18;\n\t\tpadding: 12;\n\t\tbackground: white;\n\t\tmargin: 4;\n\t\tborder-radius: 8;\n\t\tborder-width: 2;\n\t\tborder-color: pink;\n}\n.b-yellow[data-v-45ba5ed4]:highlighted{\n\t\tbackground-color:rgba(255,246,0,0.22);\n}\nImage[data-v-45ba5ed4] {\n\t\topacity: 0.35;\n}\nLabel[data-v-45ba5ed4] {\n\t\tcolor: deeppink;\n}\nListView[data-v-45ba5ed4] {\n\t\tbackground: white;\n\t\tpadding: 2;\n\t\tanimation-name: example-data-v-45ba5ed4;\n\t\tanimation-duration: 0.5;\n\t\tanimation-timing-function: cubic-bezier(0.1, 0.1, 0.1, 1);\n\t\tanimation-fill-mode: forwards;\n}\n.lv-lab[data-v-45ba5ed4] {\n\t\tcolor:deeppink;\n\t\ttext-align: left;\n\t\tfont-size: 12;\n\t\tpadding: 9;\n\t\tbackground: white;\n\t\tborder-radius: 4;\n\t\tborder-width: 2;\n\t\tborder-top-width: 0;\n\t\tborder-color: pink;\n\t\tmargin-bottom: 2;\n}\n.speedLabel[data-v-45ba5ed4] {\n\t\ttext-align: center;\n\t\tfont-size: 10;\n\t\tpadding-bottom: 20;\n}\n.volumeLabel[data-v-45ba5ed4] {\n\t\ttext-align: center;\n\t\tfont-size: 10;\n\t\tpadding-bottom: 20;\n}\n.musicInfo[data-v-45ba5ed4] {\n\t\tcolor: deeppink;\n\t\tfont-size: 18;\n\t\ttext-align: center;\n}\n.volumeSlider[data-v-45ba5ed4] {\n\t\tcolor: deeppink;\n\t\twidth: 80%;\n\t\ttext-align: center;\n\t\tbackground: black;\n\t\ttransform: scale(0.6)\n}\n.speedSlider[data-v-45ba5ed4] {\n\t\tcolor: deeppink;\n\t\twidth: 80%;\n\t\ttext-align: center;\n\t\tbackground: black;\n\t\ttransform: scale(0.6)\n}\n.copyRights[data-v-45ba5ed4] {\n\t\tcolor: pink;\n\t\ttext-align: center;\n\t\tfont-size: 10;\n}\n.coverInfo[data-v-45ba5ed4] {\n\t\tcolor:pink;\n\t\ttext-align: center;\n\t\tfont-size: 28;\n\t\tcolor: deeppink;\n}\n.musicProgress[data-v-45ba5ed4] {\n\t\tcolor: deeppink;\n\t\twidth: 80%;\n\t\ttext-align: center;\n\t\tbackground: pink;\n}\n\t\n\n", ""]);


    const application = __webpack_require__("../node_modules/@nativescript/core/application/application.js");
    __webpack_require__("../node_modules/@nativescript/core/ui/styling/style-scope.js");

    if (typeof exports.forEach === "function") {
        exports.forEach(cssExport => {
            if (cssExport.length > 1 && cssExport[1]) {
                // applying the second item of the export as it contains the css contents
                application.addCss(cssExport[1]);
            }
        });
    }
;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/App.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/App.vue?vue&type=template&id=45ba5ed4&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    [
      _c("ActionBar", { attrs: { title: "Damstrin Sharp Music" } }),
      _c(
        "GridLayout",
        { attrs: { columns: "*,*,*", rows: "*,*,30,60,50,50,50" } },
        [
          _c("Image", {
            style: _vm.rotateMe(-10),
            attrs: {
              row: "0",
              col: "0",
              colSpan: "3",
              rowSpan: "2",
              src: "~/assets/images/Prana1-Icon1.png"
            }
          }),
          _c("Image", {
            style: _vm.rotateMe(5),
            attrs: {
              row: "0",
              col: "0",
              colSpan: "3",
              rowSpan: "2",
              src: "~/assets/images/Prana1-Circle-PinkBig.png"
            }
          }),
          _c(
            "Label",
            {
              staticClass: "coverInfo",
              attrs: { row: "0", col: "0", colSpan: "3", rowSpan: "2" }
            },
            [
              _vm._v(
                _vm._s(_vm.currentSongDurationInfo) +
                  " / " +
                  _vm._s(_vm.currentTime)
              )
            ]
          ),
          _c(
            "Label",
            {
              staticClass: "speedLabel",
              attrs: { row: "2", col: "0", colSpan: "3" }
            },
            [_vm._v("Speed")]
          ),
          _c("Slider", {
            staticClass: "speedSlider",
            attrs: {
              row: "2",
              col: "0",
              colSpan: "3",
              value: _vm.currentSpeed
            },
            on: { valueChange: _vm.onSliderSpeedChanged }
          }),
          _c(
            "Label",
            {
              staticClass: "volumeLabel",
              attrs: { row: "3", col: "0", colSpan: "3" }
            },
            [_vm._v("Volume")]
          ),
          _c("Slider", {
            staticClass: "volumeSlider",
            attrs: {
              row: "3",
              col: "0",
              colSpan: "3",
              value: _vm.currentVolume
            },
            on: { valueChange: _vm.onSliderValueChanged }
          }),
          _c(
            "Label",
            {
              staticClass: "musicInfo",
              attrs: { row: "1", col: "0", colSpan: "3", textWrap: "true" }
            },
            [_vm._v(_vm._s(_vm.musicInfo.info))]
          ),
          _c("Progress", {
            staticClass: "musicProgress",
            style: {
              color: _vm.progressDynColor,
              transform: "scaleY(" + _vm.progressScaleY + ")"
            },
            attrs: {
              row: "1",
              col: "0",
              colSpan: "3",
              value: _vm.currentProgress
            },
            on: { touch: _vm.skipToNewTime }
          }),
          _c(
            "Button",
            {
              staticClass: "b-yellow",
              attrs: { row: "4", col: "0", rowSpan: "1" },
              on: {
                tap: function($event) {
                  return _vm.playMusic()
                }
              }
            },
            [_vm._v(_vm._s(_vm.playMsg))]
          ),
          _c(
            "Button",
            {
              staticClass: "b-yellow",
              attrs: { row: "4", col: "1", rowSpan: "1" },
              on: {
                tap: function($event) {
                  return _vm.pauseMusic()
                }
              }
            },
            [_vm._v(_vm._s(_vm.pauseMsg))]
          ),
          _c(
            "Button",
            {
              staticClass: "b-yellow",
              attrs: { row: "4", col: "2", rowSpan: "1" },
              on: {
                tap: function($event) {
                  return _vm.stopMusic()
                }
              }
            },
            [_vm._v(_vm._s(_vm.stopMsg))]
          ),
          _c(
            "Button",
            {
              staticClass: "b-yellow",
              attrs: { row: "5", col: "0", colSpan: "3" },
              on: {
                tap: function($event) {
                  return _vm.showAudioFilesList()
                }
              }
            },
            [_vm._v(_vm._s(_vm.filesMsg))]
          ),
          _vm.showList == true
            ? _c(
                "ListView",
                {
                  attrs: {
                    row: "0",
                    col: "0",
                    colSpan: "3",
                    rowSpan: "4",
                    items: _vm.listOfItems,
                    "+alias": "item"
                  },
                  on: { itemTap: _vm.onItemTap }
                },
                [
                  _c("v-template", {
                    scopedSlots: _vm._u(
                      [
                        {
                          key: "default",
                          fn: function(ref) {
                            var item = ref.item
                            var $index = ref.$index
                            var $even = ref.$even
                            var $odd = ref.$odd
                            return _c("Label", {
                              staticClass: "lv-lab",
                              attrs: { text: item._name }
                            })
                          }
                        }
                      ],
                      null,
                      false,
                      4053121431
                    )
                  })
                ],
                1
              )
            : _vm._e(),
          _c(
            "Label",
            {
              staticClass: "copyRights",
              attrs: { row: "6", col: "0", colSpan: "3" },
              on: {
                tap: function($event) {
                  return _vm.showCredits()
                }
              }
            },
            [_vm._v(_vm._s(_vm.copyRightsInfo))]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./ sync ^\\.\\/app\\.(css|scss|less|sass)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.scss": "./app.scss"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync ^\\.\\/app\\.(css|scss|less|sass)$";

/***/ }),

/***/ "./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|kt|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.js": "./app.js",
	"./app.scss": "./app.scss",
	"./store.js": "./store.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|kt|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$";

/***/ }),

/***/ "./app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-vue/dist/index.js");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/App.vue");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./store.js");
/* harmony import */ var nativescript_vue_devtools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/nativescript-vue-devtools/index.js");
/* harmony import */ var nativescript_vue_devtools__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue_devtools__WEBPACK_IMPORTED_MODULE_3__);

            __webpack_require__("../node_modules/nativescript-dev-webpack/load-application-css-regular.js")();
            
            
        if (true) {
            const hmrUpdate = __webpack_require__("../node_modules/nativescript-dev-webpack/hmr/index.js").hmrUpdate;
            global.__coreModulesLiveSync = global.__onLiveSync;

            global.__onLiveSync = function () {
                // handle hot updated on LiveSync
                hmrUpdate();
            };

            global.hmrRefresh = function({ type, path } = {}) {
                // the hot updates are applied, ask the modules to apply the changes
                setTimeout(() => {
                    global.__coreModulesLiveSync({ type, path });
                });
            };

            // handle hot updated on initial app start
            hmrUpdate();
        }
        
            const context = __webpack_require__("./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|kt|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$");
            global.registerWebpackModules(context);
            if (true) {
                module.hot.accept(context.id, () => { 
                    console.log("HMR: Accept module '" + context.id + "' from '" + module.i + "'"); 
                });
            }
            
        __webpack_require__("../node_modules/@nativescript/core/bundle-entry-points.js");
        // import Vue from "nativescript-vue";
// import Home from "./components/Home";
// new Vue({
//     template: `
//         <Frame>
//             <Home />
//         </Frame>`,
//     components: {
//         Home
//     }
// }).$start();





if (true) {
  nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(nativescript_vue_devtools__WEBPACK_IMPORTED_MODULE_3___default.a);
} // Prints Vue logs when --env.production is *NOT* set while building


nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.config.silent = "development" === 'production';
new nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  store: _store__WEBPACK_IMPORTED_MODULE_2__["default"],
  render: h => h('frame', [h(_components_App__WEBPACK_IMPORTED_MODULE_1__["default"])])
}).$start();
    
        
        
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./app.scss":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = {"type":"stylesheet","stylesheet":{"rules":[],"parsingErrors":[]}};;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './app.scss' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/App.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_template_id_45ba5ed4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/App.vue?vue&type=template&id=45ba5ed4&scoped=true&");
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _App_vue_vue_type_style_index_0_id_45ba5ed4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/App.vue?vue&type=style&index=0&id=45ba5ed4&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _App_vue_vue_type_template_id_45ba5ed4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _App_vue_vue_type_template_id_45ba5ed4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "45ba5ed4",
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord('45ba5ed4', component.options)
    } else {
      api.reload('45ba5ed4', component.options)
    }
    module.hot.accept("./components/App.vue?vue&type=template&id=45ba5ed4&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _App_vue_vue_type_template_id_45ba5ed4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/App.vue?vue&type=template&id=45ba5ed4&scoped=true&");
(function () {
      api.rerender('45ba5ed4', {
        render: _App_vue_vue_type_template_id_45ba5ed4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _App_vue_vue_type_template_id_45ba5ed4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); })
  }
}
component.options.__file = "components/App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/App.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/App.vue?vue&type=style&index=0&id=45ba5ed4&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_45ba5ed4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/dist/cjs.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/App.vue?vue&type=style&index=0&id=45ba5ed4&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_45ba5ed4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_45ba5ed4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_45ba5ed4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_45ba5ed4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_dist_cjs_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_45ba5ed4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/App.vue?vue&type=template&id=45ba5ed4&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_45ba5ed4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/App.vue?vue&type=template&id=45ba5ed4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_45ba5ed4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_45ba5ed4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./package.json":
/***/ (function(module) {

module.exports = {"main":"app.js","android":{"v8Flags":"--expose_gc","markingMode":"none"}};

/***/ }),

/***/ "./store.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-vue/dist/index.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/vuex/dist/vuex.esm.js");


vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vuex__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (new vuex__WEBPACK_IMPORTED_MODULE_1__["default"].Store({
  state: {},
  mutations: {},
  actions: {}
}));

/***/ })

},[["./app.js","runtime","vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9BcHAudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvQXBwLnZ1ZT83NTM2Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvQXBwLnZ1ZT83Y2YxIiwid2VicGFjazovLy8uIHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9hcHBcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSQiLCJ3ZWJwYWNrOi8vL1xcYl9bXFx3LV0qXFwuKXNjc3MpJCIsIndlYnBhY2s6Ly8vLi9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9BcHAudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvQXBwLnZ1ZT85ZTIzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvQXBwLnZ1ZT9mZjc2Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvQXBwLnZ1ZT8xODI1Iiwid2VicGFjazovLy8uL3N0b3JlLmpzIl0sIm5hbWVzIjpbIlZ1ZSIsInN0b3JlIiwiVnVlRGV2dG9vbHMiLCJUTlNfRU5WIiwidXNlIiwiY29uZmlnIiwic2lsZW50IiwicmVuZGVyIiwiaCIsIiRzdGFydCIsIlZ1ZXgiLCJTdG9yZSIsInN0YXRlIiwibXV0YXRpb25zIiwiYWN0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbURBOztBQUVBLGdHLENBQ0E7OztBQUVBOztBQUVBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFDQSxnRUFEQTtBQUVBLHNDQUZBO0FBR0EscUJBSEE7QUFJQSx1QkFKQTtBQUtBLHFCQUxBO0FBTUEsdUJBTkE7QUFPQSx3QkFQQTtBQVFBLHVCQVJBO0FBU0EsaUNBVEE7QUFVQSw0QkFWQTtBQVdBLHVCQVhBO0FBYUEsd0NBYkE7QUFjQTtBQUFBO0FBQUEsT0FkQTtBQWVBLHdCQWZBO0FBaUJBO0FBQ0EsdURBREE7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QUFBQTtBQUFBO0FBQXVZLENBQWdCLHNiQUFHLEVBQUMsQzs7Ozs7Ozs7QUNBM1o7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUFULDBDQUFHLENBQUNJLEdBQUosQ0FBUU0sNENBQVI7QUFFZSxtRUFBSUEsNENBQUksQ0FBQ0MsS0FBVCxDQUFlO0FBQzVCQyxPQUFLLEVBQUUsRUFEcUI7QUFJNUJDLFdBQVMsRUFBRSxFQUppQjtBQU81QkMsU0FBTyxFQUFFO0FBUG1CLENBQWYsQ0FBZixFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8UGFnZT5cbiAgICAgICBcblx0PEFjdGlvbkJhciB0aXRsZT1cIkRhbXN0cmluIFNoYXJwIE11c2ljXCIvPlxuICBcblx0PEdyaWRMYXlvdXQgY29sdW1ucz1cIiosKiwqXCIgcm93cz1cIiosKiwzMCw2MCw1MCw1MCw1MFwiPlxuXHRcblx0XG5cdFxuXG5cdFx0PEltYWdlIHYtYmluZDpzdHlsZT1cInJvdGF0ZU1lKC0xMClcIiByb3c9XCIwXCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgcm93U3Bhbj1cIjJcIiBzcmM9XCJ+L2Fzc2V0cy9pbWFnZXMvUHJhbmExLUljb24xLnBuZ1wiLz5cblx0XHQ8SW1hZ2Ugdi1iaW5kOnN0eWxlPVwicm90YXRlTWUoNSlcIiByb3c9XCIwXCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgcm93U3Bhbj1cIjJcIiBzcmM9XCJ+L2Fzc2V0cy9pbWFnZXMvUHJhbmExLUNpcmNsZS1QaW5rQmlnLnBuZ1wiLz5cblxuXHRcdDxMYWJlbCBjbGFzcz0nY292ZXJJbmZvJyByb3c9XCIwXCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgcm93U3Bhbj1cIjJcIj57e2N1cnJlbnRTb25nRHVyYXRpb25JbmZvfX0gLyB7e2N1cnJlbnRUaW1lfX08L0xhYmVsPlxuXG5cdFx0PExhYmVsIHJvdz1cIjJcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiBjbGFzcz1cInNwZWVkTGFiZWxcIj5TcGVlZDwvTGFiZWw+XHRcdFx0XHRcdFxuXHRcdDxTbGlkZXIgIGNsYXNzPVwic3BlZWRTbGlkZXJcIiByb3c9XCIyXCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgOnZhbHVlPVwiY3VycmVudFNwZWVkXCIgQHZhbHVlQ2hhbmdlPVwib25TbGlkZXJTcGVlZENoYW5nZWRcIi8+XHRcdFxuXHRcdFx0XHRcdFx0XG5cdFx0PExhYmVsIHJvdz1cIjNcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiBjbGFzcz1cInZvbHVtZUxhYmVsXCI+Vm9sdW1lPC9MYWJlbD5cdFx0XHRcdFx0XG5cdFx0PFNsaWRlciBjbGFzcz1cInZvbHVtZVNsaWRlclwiIHJvdz1cIjNcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiA6dmFsdWU9XCJjdXJyZW50Vm9sdW1lXCIgQHZhbHVlQ2hhbmdlPVwib25TbGlkZXJWYWx1ZUNoYW5nZWRcIj48L1NsaWRlcj5cblx0XHRcdFxuXHRcdDxMYWJlbCBjbGFzcz0nbXVzaWNJbmZvJyByb3c9XCIxXCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgdGV4dFdyYXA9XCJ0cnVlXCI+e3ttdXNpY0luZm8uaW5mb319PC9MYWJlbD5cblxuXHRcdDxQcm9ncmVzcyB2LWJpbmQ6c3R5bGU9XCJ7IGNvbG9yOiBwcm9ncmVzc0R5bkNvbG9yLCB0cmFuc2Zvcm06ICdzY2FsZVkoJytwcm9ncmVzc1NjYWxlWSsnKScgfVwiIGNsYXNzPVwibXVzaWNQcm9ncmVzc1wiIHJvdz1cIjFcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiA6dmFsdWU9XCJjdXJyZW50UHJvZ3Jlc3NcIiBAdG91Y2g9XCJza2lwVG9OZXdUaW1lXCIgLz5cdFxuXG5cdFx0PEJ1dHRvbiBjbGFzcz1cImIteWVsbG93XCIgcm93PVwiNFwiIGNvbD1cIjBcIiByb3dTcGFuPVwiMVwiIEB0YXA9XCJwbGF5TXVzaWMoKVwiPnt7cGxheU1zZ319PC9CdXR0b24+XG5cdFx0PEJ1dHRvbiBjbGFzcz1cImIteWVsbG93XCIgcm93PVwiNFwiIGNvbD1cIjFcIiByb3dTcGFuPVwiMVwiIEB0YXA9XCJwYXVzZU11c2ljKClcIj57e3BhdXNlTXNnfX08L0J1dHRvbj5cblx0XHQ8QnV0dG9uIGNsYXNzPVwiYi15ZWxsb3dcIiByb3c9XCI0XCIgY29sPVwiMlwiIHJvd1NwYW49XCIxXCIgQHRhcD1cInN0b3BNdXNpYygpXCI+e3tzdG9wTXNnfX08L0J1dHRvbj5cblx0XHRcblx0XHQ8QnV0dG9uIGNsYXNzPVwiYi15ZWxsb3dcIiByb3c9XCI1XCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgQHRhcD1cInNob3dBdWRpb0ZpbGVzTGlzdCgpXCI+e3tmaWxlc01zZ319PC9CdXR0b24+XG5cdFx0XHRcdFx0XHRcblx0XHQ8TGlzdFZpZXcgdi1pZj1cInNob3dMaXN0ID09IHRydWVcIiByb3c9XCIwXCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgcm93U3Bhbj1cIjRcIiBmb3I9XCJpdGVtIGluIGxpc3RPZkl0ZW1zXCIgQGl0ZW1UYXA9XCJvbkl0ZW1UYXBcIj5cblx0XHQgIDx2LXRlbXBsYXRlPlxuXHRcdFx0PCEtLSBTaG93cyB0aGUgbGlzdCBpdGVtIGxhYmVsIGluIHRoZSBkZWZhdWx0IGNvbG9yIGFuZCBzdHlsZS4gLS0+XG5cdFx0XHQ8TGFiZWwgY2xhc3M9XCJsdi1sYWJcIiA6dGV4dD1cIml0ZW0uX25hbWVcIiAvPlxuXHRcdCAgPC92LXRlbXBsYXRlPlxuXHRcdDwvTGlzdFZpZXc+XHRcblx0XHRcdFx0XHRcblx0XHQ8TGFiZWwgY2xhc3M9J2NvcHlSaWdodHMnIHJvdz1cIjZcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiBAdGFwPVwic2hvd0NyZWRpdHMoKVwiPnt7Y29weVJpZ2h0c0luZm99fTwvTGFiZWw+XG5cblx0XHRcblx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XG5cdDwvR3JpZExheW91dD5cdFx0XG4gICBcbiAgIFxuICAgIDwvUGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cdFxuXHRjb25zdCBzY3JlZW4gPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiKS5zY3JlZW47XG5cdFxuXHRjb25zdCBmcyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCIpO1xuXHQvL2NvbnN0IGRvY3VtZW50cyA9IGZzLmtub3duRm9sZGVycy5kb2N1bWVudHMoKTtcblx0XG5cdGNvbnN0IGF1ZGlvID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LWF1ZGlvJyk7XG5cblx0Y29uc3QgcGxheWVyVE5TID0gbmV3IGF1ZGlvLlROU1BsYXllcigpO1xuXHRwbGF5ZXJUTlMuZGVidWcgPSB0cnVlO1xuXHRcblx0XG5cdGV4cG9ydCBkZWZhdWx0IHtcblx0XHRcblx0XHRkYXRhKCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y29weVJpZ2h0c0luZm86ICdDb3B5cmlnaHQgMjAxOSDCqSBTeWx3ZXN0ZXIgSy4gTWllbG5pY3p1aycsXG5cdFx0XHRcdGNvdmVyTXNnOiAnVGhpcyB3aWxsIGJlIGEgY292ZXInLFxuXHRcdFx0XHRwbGF5TXNnOiBcIlBsYXlcIixcblx0XHRcdFx0cGF1c2VNc2c6IFwiUGF1c2VcIixcblx0XHRcdFx0c3RvcE1zZzogXCJTdG9wXCIsXG5cdFx0XHRcdGZpbGVzTXNnOiBcIkZpbGVzXCIsXG5cdFx0XHRcdGN1cnJlbnRWb2x1bWU6IDEwMCxcblx0XHRcdFx0Y3VycmVudFNwZWVkOiAxMDAsXG5cdFx0XHRcdGN1cnJlbnRTb25nRHVyYXRpb25JbmZvOiAnJyxcblx0XHRcdFx0Y3VycmVudFNvbmdEdXJhdGlvbjogMCxcblx0XHRcdFx0cGxheWVyOiBwbGF5ZXJUTlMsXG5cblx0XHRcdFx0Y3VycmVudFRpbWU6IHBsYXllclROUy5jdXJyZW50VGltZSxcblx0XHRcdFx0bXVzaWNJbmZvOiB7aW5mbzpcIk5vIGluZm9cIn0sXG5cdFx0XHRcdGN1cnJlbnRQcm9ncmVzczogMCxcblx0XHRcdFx0XG5cdFx0XHRcdHBsYXllck9wdGlvbnM6IHtcblx0XHRcdFx0XHRhdWRpb0ZpbGU6ICd+L2Fzc2V0cy9hdWRpby9DemlsbGlvdXRfZHJ1bXMubXAzJyxcblx0XHRcdFx0XHRsb29wOiB0cnVlLFxuXHRcdFx0XHRcdGNvbXBsZXRlQ2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ2ZpbmlzaGVkIHBsYXlpbmcnKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGVycm9yQ2FsbGJhY2s6IGZ1bmN0aW9uKGVycm9yT2JqZWN0KSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnLS0tLS0tIGVycm9yQ2FsbGJhY2snLCBKU09OLnN0cmluZ2lmeShlcnJvck9iamVjdCkpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0aW5mb0NhbGxiYWNrOiBmdW5jdGlvbihhcmdzKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnLS0tLS0tIGluZm9DYWxsYmFjaycsIEpTT04uc3RyaW5naWZ5KGFyZ3MpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFxuXHRcdFx0XHRmaWxlTGlzdDogW10sXG5cdFx0XHRcdFxuXHRcdFx0XHRsaXN0T2ZJdGVtczogW1xuXHRcdFx0XHRcdHtpZDoxLCBfbmFtZTogXCJEdXBhXCJ9LFxuXHRcdFx0XHRcdHtpZDoyLCBfbmFtZTogXCJDaXBhXCJ9LFxuXHRcdFx0XHRcdHtpZDozLCBfbmFtZTogXCJHb3dub1wifSxcdFx0XHRcdFx0XG5cdFx0XHRcdF0sXG5cdFx0XHRcdFxuXHRcdFx0XHRzaG93TGlzdDogZmFsc2UsXG5cdFx0XHRcdFxuXHRcdFx0XHRwcm9ncmVzc0R5bkNvbG9yOiAnZGVlcHBpbmsnLFxuXHRcdFx0XHRwcm9ncmVzc1NjYWxlWTogNCxcblx0XHRcdFx0XG5cdFx0XHRcdGltYWdlc1R1cm46IDgwLFxuXHRcdFx0XHRcblx0XHRcdFx0Ly8gYXVkaW8gZmlsZXMgLSBlbnRpdGllc1xuXHRcdFx0XHQvL19wYXRoLCBfbmFtZSwgX2V4dGVuc2lvblxuXHRcdFx0XHRcblx0XHRcdH1cblx0XHR9LFxuXHRcdFxuLy9cdFx0Y29tcHV0ZWQ6IHtcbi8vXHRcdFx0cm90YXRlTWUoYXJnKSB7XG4vL1x0XHRcdFx0cmV0dXJuIHsgdHJhbnNmb3JtOiAncm90YXRlKCcgKyB0aGlzLmltYWdlc1R1cm4gKiBhcmcgKyAndHVybiknfVxuLy9cdFx0XHR9XG4vL1x0XHR9LFx0XHRcblx0XHRcblx0XHRtb3VudGVkOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcblx0XHRcdHRoaXMuJG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coJ2VudGlyZSB2aWV3IGhhcyBiZWVuIHJlbmRlcmVkJyk7XG5cdFx0XHR9KSxcblx0XHRcdFx0XG5cdFx0XHR0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXHRcdFx0XHQgIHRoaXMudXBkYXRlVGltZXIoKTtcblx0XHRcdFx0fSw2MCk7XG5cdFx0XHR0aGlzLnVwZGF0ZVRpbWVyKCk7XHRcdFx0XHRcblx0XHRcdFxuXHRcdH0sXG5cdFx0XHRcdFxuXHRcdFxuXHRcdG1ldGhvZHM6IHtcblx0XHRcdFxuXHRcdFx0c2hvd0NyZWRpdHMoKSB7XG5cdFx0XHRcdGFsZXJ0KHtcblx0XHRcdFx0ICB0aXRsZTogXCJEYW1zdHJpbjogTXVzaWMgUGxheWVyIHYuMC4xXCIsXG5cdFx0XHRcdCAgbWVzc2FnZTogXCJBdXRob3I6IFN5bHdlc3RlciBLLiBNaWVsbmljenVrXCIsXG5cdFx0XHRcdCAgb2tCdXR0b25UZXh0OiBcIlRoYXQncyBBbWF6aW5nIVwiXG5cdFx0XHRcdH0pLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHQgIGNvbnNvbGUubG9nKFwiQWxlcnQgZGlhbG9nIGNsb3NlZFwiKTtcblx0XHRcdFx0fSk7XHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdHJvdGF0ZU1lKGFyZykge1xuXHRcdFx0XHRyZXR1cm4geyB0cmFuc2Zvcm06ICdyb3RhdGUoJyArIHRoaXMuaW1hZ2VzVHVybiAqIGFyZyArICd0dXJuKSd9XG5cdFx0XHR9LFx0XHRcdFxuXHRcdFx0XG5cdFx0XHRza2lwVG9OZXdUaW1lKGFyZ3MpIHtcblx0XHRcdFxuXHRcdFx0XHRsZXQgcGVyYyA9IChhcmdzLmdldFgoKS9zY3JlZW4ubWFpblNjcmVlbi53aWR0aERJUHMpKjEuMTtcblx0XHRcdFx0aWYocGVyYyA8PSAwKSB7XG5cdFx0XHRcdFx0cGVyYyA9IDBcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihwZXJjID49IDEpIHtcblx0XHRcdFx0XHRwZXJzID0gMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgbmV3VGltZSA9ICB0aGlzLmN1cnJlbnRTb25nRHVyYXRpb24gKiBwZXJjO1xuXHRcdFx0XHRcblx0XHRcdFx0Y29uc29sZS5sb2coJ05ldyB0aW1lOicsIG5ld1RpbWUpO1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wbGF5ZXIuc2Vla1RvKG5ld1RpbWUpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnc2tpcFRvTmV3VGltZScsIGFyZ3MuZ2V0WCgpKTtcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRzaG93QXVkaW9GaWxlc0xpc3QoKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLmdldEF1ZGlvRmlsZXNMaXN0KCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZih0aGlzLnNob3dMaXN0ID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0dGhpcy5zaG93TGlzdCA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5zaG93TGlzdCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0b25JdGVtVGFwKGUpIHtcblx0XHRcdFxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdJdGVtIHRhcCcsdGhpcy5saXN0T2ZJdGVtc1tlLmluZGV4XS50ZXh0KVxuXHRcdFx0XHRjb25zb2xlLmxvZygnSXRlbSB0YXAnLCBlKVxuXHRcdFx0XHRcblx0XHRcdFx0bGV0IGF1ZGlvRmlsZU5hbWUgPSB0aGlzLmxpc3RPZkl0ZW1zW2UuaW5kZXhdLl9uYW1lO1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wbGF5U2VsZWN0ZWRNdXNpYyhhdWRpb0ZpbGVOYW1lKVxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdHJlYWRUZXh0RnJvbUZpbGUocGF0aCkge1xuXHRcdFx0XHQvKiB0aGlzIGlzIGhvdyB5b3UgZ2V0IGNvbnRlbnQgb2YgdGV4dCBmaWxlICovXG5cdFx0XHRcdC8vIGxldCBwYXRoID0gJy4vYXNzZXRzL2RhdGEvMS50eHQnOyBcblx0XHRcdFx0bGV0IGZpbGUgPSBmcy5rbm93bkZvbGRlcnMuY3VycmVudEFwcCgpLmdldEZpbGUocGF0aCk7XG5cdFx0XHRcdGZpbGUucmVhZFRleHQoKVxuXHRcdFx0XHQudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2ZpbGUucmVhZFRleHQ6JyxyZXMpXG5cdFx0XHRcdFx0dGhpcy5tdXNpY0luZm8uaW5mbyA9IHJlcy50b1N0cmluZygpO1xuXHRcdFx0XHR9KS5jYXRjaCgoZXJyKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2ZpbGUucmVhZFRleHQ6IGVyci5zdGFjaycsZXJyLnN0YWNrKTtcblx0XHRcdFx0fSk7XHRcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRnZXRBdWRpb0ZpbGVzTGlzdCgpIHtcblx0XHRcdFx0bGV0IGZvbGRlciA9IGZzLmtub3duRm9sZGVycy5jdXJyZW50QXBwKCkuZ2V0Rm9sZGVyKFwiYXNzZXRzL2F1ZGlvXCIpO1xuXHRcdFx0XHRmb2xkZXIuZ2V0RW50aXRpZXMoKVxuXHRcdFx0XHRcdC50aGVuKChlbnRpdGllcykgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ2VudGl0aWVzJyxlbnRpdGllcylcblx0XHRcdFx0XHRcdHRoaXMuZmlsZUxpc3QgPSBlbnRpdGllcztcblx0XHRcdFx0XHRcdHRoaXMubGlzdE9mSXRlbXMgPSB0aGlzLmZpbGVMaXN0O1xuXHRcdFx0XHRcdFx0Ly90aGlzLm11c2ljSW5mby5pbmZvID0gSlNPTi5zdHJpbmdpZnkodGhpcy5maWxlTGlzdCk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuY2F0Y2goKGVycikgPT4ge1xuXHRcdFx0XHRcdFx0Ly8gRmFpbGVkIHRvIG9idGFpbiBmb2xkZXIncyBjb250ZW50cy5cblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdnZXRFbnRpdGllcyBjYXRjaCBlcnJvcjogJyxlcnIuc3RhY2spO1xuXHRcdFx0XHRcdH0pO1x0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHR1cGRhdGVUaW1lcigpIHtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMuY3VycmVudFNvbmdEdXJhdGlvbkluZm8gPSB0aGlzLmZvcm1hdEN1cnJlbnRUaW1lKHRoaXMuY3VycmVudFNvbmdEdXJhdGlvbik7XG5cdFx0XHRcdHRoaXMuY3VycmVudFRpbWUgPSB0aGlzLmZvcm1hdEN1cnJlbnRUaW1lKHRoaXMucGxheWVyLmN1cnJlbnRUaW1lKTtcblx0XHRcdFx0dGhpcy5jdXJyZW50UHJvZ3Jlc3MgPSAxMDAqdGhpcy5wbGF5ZXIuY3VycmVudFRpbWUvcGFyc2VJbnQodGhpcy5jdXJyZW50U29uZ0R1cmF0aW9uKTtcblx0XHRcdFx0Ly90aGlzLm11c2ljSW5mby5pbmZvID0gdGhpcy5jdXJyZW50UHJvZ3Jlc3M7XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLmltYWdlc1R1cm4gPSB0aGlzLnBsYXllci5jdXJyZW50VGltZTtcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdHVwZGF0ZUluZm8oc3RyKSB7XG5cdFx0XHRcdHRoaXMubXVzaWNJbmZvLmluZm8gPSBzdHI7XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRvblNsaWRlclZhbHVlQ2hhbmdlZChlKSB7XG4vL1x0XHRcdFx0Ly9jb25zb2xlLmxvZygnc2xpZGVyIHZhbCcsZS52YWx1ZSlcblx0XHRcdFx0dGhpcy5jdXJyZW50Vm9sdW1lID0gZS52YWx1ZVxuXHRcdFx0XHR0aGlzLm11c2ljSW5mby5pbmZvID0gJ05ldyB2b2x1bWU6ICcrcGFyc2VJbnQodGhpcy5jdXJyZW50Vm9sdW1lKStcIiVcIlxuXHRcdFx0XHR0aGlzLnBsYXllci52b2x1bWUgPSB0aGlzLmN1cnJlbnRWb2x1bWUqMC4wMTtcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdG9uU2xpZGVyU3BlZWRDaGFuZ2VkKGUpIHtcbi8vXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdzbGlkZXIgdmFsJyxlLnZhbHVlKVxuXHRcdFx0XHR0aGlzLmN1cnJlbnRTcGVlZCA9IGUudmFsdWVcblx0XHRcdFx0dGhpcy5tdXNpY0luZm8uaW5mbyA9ICdOZXcgc3BlZWQ6ICcrcGFyc2VJbnQodGhpcy5jdXJyZW50U3BlZWQsMTApKyclJztcblx0XHRcdFx0dGhpcy5wbGF5ZXIuY2hhbmdlUGxheWVyU3BlZWQodGhpcy5jdXJyZW50U3BlZWQqMC4wMSk7XG5cdFx0XHR9LFx0XHRcdFxuXHRcdFx0XG5cdFx0XHRcblx0XHRcdHBsYXlTZWxlY3RlZE11c2ljKGF1ZGlvRmlsZU5hbWUpIHtcblx0XHRcdFx0XG5cdFx0XHRcdGlmKHRoaXMucGxheWVyLmlzQXVkaW9QbGF5aW5nKCkgPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdHRoaXMucGxheWVyLmRpc3Bvc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wbGF5ZXJPcHRpb25zLmF1ZGlvRmlsZSA9ICd+L2Fzc2V0cy9hdWRpby8nK2F1ZGlvRmlsZU5hbWUsXG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnBsYXllci5pbml0RnJvbUZpbGUodGhpcy5wbGF5ZXJPcHRpb25zKVxuXHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbGF5ZXIucGxheSgpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaCgoZXJyKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2luaXRGcm9tRmlsZSBlcnI6JyxlcnIpXG5cdFx0XHRcdFx0dGhpcy5tdXNpY0luZm8uaW5mbyA9ICdQcm9ibGVtIHBsYXlpbmc6ICcrdGhpcy5wbGF5ZXJPcHRpb25zLmF1ZGlvRmlsZTtcblx0XHRcdFx0fSlcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucGxheWVyLmdldEF1ZGlvVHJhY2tEdXJhdGlvbigpLnRoZW4oKGR1cmF0aW9uKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJzb25nIGR1cmF0aW9uOlwiLCBkdXJhdGlvbik7XG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50U29uZ0R1cmF0aW9uID0gZHVyYXRpb247XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0bGV0IG1wM0ZpbGVBcnIgPSB0aGlzLnBsYXllck9wdGlvbnMuYXVkaW9GaWxlLnNwbGl0KCcvJyk7XG5cdFx0XHRcdFx0bGV0IG1wM0ZpbGUgPSAgbXAzRmlsZUFyclttcDNGaWxlQXJyLmxlbmd0aC0xXTtcblx0XHRcdFx0XHR0aGlzLm11c2ljSW5mby5pbmZvID0gJ1BsYXlpbmc6ICcrbXAzRmlsZTtcblx0XHRcdFx0XHRcblx0XHRcdFx0fSk7XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnBsYXllci52b2x1bWUgPSB0aGlzLmN1cnJlbnRWb2x1bWUqMC4wMTtcblx0XHRcdFx0dGhpcy5wbGF5ZXIuY2hhbmdlUGxheWVyU3BlZWQodGhpcy5jdXJyZW50U3BlZWQqMC4wMSk7XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0cGxheU11c2ljKCkge1xuXHRcdFx0XHRcblx0XHRcdFx0aWYodGhpcy5wbGF5ZXIuaXNBdWRpb1BsYXlpbmcoKSA9PSB0cnVlKSB7XG5cdFx0XHRcdFx0dGhpcy5wbGF5ZXIuZGlzcG9zZSgpO1xuXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdwbGF5TXVzaWMoKScsIHRoaXMucGxheWVyT3B0aW9ucy5hdWRpb0ZpbGUpO1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wbGF5ZXIuaW5pdEZyb21GaWxlKHRoaXMucGxheWVyT3B0aW9ucylcblx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGxheWVyLnBsYXkoKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKGVycikgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdpbml0RnJvbUZpbGUgZXJyOicsZXJyKVxuXHRcdFx0XHRcdHRoaXMubXVzaWNJbmZvLmluZm8gPSAnUHJvYmxlbSBwbGF5aW5nOiAnK3RoaXMucGxheWVyT3B0aW9ucy5hdWRpb0ZpbGU7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnBsYXllci5nZXRBdWRpb1RyYWNrRHVyYXRpb24oKS50aGVuKChkdXJhdGlvbikgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwic29uZyBkdXJhdGlvbjpcIiwgZHVyYXRpb24pO1xuXHRcdFx0XHRcdHRoaXMuY3VycmVudFNvbmdEdXJhdGlvbiA9IGR1cmF0aW9uO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGxldCBtcDNGaWxlQXJyID0gdGhpcy5wbGF5ZXJPcHRpb25zLmF1ZGlvRmlsZS5zcGxpdCgnLycpO1xuXHRcdFx0XHRcdGxldCBtcDNGaWxlID0gIG1wM0ZpbGVBcnJbbXAzRmlsZUFyci5sZW5ndGgtMV07XG5cdFx0XHRcdFx0dGhpcy5tdXNpY0luZm8uaW5mbyA9ICdQbGF5aW5nOiAnK21wM0ZpbGU7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRnZXRNdXNpY0R1cmF0aW9uKCkge1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wbGF5ZXIuZ2V0QXVkaW9UcmFja0R1cmF0aW9uKClcblx0XHRcdFx0XHQudGhlbihmdW5jdGlvbihkdXJhdGlvbikge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCctLS0gZHVyYXRpb246JyxkdXJhdGlvbi50b1N0cmluZygpKTtcblx0XHRcdFx0XHRyZXR1cm4gZHVyYXRpb24udG9TdHJpbmcoKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0ICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2NhbiBub3QgY2F0Y2ggZHVyYXRpb24uJywgZXJyKTtcblx0XHRcdFx0ICB9KTtcdFx0XHRcdFxuXHRcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHRcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRwYXVzZU11c2ljICgpIHtcblx0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0XHRpZih0aGlzLnBsYXllci5pc0F1ZGlvUGxheWluZygpID09IHRydWUpIHtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR0aGlzLm11c2ljSW5mby5pbmZvID0gJ1BhdXNpbmcgYXQgJyt0aGlzLmZvcm1hdEN1cnJlbnRUaW1lKHRoaXMucGxheWVyLmN1cnJlbnRUaW1lKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR0aGlzLnByb2dyZXNzRHluQ29sb3IgPSAncGluayc7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dGhpcy5wbGF5ZXIucGF1c2UoKVxuXHRcdFx0XHRcdCAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXMpO1xuXHRcdFx0XHRcdCAgfSlcblx0XHRcdFx0XHQgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdwYXVzZU11c2ljLCBzb21ldGhpbmcgd2VudCB3cm9uZy4uLicsIGVycik7XG5cdFx0XHRcdFx0ICB9KTtcdFx0XHRcdFx0XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dGhpcy5wcm9ncmVzc0R5bkNvbG9yID0gJ2hvdHBpbmsnO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHRoaXMubXVzaWNJbmZvLmluZm8gPSAnUmVzdW1pbmcgZnJvbSAnK3RoaXMuZm9ybWF0Q3VycmVudFRpbWUodGhpcy5wbGF5ZXIuY3VycmVudFRpbWUpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHRoaXMucGxheWVyLnJlc3VtZSgpO1x0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0c3RvcE11c2ljKCkge1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5tdXNpY0luZm8uaW5mbyA9ICdNdXNpYyBzdG9wcGVkLidcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucGxheWVyLmRpc3Bvc2UoKTtcdFxuXHRcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRmb3JtYXRDdXJyZW50VGltZSAoc3RyKSB7XG5cdFx0XHRcdHZhciBzZWNfbnVtID0gcGFyc2VJbnQoc3RyLCAxMCk7IC8vIGRvbid0IGZvcmdldCB0aGUgc2Vjb25kIHBhcmFtXG5cdFx0XHRcdHZhciBob3VycyAgID0gTWF0aC5mbG9vcihzZWNfbnVtIC8gMzYwMCk7XG5cdFx0XHRcdHZhciBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjX251bSAtIChob3VycyAqIDM2MDApKSAvIDYwKTtcblx0XHRcdFx0dmFyIHNlY29uZHMgPSBzZWNfbnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcblxuXHRcdFx0XHRpZiAoaG91cnMgICA8IDEwKSB7aG91cnMgICA9IFwiMFwiK2hvdXJzO31cblx0XHRcdFx0aWYgKG1pbnV0ZXMgPCAxMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cblx0XHRcdFx0aWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cblx0XHRcdFx0cmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRcblx0XHR9XG5cdFx0XG5cdH1cblxuXG5cblxuPC9zY3JpcHQ+XG5cblxuXG5cblxuPHN0eWxlIHNjb3BlZD5cblx0XG5cdEBrZXlmcmFtZXMgZXhhbXBsZSB7XG5cdFx0ZnJvbSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDQwMCwgMCk7IH1cblx0XHR0byB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIDApOyB9XG5cdH1cdFxuXHRcblx0R3JpZExheW91dCB7XG5cdFx0cGFkZGluZzogMTQ7XG5cdFx0cGFkZGluZy1ib3R0b206IDA7XG5cdFx0YmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCByZ2JhKDI1NSwyNTUsMjU1LDEpIDAlLHJnYmEoMjU1LDI1NSwyNTUsMC42KSA0NiUscmdiYSgyNTUsMjU1LDI1NSwwLjE3KSA5NSUscmdiYSgyNTUsMjQ2LDAsMC4xMykgMTAwJSk7XG5cdH1cblx0XG5cdFBhZ2Uge1xuICAgICAgICBjb2xvcjogZGVlcHBpbms7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG5cdFx0Zm9udC1mYW1pbHk6IFwicHJveGltYS1ub3ZhLXNvZnRcIiwgXCJQcm94aW1hIE5vdmEgU29mdFwiLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuXHR9XG5cdFxuICAgIEFjdGlvbkJhciB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgICAgICBjb2xvcjogZGVlcHBpbms7XG4gICAgfVxuXHRcblx0UHJvZ3Jlc3Mge1xuXHRcdGNvbG9yOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYmEoMjU0LDI1MiwyMzQsMSkgMCUscmdiYSgyNDEsMjE4LDU0LDEpIDEwMCUpO1xuXHRcdGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xuXHRcdHRyYW5zZm9ybTogc2NhbGVZKDQpO1xuXHRcdG1hcmdpbi10b3A6IDQwO1xuXHR9XG5cdFxuXHRCdXR0b24ge1xuXHRcdGNvbG9yOiBkZWVwcGluaztcblx0XHRmb250LXNpemU6IDE4O1xuXHRcdHBhZGRpbmc6IDEyO1xuXHRcdGJhY2tncm91bmQ6IHdoaXRlO1xuXHRcdG1hcmdpbjogNDtcblx0XHRib3JkZXItcmFkaXVzOiA4O1xuXHRcdGJvcmRlci13aWR0aDogMjtcblx0XHRib3JkZXItY29sb3I6IHBpbms7XG5cdH1cblx0XG5cdC5iLXllbGxvdzpoaWdobGlnaHRlZHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LDI0NiwwLDAuMjIpO1xuXHR9XHRcblx0XG5cdEltYWdlIHtcblx0XHRvcGFjaXR5OiAwLjM1O1xuXHR9XG5cdFxuXHRMYWJlbCB7XG5cdFx0Y29sb3I6IGRlZXBwaW5rO1xuXHR9XG5cdFxuXHRMaXN0VmlldyB7XG5cdFx0YmFja2dyb3VuZDogd2hpdGU7XG5cdFx0cGFkZGluZzogMjtcblx0XHRhbmltYXRpb24tbmFtZTogZXhhbXBsZTtcblx0XHRhbmltYXRpb24tZHVyYXRpb246IDAuNTtcblx0XHRhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4xLCAwLjEsIDAuMSwgMSk7XG5cdFx0YW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XHRcdFx0XG5cdH1cblx0XG5cdC5sdi1sYWIge1xuXHRcdGNvbG9yOmRlZXBwaW5rO1xuXHRcdHRleHQtYWxpZ246IGxlZnQ7XG5cdFx0Zm9udC1zaXplOiAxMjtcblx0XHRwYWRkaW5nOiA5O1xuXHRcdGJhY2tncm91bmQ6IHdoaXRlO1xuXHRcdGJvcmRlci1yYWRpdXM6IDQ7XG5cdFx0Ym9yZGVyLXdpZHRoOiAyO1xuXHRcdGJvcmRlci10b3Atd2lkdGg6IDA7XG5cdFx0Ym9yZGVyLWNvbG9yOiBwaW5rO1xuXHRcdG1hcmdpbi1ib3R0b206IDI7XG5cdH1cblx0XG5cdC5zcGVlZExhYmVsIHtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdFx0Zm9udC1zaXplOiAxMDtcblx0XHRwYWRkaW5nLWJvdHRvbTogMjA7XG5cdH1cblx0XG5cdC52b2x1bWVMYWJlbCB7XG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRcdGZvbnQtc2l6ZTogMTA7XG5cdFx0cGFkZGluZy1ib3R0b206IDIwO1xuXHR9XG5cdFxuXHRcblx0Lm11c2ljSW5mbyB7XG5cdFx0Y29sb3I6IGRlZXBwaW5rO1xuXHRcdGZvbnQtc2l6ZTogMTg7XG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHR9XG5cdFxuXHQudm9sdW1lU2xpZGVyIHtcblx0XHRjb2xvcjogZGVlcHBpbms7XG5cdFx0d2lkdGg6IDgwJTtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdFx0YmFja2dyb3VuZDogYmxhY2s7XG5cdFx0dHJhbnNmb3JtOiBzY2FsZSgwLjYpXG5cdH1cblx0XG5cdC5zcGVlZFNsaWRlciB7XG5cdFx0Y29sb3I6IGRlZXBwaW5rO1xuXHRcdHdpZHRoOiA4MCU7XG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRcdGJhY2tncm91bmQ6IGJsYWNrO1xuXHRcdHRyYW5zZm9ybTogc2NhbGUoMC42KVxuXHR9XG5cdFxuXHQuY29weVJpZ2h0cyB7XG5cdFx0Y29sb3I6IHBpbms7XG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRcdGZvbnQtc2l6ZTogMTA7XG5cdH1cblx0LmNvdmVySW5mbyB7XG5cdFx0Y29sb3I6cGluaztcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdFx0Zm9udC1zaXplOiAyODtcblx0XHRjb2xvcjogZGVlcHBpbms7XG5cdH1cblx0Lm11c2ljUHJvZ3Jlc3Mge1xuXHRcdGNvbG9yOiBkZWVwcGluaztcblx0XHR3aWR0aDogODAlO1xuXHRcdHRleHQtYWxpZ246IGNlbnRlcjtcblx0XHRiYWNrZ3JvdW5kOiBwaW5rO1xuXHR9XG5cdFxuXG48L3N0eWxlPlxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikoZmFsc2UpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG5Aa2V5ZnJhbWVzIGV4YW1wbGUtZGF0YS12LTQ1YmE1ZWQ0IHtcXG5mcm9tIHsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoNDAwLCAwKTtcXG59XFxudG8geyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXG59XFxufVxcbkdyaWRMYXlvdXRbZGF0YS12LTQ1YmE1ZWQ0XSB7XFxuXFx0XFx0cGFkZGluZzogMTQ7XFxuXFx0XFx0cGFkZGluZy1ib3R0b206IDA7XFxuXFx0XFx0YmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCByZ2JhKDI1NSwyNTUsMjU1LDEpIDAlLHJnYmEoMjU1LDI1NSwyNTUsMC42KSA0NiUscmdiYSgyNTUsMjU1LDI1NSwwLjE3KSA5NSUscmdiYSgyNTUsMjQ2LDAsMC4xMykgMTAwJSk7XFxufVxcblBhZ2VbZGF0YS12LTQ1YmE1ZWQ0XSB7XFxuICAgICAgICBjb2xvcjogZGVlcHBpbms7XFxuXFx0XFx0YmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuXFx0XFx0Zm9udC1mYW1pbHk6IFxcXCJwcm94aW1hLW5vdmEtc29mdFxcXCIsIFxcXCJQcm94aW1hIE5vdmEgU29mdFxcXCIsIEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XFxufVxcbkFjdGlvbkJhcltkYXRhLXYtNDViYTVlZDRdIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICAgICAgY29sb3I6IGRlZXBwaW5rO1xcbn1cXG5Qcm9ncmVzc1tkYXRhLXYtNDViYTVlZDRdIHtcXG5cXHRcXHRjb2xvcjogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCByZ2JhKDI1NCwyNTIsMjM0LDEpIDAlLHJnYmEoMjQxLDIxOCw1NCwxKSAxMDAlKTtcXG5cXHRcXHRiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG5cXHRcXHR0cmFuc2Zvcm06IHNjYWxlWSg0KTtcXG5cXHRcXHRtYXJnaW4tdG9wOiA0MDtcXG59XFxuQnV0dG9uW2RhdGEtdi00NWJhNWVkNF0ge1xcblxcdFxcdGNvbG9yOiBkZWVwcGluaztcXG5cXHRcXHRmb250LXNpemU6IDE4O1xcblxcdFxcdHBhZGRpbmc6IDEyO1xcblxcdFxcdGJhY2tncm91bmQ6IHdoaXRlO1xcblxcdFxcdG1hcmdpbjogNDtcXG5cXHRcXHRib3JkZXItcmFkaXVzOiA4O1xcblxcdFxcdGJvcmRlci13aWR0aDogMjtcXG5cXHRcXHRib3JkZXItY29sb3I6IHBpbms7XFxufVxcbi5iLXllbGxvd1tkYXRhLXYtNDViYTVlZDRdOmhpZ2hsaWdodGVke1xcblxcdFxcdGJhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsMjQ2LDAsMC4yMik7XFxufVxcbkltYWdlW2RhdGEtdi00NWJhNWVkNF0ge1xcblxcdFxcdG9wYWNpdHk6IDAuMzU7XFxufVxcbkxhYmVsW2RhdGEtdi00NWJhNWVkNF0ge1xcblxcdFxcdGNvbG9yOiBkZWVwcGluaztcXG59XFxuTGlzdFZpZXdbZGF0YS12LTQ1YmE1ZWQ0XSB7XFxuXFx0XFx0YmFja2dyb3VuZDogd2hpdGU7XFxuXFx0XFx0cGFkZGluZzogMjtcXG5cXHRcXHRhbmltYXRpb24tbmFtZTogZXhhbXBsZS1kYXRhLXYtNDViYTVlZDQ7XFxuXFx0XFx0YW5pbWF0aW9uLWR1cmF0aW9uOiAwLjU7XFxuXFx0XFx0YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuMSwgMC4xLCAwLjEsIDEpO1xcblxcdFxcdGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbn1cXG4ubHYtbGFiW2RhdGEtdi00NWJhNWVkNF0ge1xcblxcdFxcdGNvbG9yOmRlZXBwaW5rO1xcblxcdFxcdHRleHQtYWxpZ246IGxlZnQ7XFxuXFx0XFx0Zm9udC1zaXplOiAxMjtcXG5cXHRcXHRwYWRkaW5nOiA5O1xcblxcdFxcdGJhY2tncm91bmQ6IHdoaXRlO1xcblxcdFxcdGJvcmRlci1yYWRpdXM6IDQ7XFxuXFx0XFx0Ym9yZGVyLXdpZHRoOiAyO1xcblxcdFxcdGJvcmRlci10b3Atd2lkdGg6IDA7XFxuXFx0XFx0Ym9yZGVyLWNvbG9yOiBwaW5rO1xcblxcdFxcdG1hcmdpbi1ib3R0b206IDI7XFxufVxcbi5zcGVlZExhYmVsW2RhdGEtdi00NWJhNWVkNF0ge1xcblxcdFxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRcXHRmb250LXNpemU6IDEwO1xcblxcdFxcdHBhZGRpbmctYm90dG9tOiAyMDtcXG59XFxuLnZvbHVtZUxhYmVsW2RhdGEtdi00NWJhNWVkNF0ge1xcblxcdFxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRcXHRmb250LXNpemU6IDEwO1xcblxcdFxcdHBhZGRpbmctYm90dG9tOiAyMDtcXG59XFxuLm11c2ljSW5mb1tkYXRhLXYtNDViYTVlZDRdIHtcXG5cXHRcXHRjb2xvcjogZGVlcHBpbms7XFxuXFx0XFx0Zm9udC1zaXplOiAxODtcXG5cXHRcXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcbi52b2x1bWVTbGlkZXJbZGF0YS12LTQ1YmE1ZWQ0XSB7XFxuXFx0XFx0Y29sb3I6IGRlZXBwaW5rO1xcblxcdFxcdHdpZHRoOiA4MCU7XFxuXFx0XFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdFxcdGJhY2tncm91bmQ6IGJsYWNrO1xcblxcdFxcdHRyYW5zZm9ybTogc2NhbGUoMC42KVxcbn1cXG4uc3BlZWRTbGlkZXJbZGF0YS12LTQ1YmE1ZWQ0XSB7XFxuXFx0XFx0Y29sb3I6IGRlZXBwaW5rO1xcblxcdFxcdHdpZHRoOiA4MCU7XFxuXFx0XFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdFxcdGJhY2tncm91bmQ6IGJsYWNrO1xcblxcdFxcdHRyYW5zZm9ybTogc2NhbGUoMC42KVxcbn1cXG4uY29weVJpZ2h0c1tkYXRhLXYtNDViYTVlZDRdIHtcXG5cXHRcXHRjb2xvcjogcGluaztcXG5cXHRcXHR0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFx0XFx0Zm9udC1zaXplOiAxMDtcXG59XFxuLmNvdmVySW5mb1tkYXRhLXYtNDViYTVlZDRdIHtcXG5cXHRcXHRjb2xvcjpwaW5rO1xcblxcdFxcdHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXHRcXHRmb250LXNpemU6IDI4O1xcblxcdFxcdGNvbG9yOiBkZWVwcGluaztcXG59XFxuLm11c2ljUHJvZ3Jlc3NbZGF0YS12LTQ1YmE1ZWQ0XSB7XFxuXFx0XFx0Y29sb3I6IGRlZXBwaW5rO1xcblxcdFxcdHdpZHRoOiA4MCU7XFxuXFx0XFx0dGV4dC1hbGlnbjogY2VudGVyO1xcblxcdFxcdGJhY2tncm91bmQ6IHBpbms7XFxufVxcblxcdFxcblxcblwiLCBcIlwiXSk7XG5cblxuICAgIGNvbnN0IGFwcGxpY2F0aW9uID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIik7XG4gICAgcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvc3R5bGluZy9zdHlsZS1zY29wZVwiKTtcblxuICAgIGlmICh0eXBlb2YgZXhwb3J0cy5mb3JFYWNoID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZXhwb3J0cy5mb3JFYWNoKGNzc0V4cG9ydCA9PiB7XG4gICAgICAgICAgICBpZiAoY3NzRXhwb3J0Lmxlbmd0aCA+IDEgJiYgY3NzRXhwb3J0WzFdKSB7XG4gICAgICAgICAgICAgICAgLy8gYXBwbHlpbmcgdGhlIHNlY29uZCBpdGVtIG9mIHRoZSBleHBvcnQgYXMgaXQgY29udGFpbnMgdGhlIGNzcyBjb250ZW50c1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLmFkZENzcyhjc3NFeHBvcnRbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG47XG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5obXJSZWZyZXNoKHsgdHlwZTogJ3N0eWxlJywgcGF0aDogJy4vY29tcG9uZW50cy9BcHAudnVlJyB9KTtcbiAgICAgICAgfSlcbiAgICB9XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiUGFnZVwiLFxuICAgIFtcbiAgICAgIF9jKFwiQWN0aW9uQmFyXCIsIHsgYXR0cnM6IHsgdGl0bGU6IFwiRGFtc3RyaW4gU2hhcnAgTXVzaWNcIiB9IH0pLFxuICAgICAgX2MoXG4gICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IGNvbHVtbnM6IFwiKiwqLCpcIiwgcm93czogXCIqLCosMzAsNjAsNTAsNTAsNTBcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgIHN0eWxlOiBfdm0ucm90YXRlTWUoLTEwKSxcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgIGNvbFNwYW46IFwiM1wiLFxuICAgICAgICAgICAgICByb3dTcGFuOiBcIjJcIixcbiAgICAgICAgICAgICAgc3JjOiBcIn4vYXNzZXRzL2ltYWdlcy9QcmFuYTEtSWNvbjEucG5nXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgIHN0eWxlOiBfdm0ucm90YXRlTWUoNSksXG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICBjb2xTcGFuOiBcIjNcIixcbiAgICAgICAgICAgICAgcm93U3BhbjogXCIyXCIsXG4gICAgICAgICAgICAgIHNyYzogXCJ+L2Fzc2V0cy9pbWFnZXMvUHJhbmExLUNpcmNsZS1QaW5rQmlnLnBuZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkxhYmVsXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNvdmVySW5mb1wiLFxuICAgICAgICAgICAgICBhdHRyczogeyByb3c6IFwiMFwiLCBjb2w6IFwiMFwiLCBjb2xTcGFuOiBcIjNcIiwgcm93U3BhbjogXCIyXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uY3VycmVudFNvbmdEdXJhdGlvbkluZm8pICtcbiAgICAgICAgICAgICAgICAgIFwiIC8gXCIgK1xuICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5jdXJyZW50VGltZSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkxhYmVsXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInNwZWVkTGFiZWxcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjJcIiwgY29sOiBcIjBcIiwgY29sU3BhbjogXCIzXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoXCJTcGVlZFwiKV1cbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFwiU2xpZGVyXCIsIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInNwZWVkU2xpZGVyXCIsXG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICByb3c6IFwiMlwiLFxuICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICBjb2xTcGFuOiBcIjNcIixcbiAgICAgICAgICAgICAgdmFsdWU6IF92bS5jdXJyZW50U3BlZWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjogeyB2YWx1ZUNoYW5nZTogX3ZtLm9uU2xpZGVyU3BlZWRDaGFuZ2VkIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiTGFiZWxcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidm9sdW1lTGFiZWxcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjNcIiwgY29sOiBcIjBcIiwgY29sU3BhbjogXCIzXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoXCJWb2x1bWVcIildXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfYyhcIlNsaWRlclwiLCB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ2b2x1bWVTbGlkZXJcIixcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIHJvdzogXCIzXCIsXG4gICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgIGNvbFNwYW46IFwiM1wiLFxuICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmN1cnJlbnRWb2x1bWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjogeyB2YWx1ZUNoYW5nZTogX3ZtLm9uU2xpZGVyVmFsdWVDaGFuZ2VkIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiTGFiZWxcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibXVzaWNJbmZvXCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHJvdzogXCIxXCIsIGNvbDogXCIwXCIsIGNvbFNwYW46IFwiM1wiLCB0ZXh0V3JhcDogXCJ0cnVlXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5tdXNpY0luZm8uaW5mbykpXVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXCJQcm9ncmVzc1wiLCB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtdXNpY1Byb2dyZXNzXCIsXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICBjb2xvcjogX3ZtLnByb2dyZXNzRHluQ29sb3IsXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogXCJzY2FsZVkoXCIgKyBfdm0ucHJvZ3Jlc3NTY2FsZVkgKyBcIilcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgIGNvbFNwYW46IFwiM1wiLFxuICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmN1cnJlbnRQcm9ncmVzc1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uOiB7IHRvdWNoOiBfdm0uc2tpcFRvTmV3VGltZSB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkJ1dHRvblwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJiLXllbGxvd1wiLFxuICAgICAgICAgICAgICBhdHRyczogeyByb3c6IFwiNFwiLCBjb2w6IFwiMFwiLCByb3dTcGFuOiBcIjFcIiB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnBsYXlNdXNpYygpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLnBsYXlNc2cpKV1cbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJCdXR0b25cIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYi15ZWxsb3dcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjRcIiwgY29sOiBcIjFcIiwgcm93U3BhbjogXCIxXCIgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5wYXVzZU11c2ljKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0ucGF1c2VNc2cpKV1cbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJCdXR0b25cIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYi15ZWxsb3dcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjRcIiwgY29sOiBcIjJcIiwgcm93U3BhbjogXCIxXCIgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zdG9wTXVzaWMoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5zdG9wTXNnKSldXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiQnV0dG9uXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImIteWVsbG93XCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHJvdzogXCI1XCIsIGNvbDogXCIwXCIsIGNvbFNwYW46IFwiM1wiIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2hvd0F1ZGlvRmlsZXNMaXN0KClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uZmlsZXNNc2cpKV1cbiAgICAgICAgICApLFxuICAgICAgICAgIF92bS5zaG93TGlzdCA9PSB0cnVlXG4gICAgICAgICAgICA/IF9jKFxuICAgICAgICAgICAgICAgIFwiTGlzdFZpZXdcIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICBjb2xTcGFuOiBcIjNcIixcbiAgICAgICAgICAgICAgICAgICAgcm93U3BhbjogXCI0XCIsXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBfdm0ubGlzdE9mSXRlbXMsXG4gICAgICAgICAgICAgICAgICAgIFwiK2FsaWFzXCI6IFwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgb246IHsgaXRlbVRhcDogX3ZtLm9uSXRlbVRhcCB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcInYtdGVtcGxhdGVcIiwge1xuICAgICAgICAgICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFxuICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gcmVmLml0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGluZGV4ID0gcmVmLiRpbmRleFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkZXZlbiA9IHJlZi4kZXZlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkb2RkID0gcmVmLiRvZGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJsdi1sYWJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IGl0ZW0uX25hbWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgNDA1MzEyMTQzMVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJMYWJlbFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjb3B5UmlnaHRzXCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHJvdzogXCI2XCIsIGNvbDogXCIwXCIsIGNvbFNwYW46IFwiM1wiIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc2hvd0NyZWRpdHMoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5jb3B5UmlnaHRzSW5mbykpXVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIG1hcCA9IHtcblx0XCIuL2FwcC5zY3NzXCI6IFwiLi9hcHAuc2Nzc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSB7IC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBpZDtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vIHN5bmMgXlxcXFwuXFxcXC9hcHBcXFxcLihjc3N8c2Nzc3xsZXNzfHNhc3MpJFwiOyIsInZhciBtYXAgPSB7XG5cdFwiLi9hcHAuanNcIjogXCIuL2FwcC5qc1wiLFxuXHRcIi4vYXBwLnNjc3NcIjogXCIuL2FwcC5zY3NzXCIsXG5cdFwiLi9zdG9yZS5qc1wiOiBcIi4vc3RvcmUuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgeyAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gaWQ7XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuLyBzeW5jIHJlY3Vyc2l2ZSAoPzwhXFxcXGJBcHBfUmVzb3VyY2VzXFxcXGIuKikoPzwhXFxcXC5cXFxcL1xcXFxidGVzdHNcXFxcYlxcXFwvLio/KVxcXFwuKHhtbHxjc3N8anN8a3R8KD88IVxcXFwuZFxcXFwuKXRzfCg/PCFcXFxcYl9bXFxcXHctXSpcXFxcLilzY3NzKSRcIjsiLCIvLyBpbXBvcnQgVnVlIGZyb20gXCJuYXRpdmVzY3JpcHQtdnVlXCI7XG5cbi8vIGltcG9ydCBIb21lIGZyb20gXCIuL2NvbXBvbmVudHMvSG9tZVwiO1xuXG4vLyBuZXcgVnVlKHtcblxuLy8gICAgIHRlbXBsYXRlOiBgXG4vLyAgICAgICAgIDxGcmFtZT5cbi8vICAgICAgICAgICAgIDxIb21lIC8+XG4vLyAgICAgICAgIDwvRnJhbWU+YCxcblxuLy8gICAgIGNvbXBvbmVudHM6IHtcbi8vICAgICAgICAgSG9tZVxuLy8gICAgIH1cbi8vIH0pLiRzdGFydCgpO1xuXG5pbXBvcnQgVnVlIGZyb20gJ25hdGl2ZXNjcmlwdC12dWUnXG5pbXBvcnQgQXBwIGZyb20gJy4vY29tcG9uZW50cy9BcHAnXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZSc7XG5cbmltcG9ydCBWdWVEZXZ0b29scyBmcm9tICduYXRpdmVzY3JpcHQtdnVlLWRldnRvb2xzJ1xuXG5pZihUTlNfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgVnVlLnVzZShWdWVEZXZ0b29scylcbn1cbi8vIFByaW50cyBWdWUgbG9ncyB3aGVuIC0tZW52LnByb2R1Y3Rpb24gaXMgKk5PVCogc2V0IHdoaWxlIGJ1aWxkaW5nXG5WdWUuY29uZmlnLnNpbGVudCA9IChUTlNfRU5WID09PSAncHJvZHVjdGlvbicpXG5cblxubmV3IFZ1ZSh7XG4gIHN0b3JlLFxuICByZW5kZXI6IGggPT4gaCgnZnJhbWUnLCBbaChBcHApXSlcbn0pLiRzdGFydCgpIiwibW9kdWxlLmV4cG9ydHMgPSB7XCJ0eXBlXCI6XCJzdHlsZXNoZWV0XCIsXCJzdHlsZXNoZWV0XCI6e1wicnVsZXNcIjpbXSxcInBhcnNpbmdFcnJvcnNcIjpbXX19OztcbiAgICBpZiAobW9kdWxlLmhvdCkge1xuICAgICAgICBtb2R1bGUuaG90LmFjY2VwdCgpO1xuICAgICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoKCkgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmhtclJlZnJlc2goeyB0eXBlOiAnc3R5bGUnLCBwYXRoOiAnLi9hcHAuc2NzcycgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQ1YmE1ZWQ0JnNjb3BlZD10cnVlJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQ1YmE1ZWQ0JnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgXCI0NWJhNWVkNFwiLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9Vc2Vycy9taXNpYWsvRGVza3RvcC8yMDIwL2FwcHMvbXVzYXBwL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc0NWJhNWVkNCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc0NWJhNWVkNCcsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vQXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00NWJhNWVkNCZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc0NWJhNWVkNCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiY29tcG9uZW50cy9BcHAudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL3N0eWxlLWhvdC1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9hcHBseS1jc3MtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTMtMiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9NDViYTVlZDQmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS0zLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXBwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmlkPTQ1YmE1ZWQ0JnNjb3BlZD10cnVlJmxhbmc9Y3NzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDViYTVlZDQmc2NvcGVkPXRydWUmXCIiLCJpbXBvcnQgVnVlIGZyb20gJ3Z1ZSc7XG5pbXBvcnQgVnVleCBmcm9tICd2dWV4JztcblxuVnVlLnVzZShWdWV4KTtcblxuZXhwb3J0IGRlZmF1bHQgbmV3IFZ1ZXguU3RvcmUoe1xuICBzdGF0ZToge1xuXG4gIH0sXG4gIG11dGF0aW9uczoge1xuXG4gIH0sXG4gIGFjdGlvbnM6IHtcblxuICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=