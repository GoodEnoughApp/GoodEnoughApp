import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <Tetrominos />
    </div>
  );
}

function Tetrominos() {
  return (
    <div className={styles.tetrominos}>
      <div className={`${styles.tetromino} ${styles.box1}`} />
      <div className={`${styles.tetromino} ${styles.box2}`} />
      <div className={`${styles.tetromino} ${styles.box3}`} />
      <div className={`${styles.tetromino} ${styles.box4}`} />
    </div>
  );
}
