import PropTypes from 'prop-types';
import styles from './Category.module.css';

const validNames = [
  'home',
  'shopping-cart',
  'settings',
  'check-square',
  'plus',
  'chevron-left',
  'share',
  'user',
  'lock',
  'x',
];
export default function CategoryIcon({ name, color }) {
  switch (name) {
    case 'fish':
      return <Fish color={color} />;

    default:
      return <Food color={color} />;
  }
}

CategoryIcon.propTypes = {
  name: PropTypes.oneOf(validNames),
  color: PropTypes.string,
};

CategoryIcon.defaultProps = {
  color: '#000',
  name: '',
};

function Fish({ color }) {
  return (
    <svg
      version="1.1"
      stroke={color}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      className={styles.icon}
      style={{ enableBackground: 'new 0 0 512 512' }}
      xmlSpace="preserve"
    >
      <g>
        <g>
          <circle cx="412.276" cy="281.71" r="8.31" />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M511.683,279.012c-0.665-2.333-2.315-4.26-4.521-5.273l-140.426-64.576l-56.775-26.038l-70.969-30.95
              c-2.525-1.102-5.434-0.881-7.764,0.593c-2.329,1.473-3.777,4.005-3.864,6.76c-0.198,6.24-0.428,32.197,8.274,49.355l-64.74,22.815
              L12.148,149.066c-3.563-1.852-7.938-0.895-10.4,2.274c-2.462,3.169-2.306,7.648,0.371,10.639l51.525,57.573L9.036,248.001
              c-2.392,1.527-3.841,4.169-3.841,7.008c0,2.838,1.449,5.48,3.842,7.006l44.605,28.44L2.117,348.027
              c-2.602,2.909-2.831,7.235-0.548,10.401c1.602,2.223,4.136,3.452,6.745,3.452c1.107,0,2.229-0.222,3.296-0.684l158.02-68.357
              c6.94,4.102,22.98,13.206,44.918,23.332c-11.004,13.907-15.23,34.806-15.801,37.868c-0.48,2.578,0.285,5.233,2.064,7.161
              c1.581,1.712,3.8,2.672,6.105,2.672c0.289,0,0.579-0.016,0.868-0.046l115.232-12.11c16.025,2.891,32.529,4.66,48.927,4.66
              c61.057,0,107.714-23.72,138.675-70.502C511.959,283.853,512.347,281.345,511.683,279.012z M286.414,190.989l-34.949,12.316
              c-4.108-6.642-6.395-19.198-7.201-30.698L286.414,190.989z M218.007,346.041c2.774-8.463,7.105-18.037,12.525-22.791
              c0.152,0.064,0.3,0.129,0.452,0.193c12.9,5.46,28.153,11.297,44.843,16.521L218.007,346.041z M371.945,339.757
              c-94.748,0-196.272-62.66-197.284-63.293c-1.34-0.837-2.868-1.262-4.403-1.262c-1.119,0-2.243,0.226-3.299,0.682L39.73,330.923
              l32.821-36.675c1.626-1.817,2.373-4.258,2.04-6.673c-0.331-2.416-1.709-4.565-3.766-5.875L28.96,255.007l41.866-26.701
              c2.056-1.312,3.432-3.459,3.765-5.875c0.332-2.416-0.413-4.856-2.04-6.673l-27.665-30.913l121.536,63.262
              c2.041,1.062,4.429,1.232,6.599,0.465l135.664-47.808l182.447,83.898C463.511,321.229,423.462,339.757,371.945,339.757z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M373.096,287.161c-18.493-6.937-38.078-25.615-56.64-54.015c-2.042-3.125-5.917-4.501-9.476-3.373
              c-3.557,1.133-5.923,4.498-5.784,8.229c0.513,13.829,1.372,27.813,2.558,41.638c-8.126,5.528-16.044,9.548-23.588,11.968
              c-3.385,1.087-5.705,4.206-5.769,7.761c-0.065,3.555,2.139,6.757,5.482,7.966c12.828,4.641,26.394,6.994,40.319,6.994
              c0.001,0,0.001,0,0.002,0c18.072,0,36.553-4.091,53.442-11.833c3.051-1.399,4.961-4.495,4.843-7.849
              C378.364,291.293,376.24,288.34,373.096,287.161z M307.579,296.95c3.247-1.988,6.511-4.182,9.783-6.578
              c2.355-1.724,3.633-4.556,3.367-7.463c-0.539-5.896-1.018-11.829-1.435-17.772c9.995,12.073,20.167,21.577,30.456,28.458
              C335.836,297.478,321.353,298.625,307.579,296.95z"
          />
        </g>
      </g>
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
      <g />
    </svg>
  );
}

