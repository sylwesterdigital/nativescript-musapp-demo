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
const screen = __webpack_require__("../node_modules/@nativescript/core/platform/index.js").screen;

const fs = __webpack_require__("../node_modules/@nativescript/core/file-system/index.js"); //const documents = fs.knownFolders.documents();


const audio = __webpack_require__("../node_modules/nativescript-audio/audio.js");

const playerTNS = new audio.TNSPlayer();
playerTNS.debug = true;
/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      copyRightsInfo: 'Copyright 2019-2021 © Sylwester K. Mielniczuk',
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

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/App.vue?vue&type=template&id=45ba5ed4&":
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
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync ^\\.\\/app\\.(css|scss|less|sass)$";

/***/ }),

/***/ "./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$":
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
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$";

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

            __webpack_require__("../node_modules/@nativescript/webpack/helpers/load-application-css-regular.js")();
            
            
        if (true) {
            const hmrUpdate = __webpack_require__("../node_modules/@nativescript/webpack/hmr/index.js").hmrUpdate;
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
        
            const context = __webpack_require__("./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$");
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

/* WEBPACK VAR INJECTION */(function(global) {module.exports = {"type":"stylesheet","stylesheet":{"rules":[{"type":"rule","selectors":[".fab"],"declarations":[{"type":"declaration","property":"font-family","value":"\"Font Awesome 5 Brands\", \"fa-brands-400\""},{"type":"declaration","property":"font-weight","value":"400"}]},{"type":"rule","selectors":[".fas"],"declarations":[{"type":"declaration","property":"font-family","value":"\"Font Awesome 5 Free\", \"fa-solid-900\""},{"type":"declaration","property":"font-weight","value":"900"}]},{"type":"rule","selectors":[".far"],"declarations":[{"type":"declaration","property":"font-family","value":"\"Font Awesome 5 Free\", \"fa-regular-400\""},{"type":"declaration","property":"font-weight","value":"400"}]},{"type":"keyframes","name":"empty","keyframes":[]},{"type":"comment","comment":" Forms "},{"type":"comment","comment":"*\n * Blue variable overrides\n *"},{"type":"keyframes","name":"example","keyframes":[{"type":"keyframe","values":["from"],"declarations":[{"type":"declaration","property":"transform","value":"translate(400, 0)"}]},{"type":"keyframe","values":["to"],"declarations":[{"type":"declaration","property":"transform","value":"translate(0, 0)"}]}]},{"type":"rule","selectors":["GridLayout"],"declarations":[{"type":"declaration","property":"padding","value":"14"},{"type":"declaration","property":"padding-bottom","value":"0"},{"type":"declaration","property":"background","value":"linear-gradient(to right, white 0%, rgba(255, 255, 255, 0.6) 46%, rgba(255, 255, 255, 0.17) 95%, rgba(255, 246, 0, 0.13) 100%)"}]},{"type":"rule","selectors":["Page"],"declarations":[{"type":"declaration","property":"color","value":"deeppink"},{"type":"declaration","property":"background-color","value":"white"},{"type":"declaration","property":"font-family","value":"Avenir"}]},{"type":"rule","selectors":["ActionBar"],"declarations":[{"type":"declaration","property":"background-color","value":"white"},{"type":"declaration","property":"color","value":"deeppink"},{"type":"declaration","property":"font-family","value":"Avenir"}]},{"type":"rule","selectors":["Progress"],"declarations":[{"type":"declaration","property":"color","value":"linear-gradient(to right, #fefcea 0%, #f1da36 100%)"},{"type":"declaration","property":"background-color","value":"black"},{"type":"declaration","property":"transform","value":"scaleY(4)"},{"type":"declaration","property":"margin-top","value":"40"}]},{"type":"rule","selectors":["Button"],"declarations":[{"type":"declaration","property":"color","value":"deeppink"},{"type":"declaration","property":"font-size","value":"18"},{"type":"declaration","property":"padding","value":"12"},{"type":"declaration","property":"background","value":"white"},{"type":"declaration","property":"margin","value":"4"},{"type":"declaration","property":"border-radius","value":"8"},{"type":"declaration","property":"border-width","value":"2"},{"type":"declaration","property":"border-color","value":"pink"}]},{"type":"rule","selectors":[".b-yellow"],"declarations":[{"type":"declaration","property":"background-color","value":"red"},{"type":"declaration","property":"background-color","value":"rgba(255, 246, 0, 0.22)"}]},{"type":"rule","selectors":["Image"],"declarations":[{"type":"declaration","property":"opacity","value":"0.35"}]},{"type":"rule","selectors":["Label"],"declarations":[{"type":"declaration","property":"color","value":"deeppink"}]},{"type":"rule","selectors":["ListView"],"declarations":[{"type":"declaration","property":"background","value":"white"},{"type":"declaration","property":"padding","value":"2"},{"type":"declaration","property":"animation-name","value":"example"},{"type":"declaration","property":"animation-duration","value":"0.5"},{"type":"declaration","property":"animation-timing-function","value":"cubic-bezier(0.1, 0.1, 0.1, 1)"},{"type":"declaration","property":"animation-fill-mode","value":"forwards"}]},{"type":"rule","selectors":[".lv-lab"],"declarations":[{"type":"declaration","property":"color","value":"deeppink"},{"type":"declaration","property":"text-align","value":"left"},{"type":"declaration","property":"font-size","value":"12"},{"type":"declaration","property":"padding","value":"9"},{"type":"declaration","property":"background","value":"white"},{"type":"declaration","property":"border-radius","value":"4"},{"type":"declaration","property":"border-width","value":"2"},{"type":"declaration","property":"border-top-width","value":"0"},{"type":"declaration","property":"border-color","value":"pink"},{"type":"declaration","property":"margin-bottom","value":"2"}]},{"type":"rule","selectors":[".speedLabel"],"declarations":[{"type":"declaration","property":"text-align","value":"center"},{"type":"declaration","property":"font-size","value":"10"},{"type":"declaration","property":"padding-bottom","value":"20"}]},{"type":"rule","selectors":[".volumeLabel"],"declarations":[{"type":"declaration","property":"text-align","value":"center"},{"type":"declaration","property":"font-size","value":"10"},{"type":"declaration","property":"padding-bottom","value":"20"}]},{"type":"rule","selectors":[".musicInfo"],"declarations":[{"type":"declaration","property":"color","value":"deeppink"},{"type":"declaration","property":"font-size","value":"18"},{"type":"declaration","property":"text-align","value":"center"}]},{"type":"rule","selectors":[".volumeSlider"],"declarations":[{"type":"declaration","property":"color","value":"deeppink"},{"type":"declaration","property":"width","value":"80%"},{"type":"declaration","property":"text-align","value":"center"},{"type":"declaration","property":"background","value":"black"},{"type":"declaration","property":"transform","value":"scale(0.6)"}]},{"type":"rule","selectors":[".speedSlider"],"declarations":[{"type":"declaration","property":"color","value":"deeppink"},{"type":"declaration","property":"width","value":"80%"},{"type":"declaration","property":"text-align","value":"center"},{"type":"declaration","property":"background","value":"black"},{"type":"declaration","property":"transform","value":"scale(0.6)"}]},{"type":"rule","selectors":[".copyRights"],"declarations":[{"type":"declaration","property":"color","value":"pink"},{"type":"declaration","property":"text-align","value":"center"},{"type":"declaration","property":"font-size","value":"8"}]},{"type":"rule","selectors":[".coverInfo"],"declarations":[{"type":"declaration","property":"color","value":"pink"},{"type":"declaration","property":"text-align","value":"center"},{"type":"declaration","property":"font-size","value":"28"},{"type":"declaration","property":"color","value":"deeppink"}]},{"type":"rule","selectors":[".musicProgress"],"declarations":[{"type":"declaration","property":"color","value":"green"},{"type":"declaration","property":"width","value":"70%"},{"type":"declaration","property":"text-align","value":"center"},{"type":"declaration","property":"background","value":"pink"}]}],"parsingErrors":[]}};;
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
/* harmony import */ var _App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/App.vue?vue&type=template&id=45ba5ed4&");
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('45ba5ed4')) {
      api.createRecord('45ba5ed4', component.options)
    } else {
      api.reload('45ba5ed4', component.options)
    }
    module.hot.accept("./components/App.vue?vue&type=template&id=45ba5ed4&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/App.vue?vue&type=template&id=45ba5ed4&");
(function () {
      api.rerender('45ba5ed4', {
        render: _App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
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

/***/ "./components/App.vue?vue&type=template&id=45ba5ed4&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/App.vue?vue&type=template&id=45ba5ed4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_45ba5ed4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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

/***/ }),

/***/ "~/package.json":
/***/ (function(module, exports) {

module.exports = require("~/package.json");

/***/ })

},[["./app.js","runtime","vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9BcHAudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvQXBwLnZ1ZT83YjBlIiwid2VicGFjazovLy8uIHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9hcHBcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSQiLCJ3ZWJwYWNrOi8vL1xcYl9bXFx3LV0qXFwuKXNjc3MpJCIsIndlYnBhY2s6Ly8vLi9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9BcHAudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvQXBwLnZ1ZT85ZTIzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvQXBwLnZ1ZT9iMzc3Iiwid2VicGFjazovLy8uL3N0b3JlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIn4vcGFja2FnZS5qc29uXCIiXSwibmFtZXMiOlsiVnVlIiwic3RvcmUiLCJWdWVEZXZ0b29scyIsIlROU19FTlYiLCJ1c2UiLCJjb25maWciLCJzaWxlbnQiLCJyZW5kZXIiLCJoIiwiJHN0YXJ0IiwiVnVleCIsIlN0b3JlIiwic3RhdGUiLCJtdXRhdGlvbnMiLCJhY3Rpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtREE7O0FBRUEsMEYsQ0FDQTs7O0FBRUE7O0FBRUE7QUFDQTtBQUdBO0FBRUE7QUFDQTtBQUNBLHFFQURBO0FBRUEsc0NBRkE7QUFHQSxxQkFIQTtBQUlBLHVCQUpBO0FBS0EscUJBTEE7QUFNQSx1QkFOQTtBQU9BLHdCQVBBO0FBUUEsdUJBUkE7QUFTQSxpQ0FUQTtBQVVBLDRCQVZBO0FBV0EsdUJBWEE7QUFhQSx3Q0FiQTtBQWNBO0FBQUE7QUFBQSxPQWRBO0FBZUEsd0JBZkE7QUFpQkE7QUFDQSx1REFEQTtBQUVBLGtCQUZBO0FBR0E7QUFDQTtBQUNBLFNBTEE7QUFNQTtBQUNBO0FBQ0EsU0FSQTtBQVNBO0FBQ0E7QUFDQTtBQVhBLE9BakJBO0FBK0JBLGtCQS9CQTtBQWlDQSxvQkFDQTtBQUFBO0FBQUE7QUFBQSxPQURBLEVBRUE7QUFBQTtBQUFBO0FBQUEsT0FGQSxFQUdBO0FBQUE7QUFBQTtBQUFBLE9BSEEsQ0FqQ0E7QUF1Q0EscUJBdkNBO0FBeUNBLGtDQXpDQTtBQTBDQSx1QkExQ0E7QUE0Q0Esb0JBNUNBLENBOENBO0FBQ0E7O0FBL0NBO0FBa0RBLEdBckRBOztBQXVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0EsS0FGQSxHQUlBO0FBQ0E7QUFDQSxLQUZBLEVBRUEsRUFGQSxDQUpBO0FBT0E7QUFFQSxHQXhFQTtBQTJFQTtBQUVBO0FBQ0E7QUFDQSw2Q0FEQTtBQUVBLGtEQUZBO0FBR0E7QUFIQSxTQUlBLElBSkEsQ0FJQTtBQUNBO0FBQ0EsT0FOQTtBQU9BLEtBVkE7O0FBWUE7QUFDQTtBQUFBO0FBQUE7QUFDQSxLQWRBOztBQWdCQTtBQUVBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFFQTtBQUVBLGtDQWJBLENBZUE7QUFFQSxLQWpDQTs7QUFtQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsT0FGQSxNQUVBO0FBQ0E7QUFDQTtBQUVBLEtBN0NBOztBQStDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBRUEsS0F4REE7O0FBMERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQ0EsSUFEQSxDQUNBO0FBQ0E7QUFDQTtBQUNBLE9BSkEsRUFJQSxLQUpBLENBSUE7QUFDQTtBQUNBLE9BTkE7QUFRQSxLQXRFQTs7QUF3RUE7QUFDQTtBQUNBLDJCQUNBLElBREEsQ0FDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FIQSxDQUlBO0FBQ0EsT0FOQSxFQU9BLEtBUEEsQ0FPQTtBQUNBO0FBQ0E7QUFDQSxPQVZBO0FBV0EsS0FyRkE7O0FBdUZBO0FBRUE7QUFDQTtBQUNBLGdHQUpBLENBS0E7O0FBRUE7QUFDQSxLQS9GQTs7QUFpR0E7QUFDQTtBQUNBLEtBbkdBOztBQXFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0ExR0E7O0FBNEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQWpIQTs7QUFvSEE7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0VBRUEsNkNBQ0EsSUFEQSxDQUNBO0FBQ0E7QUFDQSxPQUhBLEVBSUEsS0FKQSxDQUlBO0FBQ0E7QUFDQTtBQUNBLE9BUEEsQ0FGQTtBQVdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBLE9BUkE7QUFVQTtBQUNBO0FBRUEsS0FsSkE7O0FBb0pBO0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBRUEsbURBQ0EsSUFEQSxDQUNBO0FBQ0E7QUFDQSxPQUhBLEVBSUEsS0FKQSxDQUlBO0FBQ0E7QUFDQTtBQUNBLE9BUEE7QUFTQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQSxPQVJBO0FBVUEsS0EvS0E7O0FBaUxBO0FBRUEsMENBQ0EsSUFEQSxDQUNBO0FBQ0E7QUFDQTtBQUNBLE9BSkEsRUFLQSxLQUxBLENBS0E7QUFDQTtBQUNBLE9BUEE7QUFZQSxLQS9MQTs7QUFpTUE7QUFHQTtBQUVBO0FBRUE7QUFFQSw0QkFDQSxJQURBLENBQ0E7QUFDQTtBQUNBLFNBSEEsRUFJQSxLQUpBLENBSUE7QUFDQTtBQUNBLFNBTkE7QUFPQSxPQWJBLE1BYUE7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUVBLEtBMU5BOztBQTROQTtBQUVBO0FBRUE7QUFHQSxLQW5PQTs7QUFxT0E7QUFDQSxzQ0FEQSxDQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBOztBQUNBO0FBQUE7QUFBQTs7QUFDQTtBQUNBOztBQS9PQTtBQTNFQSxHOzs7Ozs7OztBQzlEQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTLGdDQUFnQyxFQUFFO0FBQ2xFO0FBQ0E7QUFDQSxTQUFTLFNBQVMsK0NBQStDLEVBQUU7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixpQkFBaUI7QUFDakIsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsaUJBQWlCO0FBQ2pCLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixpQkFBaUI7QUFDakIsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG1DQUFtQztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixtQ0FBbUM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbUNBQW1DO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG1DQUFtQztBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CLHVCQUF1QjtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEMsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbUNBQW1DO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDMU5BO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFOzs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzSjs7Ozs7Ozs7QUN4QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUEsT0FBT0EsR0FBUDtBQUNBO0FBQ0EsT0FBT0MsS0FBUCxNQUFrQixTQUFsQjtBQUVBLE9BQU9DLFdBQVAsTUFBd0IsMkJBQXhCOztBQUVBLElBQUdDLE9BQU8sS0FBSyxZQUFmLEVBQTZCO0FBQzNCSCxLQUFHLENBQUNJLEdBQUosQ0FBUUYsU0FBUjtBQUNELEMsQ0FDRDs7O0FBQ0FGLEdBQUcsQ0FBQ0ssTUFBSixDQUFXQyxNQUFYLEdBQXFCSCxJQUFyQjtBQUdBLElBQUlILEdBQUosQ0FBUTtBQUNOQyxPQURNO0FBRU5NLFFBQU0sRUFBRUMsQ0FBQyxJQUFJQSxDQUFDLENBQUMsT0FBRCxFQUFVLENBQUNBLENBQUMsc0pBQVo7QUFGUixDQUFSLEVBR0dDLE1BSEg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JBLGdFQUFrQixrQ0FBa0MsVUFBVSxvREFBb0QscUdBQXFHLEVBQUUsNERBQTRELEVBQUUsRUFBRSxvREFBb0Qsa0dBQWtHLEVBQUUsNERBQTRELEVBQUUsRUFBRSxvREFBb0Qsb0dBQW9HLEVBQUUsNERBQTRELEVBQUUsRUFBRSxpREFBaUQsRUFBRSxxQ0FBcUMsRUFBRSwrREFBK0QsRUFBRSxrREFBa0QscURBQXFELHdFQUF3RSxFQUFFLEVBQUUsbURBQW1ELHNFQUFzRSxFQUFFLEVBQUUsRUFBRSwwREFBMEQsdURBQXVELEVBQUUsNkRBQTZELEVBQUUsc0xBQXNMLEVBQUUsRUFBRSxvREFBb0QsMkRBQTJELEVBQUUsbUVBQW1FLEVBQUUsK0RBQStELEVBQUUsRUFBRSx5REFBeUQsbUVBQW1FLEVBQUUsMkRBQTJELEVBQUUsK0RBQStELEVBQUUsRUFBRSx3REFBd0Qsc0dBQXNHLEVBQUUsbUVBQW1FLEVBQUUsZ0VBQWdFLEVBQUUsMERBQTBELEVBQUUsRUFBRSxzREFBc0QsMkRBQTJELEVBQUUseURBQXlELEVBQUUsdURBQXVELEVBQUUsNkRBQTZELEVBQUUscURBQXFELEVBQUUsNERBQTRELEVBQUUsMkRBQTJELEVBQUUsOERBQThELEVBQUUsRUFBRSx5REFBeUQsaUVBQWlFLEVBQUUscUZBQXFGLEVBQUUsRUFBRSxxREFBcUQseURBQXlELEVBQUUsRUFBRSxxREFBcUQsMkRBQTJELEVBQUUsRUFBRSx3REFBd0QsNkRBQTZELEVBQUUsc0RBQXNELEVBQUUsbUVBQW1FLEVBQUUsbUVBQW1FLEVBQUUscUdBQXFHLEVBQUUseUVBQXlFLEVBQUUsRUFBRSx1REFBdUQsMkRBQTJELEVBQUUsNERBQTRELEVBQUUseURBQXlELEVBQUUsc0RBQXNELEVBQUUsNkRBQTZELEVBQUUsNERBQTRELEVBQUUsMkRBQTJELEVBQUUsK0RBQStELEVBQUUsOERBQThELEVBQUUsNERBQTRELEVBQUUsRUFBRSwyREFBMkQsOERBQThELEVBQUUseURBQXlELEVBQUUsOERBQThELEVBQUUsRUFBRSw0REFBNEQsOERBQThELEVBQUUseURBQXlELEVBQUUsOERBQThELEVBQUUsRUFBRSwwREFBMEQsMkRBQTJELEVBQUUseURBQXlELEVBQUUsOERBQThELEVBQUUsRUFBRSw2REFBNkQsMkRBQTJELEVBQUUsc0RBQXNELEVBQUUsOERBQThELEVBQUUsNkRBQTZELEVBQUUsaUVBQWlFLEVBQUUsRUFBRSw0REFBNEQsMkRBQTJELEVBQUUsc0RBQXNELEVBQUUsOERBQThELEVBQUUsNkRBQTZELEVBQUUsaUVBQWlFLEVBQUUsRUFBRSwyREFBMkQsdURBQXVELEVBQUUsOERBQThELEVBQUUsd0RBQXdELEVBQUUsRUFBRSwwREFBMEQsdURBQXVELEVBQUUsOERBQThELEVBQUUseURBQXlELEVBQUUsMkRBQTJELEVBQUUsRUFBRSw4REFBOEQsd0RBQXdELEVBQUUsc0RBQXNELEVBQUUsOERBQThELEVBQUUsNERBQTRELEVBQUU7QUFDN3ROLFFBQVEsSUFBVTtBQUNsQjtBQUNBO0FBQ0EsK0JBQStCLG9DQUFvQztBQUNuRSxTQUFTO0FBQ1Q7Ozs7Ozs7Ozs7QUNOQTtBQUFBO0FBQUE7QUFBQTtBQUFrRjtBQUMzQjtBQUNMOzs7QUFHbEQ7QUFDMEY7QUFDMUYsZ0JBQWdCLDJHQUFVO0FBQzFCLEVBQUUseUVBQU07QUFDUixFQUFFLDhFQUFNO0FBQ1IsRUFBRSx1RkFBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLElBQUksSUFBVTtBQUNkLFlBQVksbUJBQU8sQ0FBQyxrREFBbUc7QUFDdkgsY0FBYyxtQkFBTyxDQUFDLGdEQUFLO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxzQkFBc0IscURBQTBDLEVBQUU7QUFBQTtBQUNsRTtBQUNBLGdCQUFnQiw4RUFBTTtBQUN0Qix5QkFBeUIsdUZBQWU7QUFDeEMsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDZSxnRjs7Ozs7Ozs7QUN0Q2Y7QUFBQTtBQUFBLHdDQUFtSyxDQUFnQix1T0FBRyxFQUFDLEM7Ozs7Ozs7O0FDQXZMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUFULDBDQUFHLENBQUNJLEdBQUosQ0FBUU0sNENBQVI7QUFFZSxtRUFBSUEsNENBQUksQ0FBQ0MsS0FBVCxDQUFlO0FBQzVCQyxPQUFLLEVBQUUsRUFEcUI7QUFJNUJDLFdBQVMsRUFBRSxFQUppQjtBQU81QkMsU0FBTyxFQUFFO0FBUG1CLENBQWYsQ0FBZixFOzs7Ozs7O0FDTEEsMkMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICAgIDxQYWdlPlxuICAgICAgIFxuXHQ8QWN0aW9uQmFyIHRpdGxlPVwiRGFtc3RyaW4gU2hhcnAgTXVzaWNcIi8+XG4gIFxuXHQ8R3JpZExheW91dCBjb2x1bW5zPVwiKiwqLCpcIiByb3dzPVwiKiwqLDMwLDYwLDUwLDUwLDUwXCI+XG5cdFxuXHRcblx0XG5cblx0XHQ8SW1hZ2Ugdi1iaW5kOnN0eWxlPVwicm90YXRlTWUoLTEwKVwiIHJvdz1cIjBcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiByb3dTcGFuPVwiMlwiIHNyYz1cIn4vYXNzZXRzL2ltYWdlcy9QcmFuYTEtSWNvbjEucG5nXCIvPlxuXHRcdDxJbWFnZSB2LWJpbmQ6c3R5bGU9XCJyb3RhdGVNZSg1KVwiIHJvdz1cIjBcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiByb3dTcGFuPVwiMlwiIHNyYz1cIn4vYXNzZXRzL2ltYWdlcy9QcmFuYTEtQ2lyY2xlLVBpbmtCaWcucG5nXCIvPlxuXG5cdFx0PExhYmVsIGNsYXNzPSdjb3ZlckluZm8nIHJvdz1cIjBcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiByb3dTcGFuPVwiMlwiPnt7Y3VycmVudFNvbmdEdXJhdGlvbkluZm99fSAvIHt7Y3VycmVudFRpbWV9fTwvTGFiZWw+XG5cblx0XHQ8TGFiZWwgcm93PVwiMlwiIGNvbD1cIjBcIiBjb2xTcGFuPVwiM1wiIGNsYXNzPVwic3BlZWRMYWJlbFwiPlNwZWVkPC9MYWJlbD5cdFx0XHRcdFx0XG5cdFx0PFNsaWRlciAgY2xhc3M9XCJzcGVlZFNsaWRlclwiIHJvdz1cIjJcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiA6dmFsdWU9XCJjdXJyZW50U3BlZWRcIiBAdmFsdWVDaGFuZ2U9XCJvblNsaWRlclNwZWVkQ2hhbmdlZFwiLz5cdFx0XG5cdFx0XHRcdFx0XHRcblx0XHQ8TGFiZWwgcm93PVwiM1wiIGNvbD1cIjBcIiBjb2xTcGFuPVwiM1wiIGNsYXNzPVwidm9sdW1lTGFiZWxcIj5Wb2x1bWU8L0xhYmVsPlx0XHRcdFx0XHRcblx0XHQ8U2xpZGVyIGNsYXNzPVwidm9sdW1lU2xpZGVyXCIgcm93PVwiM1wiIGNvbD1cIjBcIiBjb2xTcGFuPVwiM1wiIDp2YWx1ZT1cImN1cnJlbnRWb2x1bWVcIiBAdmFsdWVDaGFuZ2U9XCJvblNsaWRlclZhbHVlQ2hhbmdlZFwiPjwvU2xpZGVyPlxuXHRcdFx0XG5cdFx0PExhYmVsIGNsYXNzPSdtdXNpY0luZm8nIHJvdz1cIjFcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiB0ZXh0V3JhcD1cInRydWVcIj57e211c2ljSW5mby5pbmZvfX08L0xhYmVsPlxuXG5cdFx0PFByb2dyZXNzIHYtYmluZDpzdHlsZT1cInsgY29sb3I6IHByb2dyZXNzRHluQ29sb3IsIHRyYW5zZm9ybTogJ3NjYWxlWSgnK3Byb2dyZXNzU2NhbGVZKycpJyB9XCIgY2xhc3M9XCJtdXNpY1Byb2dyZXNzXCIgcm93PVwiMVwiIGNvbD1cIjBcIiBjb2xTcGFuPVwiM1wiIDp2YWx1ZT1cImN1cnJlbnRQcm9ncmVzc1wiIEB0b3VjaD1cInNraXBUb05ld1RpbWVcIiAvPlx0XG5cblx0XHQ8QnV0dG9uIGNsYXNzPVwiYi15ZWxsb3dcIiByb3c9XCI0XCIgY29sPVwiMFwiIHJvd1NwYW49XCIxXCIgQHRhcD1cInBsYXlNdXNpYygpXCI+e3twbGF5TXNnfX08L0J1dHRvbj5cblx0XHQ8QnV0dG9uIGNsYXNzPVwiYi15ZWxsb3dcIiByb3c9XCI0XCIgY29sPVwiMVwiIHJvd1NwYW49XCIxXCIgQHRhcD1cInBhdXNlTXVzaWMoKVwiPnt7cGF1c2VNc2d9fTwvQnV0dG9uPlxuXHRcdDxCdXR0b24gY2xhc3M9XCJiLXllbGxvd1wiIHJvdz1cIjRcIiBjb2w9XCIyXCIgcm93U3Bhbj1cIjFcIiBAdGFwPVwic3RvcE11c2ljKClcIj57e3N0b3BNc2d9fTwvQnV0dG9uPlxuXHRcdFxuXHRcdDxCdXR0b24gY2xhc3M9XCJiLXllbGxvd1wiIHJvdz1cIjVcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiBAdGFwPVwic2hvd0F1ZGlvRmlsZXNMaXN0KClcIj57e2ZpbGVzTXNnfX08L0J1dHRvbj5cblx0XHRcdFx0XHRcdFxuXHRcdDxMaXN0VmlldyB2LWlmPVwic2hvd0xpc3QgPT0gdHJ1ZVwiIHJvdz1cIjBcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiByb3dTcGFuPVwiNFwiIGZvcj1cIml0ZW0gaW4gbGlzdE9mSXRlbXNcIiBAaXRlbVRhcD1cIm9uSXRlbVRhcFwiPlxuXHRcdCAgPHYtdGVtcGxhdGU+XG5cdFx0XHQ8IS0tIFNob3dzIHRoZSBsaXN0IGl0ZW0gbGFiZWwgaW4gdGhlIGRlZmF1bHQgY29sb3IgYW5kIHN0eWxlLiAtLT5cblx0XHRcdDxMYWJlbCBjbGFzcz1cImx2LWxhYlwiIDp0ZXh0PVwiaXRlbS5fbmFtZVwiIC8+XG5cdFx0ICA8L3YtdGVtcGxhdGU+XG5cdFx0PC9MaXN0Vmlldz5cdFxuXHRcdFx0XHRcdFxuXHRcdDxMYWJlbCBjbGFzcz0nY29weVJpZ2h0cycgcm93PVwiNlwiIGNvbD1cIjBcIiBjb2xTcGFuPVwiM1wiIEB0YXA9XCJzaG93Q3JlZGl0cygpXCI+e3tjb3B5UmlnaHRzSW5mb319PC9MYWJlbD5cblxuXHRcdFxuXHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcblx0PC9HcmlkTGF5b3V0Plx0XHRcbiAgIFxuICAgXG4gICAgPC9QYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cblx0XG5cdGNvbnN0IHNjcmVlbiA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCIpLnNjcmVlbjtcblx0XG5cdGNvbnN0IGZzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIik7XG5cdC8vY29uc3QgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xuXHRcblx0Y29uc3QgYXVkaW8gPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtYXVkaW8nKTtcblxuXHRjb25zdCBwbGF5ZXJUTlMgPSBuZXcgYXVkaW8uVE5TUGxheWVyKCk7XG5cdHBsYXllclROUy5kZWJ1ZyA9IHRydWU7XG5cdFxuXHRcblx0ZXhwb3J0IGRlZmF1bHQge1xuXHRcdFxuXHRcdGRhdGEoKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjb3B5UmlnaHRzSW5mbzogJ0NvcHlyaWdodCAyMDE5LTIwMjEgwqkgU3lsd2VzdGVyIEsuIE1pZWxuaWN6dWsnLFxuXHRcdFx0XHRjb3Zlck1zZzogJ1RoaXMgd2lsbCBiZSBhIGNvdmVyJyxcblx0XHRcdFx0cGxheU1zZzogXCJQbGF5XCIsXG5cdFx0XHRcdHBhdXNlTXNnOiBcIlBhdXNlXCIsXG5cdFx0XHRcdHN0b3BNc2c6IFwiU3RvcFwiLFxuXHRcdFx0XHRmaWxlc01zZzogXCJGaWxlc1wiLFxuXHRcdFx0XHRjdXJyZW50Vm9sdW1lOiAxMDAsXG5cdFx0XHRcdGN1cnJlbnRTcGVlZDogMTAwLFxuXHRcdFx0XHRjdXJyZW50U29uZ0R1cmF0aW9uSW5mbzogJycsXG5cdFx0XHRcdGN1cnJlbnRTb25nRHVyYXRpb246IDAsXG5cdFx0XHRcdHBsYXllcjogcGxheWVyVE5TLFxuXG5cdFx0XHRcdGN1cnJlbnRUaW1lOiBwbGF5ZXJUTlMuY3VycmVudFRpbWUsXG5cdFx0XHRcdG11c2ljSW5mbzoge2luZm86XCJObyBpbmZvXCJ9LFxuXHRcdFx0XHRjdXJyZW50UHJvZ3Jlc3M6IDAsXG5cdFx0XHRcdFxuXHRcdFx0XHRwbGF5ZXJPcHRpb25zOiB7XG5cdFx0XHRcdFx0YXVkaW9GaWxlOiAnfi9hc3NldHMvYXVkaW8vQ3ppbGxpb3V0X2RydW1zLm1wMycsXG5cdFx0XHRcdFx0bG9vcDogdHJ1ZSxcblx0XHRcdFx0XHRjb21wbGV0ZUNhbGxiYWNrOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdmaW5pc2hlZCBwbGF5aW5nJyk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRlcnJvckNhbGxiYWNrOiBmdW5jdGlvbihlcnJvck9iamVjdCkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJy0tLS0tLSBlcnJvckNhbGxiYWNrJywgSlNPTi5zdHJpbmdpZnkoZXJyb3JPYmplY3QpKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGluZm9DYWxsYmFjazogZnVuY3Rpb24oYXJncykge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJy0tLS0tLSBpbmZvQ2FsbGJhY2snLCBKU09OLnN0cmluZ2lmeShhcmdzKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcblx0XHRcdFx0ZmlsZUxpc3Q6IFtdLFxuXHRcdFx0XHRcblx0XHRcdFx0bGlzdE9mSXRlbXM6IFtcblx0XHRcdFx0XHR7aWQ6MSwgX25hbWU6IFwiRHVwYVwifSxcblx0XHRcdFx0XHR7aWQ6MiwgX25hbWU6IFwiQ2lwYVwifSxcblx0XHRcdFx0XHR7aWQ6MywgX25hbWU6IFwiR293bm9cIn0sXHRcdFx0XHRcdFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRcblx0XHRcdFx0c2hvd0xpc3Q6IGZhbHNlLFxuXHRcdFx0XHRcblx0XHRcdFx0cHJvZ3Jlc3NEeW5Db2xvcjogJ2RlZXBwaW5rJyxcblx0XHRcdFx0cHJvZ3Jlc3NTY2FsZVk6IDQsXG5cdFx0XHRcdFxuXHRcdFx0XHRpbWFnZXNUdXJuOiA4MCxcblx0XHRcdFx0XG5cdFx0XHRcdC8vIGF1ZGlvIGZpbGVzIC0gZW50aXRpZXNcblx0XHRcdFx0Ly9fcGF0aCwgX25hbWUsIF9leHRlbnNpb25cblx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcbi8vXHRcdGNvbXB1dGVkOiB7XG4vL1x0XHRcdHJvdGF0ZU1lKGFyZykge1xuLy9cdFx0XHRcdHJldHVybiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgnICsgdGhpcy5pbWFnZXNUdXJuICogYXJnICsgJ3R1cm4pJ31cbi8vXHRcdFx0fVxuLy9cdFx0fSxcdFx0XG5cdFx0XG5cdFx0bW91bnRlZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XG5cdFx0XHR0aGlzLiRuZXh0VGljayhmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdlbnRpcmUgdmlldyBoYXMgYmVlbiByZW5kZXJlZCcpO1xuXHRcdFx0fSksXG5cdFx0XHRcdFxuXHRcdFx0dGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblx0XHRcdFx0ICB0aGlzLnVwZGF0ZVRpbWVyKCk7XG5cdFx0XHRcdH0sNjApO1xuXHRcdFx0dGhpcy51cGRhdGVUaW1lcigpO1x0XHRcdFx0XG5cdFx0XHRcblx0XHR9LFxuXHRcdFx0XHRcblx0XHRcblx0XHRtZXRob2RzOiB7XG5cdFx0XHRcblx0XHRcdHNob3dDcmVkaXRzKCkge1xuXHRcdFx0XHRhbGVydCh7XG5cdFx0XHRcdCAgdGl0bGU6IFwiRGFtc3RyaW46IE11c2ljIFBsYXllciB2LjAuMVwiLFxuXHRcdFx0XHQgIG1lc3NhZ2U6IFwiQXV0aG9yOiBTeWx3ZXN0ZXIgSy4gTWllbG5pY3p1a1wiLFxuXHRcdFx0XHQgIG9rQnV0dG9uVGV4dDogXCJUaGF0J3MgQW1hemluZyFcIlxuXHRcdFx0XHR9KS50aGVuKCgpID0+IHtcblx0XHRcdFx0ICBjb25zb2xlLmxvZyhcIkFsZXJ0IGRpYWxvZyBjbG9zZWRcIik7XG5cdFx0XHRcdH0pO1x0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRyb3RhdGVNZShhcmcpIHtcblx0XHRcdFx0cmV0dXJuIHsgdHJhbnNmb3JtOiAncm90YXRlKCcgKyB0aGlzLmltYWdlc1R1cm4gKiBhcmcgKyAndHVybiknfVxuXHRcdFx0fSxcdFx0XHRcblx0XHRcdFxuXHRcdFx0c2tpcFRvTmV3VGltZShhcmdzKSB7XG5cdFx0XHRcblx0XHRcdFx0bGV0IHBlcmMgPSAoYXJncy5nZXRYKCkvc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzKSoxLjE7XG5cdFx0XHRcdGlmKHBlcmMgPD0gMCkge1xuXHRcdFx0XHRcdHBlcmMgPSAwXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYocGVyYyA+PSAxKSB7XG5cdFx0XHRcdFx0cGVycyA9IDE7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IG5ld1RpbWUgPSAgdGhpcy5jdXJyZW50U29uZ0R1cmF0aW9uICogcGVyYztcblx0XHRcdFx0XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdOZXcgdGltZTonLCBuZXdUaW1lKTtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucGxheWVyLnNlZWtUbyhuZXdUaW1lKTtcblx0XHRcdFx0XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ3NraXBUb05ld1RpbWUnLCBhcmdzLmdldFgoKSk7XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0c2hvd0F1ZGlvRmlsZXNMaXN0KCkge1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5nZXRBdWRpb0ZpbGVzTGlzdCgpO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYodGhpcy5zaG93TGlzdCA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdHRoaXMuc2hvd0xpc3QgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuc2hvd0xpc3QgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdG9uSXRlbVRhcChlKSB7XG5cdFx0XHRcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnSXRlbSB0YXAnLHRoaXMubGlzdE9mSXRlbXNbZS5pbmRleF0udGV4dClcblx0XHRcdFx0Y29uc29sZS5sb2coJ0l0ZW0gdGFwJywgZSlcblx0XHRcdFx0XG5cdFx0XHRcdGxldCBhdWRpb0ZpbGVOYW1lID0gdGhpcy5saXN0T2ZJdGVtc1tlLmluZGV4XS5fbmFtZTtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucGxheVNlbGVjdGVkTXVzaWMoYXVkaW9GaWxlTmFtZSlcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRyZWFkVGV4dEZyb21GaWxlKHBhdGgpIHtcblx0XHRcdFx0LyogdGhpcyBpcyBob3cgeW91IGdldCBjb250ZW50IG9mIHRleHQgZmlsZSAqL1xuXHRcdFx0XHQvLyBsZXQgcGF0aCA9ICcuL2Fzc2V0cy9kYXRhLzEudHh0JzsgXG5cdFx0XHRcdGxldCBmaWxlID0gZnMua25vd25Gb2xkZXJzLmN1cnJlbnRBcHAoKS5nZXRGaWxlKHBhdGgpO1xuXHRcdFx0XHRmaWxlLnJlYWRUZXh0KClcblx0XHRcdFx0LnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdmaWxlLnJlYWRUZXh0OicscmVzKVxuXHRcdFx0XHRcdHRoaXMubXVzaWNJbmZvLmluZm8gPSByZXMudG9TdHJpbmcoKTtcblx0XHRcdFx0fSkuY2F0Y2goKGVycikgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdmaWxlLnJlYWRUZXh0OiBlcnIuc3RhY2snLGVyci5zdGFjayk7XG5cdFx0XHRcdH0pO1x0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0Z2V0QXVkaW9GaWxlc0xpc3QoKSB7XG5cdFx0XHRcdGxldCBmb2xkZXIgPSBmcy5rbm93bkZvbGRlcnMuY3VycmVudEFwcCgpLmdldEZvbGRlcihcImFzc2V0cy9hdWRpb1wiKTtcblx0XHRcdFx0Zm9sZGVyLmdldEVudGl0aWVzKClcblx0XHRcdFx0XHQudGhlbigoZW50aXRpZXMpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdlbnRpdGllcycsZW50aXRpZXMpXG5cdFx0XHRcdFx0XHR0aGlzLmZpbGVMaXN0ID0gZW50aXRpZXM7XG5cdFx0XHRcdFx0XHR0aGlzLmxpc3RPZkl0ZW1zID0gdGhpcy5maWxlTGlzdDtcblx0XHRcdFx0XHRcdC8vdGhpcy5tdXNpY0luZm8uaW5mbyA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZmlsZUxpc3QpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmNhdGNoKChlcnIpID0+IHtcblx0XHRcdFx0XHRcdC8vIEZhaWxlZCB0byBvYnRhaW4gZm9sZGVyJ3MgY29udGVudHMuXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnZ2V0RW50aXRpZXMgY2F0Y2ggZXJyb3I6ICcsZXJyLnN0YWNrKTtcblx0XHRcdFx0XHR9KTtcdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0dXBkYXRlVGltZXIoKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLmN1cnJlbnRTb25nRHVyYXRpb25JbmZvID0gdGhpcy5mb3JtYXRDdXJyZW50VGltZSh0aGlzLmN1cnJlbnRTb25nRHVyYXRpb24pO1xuXHRcdFx0XHR0aGlzLmN1cnJlbnRUaW1lID0gdGhpcy5mb3JtYXRDdXJyZW50VGltZSh0aGlzLnBsYXllci5jdXJyZW50VGltZSk7XG5cdFx0XHRcdHRoaXMuY3VycmVudFByb2dyZXNzID0gMTAwKnRoaXMucGxheWVyLmN1cnJlbnRUaW1lL3BhcnNlSW50KHRoaXMuY3VycmVudFNvbmdEdXJhdGlvbik7XG5cdFx0XHRcdC8vdGhpcy5tdXNpY0luZm8uaW5mbyA9IHRoaXMuY3VycmVudFByb2dyZXNzO1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5pbWFnZXNUdXJuID0gdGhpcy5wbGF5ZXIuY3VycmVudFRpbWU7XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHR1cGRhdGVJbmZvKHN0cikge1xuXHRcdFx0XHR0aGlzLm11c2ljSW5mby5pbmZvID0gc3RyO1xuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0b25TbGlkZXJWYWx1ZUNoYW5nZWQoZSkge1xuLy9cdFx0XHRcdC8vY29uc29sZS5sb2coJ3NsaWRlciB2YWwnLGUudmFsdWUpXG5cdFx0XHRcdHRoaXMuY3VycmVudFZvbHVtZSA9IGUudmFsdWVcblx0XHRcdFx0dGhpcy5tdXNpY0luZm8uaW5mbyA9ICdOZXcgdm9sdW1lOiAnK3BhcnNlSW50KHRoaXMuY3VycmVudFZvbHVtZSkrXCIlXCJcblx0XHRcdFx0dGhpcy5wbGF5ZXIudm9sdW1lID0gdGhpcy5jdXJyZW50Vm9sdW1lKjAuMDE7XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRvblNsaWRlclNwZWVkQ2hhbmdlZChlKSB7XG4vL1x0XHRcdFx0Ly9jb25zb2xlLmxvZygnc2xpZGVyIHZhbCcsZS52YWx1ZSlcblx0XHRcdFx0dGhpcy5jdXJyZW50U3BlZWQgPSBlLnZhbHVlXG5cdFx0XHRcdHRoaXMubXVzaWNJbmZvLmluZm8gPSAnTmV3IHNwZWVkOiAnK3BhcnNlSW50KHRoaXMuY3VycmVudFNwZWVkLDEwKSsnJSc7XG5cdFx0XHRcdHRoaXMucGxheWVyLmNoYW5nZVBsYXllclNwZWVkKHRoaXMuY3VycmVudFNwZWVkKjAuMDEpO1xuXHRcdFx0fSxcdFx0XHRcblx0XHRcdFxuXHRcdFx0XG5cdFx0XHRwbGF5U2VsZWN0ZWRNdXNpYyhhdWRpb0ZpbGVOYW1lKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZih0aGlzLnBsYXllci5pc0F1ZGlvUGxheWluZygpID09IHRydWUpIHtcblx0XHRcdFx0XHR0aGlzLnBsYXllci5kaXNwb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucGxheWVyT3B0aW9ucy5hdWRpb0ZpbGUgPSAnfi9hc3NldHMvYXVkaW8vJythdWRpb0ZpbGVOYW1lLFxuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wbGF5ZXIuaW5pdEZyb21GaWxlKHRoaXMucGxheWVyT3B0aW9ucylcblx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGxheWVyLnBsYXkoKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKGVycikgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdpbml0RnJvbUZpbGUgZXJyOicsZXJyKVxuXHRcdFx0XHRcdHRoaXMubXVzaWNJbmZvLmluZm8gPSAnUHJvYmxlbSBwbGF5aW5nOiAnK3RoaXMucGxheWVyT3B0aW9ucy5hdWRpb0ZpbGU7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnBsYXllci5nZXRBdWRpb1RyYWNrRHVyYXRpb24oKS50aGVuKChkdXJhdGlvbikgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwic29uZyBkdXJhdGlvbjpcIiwgZHVyYXRpb24pO1xuXHRcdFx0XHRcdHRoaXMuY3VycmVudFNvbmdEdXJhdGlvbiA9IGR1cmF0aW9uO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGxldCBtcDNGaWxlQXJyID0gdGhpcy5wbGF5ZXJPcHRpb25zLmF1ZGlvRmlsZS5zcGxpdCgnLycpO1xuXHRcdFx0XHRcdGxldCBtcDNGaWxlID0gIG1wM0ZpbGVBcnJbbXAzRmlsZUFyci5sZW5ndGgtMV07XG5cdFx0XHRcdFx0dGhpcy5tdXNpY0luZm8uaW5mbyA9ICdQbGF5aW5nOiAnK21wM0ZpbGU7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wbGF5ZXIudm9sdW1lID0gdGhpcy5jdXJyZW50Vm9sdW1lKjAuMDE7XG5cdFx0XHRcdHRoaXMucGxheWVyLmNoYW5nZVBsYXllclNwZWVkKHRoaXMuY3VycmVudFNwZWVkKjAuMDEpO1xuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdHBsYXlNdXNpYygpIHtcblx0XHRcdFx0XG5cdFx0XHRcdGlmKHRoaXMucGxheWVyLmlzQXVkaW9QbGF5aW5nKCkgPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdHRoaXMucGxheWVyLmRpc3Bvc2UoKTtcblx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0XHRjb25zb2xlLmxvZygncGxheU11c2ljKCknLCB0aGlzLnBsYXllck9wdGlvbnMuYXVkaW9GaWxlKTtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucGxheWVyLmluaXRGcm9tRmlsZSh0aGlzLnBsYXllck9wdGlvbnMpXG5cdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsYXllci5wbGF5KClcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKChlcnIpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnaW5pdEZyb21GaWxlIGVycjonLGVycilcblx0XHRcdFx0XHR0aGlzLm11c2ljSW5mby5pbmZvID0gJ1Byb2JsZW0gcGxheWluZzogJyt0aGlzLnBsYXllck9wdGlvbnMuYXVkaW9GaWxlO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wbGF5ZXIuZ2V0QXVkaW9UcmFja0R1cmF0aW9uKCkudGhlbigoZHVyYXRpb24pID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInNvbmcgZHVyYXRpb246XCIsIGR1cmF0aW9uKTtcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRTb25nRHVyYXRpb24gPSBkdXJhdGlvbjtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRsZXQgbXAzRmlsZUFyciA9IHRoaXMucGxheWVyT3B0aW9ucy5hdWRpb0ZpbGUuc3BsaXQoJy8nKTtcblx0XHRcdFx0XHRsZXQgbXAzRmlsZSA9ICBtcDNGaWxlQXJyW21wM0ZpbGVBcnIubGVuZ3RoLTFdO1xuXHRcdFx0XHRcdHRoaXMubXVzaWNJbmZvLmluZm8gPSAnUGxheWluZzogJyttcDNGaWxlO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0Z2V0TXVzaWNEdXJhdGlvbigpIHtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucGxheWVyLmdldEF1ZGlvVHJhY2tEdXJhdGlvbigpXG5cdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oZHVyYXRpb24pIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnLS0tIGR1cmF0aW9uOicsZHVyYXRpb24udG9TdHJpbmcoKSk7XG5cdFx0XHRcdFx0cmV0dXJuIGR1cmF0aW9uLnRvU3RyaW5nKCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdCAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdjYW4gbm90IGNhdGNoIGR1cmF0aW9uLicsIGVycik7XG5cdFx0XHRcdCAgfSk7XHRcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0cGF1c2VNdXNpYyAoKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRcblx0XHRcdFx0aWYodGhpcy5wbGF5ZXIuaXNBdWRpb1BsYXlpbmcoKSA9PSB0cnVlKSB7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dGhpcy5tdXNpY0luZm8uaW5mbyA9ICdQYXVzaW5nIGF0ICcrdGhpcy5mb3JtYXRDdXJyZW50VGltZSh0aGlzLnBsYXllci5jdXJyZW50VGltZSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dGhpcy5wcm9ncmVzc0R5bkNvbG9yID0gJ3BpbmsnO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHRoaXMucGxheWVyLnBhdXNlKClcblx0XHRcdFx0XHQgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2cocmVzKTtcblx0XHRcdFx0XHQgIH0pXG5cdFx0XHRcdFx0ICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygncGF1c2VNdXNpYywgc29tZXRoaW5nIHdlbnQgd3JvbmcuLi4nLCBlcnIpO1xuXHRcdFx0XHRcdCAgfSk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHRoaXMucHJvZ3Jlc3NEeW5Db2xvciA9ICdob3RwaW5rJztcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR0aGlzLm11c2ljSW5mby5pbmZvID0gJ1Jlc3VtaW5nIGZyb20gJyt0aGlzLmZvcm1hdEN1cnJlbnRUaW1lKHRoaXMucGxheWVyLmN1cnJlbnRUaW1lKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR0aGlzLnBsYXllci5yZXN1bWUoKTtcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdHN0b3BNdXNpYygpIHtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMubXVzaWNJbmZvLmluZm8gPSAnTXVzaWMgc3RvcHBlZC4nXG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnBsYXllci5kaXNwb3NlKCk7XHRcblx0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0Zm9ybWF0Q3VycmVudFRpbWUgKHN0cikge1xuXHRcdFx0XHR2YXIgc2VjX251bSA9IHBhcnNlSW50KHN0ciwgMTApOyAvLyBkb24ndCBmb3JnZXQgdGhlIHNlY29uZCBwYXJhbVxuXHRcdFx0XHR2YXIgaG91cnMgICA9IE1hdGguZmxvb3Ioc2VjX251bSAvIDM2MDApO1xuXHRcdFx0XHR2YXIgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY19udW0gLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XG5cdFx0XHRcdHZhciBzZWNvbmRzID0gc2VjX251bSAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XG5cblx0XHRcdFx0aWYgKGhvdXJzICAgPCAxMCkge2hvdXJzICAgPSBcIjBcIitob3Vyczt9XG5cdFx0XHRcdGlmIChtaW51dGVzIDwgMTApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XG5cdFx0XHRcdGlmIChzZWNvbmRzIDwgMTApIHtzZWNvbmRzID0gXCIwXCIrc2Vjb25kczt9XG5cdFx0XHRcdHJldHVybiBob3VycysnOicrbWludXRlcysnOicrc2Vjb25kcztcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0XG5cdFx0fVxuXHRcdFxuXHR9XG5cblxuXG5cbjwvc2NyaXB0PlxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcbiAgICBcIlBhZ2VcIixcbiAgICBbXG4gICAgICBfYyhcIkFjdGlvbkJhclwiLCB7IGF0dHJzOiB7IHRpdGxlOiBcIkRhbXN0cmluIFNoYXJwIE11c2ljXCIgfSB9KSxcbiAgICAgIF9jKFxuICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyBjb2x1bW5zOiBcIiosKiwqXCIsIHJvd3M6IFwiKiwqLDMwLDYwLDUwLDUwLDUwXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICBzdHlsZTogX3ZtLnJvdGF0ZU1lKC0xMCksXG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICBjb2xTcGFuOiBcIjNcIixcbiAgICAgICAgICAgICAgcm93U3BhbjogXCIyXCIsXG4gICAgICAgICAgICAgIHNyYzogXCJ+L2Fzc2V0cy9pbWFnZXMvUHJhbmExLUljb24xLnBuZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICBzdHlsZTogX3ZtLnJvdGF0ZU1lKDUpLFxuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgY29sU3BhbjogXCIzXCIsXG4gICAgICAgICAgICAgIHJvd1NwYW46IFwiMlwiLFxuICAgICAgICAgICAgICBzcmM6IFwifi9hc3NldHMvaW1hZ2VzL1ByYW5hMS1DaXJjbGUtUGlua0JpZy5wbmdcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJMYWJlbFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJjb3ZlckluZm9cIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjBcIiwgY29sOiBcIjBcIiwgY29sU3BhbjogXCIzXCIsIHJvd1NwYW46IFwiMlwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICBfdm0uX3MoX3ZtLmN1cnJlbnRTb25nRHVyYXRpb25JbmZvKSArXG4gICAgICAgICAgICAgICAgICBcIiAvIFwiICtcbiAgICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uY3VycmVudFRpbWUpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF1cbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJMYWJlbFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJzcGVlZExhYmVsXCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHJvdzogXCIyXCIsIGNvbDogXCIwXCIsIGNvbFNwYW46IFwiM1wiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX3ZtLl92KFwiU3BlZWRcIildXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfYyhcIlNsaWRlclwiLCB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJzcGVlZFNsaWRlclwiLFxuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgcm93OiBcIjJcIixcbiAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgY29sU3BhbjogXCIzXCIsXG4gICAgICAgICAgICAgIHZhbHVlOiBfdm0uY3VycmVudFNwZWVkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb246IHsgdmFsdWVDaGFuZ2U6IF92bS5vblNsaWRlclNwZWVkQ2hhbmdlZCB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkxhYmVsXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInZvbHVtZUxhYmVsXCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHJvdzogXCIzXCIsIGNvbDogXCIwXCIsIGNvbFNwYW46IFwiM1wiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX3ZtLl92KFwiVm9sdW1lXCIpXVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXCJTbGlkZXJcIiwge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidm9sdW1lU2xpZGVyXCIsXG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICByb3c6IFwiM1wiLFxuICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICBjb2xTcGFuOiBcIjNcIixcbiAgICAgICAgICAgICAgdmFsdWU6IF92bS5jdXJyZW50Vm9sdW1lXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb246IHsgdmFsdWVDaGFuZ2U6IF92bS5vblNsaWRlclZhbHVlQ2hhbmdlZCB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkxhYmVsXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcIm11c2ljSW5mb1wiLFxuICAgICAgICAgICAgICBhdHRyczogeyByb3c6IFwiMVwiLCBjb2w6IFwiMFwiLCBjb2xTcGFuOiBcIjNcIiwgdGV4dFdyYXA6IFwidHJ1ZVwiIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0ubXVzaWNJbmZvLmluZm8pKV1cbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFwiUHJvZ3Jlc3NcIiwge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibXVzaWNQcm9ncmVzc1wiLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgY29sb3I6IF92bS5wcm9ncmVzc0R5bkNvbG9yLFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IFwic2NhbGVZKFwiICsgX3ZtLnByb2dyZXNzU2NhbGVZICsgXCIpXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICBjb2xTcGFuOiBcIjNcIixcbiAgICAgICAgICAgICAgdmFsdWU6IF92bS5jdXJyZW50UHJvZ3Jlc3NcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjogeyB0b3VjaDogX3ZtLnNraXBUb05ld1RpbWUgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJCdXR0b25cIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYi15ZWxsb3dcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjRcIiwgY29sOiBcIjBcIiwgcm93U3BhbjogXCIxXCIgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5wbGF5TXVzaWMoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5wbGF5TXNnKSldXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiQnV0dG9uXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImIteWVsbG93XCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHJvdzogXCI0XCIsIGNvbDogXCIxXCIsIHJvd1NwYW46IFwiMVwiIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ucGF1c2VNdXNpYygpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLnBhdXNlTXNnKSldXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiQnV0dG9uXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImIteWVsbG93XCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHJvdzogXCI0XCIsIGNvbDogXCIyXCIsIHJvd1NwYW46IFwiMVwiIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uc3RvcE11c2ljKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uc3RvcE1zZykpXVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkJ1dHRvblwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJiLXllbGxvd1wiLFxuICAgICAgICAgICAgICBhdHRyczogeyByb3c6IFwiNVwiLCBjb2w6IFwiMFwiLCBjb2xTcGFuOiBcIjNcIiB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNob3dBdWRpb0ZpbGVzTGlzdCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLmZpbGVzTXNnKSldXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uc2hvd0xpc3QgPT0gdHJ1ZVxuICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICBcIkxpc3RWaWV3XCIsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgY29sOiBcIjBcIixcbiAgICAgICAgICAgICAgICAgICAgY29sU3BhbjogXCIzXCIsXG4gICAgICAgICAgICAgICAgICAgIHJvd1NwYW46IFwiNFwiLFxuICAgICAgICAgICAgICAgICAgICBpdGVtczogX3ZtLmxpc3RPZkl0ZW1zLFxuICAgICAgICAgICAgICAgICAgICBcIithbGlhc1wiOiBcIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7IGl0ZW1UYXA6IF92bS5vbkl0ZW1UYXAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgX2MoXCJ2LXRlbXBsYXRlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShcbiAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHJlZi5pdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRpbmRleCA9IHJlZi4kaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJGV2ZW4gPSByZWYuJGV2ZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgJG9kZCA9IHJlZi4kb2RkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibHYtbGFiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBpdGVtLl9uYW1lIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgIDQwNTMxMjE0MzFcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiTGFiZWxcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiY29weVJpZ2h0c1wiLFxuICAgICAgICAgICAgICBhdHRyczogeyByb3c6IFwiNlwiLCBjb2w6IFwiMFwiLCBjb2xTcGFuOiBcIjNcIiB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnNob3dDcmVkaXRzKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0uY29weVJpZ2h0c0luZm8pKV1cbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciBtYXAgPSB7XG5cdFwiLi9hcHAuc2Nzc1wiOiBcIi4vYXBwLnNjc3NcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi8gc3luYyBeXFxcXC5cXFxcL2FwcFxcXFwuKGNzc3xzY3NzfGxlc3N8c2FzcykkXCI7IiwidmFyIG1hcCA9IHtcblx0XCIuL2FwcC5qc1wiOiBcIi4vYXBwLmpzXCIsXG5cdFwiLi9hcHAuc2Nzc1wiOiBcIi4vYXBwLnNjc3NcIixcblx0XCIuL3N0b3JlLmpzXCI6IFwiLi9zdG9yZS5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuLyBzeW5jIHJlY3Vyc2l2ZSAoPzwhXFxcXGJBcHBfUmVzb3VyY2VzXFxcXGIuKikoPzwhXFxcXC5cXFxcL1xcXFxidGVzdHNcXFxcYlxcXFwvLio/KVxcXFwuKHhtbHxjc3N8anN8KD88IVxcXFwuZFxcXFwuKXRzfCg/PCFcXFxcYl9bXFxcXHctXSpcXFxcLilzY3NzKSRcIjsiLCIvLyBpbXBvcnQgVnVlIGZyb20gXCJuYXRpdmVzY3JpcHQtdnVlXCI7XG5cbi8vIGltcG9ydCBIb21lIGZyb20gXCIuL2NvbXBvbmVudHMvSG9tZVwiO1xuXG4vLyBuZXcgVnVlKHtcblxuLy8gICAgIHRlbXBsYXRlOiBgXG4vLyAgICAgICAgIDxGcmFtZT5cbi8vICAgICAgICAgICAgIDxIb21lIC8+XG4vLyAgICAgICAgIDwvRnJhbWU+YCxcblxuLy8gICAgIGNvbXBvbmVudHM6IHtcbi8vICAgICAgICAgSG9tZVxuLy8gICAgIH1cbi8vIH0pLiRzdGFydCgpO1xuXG5pbXBvcnQgVnVlIGZyb20gJ25hdGl2ZXNjcmlwdC12dWUnXG5pbXBvcnQgQXBwIGZyb20gJy4vY29tcG9uZW50cy9BcHAnXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZSc7XG5cbmltcG9ydCBWdWVEZXZ0b29scyBmcm9tICduYXRpdmVzY3JpcHQtdnVlLWRldnRvb2xzJ1xuXG5pZihUTlNfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgVnVlLnVzZShWdWVEZXZ0b29scylcbn1cbi8vIFByaW50cyBWdWUgbG9ncyB3aGVuIC0tZW52LnByb2R1Y3Rpb24gaXMgKk5PVCogc2V0IHdoaWxlIGJ1aWxkaW5nXG5WdWUuY29uZmlnLnNpbGVudCA9IChUTlNfRU5WID09PSAncHJvZHVjdGlvbicpXG5cblxubmV3IFZ1ZSh7XG4gIHN0b3JlLFxuICByZW5kZXI6IGggPT4gaCgnZnJhbWUnLCBbaChBcHApXSlcbn0pLiRzdGFydCgpIiwibW9kdWxlLmV4cG9ydHMgPSB7XCJ0eXBlXCI6XCJzdHlsZXNoZWV0XCIsXCJzdHlsZXNoZWV0XCI6e1wicnVsZXNcIjpbe1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLmZhYlwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtZmFtaWx5XCIsXCJ2YWx1ZVwiOlwiXFxcIkZvbnQgQXdlc29tZSA1IEJyYW5kc1xcXCIsIFxcXCJmYS1icmFuZHMtNDAwXFxcIlwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtd2VpZ2h0XCIsXCJ2YWx1ZVwiOlwiNDAwXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLmZhc1wiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtZmFtaWx5XCIsXCJ2YWx1ZVwiOlwiXFxcIkZvbnQgQXdlc29tZSA1IEZyZWVcXFwiLCBcXFwiZmEtc29saWQtOTAwXFxcIlwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtd2VpZ2h0XCIsXCJ2YWx1ZVwiOlwiOTAwXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLmZhclwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtZmFtaWx5XCIsXCJ2YWx1ZVwiOlwiXFxcIkZvbnQgQXdlc29tZSA1IEZyZWVcXFwiLCBcXFwiZmEtcmVndWxhci00MDBcXFwiXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC13ZWlnaHRcIixcInZhbHVlXCI6XCI0MDBcIn1dfSx7XCJ0eXBlXCI6XCJrZXlmcmFtZXNcIixcIm5hbWVcIjpcImVtcHR5XCIsXCJrZXlmcmFtZXNcIjpbXX0se1widHlwZVwiOlwiY29tbWVudFwiLFwiY29tbWVudFwiOlwiIEZvcm1zIFwifSx7XCJ0eXBlXCI6XCJjb21tZW50XCIsXCJjb21tZW50XCI6XCIqXFxuICogQmx1ZSB2YXJpYWJsZSBvdmVycmlkZXNcXG4gKlwifSx7XCJ0eXBlXCI6XCJrZXlmcmFtZXNcIixcIm5hbWVcIjpcImV4YW1wbGVcIixcImtleWZyYW1lc1wiOlt7XCJ0eXBlXCI6XCJrZXlmcmFtZVwiLFwidmFsdWVzXCI6W1wiZnJvbVwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInRyYW5zZm9ybVwiLFwidmFsdWVcIjpcInRyYW5zbGF0ZSg0MDAsIDApXCJ9XX0se1widHlwZVwiOlwia2V5ZnJhbWVcIixcInZhbHVlc1wiOltcInRvXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwidHJhbnNmb3JtXCIsXCJ2YWx1ZVwiOlwidHJhbnNsYXRlKDAsIDApXCJ9XX1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCJHcmlkTGF5b3V0XCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwicGFkZGluZ1wiLFwidmFsdWVcIjpcIjE0XCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwicGFkZGluZy1ib3R0b21cIixcInZhbHVlXCI6XCIwXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZFwiLFwidmFsdWVcIjpcImxpbmVhci1ncmFkaWVudCh0byByaWdodCwgd2hpdGUgMCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KSA0NiUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNykgOTUlLCByZ2JhKDI1NSwgMjQ2LCAwLCAwLjEzKSAxMDAlKVwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIlBhZ2VcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJjb2xvclwiLFwidmFsdWVcIjpcImRlZXBwaW5rXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZC1jb2xvclwiLFwidmFsdWVcIjpcIndoaXRlXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1mYW1pbHlcIixcInZhbHVlXCI6XCJBdmVuaXJcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCJBY3Rpb25CYXJcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJiYWNrZ3JvdW5kLWNvbG9yXCIsXCJ2YWx1ZVwiOlwid2hpdGVcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJjb2xvclwiLFwidmFsdWVcIjpcImRlZXBwaW5rXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1mYW1pbHlcIixcInZhbHVlXCI6XCJBdmVuaXJcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCJQcm9ncmVzc1wiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImNvbG9yXCIsXCJ2YWx1ZVwiOlwibGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAjZmVmY2VhIDAlLCAjZjFkYTM2IDEwMCUpXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZC1jb2xvclwiLFwidmFsdWVcIjpcImJsYWNrXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwidHJhbnNmb3JtXCIsXCJ2YWx1ZVwiOlwic2NhbGVZKDQpXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwibWFyZ2luLXRvcFwiLFwidmFsdWVcIjpcIjQwXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiQnV0dG9uXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiY29sb3JcIixcInZhbHVlXCI6XCJkZWVwcGlua1wifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtc2l6ZVwiLFwidmFsdWVcIjpcIjE4XCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwicGFkZGluZ1wiLFwidmFsdWVcIjpcIjEyXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZFwiLFwidmFsdWVcIjpcIndoaXRlXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwibWFyZ2luXCIsXCJ2YWx1ZVwiOlwiNFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJvcmRlci1yYWRpdXNcIixcInZhbHVlXCI6XCI4XCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYm9yZGVyLXdpZHRoXCIsXCJ2YWx1ZVwiOlwiMlwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJvcmRlci1jb2xvclwiLFwidmFsdWVcIjpcInBpbmtcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCIuYi15ZWxsb3dcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJiYWNrZ3JvdW5kLWNvbG9yXCIsXCJ2YWx1ZVwiOlwicmVkXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZC1jb2xvclwiLFwidmFsdWVcIjpcInJnYmEoMjU1LCAyNDYsIDAsIDAuMjIpXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiSW1hZ2VcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJvcGFjaXR5XCIsXCJ2YWx1ZVwiOlwiMC4zNVwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIkxhYmVsXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiY29sb3JcIixcInZhbHVlXCI6XCJkZWVwcGlua1wifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIkxpc3RWaWV3XCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZFwiLFwidmFsdWVcIjpcIndoaXRlXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwicGFkZGluZ1wiLFwidmFsdWVcIjpcIjJcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJhbmltYXRpb24tbmFtZVwiLFwidmFsdWVcIjpcImV4YW1wbGVcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJhbmltYXRpb24tZHVyYXRpb25cIixcInZhbHVlXCI6XCIwLjVcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uXCIsXCJ2YWx1ZVwiOlwiY3ViaWMtYmV6aWVyKDAuMSwgMC4xLCAwLjEsIDEpXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYW5pbWF0aW9uLWZpbGwtbW9kZVwiLFwidmFsdWVcIjpcImZvcndhcmRzXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLmx2LWxhYlwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImNvbG9yXCIsXCJ2YWx1ZVwiOlwiZGVlcHBpbmtcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJ0ZXh0LWFsaWduXCIsXCJ2YWx1ZVwiOlwibGVmdFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtc2l6ZVwiLFwidmFsdWVcIjpcIjEyXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwicGFkZGluZ1wiLFwidmFsdWVcIjpcIjlcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJiYWNrZ3JvdW5kXCIsXCJ2YWx1ZVwiOlwid2hpdGVcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJib3JkZXItcmFkaXVzXCIsXCJ2YWx1ZVwiOlwiNFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJvcmRlci13aWR0aFwiLFwidmFsdWVcIjpcIjJcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJib3JkZXItdG9wLXdpZHRoXCIsXCJ2YWx1ZVwiOlwiMFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJvcmRlci1jb2xvclwiLFwidmFsdWVcIjpcInBpbmtcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJtYXJnaW4tYm90dG9tXCIsXCJ2YWx1ZVwiOlwiMlwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5zcGVlZExhYmVsXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwidGV4dC1hbGlnblwiLFwidmFsdWVcIjpcImNlbnRlclwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtc2l6ZVwiLFwidmFsdWVcIjpcIjEwXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwicGFkZGluZy1ib3R0b21cIixcInZhbHVlXCI6XCIyMFwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi52b2x1bWVMYWJlbFwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInRleHQtYWxpZ25cIixcInZhbHVlXCI6XCJjZW50ZXJcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LXNpemVcIixcInZhbHVlXCI6XCIxMFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInBhZGRpbmctYm90dG9tXCIsXCJ2YWx1ZVwiOlwiMjBcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCIubXVzaWNJbmZvXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiY29sb3JcIixcInZhbHVlXCI6XCJkZWVwcGlua1wifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtc2l6ZVwiLFwidmFsdWVcIjpcIjE4XCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwidGV4dC1hbGlnblwiLFwidmFsdWVcIjpcImNlbnRlclwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi52b2x1bWVTbGlkZXJcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJjb2xvclwiLFwidmFsdWVcIjpcImRlZXBwaW5rXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwid2lkdGhcIixcInZhbHVlXCI6XCI4MCVcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJ0ZXh0LWFsaWduXCIsXCJ2YWx1ZVwiOlwiY2VudGVyXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZFwiLFwidmFsdWVcIjpcImJsYWNrXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwidHJhbnNmb3JtXCIsXCJ2YWx1ZVwiOlwic2NhbGUoMC42KVwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5zcGVlZFNsaWRlclwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImNvbG9yXCIsXCJ2YWx1ZVwiOlwiZGVlcHBpbmtcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJ3aWR0aFwiLFwidmFsdWVcIjpcIjgwJVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInRleHQtYWxpZ25cIixcInZhbHVlXCI6XCJjZW50ZXJcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJiYWNrZ3JvdW5kXCIsXCJ2YWx1ZVwiOlwiYmxhY2tcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJ0cmFuc2Zvcm1cIixcInZhbHVlXCI6XCJzY2FsZSgwLjYpXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLmNvcHlSaWdodHNcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJjb2xvclwiLFwidmFsdWVcIjpcInBpbmtcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJ0ZXh0LWFsaWduXCIsXCJ2YWx1ZVwiOlwiY2VudGVyXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1zaXplXCIsXCJ2YWx1ZVwiOlwiOFwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5jb3ZlckluZm9cIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJjb2xvclwiLFwidmFsdWVcIjpcInBpbmtcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJ0ZXh0LWFsaWduXCIsXCJ2YWx1ZVwiOlwiY2VudGVyXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1zaXplXCIsXCJ2YWx1ZVwiOlwiMjhcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJjb2xvclwiLFwidmFsdWVcIjpcImRlZXBwaW5rXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLm11c2ljUHJvZ3Jlc3NcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJjb2xvclwiLFwidmFsdWVcIjpcImdyZWVuXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwid2lkdGhcIixcInZhbHVlXCI6XCI3MCVcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJ0ZXh0LWFsaWduXCIsXCJ2YWx1ZVwiOlwiY2VudGVyXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZFwiLFwidmFsdWVcIjpcInBpbmtcIn1dfV0sXCJwYXJzaW5nRXJyb3JzXCI6W119fTs7XG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5obXJSZWZyZXNoKHsgdHlwZTogJ3N0eWxlJywgcGF0aDogJy4vYXBwLnNjc3MnIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00NWJhNWVkNCZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvVXNlcnMvbWlzaWFrL0Rlc2t0b3AvMjAyMS9uYXRpdmVzY3JpcHQtbXVzYXBwLWRlbW8vbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNDViYTVlZDQnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNDViYTVlZDQnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNDViYTVlZDQnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0FwcC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDViYTVlZDQmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNDViYTVlZDQnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImNvbXBvbmVudHMvQXBwLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9BcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQ1YmE1ZWQ0JlwiIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IFZ1ZXggZnJvbSAndnVleCc7XG5cblZ1ZS51c2UoVnVleCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBWdWV4LlN0b3JlKHtcbiAgc3RhdGU6IHtcblxuICB9LFxuICBtdXRhdGlvbnM6IHtcblxuICB9LFxuICBhY3Rpb25zOiB7XG5cbiAgfVxufSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ+L3BhY2thZ2UuanNvblwiKTsiXSwic291cmNlUm9vdCI6IiJ9