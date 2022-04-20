import PropTypes from 'prop-types';
import styles from './Category.module.css';

const validNames = [
  'fish',
  'other',
  'wine_beer_spirits',
  'dressings_vinegars',
  'meats',
];
export function CategoryIcon({ name }) {
  switch (name) {
    case 'fish':
      return <Fish />;
    case 'wine_beer_spirits':
      return <Wine />;
    case 'dressings_vinegars':
      return <Vinegar />;
    case 'meats':
      return <Meat />;
    case 'dairy_eggs':
      return <Dairy />;
    default:
      return <Food />;
  }
}

CategoryIcon.propTypes = {
  name: PropTypes.oneOf(validNames),
};

CategoryIcon.defaultProps = {
  name: '',
};

function Fish() {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
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

function Wine() {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 297 297"
      className={styles.icon}
      style={{ enableBackground: 'new 0 0 297 297' }}
      xmlSpace="preserve"
    >
      <path
        d="M67.723,137.012c-2.791,0-5.441,1.228-7.245,3.357c-1.804,2.13-2.58,4.945-2.121,7.698l23.5,140.998
 c0.763,4.579,4.724,7.935,9.365,7.935h109.666c4.642,0,8.603-3.355,9.366-7.935l23.5-140.998c0.459-2.753-0.317-5.568-2.122-7.698
 c-1.804-2.13-4.453-3.357-7.244-3.357h-4.448c1.584-5.864,1.954-13.162,0.811-18.591l-6.049-28.769
 c-0.586-2.786-0.104-8.319,0.954-10.965l22.434-56.048c1.948-4.868-0.418-10.395-5.287-12.344l-24.021-9.614
 c-4.868-1.946-10.395,0.418-12.344,5.287l-22.435,56.048c-1.058,2.644-4.528,6.982-6.875,8.596l-24.228,16.649
 c-5.492,3.775-11.274,11.004-13.75,17.188l-13.033,32.562H67.723z M157.62,215.344h-40.871l5.034-59.343h31.162L157.62,215.344z
  M177.407,224.158l-5.413-68.157h41.186L192.844,278.01H99.266L78.931,156.001h23.796l-5.773,68.035
 c-0.226,2.648,0.671,5.27,2.469,7.227c1.799,1.958,4.334,3.071,6.992,3.071h61.478c0.008,0,0.016,0,0.02,0
 C173.157,234.334,177.407,229.401,177.407,224.158z M136.573,137.012l10.209-25.506c1.058-2.644,4.527-6.98,6.875-8.594
 l24.229-16.65c5.491-3.774,11.273-11.004,13.749-17.188l18.906-47.233l6.391,2.559L198.028,71.63
 c-2.477,6.187-3.279,15.41-1.908,21.931l6.048,28.769c0.586,2.786,0.105,8.319-0.953,10.964l-1.488,3.719H136.573z"
      />
    </svg>
  );
}

function Vinegar() {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style={{ enableBackground: 'new 0 0 512 512' }}
      xmlSpace="preserve"
    >
      <g>
        <g>
          <path
            d="M321.164,223.418h-18.618V65.164c0-5.141-4.164-9.309-9.309-9.309h-9.309V9.309c0-5.141-4.164-9.309-9.309-9.309h-37.236
			c-5.145,0-9.309,4.168-9.309,9.309v46.545h-9.309c-5.145,0-9.309,4.168-9.309,9.309v158.255h-18.618
			c-5.145,0-9.309,4.168-9.309,9.309v269.964c0,5.141,4.164,9.309,9.309,9.309h130.327c5.145,0,9.309-4.168,9.309-9.309V232.727
			C330.473,227.586,326.309,223.418,321.164,223.418z M246.691,18.618h18.618v37.236h-18.618V18.618z M228.073,74.473h9.309h37.236
			h9.309v148.945h-55.855V74.473z M311.855,493.382H200.145V242.036h18.618h74.473h18.618V493.382z"
          />
        </g>
      </g>
      <g>
        <g>
          <path
            d="M256,269.964c-25.664,0-46.545,20.882-46.545,46.545v65.164c0,25.664,20.882,46.545,46.545,46.545
			s46.545-20.882,46.545-46.545v-65.164C302.545,290.846,281.664,269.964,256,269.964z M283.927,381.673
			c0,15.4-12.527,27.927-27.927,27.927s-27.927-12.527-27.927-27.927v-65.164c0-15.4,12.527-27.927,27.927-27.927
			s27.927,12.527,27.927,27.927V381.673z"
          />
        </g>
      </g>
    </svg>
  );
}

