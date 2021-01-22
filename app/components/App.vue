<template>
    <Page>
       
	<ActionBar title="Damstrin Sharp Music"/>
  
	<GridLayout columns="*,*,*" rows="*,*,30,60,50,50,50">
	
	
	

		<Image v-bind:style="rotateMe(-10)" row="0" col="0" colSpan="3" rowSpan="2" src="~/assets/images/Prana1-Icon1.png"/>
		<Image v-bind:style="rotateMe(5)" row="0" col="0" colSpan="3" rowSpan="2" src="~/assets/images/Prana1-Circle-PinkBig.png"/>

		<Label class='coverInfo' row="0" col="0" colSpan="3" rowSpan="2">{{currentSongDurationInfo}} / {{currentTime}}</Label>

		<Label row="2" col="0" colSpan="3" class="speedLabel">Speed</Label>					
		<Slider  class="speedSlider" row="2" col="0" colSpan="3" :value="currentSpeed" @valueChange="onSliderSpeedChanged"/>		
						
		<Label row="3" col="0" colSpan="3" class="volumeLabel">Volume</Label>					
		<Slider class="volumeSlider" row="3" col="0" colSpan="3" :value="currentVolume" @valueChange="onSliderValueChanged"></Slider>
			
		<Label class='musicInfo' row="1" col="0" colSpan="3" textWrap="true">{{musicInfo.info}}</Label>

		<Progress ref="myProgress" v-bind:style="{ color: progressDynColor, transform: 'scaleY('+progressScaleY+')' }" class="musicProgress" row="1" col="0" colSpan="3" :value="currentProgress" @tap="skipToNewTime" />	

		<Button class="b-yellow" row="4" col="0" rowSpan="1" @tap="playMusic()">{{playMsg}}</Button>
		<Button class="b-yellow" row="4" col="1" rowSpan="1" @tap="pauseMusic()">{{pauseMsg}}</Button>
		<Button class="b-yellow" row="4" col="2" rowSpan="1" @tap="stopMusic()">{{stopMsg}}</Button>
		
		<Button class="b-yellow" row="5" col="0" colSpan="3" @tap="showAudioFilesList()">{{filesMsg}}</Button>
						
		<ListView v-if="showList == true" row="0" col="0" colSpan="3" rowSpan="4" for="item in listOfItems" @itemTap="onItemTap">
		  <v-template>
			<!-- Shows the list item label in the default color and style. -->
			<Label class="lv-lab" :text="item._name" />
		  </v-template>
		</ListView>	
					
		<Label class='copyRights' row="6" col="0" colSpan="3" @tap="showCredits()">{{copyRightsInfo}}</Label>

		
				
								
	</GridLayout>		
   
   
    </Page>
</template>

<script>
	
    import { Utils } from "@nativescript/core";
    //import { device, screen, isAndroid, isIOS } from "tns-core-modules/platform";
  
	const platform = require("tns-core-modules/platform");
    //const platformModule = require("tns-core-modules/platform")
	
	const fs = require("tns-core-modules/file-system");
	//const documents = fs.knownFolders.documents();
	
	const audio = require('nativescript-audio');

	const playerTNS = new audio.TNSPlayer();
	playerTNS.debug = true;
	
	
	export default {
		
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
				musicInfo: {info:"No info"},
				currentProgress: 0,
				
				playerOptions: {
					audioFile: '~/assets/audio/Czilliout_drums.mp3',
					loop: true,
					completeCallback: function() {
						console.log('finished playing');
					},
					errorCallback: function(errorObject) {
						console.log('------ errorCallback', JSON.stringify(errorObject));
					},
					infoCallback: function(args) {
						console.log('------ infoCallback', JSON.stringify(args));
					}
				},
				
				fileList: [],
				
				listOfItems: [
					{id:1, _name: "Dupa"},
					{id:2, _name: "Cipa"},
					{id:3, _name: "Gowno"},					
				],
				
				showList: false,
				
				progressDynColor: 'deeppink',
				progressScaleY: 4,
				
				imagesTurn: 80,
				
				// audio files - entities
				//_path, _name, _extension
				
			}
		},
		
