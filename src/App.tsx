import WeightElement from "./components/Element/WeightElement";
import { ElementShape } from "./enums/ElementShape";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Teeter Totter
      </header>

      <div>
        <WeightElement color="red" shape={ElementShape.CIRCLE} value={20}  />
        <WeightElement color="blue" shape={ElementShape.SQUARE} value={40}  />
        <WeightElement color="orange" shape={ElementShape.TRIANGLE} value={80}  />
        aa
      </div>
    </div>
  );
}

export default App;
