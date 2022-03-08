import { createContext, useContext, useEffect, useRef, useState } from 'react';
// import { scanImageData } from 'zbar.wasm';
import { useUserMedia } from '../hooks/user-media';
import styles from './Barcode.module.css';

const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: 'environment' },
};

const ComponentContext = createContext({});

export default function Barcode() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const contentRef = useRef(null);
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [interval, setIntervalVariable] = useState(null);
  useEffect(() => {
    if (!videoRef) return;

    setTimeout(() => {
      const width = videoRef.current.offsetWidth;
      const height = videoRef.current.offsetHeight;
      setVideoWidth(width);
      setVideoHeight(height);
    }, 1000);
  }, [videoRef, videoRef?.current?.height]);

  const onClick = () => {
    if (!videoRef.current) {
      return;
    }
    // If it was scanning then i stop
    if (isScanning && interval) {
      clearInterval(interval);
      setIsScanning(false);
      return;
    }

    // If it wasn't scanning i start now
    setIntervalVariable(
      setInterval(() => {
        const context = canvasRef.current.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
        setIsScanning(true);
      }, 100),
    );
  };

  return (
    <ComponentContext.Provider
      value={{
        videoRef,
        canvasRef,
        contentRef,
        videoWidth,
        videoHeight,
        setVideoHeight,
        setVideoWidth,
      }}
    >
      <div className={styles.container}>
        <div className={styles.scanner}>
          <Content />

          <footer>
            <button type="button" onClick={onClick}>
              Stop
            </button>
          </footer>
        </div>
      </div>
    </ComponentContext.Provider>
  );
}

function Content() {
  const { contentRef } = useContext(ComponentContext);
  return (
    <div ref={contentRef} className={styles.content}>
      <Camera />
      <Canvas />
    </div>
  );
}

function Camera() {
  const { videoRef } = useContext(ComponentContext);
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function handleCanPlay() {
    videoRef.current.play();
  }

  return (
    <video
      ref={videoRef}
      onCanPlay={handleCanPlay}
      autoPlay
      playsInline
      muted
    />
  );
}

function Canvas() {
  const { canvasRef, videoWidth, videoHeight } = useContext(ComponentContext);
  return <canvas height={videoHeight} width={videoWidth} ref={canvasRef} />;
}