function Meat() {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 249.456 249.456"
      style={{ enableBackground: 'new 0 0 249.456 249.456' }}
      xmlSpace="preserve"
    >
      <g>
        <path
          d="M248.198,125.369c0.817-4.207,1.259-8.547,1.259-12.99c0-37.516-30.521-68.037-68.037-68.037
		c-2.734,0-5.489,0.165-8.189,0.489L39.978,60.834c-0.009,0.001-0.018,0.002-0.027,0.003C17.172,63.586,0,82.976,0,105.953
		c0,4.23,0.606,8.355,1.726,12.29C0.586,122.264,0,126.426,0,130.652c0,21.229,15.038,39.906,35.756,44.408l131.156,28.502
		c4.739,1.03,9.619,1.552,14.507,1.552c37.516,0,68.037-30.521,68.037-68.036c0-3.268-0.234-6.553-0.697-9.765
		C248.66,126.625,248.464,125.976,248.198,125.369z M41.71,75.734l1.222-0.125c0.238-0.025,0.473-0.06,0.704-0.106l131.384-15.78
		c2.109-0.253,4.262-0.381,6.4-0.381c29.245,0,53.037,23.792,53.037,53.037c0,29.244-23.792,53.036-53.037,53.036
		c-3.818,0-7.627-0.407-11.323-1.21L38.942,135.703C25.069,132.688,15,120.177,15,105.953C15,90.572,26.479,77.592,41.71,75.734z
		 M181.419,190.114c-3.818,0-7.628-0.407-11.323-1.21L38.942,160.402c-10.253-2.228-18.423-9.646-21.991-19.106
		c5.366,4.356,11.755,7.533,18.806,9.065l131.156,28.502c4.739,1.03,9.62,1.552,14.507,1.552c18.272,0,34.872-7.254,47.108-19.017
		C219.694,178.437,201.901,190.114,181.419,190.114z"
        />
        <path
          d="M180.677,138.805c-1.95,0-3.893-0.208-5.775-0.617l-18.44-4.007l-3.186,14.658l18.44,4.007
		c2.926,0.636,5.941,0.959,8.961,0.959c23.178,0,42.035-18.857,42.035-42.035c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5
		C207.712,126.677,195.584,138.805,180.677,138.805z"
        />
        <path
          d="M32.186,119.834c4.142,0,7.5-3.358,7.5-7.5c0-8.036,6.106-14.896,14.01-15.879l0.729-0.075
		c0.195-0.02,0.387-0.047,0.576-0.082l81.281-9.763c4.112-0.494,7.046-4.228,6.552-8.341c-0.494-4.112-4.222-7.051-8.341-6.552
		l-82.532,9.913c-0.016,0.002-0.032,0.004-0.048,0.006c-15.355,1.878-27.227,15.185-27.227,30.773
		C24.686,116.476,28.044,119.834,32.186,119.834z"
        />
        <path
          d="M177.441,132.738c13.657,0,24.768-11.111,24.768-24.768s-11.111-24.768-24.768-24.768
		s-24.768,11.111-24.768,24.768S163.784,132.738,177.441,132.738z M177.441,98.203c5.386,0,9.768,4.382,9.768,9.768
		s-4.382,9.768-9.768,9.768s-9.768-4.382-9.768-9.768S172.055,98.203,177.441,98.203z"
        />
      </g>
    </svg>
  );
}

