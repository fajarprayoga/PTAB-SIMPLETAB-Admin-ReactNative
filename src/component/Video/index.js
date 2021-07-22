import React, { useState, useRef } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from "react-native";
import Video from "react-native-video";
import MediaControls, {
  PLAYER_STATES,
} from "react-native-media-controls";



const VideoPlayer = (props) => {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [opacity,setOpacity] = useState()
  const video = props.src;
  const onSeek = (seek) => {
    videoPlayer?.current.seek(seek);
  };

  const onPaused = (playerState) => {
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    console.log('onReplay');
    videoPlayer?.current.seek(0);
  };

  const onProgress = (data) => {
    // Video Player will continue progress even if the video already ended
    if (!isLoading) {
      setCurrentTime(data.currentTime);
      // console.log('onProgress');
      setOpacity(0)
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
   
   if(props.onLoad){
    props.onLoad();
   }
    // console.log(props.onLoad());
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    // Uncomment this line if you choose repeat=false in the video player
    // setPlayerState(PLAYER_STATES.ENDED);
  };

  const onBuffer = ({isBuffering}) => {
    setOpacity(isBuffering ? 1 : 0)
}

  const onSeeking = (currentTime) => setCurrentTime(currentTime);

  return (
    <View style={styles.container}>
      <Video
        onEnd={onEnd}
        onLoad={(item) => {onLoad(item)}}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={(ref) => (videoPlayer.current = ref)}
        resizeMode="cover"
        source={video}
        repeat
        style={styles.mediaPlayer()}
        volume={0.0}
        // hideShutterView = {true}
      />
       <ActivityIndicator
                animating
                size="large"
                color='blue'
                style={[styles.activityIndicator, {opacity: opacity}]}
            />
      <MediaControls
        isFullScreen={isFullScreen}
        onFullScreen={props.onFullScreen}
        duration={duration}
        isLoading={isLoading}
        mainColor={"#0C5CBF"}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        poster = "https://somesite/thumb.png"
        onBuffer={onBuffer}
      >
      </MediaControls>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
    // position : 'absolute',
  },
  activityIndicator: {
    position: 'absolute',
    top: 70,
    left: 70,
    right: 70,
    height: 50,
},

//   toolbar: {
//     marginTop: 30,
//     backgroundColor: "white",
//     padding: 10,
//     borderRadius: 5,
//   },
  mediaPlayer: () => ({
    width: '100%',
    // backgroundColor : 'black',
    height : '100%',
    
  }),
});

export default VideoPlayer;