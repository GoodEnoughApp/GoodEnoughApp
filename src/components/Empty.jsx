import styles from './Empty.module.css';

export function Empty({ onClick, type, isOnline }) {
  if (type === 'whale') {
    return <EmptyWhale />;
  }
  return <EmptyPenguin onClick={onClick} isOnline={isOnline} />;
}

function EmptyPenguin({ onClick, isOnline }) {
  return (
    <div className={styles.empty}>
      <div className={styles.penguin}>
        <Penguin />
      </div>
      <small>You don't have any product</small>
      <button type="button" onClick={onClick} disabled={!isOnline}>
        Add
      </button>
    </div>
  );
}
function Penguin() {
  return (
    <svg
      version="1.1"
      id="penguin-image"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
    >
      <g>
        <g>
          <path
            className={styles.body}
            d="M406.245,442.314l-15.551-314.123C387.136,56.308,327.97,0,256,0S124.863,56.308,121.306,128.191l-15.551,314.123
          c-1.265,25.544,11.879,49.093,34.302,61.458c0.001,0.001,0.003,0.002,0.004,0.003c9.758,5.381,20.829,8.225,32.015,8.225h0.674
          H256h83.25h0.674c11.187,0,22.258-2.845,32.015-8.225c0.001-0.001,0.003-0.002,0.004-0.003
          C394.366,491.406,407.509,467.858,406.245,442.314z M245.8,491.602h-62.852v-3.06c0-6.749,5.49-12.239,12.239-12.239h38.373
          c6.749,0,12.239,5.49,12.239,12.239V491.602z M329.051,491.602h-62.853v-3.06c0-6.749,5.49-12.239,12.239-12.239h38.375
          c6.749,0,12.239,5.49,12.239,12.239V491.602z M349.449,490.592v-2.05c0-17.997-14.641-32.637-32.637-32.637h-38.373
          c-8.686,0-16.584,3.418-22.438,8.97c-5.853-5.552-13.752-8.97-22.438-8.97h-38.375c-17.997,0-32.637,14.641-32.637,32.637v2.051
          c-2.398-0.507-4.756-1.192-7.039-2.073l6.316-127.595c2.489-50.258,43.855-89.626,94.173-89.626s91.685,39.369,94.172,89.625
          l6.316,127.595C354.205,489.4,351.847,490.085,349.449,490.592z M376.192,473.964l-5.646-114.049
          C367.519,298.786,317.205,250.9,256,250.9S144.48,298.786,141.453,359.916l-5.646,114.049
          c-6.703-8.532-10.241-19.304-9.679-30.641l15.551-314.124c3.02-61.009,53.236-108.8,114.321-108.8S367.3,68.19,370.32,129.199
          l15.551,314.123C386.432,454.661,382.895,465.432,376.192,473.964z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            className={styles.mouth}
            d="M256,120.351c-18.277,0-33.147,14.87-33.147,33.147c0,15.178,19.367,39.664,25.303,46.806
          c1.938,2.332,4.812,3.68,7.844,3.68c3.032,0,5.906-1.348,7.844-3.68c5.936-7.143,25.303-31.627,25.303-46.806
          C289.147,135.221,274.277,120.351,256,120.351z M256.006,177.079c-7.271-10.182-12.755-20.064-12.755-23.581
          c0-7.03,5.719-12.749,12.749-12.749c7.03,0,12.749,5.719,12.749,12.749C268.749,157.076,263.338,166.844,256.006,177.079z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            className={styles.eye}
            d="M207.553,80.574c-6.749,0-12.239,5.49-12.239,12.239c0,6.749,5.49,12.239,12.239,12.239
          c6.749,0,12.239-5.49,12.239-12.239C219.792,86.064,214.302,80.574,207.553,80.574z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            className={styles.eye}
            d="M304.446,80.574c-6.749,0-12.239,5.49-12.239,12.239c0,6.749,5.49,12.239,12.239,12.239s12.239-5.49,12.239-12.239
          C316.685,86.064,311.195,80.574,304.446,80.574z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            className={styles.body}
            d="M265.29,284.052c-3.063-0.341-6.188-0.514-9.29-0.514c-5.633,0-10.199,4.566-10.199,10.199s4.566,10.199,10.199,10.199
          c2.35,0,4.716,0.131,7.03,0.389c0.383,0.043,0.765,0.064,1.142,0.064c5.126,0,9.542-3.856,10.124-9.07
          C274.92,289.721,270.888,284.676,265.29,284.052z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            className={styles.body}
            d="M296.688,294.147c-4.912-2.755-11.129-1.008-13.885,3.904c-2.756,4.913-1.008,11.129,3.904,13.885
          c19.004,10.662,30.992,30.006,32.068,51.745c0.27,5.455,4.777,9.694,10.178,9.694c0.17,0,0.341-0.004,0.513-0.012
          c5.626-0.278,9.961-5.065,9.682-10.691C337.724,333.881,321.851,308.264,296.688,294.147z"
          />
        </g>
      </g>
    </svg>
  );
}

