import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { scanImageData } from 'zbar.wasm';
import { useUserMedia } from '../hooks/user-media';
import styles from './Barcode.module.css';

const CAPTURE_OPTIONS = {
  audio: false,
  video: {
    facingMode: 'environment',
    // facingMode: 'user',
    /* 
    width: { exact: 1080 },
    height: { exact: 720 },
    */
    frameRate: {
      ideal: 60,
      min: 10,
    },
  },
};

const ComponentContext = createContext({});

export default function Barcode({ onFound, onCancel }) {
  const videoRef = useRef();
  const canvasRef = useRef();
  const contentRef = useRef(null);
  const [videoWidth, setVideoWidth] = useState(0);
  const [videoHeight, setVideoHeight] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [interval, setIntervalVariable] = useState(null);

  // When the component is unmount if an interval was set we remove it
  useEffect(
    () => () => {
      if (interval) {
        clearInterval(interval);
      }
      if (videoRef?.current) {
        videoRef.current.stop();
      }
    },
    [],
  );
  useEffect(() => {
    console.log(`I got this function`);
    console.log(scanImageData);
    navigator.mediaDevices.enumerateDevices().then((response) => {
      console.log(`Media devices`);
      console.log(response);
    });
  }, []);
  useEffect(() => {
    if (!videoRef || !videoRef.current) return;

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
    } else {
      const intervl = setInterval(() => {
        if (!canvasRef || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
        const imageData = ctx.getImageData(0, 0, videoWidth, videoHeight);
        scanImageData(imageData)
          .then((res) => {
            if (res.length) {
              const { typeName } = res[0];
              const data = {
                typeName,
                barcode: res[0].decode(),
              };
              console.log(data);
              onFound(data);

              clearInterval(intervl);
              // Clear the rectangle
              // ctx.clearRect(0, 0, videoWidth, videoHeight);
              setIsScanning(false);
            }
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
          });
      }, 10);

      setIntervalVariable(intervl);
      setIsScanning(true);
    }
  };

  const style = {};
  if (videoHeight) {
    style.height = videoHeight;
  }

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
        isScanning,
      }}
    >
      <div className={styles.container}>
        <div className={styles.scanner}>
          <Content />
          <footer>
            <button onClick={onCancel} type="button">
              Cancel
            </button>
            <button type="button" onClick={onClick}>
              {isScanning ? 'Stop' : 'Scan'}
            </button>
          </footer>
        </div>
      </div>
    </ComponentContext.Provider>
  );
}

function Content() {
  const { videoHeight, isScanning } = useContext(ComponentContext);
  const style = {};
  if (videoHeight) {
    style.height = videoHeight;
  }

  const { contentRef } = useContext(ComponentContext);
  return (
    <div ref={contentRef} style={style} className={styles.content}>
      <Camera />
      <Canvas />
      {isScanning ? null : <Message />}
    </div>
  );
}

function Camera() {
  const { videoRef } = useContext(ComponentContext);
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    const track = mediaStream.getVideoTracks()[0];
    console.log(`Track`, track);
    const capabilities = track.getCapabilities();
    console.log(`Capabilities`, capabilities);
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

function Message() {
  return (
    <div className={styles.message}>
      Click <strong>Scan</strong> to start scanning
    </div>
  );
}
