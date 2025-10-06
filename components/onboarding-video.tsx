import { AVPlaybackStatusSuccess, ResizeMode, Video } from 'expo-av';
import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

type PlayDirection = 'none' | 'forward' | 'backward';
type OnboardingVideoProps = {
  segmentIndex: number;
  totalSegments?: number; // defaults to 3 (current flow). Pass 4 if using four steps.
  playDirection?: PlayDirection;
  onDone?: () => void;
};

export default function OnboardingVideo({ segmentIndex, totalSegments = 3, playDirection = 'none', onDone }: OnboardingVideoProps) {
  const videoRef = useRef<Video>(null);
  const [durationMs, setDurationMs] = useState<number | null>(null);
  const segment = useMemo(() => {
    const index = Math.max(1, Math.min(Math.floor(segmentIndex), Math.max(1, totalSegments)));
    const startPct = (index - 1) / totalSegments;
    const endPct = index / totalSegments;
    return { startPct, endPct };
  }, [segmentIndex, totalSegments]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      const ref = videoRef.current;
      if (!ref) return;
      const status = await ref.loadAsync(
        require('@/assets/images/get-started-video.mp4'),
        { shouldPlay: false, isLooping: false },
        false
      );
      if (!isMounted) return;
      if ('durationMillis' in status && status.durationMillis) {
        setDurationMs(status.durationMillis);
        // Smooth progress callbacks
        try { await ref.setProgressUpdateIntervalAsync(50); } catch {}
      }
    };
    load();
    return () => {
      isMounted = false;
      videoRef.current?.unloadAsync().catch(() => {});
    };
  }, []);

  useEffect(() => {
    const ref = videoRef.current;
    if (!ref || !durationMs) return;
    let ended = false;

    const endMs = durationMs * segment.endPct;
    const startMs = Math.floor(durationMs * segment.startPct);
    const previewMs = Math.floor(durationMs * ((segment.startPct + segment.endPct) / 2));
    const prevStartMs = Math.floor(durationMs * Math.max(0, (segmentIndex - 2) / totalSegments));

    const update = (s: AVPlaybackStatusSuccess) => {
      if (!durationMs || ended) return;
      const threshold = endMs - 16;
      if (s.positionMillis >= threshold && playDirection === 'forward') {
        ended = true;
        ref.pauseAsync().catch(() => {});
        ref.setPositionAsync(Math.max(0, Math.floor(endMs))).catch(() => {});
        onDone?.();
      }
    };

    ref.setOnPlaybackStatusUpdate((st: any) => {
      if (!st || !('isLoaded' in st) || !st.isLoaded) return;
      update(st as AVPlaybackStatusSuccess);
    });

    if (playDirection === 'forward') {
      const preroll = Math.max(0, startMs - 30);
      ref.pauseAsync()
        .then(() => ref.setPositionAsync(preroll))
        .then(() => ref.playAsync())
        .catch(() => {});
    } else if (playDirection === 'backward') {
      let raf: number | null = null;
      let lastSet = 0;
      const totalMs = Math.max(400, Math.min(900, startMs - prevStartMs));
      let t0: number | null = null;
      const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);
      const tick = (ts: number) => {
        if (t0 == null) t0 = ts;
        const raw = Math.min(1, (ts - t0) / totalMs);
        const p = easeOutCubic(raw);
        const pos = Math.floor(startMs - (startMs - prevStartMs) * p);
        if (ts - lastSet > 33) {
          ref.setPositionAsync(pos).catch(() => {});
          lastSet = ts;
        }
        if (raw < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          ref.setPositionAsync(prevStartMs).then(() => onDone?.()).catch(() => onDone?.());
        }
      };
      ref.pauseAsync()
        .then(() => ref.setPositionAsync(startMs))
        .then(() => { raf = requestAnimationFrame(tick); })
        .catch(() => {});
      return () => { if (raf) cancelAnimationFrame(raf); };
    } else {
      ref.setPositionAsync(previewMs).catch(() => {});
    }
  }, [playDirection, durationMs, segment.endPct, segment.startPct, segmentIndex, onDone]);

  return (
    <View style={styles.videoWrap} pointerEvents="none">
      <Video
        ref={videoRef}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        isLooping={false}
        shouldPlay={false}
        isMuted
      />
    </View>
  );
}

const styles = StyleSheet.create({
  videoWrap: {
    ...StyleSheet.absoluteFillObject,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
});


