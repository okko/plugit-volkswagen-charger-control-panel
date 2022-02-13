import express from 'express';
const path = require('path');
const app = express();
const PORT = 8000;

import VwWeconnect from 'iobroker.vw-connect';
const connect = VwWeconnect()
connect.sendEvent('ready')

app.get('/vwstatus', (_req, res) => {
  const state = connect.getState()
    const vin = process.env.WECONNECT_VIN    
    res
      .header('Content-type', 'application/json')
      .header('Cache-Control', 'private, max-age=0, no-cache, must-revalidate')
      .send({
        'carCapturedTimestamp': state[vin + '.status.batteryStatus.carCapturedTimestamp'],
        'currentSOC_pct': state[vin + '.status.batteryStatus.currentSOC_pct'],
        'cruisingRangeElectric_km': state[vin + '.status.batteryStatus.cruisingRangeElectric_km'],
        'plugConnectionState': state[vin + '.status.plugStatus.plugConnectionState'],
        'chargingState': state[vin + '.status.chargingStatus.chargingState'],
        'chargePower_kW': state[vin + '.status.chargingStatus.chargePower_kW'],
        'chargeRate_kmph': state[vin + '.status.chargingStatus.chargeRate_kmph'],
        'remainingChargingTimeToComplete_min': state[vin + '.status.chargingStatus.remainingChargingTimeToComplete_min'],
        'chargingStatusCarCapturedTimestamp': state[ vin + '.status.chargingStatus.carCapturedTimestamp'],
        ...state,
    })
})

app.use(express.static(path.resolve(__dirname, './../build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
