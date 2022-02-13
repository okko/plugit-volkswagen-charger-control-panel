import './App.css';
import Gauge from './Gauge';
import Charge from './Charge';

function App() {
  return (
    <div className="App">
      <header>
           ID.4
        </header>
      <main>
        <div><img src="id4.webp" width="80%" /></div>
        <div>
          <Gauge value={60}></Gauge>
          <div className="km-value-text">270 km</div>
        </div>
        <div></div>
      </main>
      <aside>
        <div></div>
        <div><Charge></Charge></div>
        <div></div>
      </aside>
    </div>
  );
}

export default App;
