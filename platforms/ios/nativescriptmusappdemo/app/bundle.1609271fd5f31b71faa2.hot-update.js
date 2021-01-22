webpackHotUpdate("bundle",{

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
      this.player.volume = 100; //this.currentVolume*0.01;
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

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9BcHAudnVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW9EQTs7QUFFQSw2RixDQUNBOzs7QUFFQSwwRixDQUNBOzs7QUFFQTs7QUFFQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0EscUVBREE7QUFFQSxzQ0FGQTtBQUdBLHFCQUhBO0FBSUEsdUJBSkE7QUFLQSxxQkFMQTtBQU1BLHVCQU5BO0FBT0Esd0JBUEE7QUFRQSx1QkFSQTtBQVNBLGlDQVRBO0FBVUEsNEJBVkE7QUFXQSx1QkFYQTtBQVlBLHdCQVpBO0FBY0Esd0NBZEE7QUFlQTtBQUFBO0FBQUEsT0FmQTtBQWdCQSx3QkFoQkE7QUFrQkE7QUFDQSx1REFEQTtBQUVBLGtCQUZBO0FBR0E7QUFDQTtBQUNBLFNBTEE7QUFNQTtBQUNBO0FBQ0EsU0FSQTtBQVNBO0FBQ0E7QUFDQTtBQVhBLE9BbEJBO0FBZ0NBLGtCQWhDQTtBQWtDQSxvQkFDQTtBQUFBO0FBQUE7QUFBQSxPQURBLEVBRUE7QUFBQTtBQUFBO0FBQUEsT0FGQSxFQUdBO0FBQUE7QUFBQTtBQUFBLE9BSEEsQ0FsQ0E7QUF3Q0EscUJBeENBO0FBMENBLGtDQTFDQTtBQTJDQSx1QkEzQ0E7QUE2Q0Esb0JBN0NBLENBK0NBO0FBQ0E7O0FBaERBO0FBbURBLEdBdERBOztBQXdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBSUEsS0FMQSxHQU9BO0FBQ0E7QUFDQSxLQUZBLEVBRUEsRUFGQSxDQVBBO0FBVUE7QUFFQSxHQTVFQTtBQStFQTtBQUVBO0FBQ0E7QUFDQSw2Q0FEQTtBQUVBLGtEQUZBO0FBR0E7QUFIQSxTQUlBLElBSkEsQ0FJQTtBQUNBO0FBQ0EsT0FOQTtBQU9BLEtBVkE7O0FBWUE7QUFDQTtBQUFBO0FBQUE7QUFDQSxLQWRBOztBQWdCQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTs7QUFDQSxvREFmQSxDQWlCQTs7QUFFQSxrQ0FuQkEsQ0FxQkE7QUFFQTtBQUNBO0FBRUE7QUFHQSxLQTdDQTs7QUErQ0E7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsT0FGQSxNQUVBO0FBQ0E7QUFDQTtBQUVBLEtBekRBOztBQTJEQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBRUEsS0FwRUE7O0FBc0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQ0EsSUFEQSxDQUNBO0FBQ0E7QUFDQTtBQUNBLE9BSkEsRUFJQSxLQUpBLENBSUE7QUFDQTtBQUNBLE9BTkE7QUFRQSxLQWxGQTs7QUFvRkE7QUFDQTtBQUNBLDJCQUNBLElBREEsQ0FDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FIQSxDQUlBO0FBQ0EsT0FOQSxFQU9BLEtBUEEsQ0FPQTtBQUNBO0FBQ0E7QUFDQSxPQVZBO0FBV0EsS0FqR0E7O0FBbUdBO0FBRUE7QUFDQTtBQUNBLGdHQUpBLENBS0E7O0FBRUE7QUFDQSxLQTNHQTs7QUE2R0E7QUFDQTtBQUNBLEtBL0dBOztBQWlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUpBLENBSUE7QUFDQSxLQXRIQTs7QUF3SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBN0hBOztBQWdJQTtBQUVBO0FBQ0E7QUFDQTs7QUFFQSx3RUFFQSw2Q0FDQSxJQURBLENBQ0E7QUFDQTtBQUNBLE9BSEEsRUFJQSxLQUpBLENBSUE7QUFDQTtBQUNBO0FBQ0EsT0FQQSxDQUZBO0FBV0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUEsT0FSQTtBQVVBO0FBQ0E7QUFFQSxLQTlKQTs7QUFnS0E7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFFQSxtREFDQSxJQURBLENBQ0E7QUFDQTtBQUNBLE9BSEEsRUFJQSxLQUpBLENBSUE7QUFDQTtBQUNBO0FBQ0EsT0FQQTtBQVNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBLE9BUkE7QUFVQSxLQTNMQTs7QUE2TEE7QUFFQSwwQ0FDQSxJQURBLENBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FKQSxFQUtBLEtBTEEsQ0FLQTtBQUNBO0FBQ0EsT0FQQTtBQVlBLEtBM01BOztBQTZNQTtBQUdBO0FBRUE7QUFFQTtBQUVBLDRCQUNBLElBREEsQ0FDQTtBQUNBO0FBQ0EsU0FIQSxFQUlBLEtBSkEsQ0FJQTtBQUNBO0FBQ0EsU0FOQTtBQU9BLE9BYkEsTUFhQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUEsS0F0T0E7O0FBd09BO0FBRUE7QUFFQTtBQUdBLEtBL09BOztBQWlQQTtBQUNBLHNDQURBLENBQ0E7O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7O0FBQ0E7QUFBQTtBQUFBOztBQUNBO0FBQ0E7O0FBM1BBO0FBL0VBLEciLCJmaWxlIjoiYnVuZGxlLjE2MDkyNzFmZDVmMzFiNzFmYWEyLmhvdC11cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPFBhZ2U+XG4gICAgICAgXG5cdDxBY3Rpb25CYXIgdGl0bGU9XCJEYW1zdHJpbiBTaGFycCBNdXNpY1wiLz5cbiAgXG5cdDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqLCosKlwiIHJvd3M9XCIqLCosMzAsNjAsNTAsNTAsNTBcIj5cblx0XG5cdFxuXHRcblxuXHRcdDxJbWFnZSB2LWJpbmQ6c3R5bGU9XCJyb3RhdGVNZSgtMTApXCIgcm93PVwiMFwiIGNvbD1cIjBcIiBjb2xTcGFuPVwiM1wiIHJvd1NwYW49XCIyXCIgc3JjPVwifi9hc3NldHMvaW1hZ2VzL1ByYW5hMS1JY29uMS5wbmdcIi8+XG5cdFx0PEltYWdlIHYtYmluZDpzdHlsZT1cInJvdGF0ZU1lKDUpXCIgcm93PVwiMFwiIGNvbD1cIjBcIiBjb2xTcGFuPVwiM1wiIHJvd1NwYW49XCIyXCIgc3JjPVwifi9hc3NldHMvaW1hZ2VzL1ByYW5hMS1DaXJjbGUtUGlua0JpZy5wbmdcIi8+XG5cblx0XHQ8TGFiZWwgY2xhc3M9J2NvdmVySW5mbycgcm93PVwiMFwiIGNvbD1cIjBcIiBjb2xTcGFuPVwiM1wiIHJvd1NwYW49XCIyXCI+e3tjdXJyZW50U29uZ0R1cmF0aW9uSW5mb319IC8ge3tjdXJyZW50VGltZX19PC9MYWJlbD5cblxuXHRcdDxMYWJlbCByb3c9XCIyXCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgY2xhc3M9XCJzcGVlZExhYmVsXCI+U3BlZWQ8L0xhYmVsPlx0XHRcdFx0XHRcblx0XHQ8U2xpZGVyICBjbGFzcz1cInNwZWVkU2xpZGVyXCIgcm93PVwiMlwiIGNvbD1cIjBcIiBjb2xTcGFuPVwiM1wiIDp2YWx1ZT1cImN1cnJlbnRTcGVlZFwiIEB2YWx1ZUNoYW5nZT1cIm9uU2xpZGVyU3BlZWRDaGFuZ2VkXCIvPlx0XHRcblx0XHRcdFx0XHRcdFxuXHRcdDxMYWJlbCByb3c9XCIzXCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgY2xhc3M9XCJ2b2x1bWVMYWJlbFwiPlZvbHVtZTwvTGFiZWw+XHRcdFx0XHRcdFxuXHRcdDxTbGlkZXIgY2xhc3M9XCJ2b2x1bWVTbGlkZXJcIiByb3c9XCIzXCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgOnZhbHVlPVwiY3VycmVudFZvbHVtZVwiIEB2YWx1ZUNoYW5nZT1cIm9uU2xpZGVyVmFsdWVDaGFuZ2VkXCI+PC9TbGlkZXI+XG5cdFx0XHRcblx0XHQ8TGFiZWwgY2xhc3M9J211c2ljSW5mbycgcm93PVwiMVwiIGNvbD1cIjBcIiBjb2xTcGFuPVwiM1wiIHRleHRXcmFwPVwidHJ1ZVwiPnt7bXVzaWNJbmZvLmluZm99fTwvTGFiZWw+XG5cblx0XHQ8UHJvZ3Jlc3MgcmVmPVwibXlQcm9ncmVzc1wiIHYtYmluZDpzdHlsZT1cInsgY29sb3I6IHByb2dyZXNzRHluQ29sb3IsIHRyYW5zZm9ybTogJ3NjYWxlWSgnK3Byb2dyZXNzU2NhbGVZKycpJyB9XCIgY2xhc3M9XCJtdXNpY1Byb2dyZXNzXCIgcm93PVwiMVwiIGNvbD1cIjBcIiBjb2xTcGFuPVwiM1wiIDp2YWx1ZT1cImN1cnJlbnRQcm9ncmVzc1wiIEB0YXA9XCJza2lwVG9OZXdUaW1lXCIgLz5cdFxuXG5cdFx0PEJ1dHRvbiBjbGFzcz1cImIteWVsbG93XCIgcm93PVwiNFwiIGNvbD1cIjBcIiByb3dTcGFuPVwiMVwiIEB0YXA9XCJwbGF5TXVzaWMoKVwiPnt7cGxheU1zZ319PC9CdXR0b24+XG5cdFx0PEJ1dHRvbiBjbGFzcz1cImIteWVsbG93XCIgcm93PVwiNFwiIGNvbD1cIjFcIiByb3dTcGFuPVwiMVwiIEB0YXA9XCJwYXVzZU11c2ljKClcIj57e3BhdXNlTXNnfX08L0J1dHRvbj5cblx0XHQ8QnV0dG9uIGNsYXNzPVwiYi15ZWxsb3dcIiByb3c9XCI0XCIgY29sPVwiMlwiIHJvd1NwYW49XCIxXCIgQHRhcD1cInN0b3BNdXNpYygpXCI+e3tzdG9wTXNnfX08L0J1dHRvbj5cblx0XHRcblx0XHQ8QnV0dG9uIGNsYXNzPVwiYi15ZWxsb3dcIiByb3c9XCI1XCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgQHRhcD1cInNob3dBdWRpb0ZpbGVzTGlzdCgpXCI+e3tmaWxlc01zZ319PC9CdXR0b24+XG5cdFx0XHRcdFx0XHRcblx0XHQ8TGlzdFZpZXcgdi1pZj1cInNob3dMaXN0ID09IHRydWVcIiByb3c9XCIwXCIgY29sPVwiMFwiIGNvbFNwYW49XCIzXCIgcm93U3Bhbj1cIjRcIiBmb3I9XCJpdGVtIGluIGxpc3RPZkl0ZW1zXCIgQGl0ZW1UYXA9XCJvbkl0ZW1UYXBcIj5cblx0XHQgIDx2LXRlbXBsYXRlPlxuXHRcdFx0PCEtLSBTaG93cyB0aGUgbGlzdCBpdGVtIGxhYmVsIGluIHRoZSBkZWZhdWx0IGNvbG9yIGFuZCBzdHlsZS4gLS0+XG5cdFx0XHQ8TGFiZWwgY2xhc3M9XCJsdi1sYWJcIiA6dGV4dD1cIml0ZW0uX25hbWVcIiAvPlxuXHRcdCAgPC92LXRlbXBsYXRlPlxuXHRcdDwvTGlzdFZpZXc+XHRcblx0XHRcdFx0XHRcblx0XHQ8TGFiZWwgY2xhc3M9J2NvcHlSaWdodHMnIHJvdz1cIjZcIiBjb2w9XCIwXCIgY29sU3Bhbj1cIjNcIiBAdGFwPVwic2hvd0NyZWRpdHMoKVwiPnt7Y29weVJpZ2h0c0luZm99fTwvTGFiZWw+XG5cblx0XHRcblx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdFx0XG5cdDwvR3JpZExheW91dD5cdFx0XG4gICBcbiAgIFxuICAgIDwvUGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cdFxuICAgIGltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIkBuYXRpdmVzY3JpcHQvY29yZVwiO1xuICAgIC8vaW1wb3J0IHsgZGV2aWNlLCBzY3JlZW4sIGlzQW5kcm9pZCwgaXNJT1MgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xuICBcblx0Y29uc3QgcGxhdGZvcm0gPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiKTtcbiAgICAvL2NvbnN0IHBsYXRmb3JtTW9kdWxlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIilcblx0XG5cdGNvbnN0IGZzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIik7XG5cdC8vY29uc3QgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xuXHRcblx0Y29uc3QgYXVkaW8gPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtYXVkaW8nKTtcblxuXHRjb25zdCBwbGF5ZXJUTlMgPSBuZXcgYXVkaW8uVE5TUGxheWVyKCk7XG5cdHBsYXllclROUy5kZWJ1ZyA9IHRydWU7XG5cdFxuXHRcblx0ZXhwb3J0IGRlZmF1bHQge1xuXHRcdFxuXHRcdGRhdGEoKSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRjb3B5UmlnaHRzSW5mbzogJ0NvcHlyaWdodCAyMDE5LTIwMjEgwqkgU3lsd2VzdGVyIEsuIE1pZWxuaWN6dWsnLFxuXHRcdFx0XHRjb3Zlck1zZzogJ1RoaXMgd2lsbCBiZSBhIGNvdmVyJyxcblx0XHRcdFx0cGxheU1zZzogXCJQbGF5XCIsXG5cdFx0XHRcdHBhdXNlTXNnOiBcIlBhdXNlXCIsXG5cdFx0XHRcdHN0b3BNc2c6IFwiU3RvcFwiLFxuXHRcdFx0XHRmaWxlc01zZzogXCJGaWxlc1wiLFxuXHRcdFx0XHRjdXJyZW50Vm9sdW1lOiAxMDAsXG5cdFx0XHRcdGN1cnJlbnRTcGVlZDogMTAwLFxuXHRcdFx0XHRjdXJyZW50U29uZ0R1cmF0aW9uSW5mbzogJycsXG5cdFx0XHRcdGN1cnJlbnRTb25nRHVyYXRpb246IDAsXG5cdFx0XHRcdHBsYXllcjogcGxheWVyVE5TLFxuICAgICAgICAgICAgICAgIHBsYXRmb3JtOiBwbGF0Zm9ybSxcblxuXHRcdFx0XHRjdXJyZW50VGltZTogcGxheWVyVE5TLmN1cnJlbnRUaW1lLFxuXHRcdFx0XHRtdXNpY0luZm86IHtpbmZvOlwiTm8gaW5mb1wifSxcblx0XHRcdFx0Y3VycmVudFByb2dyZXNzOiAwLFxuXHRcdFx0XHRcblx0XHRcdFx0cGxheWVyT3B0aW9uczoge1xuXHRcdFx0XHRcdGF1ZGlvRmlsZTogJ34vYXNzZXRzL2F1ZGlvL0N6aWxsaW91dF9kcnVtcy5tcDMnLFxuXHRcdFx0XHRcdGxvb3A6IHRydWUsXG5cdFx0XHRcdFx0Y29tcGxldGVDYWxsYmFjazogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnZmluaXNoZWQgcGxheWluZycpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXJyb3JDYWxsYmFjazogZnVuY3Rpb24oZXJyb3JPYmplY3QpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCctLS0tLS0gZXJyb3JDYWxsYmFjaycsIEpTT04uc3RyaW5naWZ5KGVycm9yT2JqZWN0KSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRpbmZvQ2FsbGJhY2s6IGZ1bmN0aW9uKGFyZ3MpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCctLS0tLS0gaW5mb0NhbGxiYWNrJywgSlNPTi5zdHJpbmdpZnkoYXJncykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XG5cdFx0XHRcdGZpbGVMaXN0OiBbXSxcblx0XHRcdFx0XG5cdFx0XHRcdGxpc3RPZkl0ZW1zOiBbXG5cdFx0XHRcdFx0e2lkOjEsIF9uYW1lOiBcIkR1cGFcIn0sXG5cdFx0XHRcdFx0e2lkOjIsIF9uYW1lOiBcIkNpcGFcIn0sXG5cdFx0XHRcdFx0e2lkOjMsIF9uYW1lOiBcIkdvd25vXCJ9LFx0XHRcdFx0XHRcblx0XHRcdFx0XSxcblx0XHRcdFx0XG5cdFx0XHRcdHNob3dMaXN0OiBmYWxzZSxcblx0XHRcdFx0XG5cdFx0XHRcdHByb2dyZXNzRHluQ29sb3I6ICdkZWVwcGluaycsXG5cdFx0XHRcdHByb2dyZXNzU2NhbGVZOiA0LFxuXHRcdFx0XHRcblx0XHRcdFx0aW1hZ2VzVHVybjogODAsXG5cdFx0XHRcdFxuXHRcdFx0XHQvLyBhdWRpbyBmaWxlcyAtIGVudGl0aWVzXG5cdFx0XHRcdC8vX3BhdGgsIF9uYW1lLCBfZXh0ZW5zaW9uXG5cdFx0XHRcdFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0XG4vL1x0XHRjb21wdXRlZDoge1xuLy9cdFx0XHRyb3RhdGVNZShhcmcpIHtcbi8vXHRcdFx0XHRyZXR1cm4geyB0cmFuc2Zvcm06ICdyb3RhdGUoJyArIHRoaXMuaW1hZ2VzVHVybiAqIGFyZyArICd0dXJuKSd9XG4vL1x0XHRcdH1cbi8vXHRcdH0sXHRcdFxuXHRcdFxuXHRcdG1vdW50ZWQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFxuXHRcdFx0dGhpcy4kbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnZW50aXJlIHZpZXcgaGFzIGJlZW4gcmVuZGVyZWQnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgXG5cdFx0XHR9KSxcblx0XHRcdFx0XG5cdFx0XHR0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXHRcdFx0XHQgIHRoaXMudXBkYXRlVGltZXIoKTtcblx0XHRcdFx0fSw2MCk7XG5cdFx0XHR0aGlzLnVwZGF0ZVRpbWVyKCk7XHRcdFx0XHRcblx0XHRcdFxuXHRcdH0sXG5cdFx0XHRcdFxuXHRcdFxuXHRcdG1ldGhvZHM6IHtcblx0XHRcdFxuXHRcdFx0c2hvd0NyZWRpdHMoKSB7XG5cdFx0XHRcdGFsZXJ0KHtcblx0XHRcdFx0ICB0aXRsZTogXCJEYW1zdHJpbjogTXVzaWMgUGxheWVyIHYuMC4xXCIsXG5cdFx0XHRcdCAgbWVzc2FnZTogXCJBdXRob3I6IFN5bHdlc3RlciBLLiBNaWVsbmljenVrXCIsXG5cdFx0XHRcdCAgb2tCdXR0b25UZXh0OiBcIlRoYXQncyBBbWF6aW5nIVwiXG5cdFx0XHRcdH0pLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHQgIGNvbnNvbGUubG9nKFwiQWxlcnQgZGlhbG9nIGNsb3NlZFwiKTtcblx0XHRcdFx0fSk7XHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdHJvdGF0ZU1lKGFyZykge1xuXHRcdFx0XHRyZXR1cm4geyB0cmFuc2Zvcm06ICdyb3RhdGUoJyArIHRoaXMuaW1hZ2VzVHVybiAqIGFyZyArICd0dXJuKSd9XG5cdFx0XHR9LFx0XHRcdFxuXHRcdFx0XG5cdFx0XHRza2lwVG9OZXdUaW1lKGFyZ3MpIHtcblx0XHRcdFxuICAgICAgICAgICAgICAgIGxldCBzY2FsZSA9IHRoaXMucGxhdGZvcm0uU2NyZWVuLm1haW5TY3JlZW4uc2NhbGU7XG4gICAgICAgICAgICAgICAgbGV0IHByb2dyZXNzV2lkdGggPSB0aGlzLiRyZWZzLm15UHJvZ3Jlc3MubmF0aXZlVmlldy5nZXRBY3R1YWxTaXplKCkud2lkdGg7XG4gICAgICAgICAgICAgICAgbGV0IHBvc1ggPSBhcmdzLmdldFgoKSpzY2FsZTtcblx0XHRcdFx0bGV0IHBlcmMgPSAocG9zWC9wcm9ncmVzc1dpZHRoKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3BlcmM6JywgcGVyYylcbiAgICAgICAgICAgICAgXG5cdFx0XHRcdGlmKHBlcmMgPD0gMCkge1xuXHRcdFx0XHRcdHBlcmMgPSAwXG5cdFx0XHRcdH1cblx0XHRcdFx0aWYocGVyYyA+PSAxKSB7XG5cdFx0XHRcdFx0cGVycyA9IDE7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IG5ld1RpbWUgPSAgdGhpcy5jdXJyZW50U29uZ0R1cmF0aW9uICogcGVyYztcblx0XHRcdFx0XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ05ldyB0aW1lOicsIG5ld1RpbWUpO1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wbGF5ZXIuc2Vla1RvKG5ld1RpbWUpO1xuXHRcdFx0XHRcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnc2tpcFRvTmV3VGltZScsIGFyZ3MuZ2V0WCgpKTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gX3NjcmVlbjogPFVJU2NyZWVuOiAweDEwNjkwYWQ3MDsgYm91bmRzID0ge3swLCAwfSwgezQxNCwgODk2fX07IG1vZGUgPSA8VUlTY3JlZW5Nb2RlOiAweDI4MjBmNDNjMDsgc2l6ZSA9IDgyOC4wMDAwMDAgeCAxNzkyLjAwMDAwMD4+XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhhcmdzLmdldFgoKSp0aGlzLnBsYXRmb3JtLlNjcmVlbi5tYWluU2NyZWVuLnNjYWxlLCBwZXJjLCB0aGlzLnBsYXRmb3JtLlNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcywgdGhpcy5wbGF0Zm9ybS5TY3JlZW4ubWFpblNjcmVlbi5zY2FsZSk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy4kcmVmcy5teVByb2dyZXNzLm5hdGl2ZVZpZXcuZ2V0TWVhc3VyZWRXaWR0aCgpLCBhcmdzLmdldFgoKSwgdGhpcy4kcmVmcy5teVByb2dyZXNzLm5hdGl2ZVZpZXcuZ2V0QWN0dWFsU2l6ZSgpLndpZHRoLCB0aGlzLnBsYXRmb3JtLlNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcylcbiAgICAgICAgICAgICAgXG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0c2hvd0F1ZGlvRmlsZXNMaXN0KCkge1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5nZXRBdWRpb0ZpbGVzTGlzdCgpO1xuXHRcdFx0XHRcblx0XHRcdFx0aWYodGhpcy5zaG93TGlzdCA9PSBmYWxzZSkge1xuXHRcdFx0XHRcdHRoaXMuc2hvd0xpc3QgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuc2hvd0xpc3QgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdG9uSXRlbVRhcChlKSB7XG5cdFx0XHRcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnSXRlbSB0YXAnLHRoaXMubGlzdE9mSXRlbXNbZS5pbmRleF0udGV4dClcblx0XHRcdFx0Y29uc29sZS5sb2coJ0l0ZW0gdGFwJywgZSlcblx0XHRcdFx0XG5cdFx0XHRcdGxldCBhdWRpb0ZpbGVOYW1lID0gdGhpcy5saXN0T2ZJdGVtc1tlLmluZGV4XS5fbmFtZTtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucGxheVNlbGVjdGVkTXVzaWMoYXVkaW9GaWxlTmFtZSlcblx0XHRcdFx0XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRyZWFkVGV4dEZyb21GaWxlKHBhdGgpIHtcblx0XHRcdFx0LyogdGhpcyBpcyBob3cgeW91IGdldCBjb250ZW50IG9mIHRleHQgZmlsZSAqL1xuXHRcdFx0XHQvLyBsZXQgcGF0aCA9ICcuL2Fzc2V0cy9kYXRhLzEudHh0JzsgXG5cdFx0XHRcdGxldCBmaWxlID0gZnMua25vd25Gb2xkZXJzLmN1cnJlbnRBcHAoKS5nZXRGaWxlKHBhdGgpO1xuXHRcdFx0XHRmaWxlLnJlYWRUZXh0KClcblx0XHRcdFx0LnRoZW4oKHJlcykgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdmaWxlLnJlYWRUZXh0OicscmVzKVxuXHRcdFx0XHRcdHRoaXMubXVzaWNJbmZvLmluZm8gPSByZXMudG9TdHJpbmcoKTtcblx0XHRcdFx0fSkuY2F0Y2goKGVycikgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdmaWxlLnJlYWRUZXh0OiBlcnIuc3RhY2snLGVyci5zdGFjayk7XG5cdFx0XHRcdH0pO1x0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0Z2V0QXVkaW9GaWxlc0xpc3QoKSB7XG5cdFx0XHRcdGxldCBmb2xkZXIgPSBmcy5rbm93bkZvbGRlcnMuY3VycmVudEFwcCgpLmdldEZvbGRlcihcImFzc2V0cy9hdWRpb1wiKTtcblx0XHRcdFx0Zm9sZGVyLmdldEVudGl0aWVzKClcblx0XHRcdFx0XHQudGhlbigoZW50aXRpZXMpID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKCdlbnRpdGllcycsZW50aXRpZXMpXG5cdFx0XHRcdFx0XHR0aGlzLmZpbGVMaXN0ID0gZW50aXRpZXM7XG5cdFx0XHRcdFx0XHR0aGlzLmxpc3RPZkl0ZW1zID0gdGhpcy5maWxlTGlzdDtcblx0XHRcdFx0XHRcdC8vdGhpcy5tdXNpY0luZm8uaW5mbyA9IEpTT04uc3RyaW5naWZ5KHRoaXMuZmlsZUxpc3QpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmNhdGNoKChlcnIpID0+IHtcblx0XHRcdFx0XHRcdC8vIEZhaWxlZCB0byBvYnRhaW4gZm9sZGVyJ3MgY29udGVudHMuXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygnZ2V0RW50aXRpZXMgY2F0Y2ggZXJyb3I6ICcsZXJyLnN0YWNrKTtcblx0XHRcdFx0XHR9KTtcdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0dXBkYXRlVGltZXIoKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLmN1cnJlbnRTb25nRHVyYXRpb25JbmZvID0gdGhpcy5mb3JtYXRDdXJyZW50VGltZSh0aGlzLmN1cnJlbnRTb25nRHVyYXRpb24pO1xuXHRcdFx0XHR0aGlzLmN1cnJlbnRUaW1lID0gdGhpcy5mb3JtYXRDdXJyZW50VGltZSh0aGlzLnBsYXllci5jdXJyZW50VGltZSk7XG5cdFx0XHRcdHRoaXMuY3VycmVudFByb2dyZXNzID0gMTAwKnRoaXMucGxheWVyLmN1cnJlbnRUaW1lL3BhcnNlSW50KHRoaXMuY3VycmVudFNvbmdEdXJhdGlvbik7XG5cdFx0XHRcdC8vdGhpcy5tdXNpY0luZm8uaW5mbyA9IHRoaXMuY3VycmVudFByb2dyZXNzO1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5pbWFnZXNUdXJuID0gdGhpcy5wbGF5ZXIuY3VycmVudFRpbWU7XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHR1cGRhdGVJbmZvKHN0cikge1xuXHRcdFx0XHR0aGlzLm11c2ljSW5mby5pbmZvID0gc3RyO1xuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0b25TbGlkZXJWYWx1ZUNoYW5nZWQoZSkge1xuLy9cdFx0XHRcdC8vY29uc29sZS5sb2coJ3NsaWRlciB2YWwnLGUudmFsdWUpXG5cdFx0XHRcdHRoaXMuY3VycmVudFZvbHVtZSA9IGUudmFsdWVcblx0XHRcdFx0dGhpcy5tdXNpY0luZm8uaW5mbyA9ICdOZXcgdm9sdW1lOiAnK3BhcnNlSW50KHRoaXMuY3VycmVudFZvbHVtZSkrXCIlXCJcblx0XHRcdFx0dGhpcy5wbGF5ZXIudm9sdW1lID0gMTAwOy8vdGhpcy5jdXJyZW50Vm9sdW1lKjAuMDE7XG5cdFx0XHR9LFxuXHRcdFx0XG5cdFx0XHRvblNsaWRlclNwZWVkQ2hhbmdlZChlKSB7XG4vL1x0XHRcdFx0Ly9jb25zb2xlLmxvZygnc2xpZGVyIHZhbCcsZS52YWx1ZSlcblx0XHRcdFx0dGhpcy5jdXJyZW50U3BlZWQgPSBlLnZhbHVlXG5cdFx0XHRcdHRoaXMubXVzaWNJbmZvLmluZm8gPSAnTmV3IHNwZWVkOiAnK3BhcnNlSW50KHRoaXMuY3VycmVudFNwZWVkLDEwKSsnJSc7XG5cdFx0XHRcdHRoaXMucGxheWVyLmNoYW5nZVBsYXllclNwZWVkKHRoaXMuY3VycmVudFNwZWVkKjAuMDEpO1xuXHRcdFx0fSxcdFx0XHRcblx0XHRcdFxuXHRcdFx0XG5cdFx0XHRwbGF5U2VsZWN0ZWRNdXNpYyhhdWRpb0ZpbGVOYW1lKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRpZih0aGlzLnBsYXllci5pc0F1ZGlvUGxheWluZygpID09IHRydWUpIHtcblx0XHRcdFx0XHR0aGlzLnBsYXllci5kaXNwb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucGxheWVyT3B0aW9ucy5hdWRpb0ZpbGUgPSAnfi9hc3NldHMvYXVkaW8vJythdWRpb0ZpbGVOYW1lLFxuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wbGF5ZXIuaW5pdEZyb21GaWxlKHRoaXMucGxheWVyT3B0aW9ucylcblx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGxheWVyLnBsYXkoKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goKGVycikgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdpbml0RnJvbUZpbGUgZXJyOicsZXJyKVxuXHRcdFx0XHRcdHRoaXMubXVzaWNJbmZvLmluZm8gPSAnUHJvYmxlbSBwbGF5aW5nOiAnK3RoaXMucGxheWVyT3B0aW9ucy5hdWRpb0ZpbGU7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnBsYXllci5nZXRBdWRpb1RyYWNrRHVyYXRpb24oKS50aGVuKChkdXJhdGlvbikgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwic29uZyBkdXJhdGlvbjpcIiwgZHVyYXRpb24pO1xuXHRcdFx0XHRcdHRoaXMuY3VycmVudFNvbmdEdXJhdGlvbiA9IGR1cmF0aW9uO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGxldCBtcDNGaWxlQXJyID0gdGhpcy5wbGF5ZXJPcHRpb25zLmF1ZGlvRmlsZS5zcGxpdCgnLycpO1xuXHRcdFx0XHRcdGxldCBtcDNGaWxlID0gIG1wM0ZpbGVBcnJbbXAzRmlsZUFyci5sZW5ndGgtMV07XG5cdFx0XHRcdFx0dGhpcy5tdXNpY0luZm8uaW5mbyA9ICdQbGF5aW5nOiAnK21wM0ZpbGU7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wbGF5ZXIudm9sdW1lID0gdGhpcy5jdXJyZW50Vm9sdW1lKjAuMDE7XG5cdFx0XHRcdHRoaXMucGxheWVyLmNoYW5nZVBsYXllclNwZWVkKHRoaXMuY3VycmVudFNwZWVkKjAuMDEpO1xuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdHBsYXlNdXNpYygpIHtcblx0XHRcdFx0XG5cdFx0XHRcdGlmKHRoaXMucGxheWVyLmlzQXVkaW9QbGF5aW5nKCkgPT0gdHJ1ZSkge1xuXHRcdFx0XHRcdHRoaXMucGxheWVyLmRpc3Bvc2UoKTtcblx0XHRcdFx0fVx0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0XHRjb25zb2xlLmxvZygncGxheU11c2ljKCknLCB0aGlzLnBsYXllck9wdGlvbnMuYXVkaW9GaWxlKTtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucGxheWVyLmluaXRGcm9tRmlsZSh0aGlzLnBsYXllck9wdGlvbnMpXG5cdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsYXllci5wbGF5KClcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKChlcnIpID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnaW5pdEZyb21GaWxlIGVycjonLGVycilcblx0XHRcdFx0XHR0aGlzLm11c2ljSW5mby5pbmZvID0gJ1Byb2JsZW0gcGxheWluZzogJyt0aGlzLnBsYXllck9wdGlvbnMuYXVkaW9GaWxlO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHRcblx0XHRcdFx0dGhpcy5wbGF5ZXIuZ2V0QXVkaW9UcmFja0R1cmF0aW9uKCkudGhlbigoZHVyYXRpb24pID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInNvbmcgZHVyYXRpb246XCIsIGR1cmF0aW9uKTtcblx0XHRcdFx0XHR0aGlzLmN1cnJlbnRTb25nRHVyYXRpb24gPSBkdXJhdGlvbjtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRsZXQgbXAzRmlsZUFyciA9IHRoaXMucGxheWVyT3B0aW9ucy5hdWRpb0ZpbGUuc3BsaXQoJy8nKTtcblx0XHRcdFx0XHRsZXQgbXAzRmlsZSA9ICBtcDNGaWxlQXJyW21wM0ZpbGVBcnIubGVuZ3RoLTFdO1xuXHRcdFx0XHRcdHRoaXMubXVzaWNJbmZvLmluZm8gPSAnUGxheWluZzogJyttcDNGaWxlO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0Z2V0TXVzaWNEdXJhdGlvbigpIHtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMucGxheWVyLmdldEF1ZGlvVHJhY2tEdXJhdGlvbigpXG5cdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oZHVyYXRpb24pIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZygnLS0tIGR1cmF0aW9uOicsZHVyYXRpb24udG9TdHJpbmcoKSk7XG5cdFx0XHRcdFx0cmV0dXJuIGR1cmF0aW9uLnRvU3RyaW5nKCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdCAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdjYW4gbm90IGNhdGNoIGR1cmF0aW9uLicsIGVycik7XG5cdFx0XHRcdCAgfSk7XHRcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0cGF1c2VNdXNpYyAoKSB7XG5cdFx0XHRcdFxuXHRcdFx0XHRcblx0XHRcdFx0aWYodGhpcy5wbGF5ZXIuaXNBdWRpb1BsYXlpbmcoKSA9PSB0cnVlKSB7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dGhpcy5tdXNpY0luZm8uaW5mbyA9ICdQYXVzaW5nIGF0ICcrdGhpcy5mb3JtYXRDdXJyZW50VGltZSh0aGlzLnBsYXllci5jdXJyZW50VGltZSk7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0dGhpcy5wcm9ncmVzc0R5bkNvbG9yID0gJ3BpbmsnO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHRoaXMucGxheWVyLnBhdXNlKClcblx0XHRcdFx0XHQgIC50aGVuKGZ1bmN0aW9uKHJlcykge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2cocmVzKTtcblx0XHRcdFx0XHQgIH0pXG5cdFx0XHRcdFx0ICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygncGF1c2VNdXNpYywgc29tZXRoaW5nIHdlbnQgd3JvbmcuLi4nLCBlcnIpO1xuXHRcdFx0XHRcdCAgfSk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHRoaXMucHJvZ3Jlc3NEeW5Db2xvciA9ICdob3RwaW5rJztcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR0aGlzLm11c2ljSW5mby5pbmZvID0gJ1Jlc3VtaW5nIGZyb20gJyt0aGlzLmZvcm1hdEN1cnJlbnRUaW1lKHRoaXMucGxheWVyLmN1cnJlbnRUaW1lKTtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHR0aGlzLnBsYXllci5yZXN1bWUoKTtcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdH0sXG5cdFx0XHRcblx0XHRcdHN0b3BNdXNpYygpIHtcblx0XHRcdFx0XG5cdFx0XHRcdHRoaXMubXVzaWNJbmZvLmluZm8gPSAnTXVzaWMgc3RvcHBlZC4nXG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzLnBsYXllci5kaXNwb3NlKCk7XHRcblx0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdFxuXHRcdFx0Zm9ybWF0Q3VycmVudFRpbWUgKHN0cikge1xuXHRcdFx0XHR2YXIgc2VjX251bSA9IHBhcnNlSW50KHN0ciwgMTApOyAvLyBkb24ndCBmb3JnZXQgdGhlIHNlY29uZCBwYXJhbVxuXHRcdFx0XHR2YXIgaG91cnMgICA9IE1hdGguZmxvb3Ioc2VjX251bSAvIDM2MDApO1xuXHRcdFx0XHR2YXIgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY19udW0gLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XG5cdFx0XHRcdHZhciBzZWNvbmRzID0gc2VjX251bSAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XG5cblx0XHRcdFx0aWYgKGhvdXJzICAgPCAxMCkge2hvdXJzICAgPSBcIjBcIitob3Vyczt9XG5cdFx0XHRcdGlmIChtaW51dGVzIDwgMTApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XG5cdFx0XHRcdGlmIChzZWNvbmRzIDwgMTApIHtzZWNvbmRzID0gXCIwXCIrc2Vjb25kczt9XG5cdFx0XHRcdHJldHVybiBob3VycysnOicrbWludXRlcysnOicrc2Vjb25kcztcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0XG5cdFx0fVxuXHRcdFxuXHR9XG5cblxuXG5cbjwvc2NyaXB0PlxuIl0sInNvdXJjZVJvb3QiOiIifQ==