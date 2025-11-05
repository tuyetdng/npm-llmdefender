import styles from '!!css-loader!@alfalab/core-components/themes/site.css';

// eslint-disable-next-line import/no-webpack-loader-syntax
const site = styles.toString();

export { site as default };
