import { wrapper } from "../src/redux/store";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
