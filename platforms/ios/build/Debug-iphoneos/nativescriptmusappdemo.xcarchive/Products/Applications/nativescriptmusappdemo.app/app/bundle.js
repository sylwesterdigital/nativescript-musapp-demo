require("./runtime.js");require("./vendor.js");module.exports =
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["bundle"],{

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/App.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nativescript_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@nativescript/core/index.js");
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
 //import { device, screen, isAndroid, isIOS } from "tns-core-modules/platform";

const platform = __webpack_require__("../node_modules/@nativescript/core/platform/index.js"); //const platformModule = require("tns-core-modules/platform")


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
      platform: platform,
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
      let scale = this.platform.Screen.mainScreen.scale;
      let progressWidth = this.$refs.myProgress.nativeView.getActualSize().width;
      let posX = args.getX() * scale;
      let perc = posX / progressWidth;
      console.log('perc:', perc);

      if (perc <= 0) {
        perc = 0;
      }

      if (perc >= 1) {
        pers = 1;
      }

      let newTime = this.currentSongDuration * perc; //console.log('New time:', newTime);

      this.player.seekTo(newTime); //console.log('skipToNewTime', args.getX());
      // _screen: <UIScreen: 0x10690ad70; bounds = {{0, 0}, {414, 896}}; mode = <UIScreenMode: 0x2820f43c0; size = 828.000000 x 1792.000000>>
      //console.log(args.getX()*this.platform.Screen.mainScreen.scale, perc, this.platform.Screen.mainScreen.widthDIPs, this.platform.Screen.mainScreen.scale);
      //console.log(this.$refs.myProgress.nativeView.getMeasuredWidth(), args.getX(), this.$refs.myProgress.nativeView.getActualSize().width, this.platform.Screen.mainScreen.widthDIPs)
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
            ref: "myProgress",
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
            on: { tap: _vm.skipToNewTime }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9BcHAudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvQXBwLnZ1ZT83YjBlIiwid2VicGFjazovLy8uIHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9hcHBcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSQiLCJ3ZWJwYWNrOi8vL1xcYl9bXFx3LV0qXFwuKXNjc3MpJCIsIndlYnBhY2s6Ly8vLi9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9BcHAudnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvQXBwLnZ1ZT85ZTIzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvQXBwLnZ1ZT9iMzc3Iiwid2VicGFjazovLy8uL3N0b3JlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIn4vcGFja2FnZS5qc29uXCIiXSwibmFtZXMiOlsiVnVlIiwic3RvcmUiLCJWdWVEZXZ0b29scyIsIlROU19FTlYiLCJ1c2UiLCJjb25maWciLCJzaWxlbnQiLCJyZW5kZXIiLCJoIiwiJHN0YXJ0IiwiVnVleCIsIlN0b3JlIiwic3RhdGUiLCJtdXRhdGlvbnMiLCJhY3Rpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBb0RBOztBQUVBLDZGLENBQ0E7OztBQUVBLDBGLENBQ0E7OztBQUVBOztBQUVBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFDQSxxRUFEQTtBQUVBLHNDQUZBO0FBR0EscUJBSEE7QUFJQSx1QkFKQTtBQUtBLHFCQUxBO0FBTUEsdUJBTkE7QUFPQSx3QkFQQTtBQVFBLHVCQVJBO0FBU0EsaUNBVEE7QUFVQSw0QkFWQTtBQVdBLHVCQVhBO0FBWUEsd0JBWkE7QUFjQSx3Q0FkQTtBQWVBO0FBQUE7QUFBQSxPQWZBO0FBZ0JBLHdCQWhCQTtBQWtCQTtBQUNBLHVEQURBO0FBRUEsa0JB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O0FBRUE7O0FBRUE7QUFDQSxJQUFJLElBQVU7QUFDZCxZQUFZLG1CQUFPLENBQUMsa0RBQW1HO0FBQ3ZILGNBQWMsbUJBQU8sQ0FBQyxnREFBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esc0JBQXNCLHFEQUEwQyxFQUFFO0FBQUE7QUFDbEU7QUFDQSxnQkFBZ0IsOEVBQU07QUFDdEIseUJBQXlCLHVGQUFlO0FBQ3hDLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ2UsZ0Y7Ozs7Ozs7O0FDdENmO0FBQUE7QUFBQSx3Q0FBbUssQ0FBZ0IsdU9BQUcsRUFBQyxDOzs7Ozs7OztBQ0F2TDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBVCwwQ0FBRyxDQUFDSSxHQUFKLENBQVFNLDRDQUFSO0FBRWUsbUVBQUlBLDRDQUFJLENBQUNDLEtBQVQsQ0FBZTtBQUM1QkMsT0FBSyxFQUFFLEVBRHFCO0FBSTVCQyxXQUFTLEVBQUUsRUFKaUI7QUFPNUJDLFNBQU8sRUFBRTtBQVBtQixDQUFmLENBQWYsRTs7Ozs7OztBQ0xBLDJDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8UGFnZT5cbiAgICAgICBcblx0PEFjdGlvbkJhciB0aXRsZT1cIkRhbXN0cmluIFNoYXJwIE11c2ljXCIvPlxuICBcblx0PEdyaWRMYXlvdXQgY29sdW1ucz1cIiosKiwqXCIgcm93cz1cIiosKiwzMCw2MCw1MCw1MCw1MFwiPlxuXHRcblx0XG5cdFxuXG5cdFx0PEltYWdlIHYtYmluZDpzdHlsZT1cInJvdGF0ZU1lKC0xMClcIiByb3c9XCIwXCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgcm93U3Bhbj1cIjJcIiBzcmM9XCJ+L2Fzc2V0cy9pbWFnZXMvUHJhbmExLUljb24xLnBuZ1wiLz5cblx0XHQ8SW1hZ2Ugdi1iaW5kOnN0eWxlPVwicm90YXRlTWUoNSlcIiByb3c9XCIwXCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgcm93U3Bhbj1cIjJcIiBzcmM9XCJ+L2Fzc2V0cy9pbWFnZXMvUHJhbmExLUNpcmNsZS1QaW5rQmlnLnBuZ1wiLz5cblxuXHRcdDxMYWJlbCBjbGFzcz0nY292ZXJJbmZvJyByb3c9XCIwXCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgcm93U3Bhbj1cIjJcIj57e2N1cnJlbnRTb25nRHVyYXRpb25JbmZvfX0gLyB7e2N1cnJlbnRUaW1lfX08L0xhYmVsPlxuXG5cdFx0PExhYmVsIHJvdz1cIjJcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiBjbGFzcz1cInNwZWVkTGFiZWxcIj5TcGVlZDwvTGFiZWw+XHRcdFx0XHRcdFxuXHRcdDxTbGlkZXIgIGNsYXNzPVwic3BlZWRTbGlkZXJcIiByb3c9XCIyXCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgOnZhbHVlPVwiY3VycmVudFNwZWVkXCIgQHZhbHVlQ2hhbmdlPVwib25TbGlkZXJTcGVlZENoYW5nZWRcIi8+XHRcdFxuXHRcdFx0XHRcdFx0XG5cdFx0PExhYmVsIHJvdz1cIjNcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiBjbGFzcz1cInZvbHVtZUxhYmVsXCI+Vm9sdW1lPC9MYWJlbD5cdFx0XHRcdFx0XG5cdFx0PFNsaWRlciBjbGFzcz1cInZvbHVtZVNsaWRlclwiIHJvdz1cIjNcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiA6dmFsdWU9XCJjdXJyZW50Vm9sdW1lXCIgQHZhbHVlQ2hhbmdlPVwib25TbGlkZXJWYWx1ZUNoYW5nZWRcIj48L1NsaWRlcj5cblx0XHRcdFxuXHRcdDxMYWJlbCBjbGFzcz0nbXVzaWNJbmZvJyByb3c9XCIxXCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgdGV4dFdyYXA9XCJ0cnVlXCI+e3ttdXNpY0luZm8uaW5mb319PC9MYWJlbD5cblxuXHRcdDxQcm9ncmVzcyByZWY9XCJteVByb2dyZXNzXCIgdi1iaW5kOnN0eWxlPVwieyBjb2xvcjogcHJvZ3Jlc3NEeW5Db2xvciwgdHJhbnNmb3JtOiAnc2NhbGVZKCcrcHJvZ3Jlc3NTY2FsZVkrJyknIH1cIiBjbGFzcz1cIm11c2ljUHJvZ3Jlc3NcIiByb3c9XCIxXCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgOnZhbHVlPVwiY3VycmVudFByb2dyZXNzXCIgQHRhcD1cInNraXBUb05ld1RpbWVcIiAvPlx0XG5cblx0XHQ8QnV0dG9uIGNsYXNzPVwiYi15ZWxsb3dcIiByb3c9XCI0XCIgY29sPVwiMFwiIHJvd1NwYW49XCIxXCIgQHRhcD1cInBsYXlNdXNpYygpXCI+e3twbGF5TXNnfX08L0J1dHRvbj5cblx0XHQ8QnV0dG9uIGNsYXNzPVwiYi15ZWxsb3dcIiByb3c9XCI0XCIgY29sPVwiMVwiIHJvd1NwYW49XCIxXCIgQHRhcD1cInBhdXNlTXVzaWMoKVwiPnt7cGF1c2VNc2d9fTwvQnV0dG9uPlxuXHRcdDxCdXR0b24gY2xhc3M9XCJiLXllbGxvd1wiIHJvdz1cIjRcIiBjb2w9XCIyXCIgcm93U3Bhbj1cIjFcIiBAdGFwPVwic3RvcE11c2ljKClcIj57e3N0b3BNc2d9fTwvQnV0dG9uPlxuXHRcdFxuXHRcdDxCdXR0b24gY2xhc3M9XCJiLXllbGxvd1wiIHJvdz1cIjVcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiBAdGFwPVwic2hvd0F1ZGlvRmlsZXNMaXN0KClcIj57e2ZpbGVzTXNnfX08L0J1dHRvbj5cblx0XHRcdFx0XHRcdFxuXHRcdDxMaXN0VmlldyB2LWlmPVwic2hvd0xpc3QgPT0gdHJ1ZVwiIHJvdz1cIjBcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiByb3dTcGFuPVwiNFwiIGZvcj1cIml0ZW0gaW4gbGlzdE9mSXRlbXNcIiBAaXRlbVRhcD1cIm9uSXRlbVRhcFwiPlxuXHRcdCAgPHYtdGVtcGxhdGU+XG5cdFx0XHQ8IS0tIFNob3dzIHRoZSBsaXN0IGl0ZW0gbGFiZWwgaW4gdGhlIGRlZmF1bHQgY29sb3IgYW5kIHN0eWxlLiAtLT5cblx0XHRcdDxMYWJlbCBjbGFzcz1cImx2LWxhYlwiIDp0ZXh0PVwiaXRlbS5fbmFtZVwiIC8+XG5cdFx0ICA8L3YtdGVtcGxhdGU+XG5cdFx0PC9MaXN0Vmlldz5cdFxuXHRcdFx0XHRcdFxuXHRcdDxMYWJlbCBjbGFzcz0nY29weVJpZ2h0cycgcm93PVwiNlwiIGNvbD1cIjBcIiBjb2xTcGFuPVwiM1wiIEB0YXA9XCJzaG93Q3JlZGl0cygpXCI+e3tjb3B5UmlnaHRzSW5mb319PC9MYWJlbD5cblxuXHRcdFxuXHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0XHRcblx0PC9HcmlkTGF5b3V0Plx0XHRcbiAgIFxuICAgXG4gICAgPC9QYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cblx0XG4gICAgaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiQG5hdGl2ZXNjcmlwdC9jb3JlXCI7XG4gICAgLy9pbXBvcnQgeyBkZXZpY2UsIHNjcmVlbiwgaXNBbmRyb2lkLCBpc0lPUyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XG4gIFxuXHRjb25zdCBwbGF0Zm9ybSA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCIpO1xuICAgIC8vY29uc3QgcGxhdGZvcm1Nb2R1bGUgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiKVxuXHRcblx0Y29uc3QgZnMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiKTtcblx0Ly9jb25zdCBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XG5cdFxuXHRjb25zdCBhdWRpbyA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1hdWRpbycpO1xuXG5cdGNvbnN0IHBsYXllclROUyA9IG5ldyBhdWRpby5UTlNQbGF5ZXIoKTtcblx0cGxheWVyVE5TLmRlYnVnID0gdHJ1ZTtcblx0XG5cdFxuXHRleHBvcnQgZGVmYXVsdCB7XG5cdFx0XG5cdFx0ZGF0YSgpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNvcHlSaWdodHNJbmZvOiAnQ29weXJpZ2h0IDIwMTktMjAyMSDCqSBTeWx3ZXN0ZXIgSy4gTWllbG5pY3p1aycsXG5cdFx0XHRcdGNvdmVyTXNnOiAnVGhpcyB3aWxsIGJlIGEgY292ZXInLFxuXHRcdFx0XHRwbGF5TXNnOiBcIlBsYXlcIixcblx0XHRcdFx0cGF1c2VNc2c6IFwiUGF1c2VcIixcblx0XHRcdFx0c3RvcE1zZzogXCJTdG9wXCIsXG5cdFx0XHRcdGZpbGVzTXNnOiBcIkZpbGVzXCIsXG5cdFx0XHRcdGN1cnJlbnRWb2x1bWU6IDEwMCxcblx0XHRcdFx0Y3VycmVudFNwZWVkOiAxMDAsXG5cdFx0XHRcdGN1cnJlbnRTb25nRHVyYXRpb25JbmZvOiAnJyxcblx0XHRcdFx0Y3VycmVudFNvbmdEdXJhdGlvbjogMCxcblx0XHRcdFx0cGxheWVyOiBwbGF5ZXJUTlMsXG4gICAgICAgICAgICAgICAgcGxhdGZvcm06IHBsYXRmb3JtLFxuXG5cdFx0XHRcdGN1cnJlbnRUaW1lOiBwbGF5ZXJUTlMuY3VycmVudFRpbWUsXG5cdFx0XHRcdG11c2ljSW5mbzoge2luZm86XCJObyBpbmZvXCJ9LFxuXHRcdFx0XHRjdXJyZW50UHJvZ3Jlc3M6IDAsXG5cdFx0XHRcdFxuXHRcdFx0XHRwbGF5ZXJPcHRpb25zOiB7XG5cdFx0XHRcdFx0YXVkaW9GaWxlOiAnfi9hc3NldHMvYXVkaW8vQ3ppbGxpb3V0X2RydW1zLm1wMycsXG5cdFx0XHRcdFx0bG9vcDogdHJ1ZSxcblx0XHRcdFx0XHRjb21wbGV0ZUNhbGxiYWNrOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdmaW5pc2hlZCBwbGF5aW5nJyk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRlcnJvckNhbGxiYWNrOiBmdW5jdGlvbihlcnJvck9iamVjdCkge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJy0tLS0tLSBlcnJvckNhbGxiYWNrJywgSlNPTi5zdHJpbmdpZnkoZXJyb3JPYmplY3QpKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGluZm9DYWxsYmFjazogZnVuY3Rpb24oYXJncykge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJy0tLS0tLSBpbmZvQ2FsbGJhY2snLCBKU09OLnN0cmluZ2lmeShhcmdzKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcblx0XHRcdFx0ZmlsZUxpc3Q6IFtdLFxuXHRcdFx0XHRcblx0XHRcdFx0bGlzdE9mSXRlbXM6IFtcblx0XHRcdFx0XHR7aWQ6MSwgX25hbWU6IFwiRHVwYVwifSxcblx0XHRcdFx0XHR7aWQ6MiwgX25hbWU6IFwiQ2lwYVwifSxcblx0XHRcdFx0XHR7aWQ6MywgX25hbWU6IFwiR293bm9cIn0sXHRcdFx0XHRcdFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRcblx0XHRcdFx0c2hvd0xpc3Q6IGZhbHNlLFxuXHRcdFx0XHRcblx0XHRcdFx0cHJvZ3Jlc3NEeW5Db2xvcjogJ2RlZXBwaW5rJyxcblx0XHRcdFx0cHJvZ3Jlc3NTY2FsZVk6IDQsXG5cdFx0XHRcdFxuXHRcdFx0XHRpbWFnZXNUdXJuOiA4MCxcblx0XHRcdFx0XG5cdFx0XHRcdC8vIGF1ZGlvIGZpbGVzIC0gZW50aXRpZXNcblx0XHRcdFx0Ly9fcGF0aCwgX25hbWUsIF9leHRlbnNpb25cblx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRcbi8vXHRcdGNvbXB1dGVkOiB7XG4vL1x0XHRcdHJvdGF0ZU1lKGFyZykge1xuLy9cdFx0XHRcdHJldHVybiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgnICsgdGhpcy5pbWFnZXNUdXJuICogYXJnICsgJ3R1cm4pJ31cbi8vXHRcdFx0fVxuLy9cdFx0fSxcdFx0XG5cdFx0XG5cdFx0bW91bnRlZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XG5cdFx0XHR0aGlzLiRuZXh0VGljayhmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdlbnRpcmUgdmlldyBoYXMgYmVlbiByZW5kZXJlZCcpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBcblx0XHRcdH0pLFxuXHRcdFx0XHRcblx0XHRcdHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0XHRcdCAgdGhpcy51cGRhdGVUaW1lcigpO1xuXHRcdFx0XHR9LDYwKTtcblx0XHRcdHRoaXMudXBkYXRlVGltZXIoKTtcdFx0XHRcdFxuXHRcdFx0XG5cdFx0fSxcblx0XHRcdFx0XG5cdFx0XG5cdFx0bWV0aG9kczoge1xuXHRcdFx0XG5cdFx0XHRzaG93Q3JlZGl0cygpIHtcblx0XHRcdFx0YWxlcnQoe1xuXHRcdFx0XHQgIHRpdGxlOiBcIkRhbXN0cmluOiBNdXNpYyBQbGF5ZXIgdi4wLjFcIixcblx0XHRcdFx0ICBtZXNzYWdlOiBcIkF1dGhvcjogU3lsd2VzdGVyIEsuIE1pZWxuaWN6dWtcIixcblx0XHRcdFx0ICBva0J1dHRvblRleHQ6IFwiVGhhdCdzIEFtYXppbmchXCJcblx0XHRcdFx0fSkudGhlbigoKSA9PiB7XG5cdFx0XHRcdCAgY29uc29sZS5sb2coXCJBbGVydCBkaWFsb2cgY2xvc2VkXCIpO1xuXHRcdFx0XHR9KTtcdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0cm90YXRlTWUoYXJnKSB7XG5cdFx0XHRcdHJldHVybiB7IHRyYW5zZm9ybTogJ3JvdGF0ZSgnICsgdGhpcy5pbWFnZXNUdXJuICogYXJnICsgJ3R1cm4pJ31cblx0XHRcdH0sXHRcdFx0XG5cdFx0XHRcblx0XHRcdHNraXBUb05ld1RpbWUoYXJncykge1xuXHRcdFx0XG4gICAgICAgICAgICAgICAgbGV0IHNjYWxlID0gdGhpcy5wbGF0Zm9ybS5TY3JlZW4ubWFpblNjcmVlbi5zY2FsZTtcbiAgICAgICAgICAgICAgICBsZXQgcHJvZ3Jlc3NXaWR0aCA9IHRoaXMuJHJlZnMubXlQcm9ncmVzcy5uYXRpdmVWaWV3LmdldEFjdHVhbFNpemUoKS53aWR0aDtcbiAgICAgICAgICAgICAgICBsZXQgcG9zWCA9IGFyZ3MuZ2V0WCgpKnNjYWxlO1xuXHRcdFx0XHRsZXQgcGVyYyA9IChwb3NYL3Byb2dyZXNzV2lkdGgpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGVyYzonLCBwZXJjKVxuICAgICAgICAgICAgICBcblx0XHRcdFx0aWYocGVyYyA8PSAwKSB7XG5cdFx0XHRcdFx0cGVyYyA9IDBcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihwZXJjID49IDEpIHtcblx0XHRcdFx0XHRwZXJzID0gMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgbmV3VGltZSA9ICB0aGlzLmN1cnJlbnRTb25nRHVyYXRpb24gKiBwZXJjO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnTmV3IHRpbWU6JywgbmV3VGltZSk7XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnBsYXllci5zZWVrVG8obmV3VGltZSk7XG5cdFx0XHRcdFxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdza2lwVG9OZXdUaW1lJywgYXJncy5nZXRYKCkpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBfc2NyZWVuOiA8VUlTY3JlZW46IDB4MTA2OTBhZDcwOyBib3VuZHMgPSB7ezAsIDB9LCB7NDE0LCA4OTZ9fTsgbW9kZSA9IDxVSVNjcmVlbk1vZGU6IDB4MjgyMGY0M2MwOyBzaXplID0gODI4LjAwMDAwMCB4IDE3OTIuMDAwMDAwPj5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGFyZ3MuZ2V0WCgpKnRoaXMucGxhdGZvcm0uU2NyZWVuLm1haW5TY3JlZW4uc2NhbGUsIHBlcmMsIHRoaXMucGxhdGZvcm0uU2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzLCB0aGlzLnBsYXRmb3JtLlNjcmVlbi5tYWluU2NyZWVuLnNjYWxlKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLiRyZWZzLm15UHJvZ3Jlc3MubmF0aXZlVmlldy5nZXRNZWFzdXJlZFdpZHRoKCksIGFyZ3MuZ2V0WCgpLCB0aGlzLiRyZWZzLm15UHJvZ3Jlc3MubmF0aXZlVmlldy5nZXRBY3R1YWxTaXplKCkud2lkdGgsIHRoaXMucGxhdGZvcm0uU2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzKVxuICAgICAgICAgICAgICBcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRzaG93QXVkaW9GaWxlc0xpc3QoKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLmdldEF1ZGlvRmlsZXNMaXN0KCk7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZih0aGlzLnNob3dMaXN0ID09IGZhbHNlKSB7XG5cdFx0XHRcdFx0dGhpcy5zaG93TGlzdCA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5zaG93TGlzdCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0b25JdGVtVGFwKGUpIHtcblx0XHRcdFxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdJdGVtIHRhcCcsdGhpcy5saXN0T2ZJdGVtc1tlLmluZGV4XS50ZXh0KVxuXHRcdFx0XHRjb25zb2xlLmxvZygnSXRlbSB0YXAnLCBlKVxuXHRcdFx0XHRcblx0XHRcdFx0bGV0IGF1ZGlvRmlsZU5hbWUgPSB0aGlzLmxpc3RPZkl0ZW1zW2UuaW5kZXhdLl9uYW1lO1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wbGF5U2VsZWN0ZWRNdXNpYyhhdWRpb0ZpbGVOYW1lKVxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdHJlYWRUZXh0RnJvbUZpbGUocGF0aCkge1xuXHRcdFx0XHQvKiB0aGlzIGlzIGhvdyB5b3UgZ2V0IGNvbnRlbnQgb2YgdGV4dCBmaWxlICovXG5cdFx0XHRcdC8vIGxldCBwYXRoID0gJy4vYXNzZXRzL2RhdGEvMS50eHQnOyBcblx0XHRcdFx0bGV0IGZpbGUgPSBmcy5rbm93bkZvbGRlcnMuY3VycmVudEFwcCgpLmdldEZpbGUocGF0aCk7XG5cdFx0XHRcdGZpbGUucmVhZFRleHQoKVxuXHRcdFx0XHQudGhlbigocmVzKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2ZpbGUucmVhZFRleHQ6JyxyZXMpXG5cdFx0XHRcdFx0dGhpcy5tdXNpY0luZm8uaW5mbyA9IHJlcy50b1N0cmluZygpO1xuXHRcdFx0XHR9KS5jYXRjaCgoZXJyKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2ZpbGUucmVhZFRleHQ6IGVyci5zdGFjaycsZXJyLnN0YWNrKTtcblx0XHRcdFx0fSk7XHRcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRnZXRBdWRpb0ZpbGVzTGlzdCgpIHtcblx0XHRcdFx0bGV0IGZvbGRlciA9IGZzLmtub3duRm9sZGVycy5jdXJyZW50QXBwKCkuZ2V0Rm9sZGVyKFwiYXNzZXRzL2F1ZGlvXCIpO1xuXHRcdFx0XHRmb2xkZXIuZ2V0RW50aXRpZXMoKVxuXHRcdFx0XHRcdC50aGVuKChlbnRpdGllcykgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coJ2VudGl0aWVzJyxlbnRpdGllcylcblx0XHRcdFx0XHRcdHRoaXMuZmlsZUxpc3QgPSBlbnRpdGllcztcblx0XHRcdFx0XHRcdHRoaXMubGlzdE9mSXRlbXMgPSB0aGlzLmZpbGVMaXN0O1xuXHRcdFx0XHRcdFx0Ly90aGlzLm11c2ljSW5mby5pbmZvID0gSlNPTi5zdHJpbmdpZnkodGhpcy5maWxlTGlzdCk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuY2F0Y2goKGVycikgPT4ge1xuXHRcdFx0XHRcdFx0Ly8gRmFpbGVkIHRvIG9idGFpbiBmb2xkZXIncyBjb250ZW50cy5cblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdnZXRFbnRpdGllcyBjYXRjaCBlcnJvcjogJyxlcnIuc3RhY2spO1xuXHRcdFx0XHRcdH0pO1x0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHR1cGRhdGVUaW1lcigpIHtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMuY3VycmVudFNvbmdEdXJhdGlvbkluZm8gPSB0aGlzLmZvcm1hdEN1cnJlbnRUaW1lKHRoaXMuY3VycmVudFNvbmdEdXJhdGlvbik7XG5cdFx0XHRcdHRoaXMuY3VycmVudFRpbWUgPSB0aGlzLmZvcm1hdEN1cnJlbnRUaW1lKHRoaXMucGxheWVyLmN1cnJlbnRUaW1lKTtcblx0XHRcdFx0dGhpcy5jdXJyZW50UHJvZ3Jlc3MgPSAxMDAqdGhpcy5wbGF5ZXIuY3VycmVudFRpbWUvcGFyc2VJbnQodGhpcy5jdXJyZW50U29uZ0R1cmF0aW9uKTtcblx0XHRcdFx0Ly90aGlzLm11c2ljSW5mby5pbmZvID0gdGhpcy5jdXJyZW50UHJvZ3Jlc3M7XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLmltYWdlc1R1cm4gPSB0aGlzLnBsYXllci5jdXJyZW50VGltZTtcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdHVwZGF0ZUluZm8oc3RyKSB7XG5cdFx0XHRcdHRoaXMubXVzaWNJbmZvLmluZm8gPSBzdHI7XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRvblNsaWRlclZhbHVlQ2hhbmdlZChlKSB7XG4vL1x0XHRcdFx0Ly9jb25zb2xlLmxvZygnc2xpZGVyIHZhbCcsZS52YWx1ZSlcblx0XHRcdFx0dGhpcy5jdXJyZW50Vm9sdW1lID0gZS52YWx1ZVxuXHRcdFx0XHR0aGlzLm11c2ljSW5mby5pbmZvID0gJ05ldyB2b2x1bWU6ICcrcGFyc2VJbnQodGhpcy5jdXJyZW50Vm9sdW1lKStcIiVcIlxuXHRcdFx0XHR0aGlzLnBsYXllci52b2x1bWUgPSB0aGlzLmN1cnJlbnRWb2x1bWUqMC4wMTtcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdG9uU2xpZGVyU3BlZWRDaGFuZ2VkKGUpIHtcbi8vXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdzbGlkZXIgdmFsJyxlLnZhbHVlKVxuXHRcdFx0XHR0aGlzLmN1cnJlbnRTcGVlZCA9IGUudmFsdWVcblx0XHRcdFx0dGhpcy5tdXNpY0luZm8uaW5mbyA9ICdOZXcgc3BlZWQ6ICcrcGFyc2VJbnQodGhpcy5jdXJyZW50U3BlZWQsMTApKyclJztcblx0XHRcdFx0dGhpcy5wbGF5ZXIuY2hhbmdlUGxheWVyU3BlZWQodGhpcy5jdXJyZW50U3BlZWQqMC4wMSk7XG5cdFx0XHR9LFx0XHRcdFxuXHRcdFx0XG5cdFx0XHRcblx0XHRcdHBsYXlTZWxlY3RlZE11c2ljKGF1ZGlvRmlsZU5hbWUpIHtcblx0XHRcdFx0XG5cdFx0XHRcdGlmKHRoaXMucGxheWVyLmlzQXVkaW9QbGF5aW5nKCkgPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdHRoaXMucGxheWVyLmRpc3Bvc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wbGF5ZXJPcHRpb25zLmF1ZGlvRmlsZSA9ICd+L2Fzc2V0cy9hdWRpby8nK2F1ZGlvRmlsZU5hbWUsXG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnBsYXllci5pbml0RnJvbUZpbGUodGhpcy5wbGF5ZXJPcHRpb25zKVxuXHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbGF5ZXIucGxheSgpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaCgoZXJyKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2luaXRGcm9tRmlsZSBlcnI6JyxlcnIpXG5cdFx0XHRcdFx0dGhpcy5tdXNpY0luZm8uaW5mbyA9ICdQcm9ibGVtIHBsYXlpbmc6ICcrdGhpcy5wbGF5ZXJPcHRpb25zLmF1ZGlvRmlsZTtcblx0XHRcdFx0fSlcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucGxheWVyLmdldEF1ZGlvVHJhY2tEdXJhdGlvbigpLnRoZW4oKGR1cmF0aW9uKSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJzb25nIGR1cmF0aW9uOlwiLCBkdXJhdGlvbik7XG5cdFx0XHRcdFx0dGhpcy5jdXJyZW50U29uZ0R1cmF0aW9uID0gZHVyYXRpb247XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0bGV0IG1wM0ZpbGVBcnIgPSB0aGlzLnBsYXllck9wdGlvbnMuYXVkaW9GaWxlLnNwbGl0KCcvJyk7XG5cdFx0XHRcdFx0bGV0IG1wM0ZpbGUgPSAgbXAzRmlsZUFyclttcDNGaWxlQXJyLmxlbmd0aC0xXTtcblx0XHRcdFx0XHR0aGlzLm11c2ljSW5mby5pbmZvID0gJ1BsYXlpbmc6ICcrbXAzRmlsZTtcblx0XHRcdFx0XHRcblx0XHRcdFx0fSk7XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnBsYXllci52b2x1bWUgPSB0aGlzLmN1cnJlbnRWb2x1bWUqMC4wMTtcblx0XHRcdFx0dGhpcy5wbGF5ZXIuY2hhbmdlUGxheWVyU3BlZWQodGhpcy5jdXJyZW50U3BlZWQqMC4wMSk7XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0cGxheU11c2ljKCkge1xuXHRcdFx0XHRcblx0XHRcdFx0aWYodGhpcy5wbGF5ZXIuaXNBdWRpb1BsYXlpbmcoKSA9PSB0cnVlKSB7XG5cdFx0XHRcdFx0dGhpcy5wbGF5ZXIuZGlzcG9zZSgpO1xuXHRcdFx0XHR9XHRcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdwbGF5TXVzaWMoKScsIHRoaXMucGxheWVyT3B0aW9ucy5hdWRpb0ZpbGUpO1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wbGF5ZXIuaW5pdEZyb21GaWxlKHRoaXMucGxheWVyT3B0aW9ucylcblx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGxheWVyLnBsYXkoKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKGVycikgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdpbml0RnJvbUZpbGUgZXJyOicsZXJyKVxuXHRcdFx0XHRcdHRoaXMubXVzaWNJbmZvLmluZm8gPSAnUHJvYmxlbSBwbGF5aW5nOiAnK3RoaXMucGxheWVyT3B0aW9ucy5hdWRpb0ZpbGU7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnBsYXllci5nZXRBdWRpb1RyYWNrRHVyYXRpb24oKS50aGVuKChkdXJhdGlvbikgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwic29uZyBkdXJhdGlvbjpcIiwgZHVyYXRpb24pO1xuXHRcdFx0XHRcdHRoaXMuY3VycmVudFNvbmdEdXJhdGlvbiA9IGR1cmF0aW9uO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGxldCBtcDNGaWxlQXJyID0gdGhpcy5wbGF5ZXJPcHRpb25zLmF1ZGlvRmlsZS5zcGxpdCgnLycpO1xuXHRcdFx0XHRcdGxldCBtcDNGaWxlID0gIG1wM0ZpbGVBcnJbbXAzRmlsZUFyci5sZW5ndGgtMV07XG5cdFx0XHRcdFx0dGhpcy5tdXNpY0luZm8uaW5mbyA9ICdQbGF5aW5nOiAnK21wM0ZpbGU7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRnZXRNdXNpY0R1cmF0aW9uKCkge1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wbGF5ZXIuZ2V0QXVkaW9UcmFja0R1cmF0aW9uKClcblx0XHRcdFx0XHQudGhlbihmdW5jdGlvbihkdXJhdGlvbikge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCctLS0gZHVyYXRpb246JyxkdXJhdGlvbi50b1N0cmluZygpKTtcblx0XHRcdFx0XHRyZXR1cm4gZHVyYXRpb24udG9TdHJpbmcoKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0ICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2NhbiBub3QgY2F0Y2ggZHVyYXRpb24uJywgZXJyKTtcblx0XHRcdFx0ICB9KTtcdFx0XHRcdFxuXHRcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHRcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRwYXVzZU11c2ljICgpIHtcblx0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0XHRpZih0aGlzLnBsYXllci5pc0F1ZGlvUGxheWluZygpID09IHRydWUpIHtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR0aGlzLm11c2ljSW5mby5pbmZvID0gJ1BhdXNpbmcgYXQgJyt0aGlzLmZvcm1hdEN1cnJlbnRUaW1lKHRoaXMucGxheWVyLmN1cnJlbnRUaW1lKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR0aGlzLnByb2dyZXNzRHluQ29sb3IgPSAncGluayc7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dGhpcy5wbGF5ZXIucGF1c2UoKVxuXHRcdFx0XHRcdCAgLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXMpO1xuXHRcdFx0XHRcdCAgfSlcblx0XHRcdFx0XHQgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdwYXVzZU11c2ljLCBzb21ldGhpbmcgd2VudCB3cm9uZy4uLicsIGVycik7XG5cdFx0XHRcdFx0ICB9KTtcdFx0XHRcdFx0XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dGhpcy5wcm9ncmVzc0R5bkNvbG9yID0gJ2hvdHBpbmsnO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHRoaXMubXVzaWNJbmZvLmluZm8gPSAnUmVzdW1pbmcgZnJvbSAnK3RoaXMuZm9ybWF0Q3VycmVudFRpbWUodGhpcy5wbGF5ZXIuY3VycmVudFRpbWUpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHRoaXMucGxheWVyLnJlc3VtZSgpO1x0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0c3RvcE11c2ljKCkge1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5tdXNpY0luZm8uaW5mbyA9ICdNdXNpYyBzdG9wcGVkLidcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucGxheWVyLmRpc3Bvc2UoKTtcdFxuXHRcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRmb3JtYXRDdXJyZW50VGltZSAoc3RyKSB7XG5cdFx0XHRcdHZhciBzZWNfbnVtID0gcGFyc2VJbnQoc3RyLCAxMCk7IC8vIGRvbid0IGZvcmdldCB0aGUgc2Vjb25kIHBhcmFtXG5cdFx0XHRcdHZhciBob3VycyAgID0gTWF0aC5mbG9vcihzZWNfbnVtIC8gMzYwMCk7XG5cdFx0XHRcdHZhciBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjX251bSAtIChob3VycyAqIDM2MDApKSAvIDYwKTtcblx0XHRcdFx0dmFyIHNlY29uZHMgPSBzZWNfbnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcblxuXHRcdFx0XHRpZiAoaG91cnMgICA8IDEwKSB7aG91cnMgICA9IFwiMFwiK2hvdXJzO31cblx0XHRcdFx0aWYgKG1pbnV0ZXMgPCAxMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cblx0XHRcdFx0aWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cblx0XHRcdFx0cmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRcblx0XHR9XG5cdFx0XG5cdH1cblxuXG5cblxuPC9zY3JpcHQ+XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiUGFnZVwiLFxuICAgIFtcbiAgICAgIF9jKFwiQWN0aW9uQmFyXCIsIHsgYXR0cnM6IHsgdGl0bGU6IFwiRGFtc3RyaW4gU2hhcnAgTXVzaWNcIiB9IH0pLFxuICAgICAgX2MoXG4gICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IGNvbHVtbnM6IFwiKiwqLCpcIiwgcm93czogXCIqLCosMzAsNjAsNTAsNTAsNTBcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgIHN0eWxlOiBfdm0ucm90YXRlTWUoLTEwKSxcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgIGNvbFNwYW46IFwiM1wiLFxuICAgICAgICAgICAgICByb3dTcGFuOiBcIjJcIixcbiAgICAgICAgICAgICAgc3JjOiBcIn4vYXNzZXRzL2ltYWdlcy9QcmFuYTEtSWNvbjEucG5nXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgIHN0eWxlOiBfdm0ucm90YXRlTWUoNSksXG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICBjb2xTcGFuOiBcIjNcIixcbiAgICAgICAgICAgICAgcm93U3BhbjogXCIyXCIsXG4gICAgICAgICAgICAgIHNyYzogXCJ+L2Fzc2V0cy9pbWFnZXMvUHJhbmExLUNpcmNsZS1QaW5rQmlnLnBuZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkxhYmVsXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNvdmVySW5mb1wiLFxuICAgICAgICAgICAgICBhdHRyczogeyByb3c6IFwiMFwiLCBjb2w6IFwiMFwiLCBjb2xTcGFuOiBcIjNcIiwgcm93U3BhbjogXCIyXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgIF92bS5fcyhfdm0uY3VycmVudFNvbmdEdXJhdGlvbkluZm8pICtcbiAgICAgICAgICAgICAgICAgIFwiIC8gXCIgK1xuICAgICAgICAgICAgICAgICAgX3ZtLl9zKF92bS5jdXJyZW50VGltZSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkxhYmVsXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInNwZWVkTGFiZWxcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjJcIiwgY29sOiBcIjBcIiwgY29sU3BhbjogXCIzXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoXCJTcGVlZFwiKV1cbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFwiU2xpZGVyXCIsIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcInNwZWVkU2xpZGVyXCIsXG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICByb3c6IFwiMlwiLFxuICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICBjb2xTcGFuOiBcIjNcIixcbiAgICAgICAgICAgICAgdmFsdWU6IF92bS5jdXJyZW50U3BlZWRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjogeyB2YWx1ZUNoYW5nZTogX3ZtLm9uU2xpZGVyU3BlZWRDaGFuZ2VkIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiTGFiZWxcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidm9sdW1lTGFiZWxcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjNcIiwgY29sOiBcIjBcIiwgY29sU3BhbjogXCIzXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoXCJWb2x1bWVcIildXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfYyhcIlNsaWRlclwiLCB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ2b2x1bWVTbGlkZXJcIixcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIHJvdzogXCIzXCIsXG4gICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgIGNvbFNwYW46IFwiM1wiLFxuICAgICAgICAgICAgICB2YWx1ZTogX3ZtLmN1cnJlbnRWb2x1bWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjogeyB2YWx1ZUNoYW5nZTogX3ZtLm9uU2xpZGVyVmFsdWVDaGFuZ2VkIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiTGFiZWxcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibXVzaWNJbmZvXCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHJvdzogXCIxXCIsIGNvbDogXCIwXCIsIGNvbFNwYW46IFwiM1wiLCB0ZXh0V3JhcDogXCJ0cnVlXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5tdXNpY0luZm8uaW5mbykpXVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXCJQcm9ncmVzc1wiLCB7XG4gICAgICAgICAgICByZWY6IFwibXlQcm9ncmVzc1wiLFxuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibXVzaWNQcm9ncmVzc1wiLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgY29sb3I6IF92bS5wcm9ncmVzc0R5bkNvbG9yLFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IFwic2NhbGVZKFwiICsgX3ZtLnByb2dyZXNzU2NhbGVZICsgXCIpXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICBjb2xTcGFuOiBcIjNcIixcbiAgICAgICAgICAgICAgdmFsdWU6IF92bS5jdXJyZW50UHJvZ3Jlc3NcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjogeyB0YXA6IF92bS5za2lwVG9OZXdUaW1lIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiQnV0dG9uXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImIteWVsbG93XCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHJvdzogXCI0XCIsIGNvbDogXCIwXCIsIHJvd1NwYW46IFwiMVwiIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0ucGxheU11c2ljKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbX3ZtLl92KF92bS5fcyhfdm0ucGxheU1zZykpXVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkJ1dHRvblwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJiLXllbGxvd1wiLFxuICAgICAgICAgICAgICBhdHRyczogeyByb3c6IFwiNFwiLCBjb2w6IFwiMVwiLCByb3dTcGFuOiBcIjFcIiB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnBhdXNlTXVzaWMoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5wYXVzZU1zZykpXVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkJ1dHRvblwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJiLXllbGxvd1wiLFxuICAgICAgICAgICAgICBhdHRyczogeyByb3c6IFwiNFwiLCBjb2w6IFwiMlwiLCByb3dTcGFuOiBcIjFcIiB9LFxuICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLnN0b3BNdXNpYygpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLnN0b3BNc2cpKV1cbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJCdXR0b25cIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYi15ZWxsb3dcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjVcIiwgY29sOiBcIjBcIiwgY29sU3BhbjogXCIzXCIgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zaG93QXVkaW9GaWxlc0xpc3QoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5maWxlc01zZykpXVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLnNob3dMaXN0ID09IHRydWVcbiAgICAgICAgICAgID8gX2MoXG4gICAgICAgICAgICAgICAgXCJMaXN0Vmlld1wiLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbFNwYW46IFwiM1wiLFxuICAgICAgICAgICAgICAgICAgICByb3dTcGFuOiBcIjRcIixcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IF92bS5saXN0T2ZJdGVtcyxcbiAgICAgICAgICAgICAgICAgICAgXCIrYWxpYXNcIjogXCJpdGVtXCJcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBvbjogeyBpdGVtVGFwOiBfdm0ub25JdGVtVGFwIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwidi10ZW1wbGF0ZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoXG4gICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSByZWYuaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciAkaW5kZXggPSByZWYuJGluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRldmVuID0gcmVmLiRldmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyICRvZGQgPSByZWYuJG9kZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImx2LWxhYlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogaXRlbS5fbmFtZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICA0MDUzMTIxNDMxXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogX3ZtLl9lKCksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkxhYmVsXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImNvcHlSaWdodHNcIixcbiAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjZcIiwgY29sOiBcIjBcIiwgY29sU3BhbjogXCIzXCIgfSxcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5zaG93Q3JlZGl0cygpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW192bS5fdihfdm0uX3MoX3ZtLmNvcHlSaWdodHNJbmZvKSldXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXBwLnNjc3NcIjogXCIuL2FwcC5zY3NzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vIHN5bmMgXlxcXFwuXFxcXC9hcHBcXFxcLihjc3N8c2Nzc3xsZXNzfHNhc3MpJFwiOyIsInZhciBtYXAgPSB7XG5cdFwiLi9hcHAuanNcIjogXCIuL2FwcC5qc1wiLFxuXHRcIi4vYXBwLnNjc3NcIjogXCIuL2FwcC5zY3NzXCIsXG5cdFwiLi9zdG9yZS5qc1wiOiBcIi4vc3RvcmUuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi8gc3luYyByZWN1cnNpdmUgKD88IVxcXFxiQXBwX1Jlc291cmNlc1xcXFxiLiopKD88IVxcXFwuXFxcXC9cXFxcYnRlc3RzXFxcXGJcXFxcLy4qPylcXFxcLih4bWx8Y3NzfGpzfCg/PCFcXFxcLmRcXFxcLil0c3woPzwhXFxcXGJfW1xcXFx3LV0qXFxcXC4pc2NzcykkXCI7IiwiLy8gaW1wb3J0IFZ1ZSBmcm9tIFwibmF0aXZlc2NyaXB0LXZ1ZVwiO1xuXG4vLyBpbXBvcnQgSG9tZSBmcm9tIFwiLi9jb21wb25lbnRzL0hvbWVcIjtcblxuLy8gbmV3IFZ1ZSh7XG5cbi8vICAgICB0ZW1wbGF0ZTogYFxuLy8gICAgICAgICA8RnJhbWU+XG4vLyAgICAgICAgICAgICA8SG9tZSAvPlxuLy8gICAgICAgICA8L0ZyYW1lPmAsXG5cbi8vICAgICBjb21wb25lbnRzOiB7XG4vLyAgICAgICAgIEhvbWVcbi8vICAgICB9XG4vLyB9KS4kc3RhcnQoKTtcblxuaW1wb3J0IFZ1ZSBmcm9tICduYXRpdmVzY3JpcHQtdnVlJ1xuaW1wb3J0IEFwcCBmcm9tICcuL2NvbXBvbmVudHMvQXBwJ1xuaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUnO1xuXG5pbXBvcnQgVnVlRGV2dG9vbHMgZnJvbSAnbmF0aXZlc2NyaXB0LXZ1ZS1kZXZ0b29scydcblxuaWYoVE5TX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIFZ1ZS51c2UoVnVlRGV2dG9vbHMpXG59XG4vLyBQcmludHMgVnVlIGxvZ3Mgd2hlbiAtLWVudi5wcm9kdWN0aW9uIGlzICpOT1QqIHNldCB3aGlsZSBidWlsZGluZ1xuVnVlLmNvbmZpZy5zaWxlbnQgPSAoVE5TX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKVxuXG5cbm5ldyBWdWUoe1xuICBzdG9yZSxcbiAgcmVuZGVyOiBoID0+IGgoJ2ZyYW1lJywgW2goQXBwKV0pXG59KS4kc3RhcnQoKSIsIm1vZHVsZS5leHBvcnRzID0ge1widHlwZVwiOlwic3R5bGVzaGVldFwiLFwic3R5bGVzaGVldFwiOntcInJ1bGVzXCI6W3tcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5mYWJcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LWZhbWlseVwiLFwidmFsdWVcIjpcIlxcXCJGb250IEF3ZXNvbWUgNSBCcmFuZHNcXFwiLCBcXFwiZmEtYnJhbmRzLTQwMFxcXCJcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LXdlaWdodFwiLFwidmFsdWVcIjpcIjQwMFwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5mYXNcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LWZhbWlseVwiLFwidmFsdWVcIjpcIlxcXCJGb250IEF3ZXNvbWUgNSBGcmVlXFxcIiwgXFxcImZhLXNvbGlkLTkwMFxcXCJcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LXdlaWdodFwiLFwidmFsdWVcIjpcIjkwMFwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5mYXJcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LWZhbWlseVwiLFwidmFsdWVcIjpcIlxcXCJGb250IEF3ZXNvbWUgNSBGcmVlXFxcIiwgXFxcImZhLXJlZ3VsYXItNDAwXFxcIlwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtd2VpZ2h0XCIsXCJ2YWx1ZVwiOlwiNDAwXCJ9XX0se1widHlwZVwiOlwia2V5ZnJhbWVzXCIsXCJuYW1lXCI6XCJlbXB0eVwiLFwia2V5ZnJhbWVzXCI6W119LHtcInR5cGVcIjpcImNvbW1lbnRcIixcImNvbW1lbnRcIjpcIiBGb3JtcyBcIn0se1widHlwZVwiOlwiY29tbWVudFwiLFwiY29tbWVudFwiOlwiKlxcbiAqIEJsdWUgdmFyaWFibGUgb3ZlcnJpZGVzXFxuICpcIn0se1widHlwZVwiOlwia2V5ZnJhbWVzXCIsXCJuYW1lXCI6XCJleGFtcGxlXCIsXCJrZXlmcmFtZXNcIjpbe1widHlwZVwiOlwia2V5ZnJhbWVcIixcInZhbHVlc1wiOltcImZyb21cIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJ0cmFuc2Zvcm1cIixcInZhbHVlXCI6XCJ0cmFuc2xhdGUoNDAwLCAwKVwifV19LHtcInR5cGVcIjpcImtleWZyYW1lXCIsXCJ2YWx1ZXNcIjpbXCJ0b1wiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInRyYW5zZm9ybVwiLFwidmFsdWVcIjpcInRyYW5zbGF0ZSgwLCAwKVwifV19XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiR3JpZExheW91dFwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInBhZGRpbmdcIixcInZhbHVlXCI6XCIxNFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInBhZGRpbmctYm90dG9tXCIsXCJ2YWx1ZVwiOlwiMFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJhY2tncm91bmRcIixcInZhbHVlXCI6XCJsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHdoaXRlIDAlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNikgNDYlLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTcpIDk1JSwgcmdiYSgyNTUsIDI0NiwgMCwgMC4xMykgMTAwJSlcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCJQYWdlXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiY29sb3JcIixcInZhbHVlXCI6XCJkZWVwcGlua1wifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJhY2tncm91bmQtY29sb3JcIixcInZhbHVlXCI6XCJ3aGl0ZVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtZmFtaWx5XCIsXCJ2YWx1ZVwiOlwiQXZlbmlyXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiQWN0aW9uQmFyXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZC1jb2xvclwiLFwidmFsdWVcIjpcIndoaXRlXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiY29sb3JcIixcInZhbHVlXCI6XCJkZWVwcGlua1wifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtZmFtaWx5XCIsXCJ2YWx1ZVwiOlwiQXZlbmlyXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiUHJvZ3Jlc3NcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJjb2xvclwiLFwidmFsdWVcIjpcImxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI2ZlZmNlYSAwJSwgI2YxZGEzNiAxMDAlKVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJhY2tncm91bmQtY29sb3JcIixcInZhbHVlXCI6XCJibGFja1wifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInRyYW5zZm9ybVwiLFwidmFsdWVcIjpcInNjYWxlWSg0KVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcIm1hcmdpbi10b3BcIixcInZhbHVlXCI6XCI0MFwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIkJ1dHRvblwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImNvbG9yXCIsXCJ2YWx1ZVwiOlwiZGVlcHBpbmtcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LXNpemVcIixcInZhbHVlXCI6XCIxOFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInBhZGRpbmdcIixcInZhbHVlXCI6XCIxMlwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJhY2tncm91bmRcIixcInZhbHVlXCI6XCJ3aGl0ZVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcIm1hcmdpblwiLFwidmFsdWVcIjpcIjRcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJib3JkZXItcmFkaXVzXCIsXCJ2YWx1ZVwiOlwiOFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJvcmRlci13aWR0aFwiLFwidmFsdWVcIjpcIjJcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJib3JkZXItY29sb3JcIixcInZhbHVlXCI6XCJwaW5rXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLmIteWVsbG93XCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZC1jb2xvclwiLFwidmFsdWVcIjpcInJlZFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJhY2tncm91bmQtY29sb3JcIixcInZhbHVlXCI6XCJyZ2JhKDI1NSwgMjQ2LCAwLCAwLjIyKVwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIkltYWdlXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwib3BhY2l0eVwiLFwidmFsdWVcIjpcIjAuMzVcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCJMYWJlbFwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImNvbG9yXCIsXCJ2YWx1ZVwiOlwiZGVlcHBpbmtcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCJMaXN0Vmlld1wiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJhY2tncm91bmRcIixcInZhbHVlXCI6XCJ3aGl0ZVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInBhZGRpbmdcIixcInZhbHVlXCI6XCIyXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYW5pbWF0aW9uLW5hbWVcIixcInZhbHVlXCI6XCJleGFtcGxlXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYW5pbWF0aW9uLWR1cmF0aW9uXCIsXCJ2YWx1ZVwiOlwiMC41XCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvblwiLFwidmFsdWVcIjpcImN1YmljLWJlemllcigwLjEsIDAuMSwgMC4xLCAxKVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImFuaW1hdGlvbi1maWxsLW1vZGVcIixcInZhbHVlXCI6XCJmb3J3YXJkc1wifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5sdi1sYWJcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJjb2xvclwiLFwidmFsdWVcIjpcImRlZXBwaW5rXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwidGV4dC1hbGlnblwiLFwidmFsdWVcIjpcImxlZnRcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LXNpemVcIixcInZhbHVlXCI6XCIxMlwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInBhZGRpbmdcIixcInZhbHVlXCI6XCI5XCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZFwiLFwidmFsdWVcIjpcIndoaXRlXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYm9yZGVyLXJhZGl1c1wiLFwidmFsdWVcIjpcIjRcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJib3JkZXItd2lkdGhcIixcInZhbHVlXCI6XCIyXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYm9yZGVyLXRvcC13aWR0aFwiLFwidmFsdWVcIjpcIjBcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJib3JkZXItY29sb3JcIixcInZhbHVlXCI6XCJwaW5rXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwibWFyZ2luLWJvdHRvbVwiLFwidmFsdWVcIjpcIjJcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCIuc3BlZWRMYWJlbFwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInRleHQtYWxpZ25cIixcInZhbHVlXCI6XCJjZW50ZXJcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LXNpemVcIixcInZhbHVlXCI6XCIxMFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInBhZGRpbmctYm90dG9tXCIsXCJ2YWx1ZVwiOlwiMjBcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCIudm9sdW1lTGFiZWxcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJ0ZXh0LWFsaWduXCIsXCJ2YWx1ZVwiOlwiY2VudGVyXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1zaXplXCIsXCJ2YWx1ZVwiOlwiMTBcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJwYWRkaW5nLWJvdHRvbVwiLFwidmFsdWVcIjpcIjIwXCJ9XX0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLm11c2ljSW5mb1wiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImNvbG9yXCIsXCJ2YWx1ZVwiOlwiZGVlcHBpbmtcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LXNpemVcIixcInZhbHVlXCI6XCIxOFwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInRleHQtYWxpZ25cIixcInZhbHVlXCI6XCJjZW50ZXJcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCIudm9sdW1lU2xpZGVyXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiY29sb3JcIixcInZhbHVlXCI6XCJkZWVwcGlua1wifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcIndpZHRoXCIsXCJ2YWx1ZVwiOlwiODAlXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwidGV4dC1hbGlnblwiLFwidmFsdWVcIjpcImNlbnRlclwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJhY2tncm91bmRcIixcInZhbHVlXCI6XCJibGFja1wifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcInRyYW5zZm9ybVwiLFwidmFsdWVcIjpcInNjYWxlKDAuNilcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCIuc3BlZWRTbGlkZXJcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJjb2xvclwiLFwidmFsdWVcIjpcImRlZXBwaW5rXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwid2lkdGhcIixcInZhbHVlXCI6XCI4MCVcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJ0ZXh0LWFsaWduXCIsXCJ2YWx1ZVwiOlwiY2VudGVyXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZFwiLFwidmFsdWVcIjpcImJsYWNrXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwidHJhbnNmb3JtXCIsXCJ2YWx1ZVwiOlwic2NhbGUoMC42KVwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5jb3B5UmlnaHRzXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiY29sb3JcIixcInZhbHVlXCI6XCJwaW5rXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwidGV4dC1hbGlnblwiLFwidmFsdWVcIjpcImNlbnRlclwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtc2l6ZVwiLFwidmFsdWVcIjpcIjhcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCIuY292ZXJJbmZvXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiY29sb3JcIixcInZhbHVlXCI6XCJwaW5rXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwidGV4dC1hbGlnblwiLFwidmFsdWVcIjpcImNlbnRlclwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtc2l6ZVwiLFwidmFsdWVcIjpcIjI4XCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiY29sb3JcIixcInZhbHVlXCI6XCJkZWVwcGlua1wifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5tdXNpY1Byb2dyZXNzXCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiY29sb3JcIixcInZhbHVlXCI6XCJncmVlblwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcIndpZHRoXCIsXCJ2YWx1ZVwiOlwiNzAlXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwidGV4dC1hbGlnblwiLFwidmFsdWVcIjpcImNlbnRlclwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJhY2tncm91bmRcIixcInZhbHVlXCI6XCJwaW5rXCJ9XX1dLFwicGFyc2luZ0Vycm9yc1wiOltdfX07O1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6ICdzdHlsZScsIHBhdGg6ICcuL2FwcC5zY3NzJyB9KTtcbiAgICAgICAgfSlcbiAgICB9XG4iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0FwcC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NDViYTVlZDQmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiL1VzZXJzL21pc2lhay9EZXNrdG9wLzIwMjEvbmF0aXZlc2NyaXB0LW11c2FwcC1kZW1vL25vZGVfbW9kdWxlcy92dWUtaG90LXJlbG9hZC1hcGkvZGlzdC9pbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzQ1YmE1ZWQ0JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzQ1YmE1ZWQ0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzQ1YmE1ZWQ0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9BcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTQ1YmE1ZWQ0JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzQ1YmE1ZWQ0Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJjb21wb25lbnRzL0FwcC52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXBwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD00NWJhNWVkNCZcIiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCBWdWV4IGZyb20gJ3Z1ZXgnO1xuXG5WdWUudXNlKFZ1ZXgpO1xuXG5leHBvcnQgZGVmYXVsdCBuZXcgVnVleC5TdG9yZSh7XG4gIHN0YXRlOiB7XG5cbiAgfSxcbiAgbXV0YXRpb25zOiB7XG5cbiAgfSxcbiAgYWN0aW9uczoge1xuXG4gIH1cbn0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwifi9wYWNrYWdlLmpzb25cIik7Il0sInNvdXJjZVJvb3QiOiIifQ==