function Food({ color }) {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      fill={color}
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 60 60"
      className={styles.icon}
      style={{ enableBackground: 'new 0 0 60 60' }}
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M18.35,20.805c0.195,0.195,0.451,0.293,0.707,0.293c0.256,0,0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414
            c-1.015-1.016-1.015-2.668,0-3.684c0.87-0.87,1.35-2.026,1.35-3.256s-0.479-2.386-1.35-3.256c-0.391-0.391-1.023-0.391-1.414,0
            s-0.391,1.023,0,1.414c0.492,0.492,0.764,1.146,0.764,1.842s-0.271,1.35-0.764,1.842C16.555,16.088,16.555,19.01,18.35,20.805z"
        />
        <path
          d="M40.35,20.805c0.195,0.195,0.451,0.293,0.707,0.293c0.256,0,0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414
            c-1.015-1.016-1.015-2.668,0-3.684c0.87-0.87,1.35-2.026,1.35-3.256s-0.479-2.386-1.35-3.256c-0.391-0.391-1.023-0.391-1.414,0
            s-0.391,1.023,0,1.414c0.492,0.492,0.764,1.146,0.764,1.842s-0.271,1.35-0.764,1.842C38.555,16.088,38.555,19.01,40.35,20.805z"
        />
        <path
          d="M29.35,14.805c0.195,0.195,0.451,0.293,0.707,0.293c0.256,0,0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414
            c-1.015-1.016-1.015-2.668,0-3.684c0.87-0.87,1.35-2.026,1.35-3.256s-0.479-2.386-1.35-3.256c-0.391-0.391-1.023-0.391-1.414,0
            s-0.391,1.023,0,1.414c0.492,0.492,0.764,1.146,0.764,1.842s-0.271,1.35-0.764,1.842C27.555,10.088,27.555,13.01,29.35,14.805z"
        />
        <path
          d="M25.345,28.61c0.073,0,0.147-0.008,0.221-0.024c1.438-0.324,2.925-0.488,4.421-0.488c0.004,0,0.008,0,0.013,0h0
            c0.552,0,1-0.447,1-0.999c0-0.553-0.447-1.001-1-1.001c-0.004,0-0.009,0-0.014,0c-1.643,0-3.278,0.181-4.86,0.537
            c-0.539,0.121-0.877,0.656-0.756,1.195C24.476,28.295,24.888,28.61,25.345,28.61z"
        />
        <path
          d="M9.821,45.081c0.061,0.012,0.121,0.017,0.18,0.017c0.474,0,0.895-0.338,0.983-0.82c1.039-5.698,4.473-10.768,9.186-13.56
            c0.475-0.281,0.632-0.895,0.351-1.37c-0.282-0.475-0.895-0.632-1.37-0.351c-5.204,3.083-8.992,8.661-10.134,14.921
            C8.917,44.462,9.277,44.982,9.821,45.081z"
        />
        <path
          d="M55.624,43.721C53.812,33.08,45.517,24.625,34.957,22.577c0.017-0.16,0.043-0.321,0.043-0.48c0-2.757-2.243-5-5-5
            s-5,2.243-5,5c0,0.159,0.025,0.32,0.043,0.48C14.483,24.625,6.188,33.08,4.376,43.721C2.286,44.904,0,46.645,0,48.598
            c0,5.085,15.512,8.5,30,8.5s30-3.415,30-8.5C60,46.645,57.714,44.904,55.624,43.721z M27.006,22.27
            C27.002,22.212,27,22.154,27,22.098c0-1.654,1.346-3,3-3s3,1.346,3,3c0,0.057-0.002,0.114-0.006,0.172
            c-0.047-0.005-0.094-0.007-0.14-0.012c-0.344-0.038-0.69-0.065-1.038-0.089c-0.128-0.009-0.255-0.022-0.383-0.029
            c-0.474-0.026-0.951-0.041-1.432-0.041s-0.958,0.015-1.432,0.041c-0.128,0.007-0.255,0.02-0.383,0.029
            c-0.348,0.024-0.694,0.052-1.038,0.089C27.1,22.263,27.053,22.264,27.006,22.27z M26.399,24.368
            c0.537-0.08,1.077-0.138,1.619-0.182c0.111-0.009,0.222-0.017,0.333-0.025c1.098-0.074,2.201-0.074,3.299,0
            c0.111,0.008,0.222,0.016,0.333,0.025c0.542,0.044,1.082,0.102,1.619,0.182c10.418,1.575,18.657,9.872,20.152,20.316
            c0.046,0.321,0.083,0.643,0.116,0.965c0.011,0.111,0.026,0.221,0.036,0.332c0.039,0.443,0.068,0.886,0.082,1.329
            c-15.71,3.641-32.264,3.641-47.974,0c0.015-0.443,0.043-0.886,0.082-1.329c0.01-0.111,0.024-0.221,0.036-0.332
            c0.033-0.323,0.07-0.645,0.116-0.965C7.742,34.24,15.981,25.942,26.399,24.368z M30,55.098c-17.096,0-28-4.269-28-6.5
            c0-0.383,0.474-1.227,2.064-2.328c-0.004,0.057-0.002,0.113-0.006,0.17C4.024,46.988,4,47.54,4,48.098v0.788l0.767,0.185
            c8.254,1.98,16.744,2.972,25.233,2.972s16.979-0.991,25.233-2.972L56,48.886v-0.788c0-0.558-0.024-1.109-0.058-1.658
            c-0.004-0.057-0.002-0.113-0.006-0.17C57.526,47.371,58,48.215,58,48.598C58,50.829,47.096,55.098,30,55.098z"
        />
      </g>
    </svg>
  );
}
