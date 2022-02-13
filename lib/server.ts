import express from 'express';
const app = express();
const PORT = 8000;
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

const VwWeconnect = require('./VwWeconnect/main.js');
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
        ...state,
    })
})