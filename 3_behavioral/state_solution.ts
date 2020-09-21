// extract the state
abstract class VideoState {
  protected videoPlayer: VideoPlayer;

  setContext(context: VideoPlayer) {
    this.videoPlayer = context;
    this.init();
  }

  abstract init(): void;
  abstract play(): void;
  abstract stop(): void;
}

class VideoPlayer {
   private state: VideoState;

   isPlaying: boolean;
   position:number;

   constructor(initialState: VideoState) {
     this.setState(initialState);
   }

   setState(state: VideoState) {
     this.state = state;
     this.state.setContext(this);
   }

   play() {
     this.state.play();
   }

   stop(){
     this.state.stop();
   }
}

// states
class Ready extends VideoState {
  init(): void {
    this.videoPlayer.position = 0;
    this.videoPlayer.isPlaying = false;
  }

  play(): void {
    console.log('Start playing');
    this.videoPlayer.setState(new Playing());
  }

  stop(): void {
    console.log('not playing yet')
  }
}

class Playing extends VideoState {
  init(): void {
    this.videoPlayer.isPlaying = true;
  }

  play(): void {
    console.log('already playing');
  }

  stop(): void {
    console.log('Stop music');
    this.videoPlayer.setState(new Paused());
  }
}

class Paused extends VideoState {
  init(): void {
    this.videoPlayer.isPlaying = false;
  }

  play(): void {
    console.log('continue playing');
  }

  stop(): void {
    console.log('rewind to starting position')
    this.videoPlayer.setState(new Ready());
  }
}

const player = new VideoPlayer(new Ready());
player.play()
player.play()
player.play()