function EmptyWhale() {
  return (
    <div className={styles.empty}>
      <div className={styles.whale}>
        <Whale />
      </div>
      <small>You don't have products in your shopping list</small>
    </div>
  );
}

function Whale() {
  return (
    <svg
      version="1.1"
      id="whale"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 511.999 511.999"
    >
      <g>
        <g>
          <path
            d="M501.3,197.77c-9.917-12.997-24.979-20.45-41.328-20.45H129.118c6.299-9.858,12.175-22.977,12.175-37.642
          c0-30.94-26.153-55.03-27.265-56.04c-3.889-3.529-9.821-3.529-13.708,0c-1.113,1.011-27.264,25.1-27.264,56.04
          c0,5.917,0.962,11.582,2.517,16.884c-5.303-1.555-10.967-2.517-16.886-2.517c-30.94,0-55.029,26.152-56.04,27.265
          c-3.529,3.889-3.529,9.821,0,13.709c1.011,1.113,25.1,27.265,56.04,27.265c15.869,0,29.924-6.879,39.999-13.731
          c6.237,62.364,39.983,118.871,92.953,154.023c14.605,9.693,30.297,17.476,46.758,23.221c-6.521,17.569-5.832,34.446-5.782,35.471
          c0.254,5.245,4.449,9.439,9.693,9.693c0.201,0.01,1.014,0.044,2.323,0.044c8.46,0,37.639-1.446,56.583-20.391
          c4.025-4.025,7.254-8.512,9.852-13.163c82.073-1.351,155.988-50.452,188.976-125.871c4.04-9.237,7.43-18.823,10.079-28.494
          C514.442,227.299,511.227,210.781,501.3,197.77z M58.684,201.887c-13.424,0-25.765-7.723-33.311-13.705
          c7.573-5.988,19.954-13.737,33.311-13.737c13.421,0,25.76,7.72,33.31,13.706C84.423,194.139,72.041,201.887,58.684,201.887z
           M93.451,139.679c0-13.437,7.735-25.786,13.721-33.329c5.989,7.548,13.722,19.896,13.722,33.329s-7.732,25.78-13.722,33.329
          C101.183,165.46,93.451,153.113,93.451,139.679z M286.788,396.193c-9.499,9.499-23.697,12.762-33.269,13.865
          c1.102-9.573,4.365-23.771,13.866-33.27c9.5-9.5,23.703-12.763,33.269-13.866C299.551,372.494,296.288,386.693,286.788,396.193z
           M318.912,376.729c3.127-13.293,2.685-24.2,2.646-25.018c-0.254-5.244-4.449-9.439-9.693-9.693
          c-1.5-0.074-37.027-1.533-58.906,20.347c-1.682,1.682-3.21,3.45-4.626,5.272c-11.964-3.935-23.498-9.056-34.453-15.302
          c79.464-72.664,170.984-76.668,197.94-76.089c10.906,0.236,19.949,0.346,28.456,0.346h34.696
          C443.991,334.775,384.851,372.797,318.912,376.729z M490.444,237.703c-1.705,6.23-3.753,12.422-6.113,18.49h-44.054
          c-8.357,0-17.26-0.108-28.016-0.341c-29.365-0.633-130.137,3.783-216.067,85.06c-46.354-33.688-74.859-86.141-77.905-143.193
          h341.684c9.933,0,19.085,4.528,25.11,12.425C491.121,218.054,493.074,228.099,490.444,237.703z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M420.767,212.72c-6.467,0-11.729,5.262-11.729,11.729s5.262,11.729,11.729,11.729s11.729-5.262,11.729-11.729
          S427.234,212.72,420.767,212.72z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M263.133,206.025H148.904c-5.632,0-10.199,4.566-10.199,10.199s4.567,10.199,10.199,10.199h114.229
          c5.633,0,10.199-4.566,10.199-10.199S268.765,206.025,263.133,206.025z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M296.79,206.025h-2.04c-5.632,0-10.199,4.566-10.199,10.199s4.567,10.199,10.199,10.199h2.04
          c5.632,0,10.199-4.566,10.199-10.199S302.422,206.025,296.79,206.025z"
          />
        </g>
      </g>
    </svg>
  );
}