//		computed: {
//			rotateMe(arg) {
//				return { transform: 'rotate(' + this.imagesTurn * arg + 'turn)'}
//			}
//		},		
		
		mounted: function () {
			
			this.$nextTick(function () {
				console.log('entire view has been rendered');
                
                
              
			}),
				
			this.interval = setInterval(() => {
				  this.updateTimer();
				},60);
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
				return { transform: 'rotate(' + this.imagesTurn * arg + 'turn)'}
			},			
			
			skipToNewTime(args) {
			
                let scale = this.platform.Screen.mainScreen.scale;
                let progressWidth = this.$refs.myProgress.nativeView.getActualSize().width;
                let posX = args.getX()*scale;
				let perc = (posX/progressWidth);
              
                console.log('perc:', perc)
              
				if(perc <= 0) {
					perc = 0
				}
				if(perc >= 1) {
					pers = 1;
				}
				let newTime =  this.currentSongDuration * perc;
				
				//console.log('New time:', newTime);
				
				this.player.seekTo(newTime);
				
				//console.log('skipToNewTime', args.getX());
              
                // _screen: <UIScreen: 0x10690ad70; bounds = {{0, 0}, {414, 896}}; mode = <UIScreenMode: 0x2820f43c0; size = 828.000000 x 1792.000000>>
                //console.log(args.getX()*this.platform.Screen.mainScreen.scale, perc, this.platform.Screen.mainScreen.widthDIPs, this.platform.Screen.mainScreen.scale);
              
                //console.log(this.$refs.myProgress.nativeView.getMeasuredWidth(), args.getX(), this.$refs.myProgress.nativeView.getActualSize().width, this.platform.Screen.mainScreen.widthDIPs)
              
				
			},
			
			showAudioFilesList() {
				
				this.getAudioFilesList();
				
				if(this.showList == false) {
					this.showList = true;
				} else {
					this.showList = false;
				}
				
			},
			
			onItemTap(e) {
			
				//console.log('Item tap',this.listOfItems[e.index].text)
				console.log('Item tap', e)
				
				let audioFileName = this.listOfItems[e.index]._name;
				
				this.playSelectedMusic(audioFileName)
				
			},
			
			readTextFromFile(path) {
				/* this is how you get content of text file */
				// let path = './assets/data/1.txt'; 
				let file = fs.knownFolders.currentApp().getFile(path);
				file.readText()
				.then((res) => {
					console.log('file.readText:',res)
					this.musicInfo.info = res.toString();
				}).catch((err) => {
					console.log('file.readText: err.stack',err.stack);
				});				
				
			},
			
			getAudioFilesList() {
				let folder = fs.knownFolders.currentApp().getFolder("assets/audio");
				folder.getEntities()
					.then((entities) => {
						console.log('entities',entities)
						this.fileList = entities;
						this.listOfItems = this.fileList;
						//this.musicInfo.info = JSON.stringify(this.fileList);
					})
					.catch((err) => {
						// Failed to obtain folder's contents.
						console.log('getEntities catch error: ',err.stack);
					});				
			},
			
			updateTimer() {
				
				this.currentSongDurationInfo = this.formatCurrentTime(this.currentSongDuration);
				this.currentTime = this.formatCurrentTime(this.player.currentTime);
				this.currentProgress = 100*this.player.currentTime/parseInt(this.currentSongDuration);
				//this.musicInfo.info = this.currentProgress;
				
				this.imagesTurn = this.player.currentTime;
			},
			
			updateInfo(str) {
				this.musicInfo.info = str;
			},
			
			onSliderValueChanged(e) {
//				//console.log('slider val',e.value)
				this.currentVolume = e.value
				this.musicInfo.info = 'New volume: '+parseInt(this.currentVolume)+"%"
				this.player.volume = this.currentVolume*0.01;
			},
			
			onSliderSpeedChanged(e) {
//				//console.log('slider val',e.value)
				this.currentSpeed = e.value
				this.musicInfo.info = 'New speed: '+parseInt(this.currentSpeed,10)+'%';
				this.player.changePlayerSpeed(this.currentSpeed*0.01);
			},			
			
			
			playSelectedMusic(audioFileName) {
				
				if(this.player.isAudioPlaying() == true) {
					this.player.dispose();
				}
				
				this.playerOptions.audioFile = '~/assets/audio/'+audioFileName,
				
				this.player.initFromFile(this.playerOptions)
				.then(() => {
					this.player.play()
				})
				.catch((err) => {
					console.log('initFromFile err:',err)
					this.musicInfo.info = 'Problem playing: '+this.playerOptions.audioFile;
				})
				
				this.player.getAudioTrackDuration().then((duration) => {
					console.log("song duration:", duration);
					this.currentSongDuration = duration;
					
					let mp3FileArr = this.playerOptions.audioFile.split('/');
					let mp3File =  mp3FileArr[mp3FileArr.length-1];
					this.musicInfo.info = 'Playing: '+mp3File;
					
				});
				
				this.player.volume = this.currentVolume*0.01;
				this.player.changePlayerSpeed(this.currentSpeed*0.01);
				
			},
			
			playMusic() {
				
				if(this.player.isAudioPlaying() == true) {
					this.player.dispose();
				}				
				
				console.log('playMusic()', this.playerOptions.audioFile);
				
				this.player.initFromFile(this.playerOptions)
				.then(() => {
					this.player.play()
				})
				.catch((err) => {
					console.log('initFromFile err:',err)
					this.musicInfo.info = 'Problem playing: '+this.playerOptions.audioFile;
				})
				
				this.player.getAudioTrackDuration().then((duration) => {
					console.log("song duration:", duration);
					this.currentSongDuration = duration;
					
					let mp3FileArr = this.playerOptions.audioFile.split('/');
					let mp3File =  mp3FileArr[mp3FileArr.length-1];
					this.musicInfo.info = 'Playing: '+mp3File;
					
				});

			},
			
			getMusicDuration() {
				
				this.player.getAudioTrackDuration()
					.then(function(duration) {
					console.log('--- duration:',duration.toString());
					return duration.toString();
				})
				  .catch(function(err) {
					console.log('can not catch duration.', err);
				  });				
				
				
			
				
			},
			
			pauseMusic () {
				
				
				if(this.player.isAudioPlaying() == true) {
					
					this.musicInfo.info = 'Pausing at '+this.formatCurrentTime(this.player.currentTime);
					
					this.progressDynColor = 'pink';
					
					this.player.pause()
					  .then(function(res) {
						console.log(res);
					  })
					  .catch(function(err) {
						console.log('pauseMusic, something went wrong...', err);
					  });					
				} else {
					
					this.progressDynColor = 'hotpink';
					
					this.musicInfo.info = 'Resuming from '+this.formatCurrentTime(this.player.currentTime);
					
					this.player.resume();			
				}
				
			},
			
			stopMusic() {
				
				this.musicInfo.info = 'Music stopped.'
				
				this.player.dispose();	
				
				
			},
			
			formatCurrentTime (str) {
				var sec_num = parseInt(str, 10); // don't forget the second param
				var hours   = Math.floor(sec_num / 3600);
				var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
				var seconds = sec_num - (hours * 3600) - (minutes * 60);

				if (hours   < 10) {hours   = "0"+hours;}
				if (minutes < 10) {minutes = "0"+minutes;}
				if (seconds < 10) {seconds = "0"+seconds;}
				return hours+':'+minutes+':'+seconds;
			}
			
			
		}
		
	}




</script>
