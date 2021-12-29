import { Provider } from "react-redux";
import Scene from "./components/Scene/Scene";
import store from "./redux/store";
import GlobalStyle from "./style/GlobalStyle";

function App() {
  return (
    <Provider store={store} >
      <GlobalStyle />
      <Scene />
    </Provider>
  );
}

export default App;