function Dairy() {
  return (
    <svg
      version="1.2"
      baseProfile="tiny"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="-205 51 256 256"
      xmlSpace="preserve"
    >
      <path
        d="M5.5,190.2c-13.2,3.6-25.8-3.1-23.9-12.7c1-4.8,6-9.2,12.6-11.1c13.2-3.6,25.8,3.1,23.9,12.7C17.2,184,12.1,188.4,5.5,190.2
 z M-105.3,223.7c-9.9,1.5-16.9,9.6-15.6,18.1c1.3,8.5,10.4,14.2,20.3,12.7c9.9-1.5,16.9-9.6,15.6-18.1
 C-86.3,227.9-95.4,222.2-105.3,223.7z M-29.6,218.5c-6.8,0.8-12.4,5.3-13.4,10.8c-1.7,8.8,7.6,16.2,18.5,14.9
 c6.8-0.8,12.4-5.3,13.4-10.8C-9.5,224.6-18.7,217.1-29.6,218.5z M-160.6,234c-4.9,0.8-8.9,4.8-9.7,9.7c-1.2,7.9,5.5,14.6,13.4,13.4
 c4.9-0.8,8.9-4.8,9.7-9.7C-146,239.5-152.7,232.8-160.6,234z M-114.3,207.6c4.8-1.2,8.4-5,8.7-9.3c0.5-6.8-6.8-11.8-14.6-9.9
 c-4.8,1.2-8.4,5-8.7,9.3C-129.3,204.5-122,209.4-114.3,207.6z M32.9,272c-0.7,1.8-2.3,3-4.2,3.2l-224.5,26c-0.2,0-0.4,0-0.6,0
 c-1.3,0-2.5-0.5-3.5-1.3c-1.1-1-1.7-2.4-1.7-3.9v-12.7v-0.2c0,0,0,0,0,0c0.1-3.1,2.7-5.6,5.8-5.6c0,0,0,0,0,0v0
 c4.6,0,8.3-3.7,8.3-8.3c0-4.4-3.4-8-7.8-8.2c-0.2,0-0.4,0.1-0.5,0.1c-3.2,0-5.8-2.6-5.8-5.7c0,0,0,0,0,0v-0.1v-23.7
 c0-1.4,0.6-2.8,1.6-3.8c0.9-0.8,2-1.3,3.2-1.4c0.5-0.1,0.9-0.2,1.4-0.2c6.8,0,12.3-5.5,12.3-12.3c0-5.4-3.5-9.9-8.3-11.6l0,0.3
 c-1.3,0-2.7,0.1-4,0.4c-1.5,0.3-3.1-0.1-4.3-1.1c-1.2-1-1.9-2.5-1.9-4v-23.6c0-1.9,1.1-3.6,2.7-4.5L-71.8,60
 c75,0,105.3,52.1,107.4,56c0.4,0.4,0.8,0.9,1.1,1.5C38,120.1,62,200.6,32.9,272z M29.8,248.9c-0.6,0.2-1.2,0.3-1.7,0.4
 c-8.8,1.3-16.2-6.1-14.9-14.9c0.8-5.5,5.3-9.9,10.8-10.8c4-0.6,7.7,0.6,10.5,3c6.9-45.7-1.1-89.9-5.4-100.9l-92.6,22.1
 c4.6,3.8,7.5,9.5,7.5,15.9c0,12.2-10.6,22-23.1,20.6c-9.3-1-16.9-8.4-18.2-17.7c-0.6-4,0-7.8,1.5-11.2l-95.1,22.7v13.2
 c10.6,1.9,18.6,11.2,18.6,22.3c0,11.1-8,20.4-18.6,22.3v0.4v15.2c0.2,0.3,0.4,0.6,0.6,1c7.1,2.2,12.2,8.8,12.2,16.6
 c0,7.7-5.1,14.3-12.1,16.5c-0.2,0.4-0.4,0.8-0.7,1.1v3.3l215.6-25C26.5,259.9,28.3,254.4,29.8,248.9z M-65.5,253.1
 c-4.9,0-8.9,4-8.9,8.9c0,4.9,4,8.9,8.9,8.9c4.9,0,8.9-4,8.9-8.9C-56.7,257.1-60.6,253.1-65.5,253.1z"
      />
    </svg>
  );
}

function Food() {
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
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
