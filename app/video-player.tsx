import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { VideoView, useVideoPlayer } from 'expo-video';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default function VideoPlayerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const videoRef = useRef<VideoView>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [orientation, setOrientation] = useState('portrait');
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);

  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const hideControlsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressBarWidth = useRef(0);

  const player = useVideoPlayer(require('@/assets/videos/workout.mp4'), (player) => {
    player.loop = true;
    player.muted = false;
  });

  useEffect(() => {
    if (showControls) {
      hideControlsTimeout.current = setTimeout(() => {
        hideControls();
      }, 3000);
    }
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, [showControls, isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (player.playing) {
        setCurrentTime(player.currentTime || 0);
        setDuration(player.duration || 0);
        setIsPlaying(player.playing);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player]);

  const showControlsAnimated = () => {
    setShowControls(true);
    Animated.timing(controlsOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const hideControls = () => {
    if (isPlaying) {
      Animated.timing(controlsOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setShowControls(false);
      });
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleBack = () => {
    player.pause();
    router.back();
  };

  const toggleControls = () => {
    if (showControls) {
      hideControls();
    } else {
      showControlsAnimated();
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (position: number) => {
    const seekTime = (position / 100) * duration;
    player.currentTime = seekTime;
  };

  const toggleMute = () => {
    player.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    player.playbackRate = newRate;
    setPlaybackRate(newRate);
  };

  const toggleFullscreen = () => {
    const newFullscreen = !isFullscreen;
    setIsFullscreen(newFullscreen);
    setOrientation(newFullscreen ? 'landscape' : 'portrait');
  };

  const onProgressBarLayout = (event: any) => {
    progressBarWidth.current = event.nativeEvent.layout.width;
  };

  const onProgressBarGesture = (event: any) => {
    const { translationX, state } = event.nativeEvent;
    
    if (state === 1) {
      setIsDragging(true);
      showControlsAnimated();
    } else if (state === 2) {
      const progressBarWidthValue = progressBarWidth.current;
      if (progressBarWidthValue > 0) {
        const newPosition = Math.max(0, Math.min(1, (translationX + dragPosition) / progressBarWidthValue));
        setDragPosition(newPosition * progressBarWidthValue);
      }
    } else if (state === 5) { // END
      const progressBarWidthValue = progressBarWidth.current;
      if (progressBarWidthValue > 0) {
        const newPosition = Math.max(0, Math.min(1, (translationX + dragPosition) / progressBarWidthValue));
        const seekTime = newPosition * duration;
        player.currentTime = seekTime;
        setCurrentTime(seekTime);
        setDragPosition(newPosition * progressBarWidthValue);
      }
      setIsDragging(false);
    }
  };

  const onProgressBarPress = (event: any) => {
    const { locationX } = event.nativeEvent;
    const progressBarWidthValue = progressBarWidth.current;
    
    if (progressBarWidthValue > 0) {
      const newPosition = locationX / progressBarWidthValue;
      const seekTime = newPosition * duration;
      player.currentTime = seekTime;
      setCurrentTime(seekTime);
      setDragPosition(locationX);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={[
          styles.videoContainer, 
          isFullscreen ? styles.fullscreenContainer : styles.portraitContainer
        ]}>
        <VideoView
          ref={videoRef}
          style={[
            styles.video, 
            isFullscreen ? styles.landscapeVideo : styles.portraitVideo
          ]}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          nativeControls={false}
        />
        
        <TouchableOpacity 
          style={styles.videoOverlay} 
          onPress={toggleControls}
          activeOpacity={1}
        >
          {!isPlaying && (
            <View style={styles.centerPlayButton}>
              <TouchableOpacity onPress={togglePlayPause} style={styles.bigPlayButton}>
                <Ionicons name="play" size={60} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}

          <Animated.View 
            style={[
              styles.controlsOverlay,
              { opacity: showControls ? controlsOpacity : 0 }
            ]}
            pointerEvents={showControls ? 'auto' : 'none'}
          >
            <View style={styles.topBar}>
              <TouchableOpacity onPress={handleBack} style={styles.topButton}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.videoTitle}>Workout Session</Text>
              <View style={styles.placeholder} />
            </View>

            <View style={styles.bottomBar}>
              <View style={styles.progressContainer}>
                <PanGestureHandler onHandlerStateChange={onProgressBarGesture}>
                  <View style={styles.progressBarWrapper}>
                    <TouchableOpacity 
                      style={styles.progressBar}
                      onPress={onProgressBarPress}
                      onLayout={onProgressBarLayout}
                      activeOpacity={1}
                    >
                      <View 
                        style={[
                          styles.progressFill, 
                          { 
                            width: isDragging 
                              ? `${(dragPosition / progressBarWidth.current) * 100}%`
                              : `${duration > 0 ? (currentTime / duration) * 100 : 0}%` 
                          }
                        ]} 
                      />
                      <View 
                        style={[
                          styles.progressThumb,
                          { 
                            left: isDragging 
                              ? `${(dragPosition / progressBarWidth.current) * 100}%`
                              : `${duration > 0 ? (currentTime / duration) * 100 : 0}%` 
                          }
                        ]} 
                      />
                    </TouchableOpacity>
                  </View>
                </PanGestureHandler>
              </View>

              {/* Control Buttons */}
              <View style={styles.controlButtons}>
                <View style={styles.leftControls}>
                  <TouchableOpacity onPress={togglePlayPause} style={styles.controlButton}>
                    <Ionicons 
                      name={isPlaying ? "pause" : "play"} 
                      size={24} 
                      color="#FFFFFF" 
                    />
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={toggleMute} style={styles.controlButton}>
                    <Ionicons 
                      name={isMuted ? "volume-mute" : "volume-high"} 
                      size={24} 
                      color="#FFFFFF" 
                    />
                  </TouchableOpacity>
                  
                  <Text style={styles.timeDisplay}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </Text>
                </View>

                <View style={styles.rightControls}>
                  <TouchableOpacity onPress={changePlaybackRate} style={styles.controlButton}>
                    <Text style={styles.rateButtonText}>{playbackRate}x</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={toggleFullscreen} style={styles.controlButton}>
                    <Ionicons 
                      name={isFullscreen ? "contract" : "expand"} 
                      size={24} 
                      color="#FFFFFF" 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  portraitContainer: {
    paddingVertical: 20,
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    backgroundColor: '#000000',
  },
  portraitVideo: {
    width: width * 0.9,
    height: (width * 0.9) * (9/16), // 16:9 aspect ratio
    maxHeight: height * 0.6,
  },
  landscapeVideo: {
    width: height,
    height: width,
    transform: [{ rotate: '90deg' }],
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerPlayButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  bigPlayButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 35,
    paddingBottom: 0,
  },
  topButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  placeholder: {
    width: 40,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBarWrapper: {
    height: 20,
    justifyContent: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    position: 'relative',
    justifyContent: 'center',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF0000',
    borderRadius: 3,
  },
  progressThumb: {
    position: 'absolute',
    top: -6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FF0000',
    marginLeft: -9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeDisplay: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    minWidth: 80,
    textAlign: 'center',
  },
  rateButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
