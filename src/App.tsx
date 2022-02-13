import './App.css';
import React from "react";
import Gauge from './Gauge';
import Charge from './Charge';

const INTERVAL_MS = 1000;
function App() {
  const [data, setData] = React.useState(undefined);

  function getVwStatus() {
    fetch("/vwstatus")
    .then((res) => res.json())
    .then((data) => setData(data));
  }

  function chargingState(state: string | undefined) {
    switch(state) {
      case undefined:
        return '';
      case 'error':
        return '❌';
      case 'charging':
        return '⚡';
      default:
        return state
    }
  }

  function chargingSpeed(power: string | undefined, rate: string | undefined) {
    if (power && rate) {
      return power + ' kW, ' + rate + ' km/h';
    } else {
      return '';
    }
  }

  React.useEffect(() => {
    const timer = setInterval(() => getVwStatus(), INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <header>
           ID.4
        </header>
      <main>
        <div><img src="id4.webp" width="80%" /></div>
        {data &&
          <div>
            <Gauge value={ data?.['currentSOC_pct'] || 0 }></Gauge>
            <div className="km-value-text">{ data?.['cruisingRangeElectric_km'] ? data?.['cruisingRangeElectric_km'] + 'km' : '' }</div>
            <div className="plug-connection-state">{ data?.['plugConnectionState'] === 'connected' ? '🔌✅' : '' }</div>
            <div className="charging-state">{ chargingState(data?.['chargingState']) }</div>
            <div className="charging-speed">{ chargingSpeed(data?.['chargePower_kW'], data?.['chargeRate_kmph']) }</div>
            <div className="charging-remaining">{ data?.['remainingChargingTimeToComplete_min'] || '' }</div>
            <div className="charging-timestamp">{ data?.['chargingStatusCarCapturedTimestamp'] || '' }</div>
          </div>
        }
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
