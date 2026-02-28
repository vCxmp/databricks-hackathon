import { useState } from "react";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #f0ebe2;
    color: #1e1a14;
  }

  .page {
    height: 100vh;
    width: 100vw;
    background: #f0ebe2;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .header {
    background: #2c4a2e;
    border-bottom: 1px solid #1e3320;
    padding: 18px 48px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }

  .header-icon { font-size: 22px; }

  .header-title {
    font-family: 'DM Serif Display', serif;
    font-size: 20px;
    color: #f0ebe2;
    font-weight: 400;
  }

  .header-subtitle {
    font-size: 13px;
    color: #a0b89e;
    margin-left: auto;
    font-weight: 400;
  }

  .main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 48px;
    overflow: hidden;
  }

  .card {
    background: #faf7f2;
    border: 1px solid #ddd5c4;
    border-radius: 12px;
    padding: 52px 60px;
    width: 100%;
    max-width: 620px;
    box-shadow: 0 2px 16px rgba(60,40,10,0.08);
  }

  .card-title {
    font-family: 'DM Serif Display', serif;
    font-size: 30px;
    font-weight: 400;
    color: #1e1a14;
    margin-bottom: 6px;
  }

  .card-desc {
    font-size: 15px;
    color: #8a7d6a;
    margin-bottom: 32px;
    line-height: 1.5;
  }

  .field { margin-bottom: 20px; }

  label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: #4a3f30;
    margin-bottom: 7px;
  }

  select {
    width: 100%;
    padding: 13px 16px;
    border: 1px solid #c9bfaf;
    border-radius: 8px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    color: #1e1a14;
    background: #fff;
    appearance: none;
    cursor: pointer;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
  }

  select:focus {
    border-color: #2c4a2e;
    box-shadow: 0 0 0 3px rgba(44,74,46,0.12);
  }

  select.empty { color: #b0a090; }
  select option { color: #1e1a14; }

  .divider {
    border: none;
    border-top: 1px solid #ddd5c4;
    margin: 28px 0;
  }

  .btn-predict {
    width: 100%;
    padding: 14px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.15s;
    border: none;
  }

  .btn-predict.active {
    background: #2c4a2e;
    color: #f0ebe2;
    cursor: pointer;
    box-shadow: 0 1px 6px rgba(44,74,46,0.3);
  }

  .btn-predict.active:hover { background: #1e3320; }

  .btn-predict.disabled {
    background: #e8e0d4;
    color: #b0a090;
    cursor: not-allowed;
    border: 1px solid #ddd5c4;
  }

  .helper-text {
    text-align: center;
    font-size: 12px;
    color: #b0a090;
    margin-top: 10px;
  }

  /* Results */
  .results-header {
    background: #2c4a2e;
    border-bottom: 1px solid #1e3320;
    padding: 18px 48px;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }

  .back-btn {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 7px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    color: #f0ebe2;
    transition: all 0.15s;
    flex-shrink: 0;
  }

  .back-btn:hover {
    background: rgba(255,255,255,0.18);
    border-color: rgba(255,255,255,0.35);
  }

  .rh-info h2 {
    font-family: 'DM Serif Display', serif;
    font-size: 19px;
    font-weight: 400;
    color: #f0ebe2;
  }

  .rh-info p {
    font-size: 12px;
    color: #a0b89e;
    margin-top: 2px;
  }

  .results-main {
    flex: 1;
    padding: 36px 48px;
    display: flex;
    justify-content: center;
    overflow-y: auto;
  }

  .results-card {
    background: #faf7f2;
    border: 1px solid #ddd5c4;
    border-radius: 12px;
    width: 100%;
    max-width: 760px;
    overflow: hidden;
    box-shadow: 0 2px 16px rgba(60,40,10,0.08);
    align-self: flex-start;
  }

  .rc-header {
    padding: 24px 36px;
    border-bottom: 1px solid #ddd5c4;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background: #fff;
  }

  .rc-header h3 {
    font-family: 'DM Serif Display', serif;
    font-size: 24px;
    font-weight: 400;
    color: #1e1a14;
  }

  .rc-header p {
    font-size: 13px;
    color: #8a7d6a;
    margin-top: 4px;
  }

  .status-badge {
    font-size: 11px;
    font-weight: 500;
    padding: 5px 12px;
    border-radius: 100px;
    background: #f5ecd6;
    color: #8a6020;
    border: 1px solid #e0c98a;
    white-space: nowrap;
  }

  .rc-body { padding: 28px 36px; }

  .meta-row {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
  }

  .meta-chip {
    background: #f0ebe2;
    border: 1px solid #ddd5c4;
    border-radius: 8px;
    padding: 12px 18px;
    flex: 1;
  }

  .meta-chip-label {
    font-size: 11px;
    color: #8a7d6a;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 500;
    margin-bottom: 4px;
  }

  .meta-chip-value {
    font-size: 16px;
    font-weight: 500;
    color: #1e1a14;
  }

  .meta-chip-value.empty { color: #c0b4a0; }

  .placeholder-box {
    border: 1.5px dashed #c9bfaf;
    border-radius: 8px;
    padding: 52px 32px;
    text-align: center;
    background: #f5f0e8;
  }

  .placeholder-box strong {
    display: block;
    font-size: 16px;
    color: #6a5f50;
    font-weight: 500;
    margin-bottom: 6px;
  }

  .placeholder-box p {
    font-size: 13px;
    color: #b0a090;
    line-height: 1.8;
  }
`;

export default function App() {
  const [page, setPage] = useState("home");
  const [crop, setCrop] = useState("");
  const [state, setState] = useState("");

  const canPredict = crop !== "" && state !== "";

  return (
    <>
      <style>{styles}</style>
      {page === "home"
        ? <HomePage crop={crop} setCrop={setCrop} state={state} setState={setState} canPredict={canPredict} onPredict={() => setPage("results")} />
        : <ResultsPage crop={crop} state={state} onBack={() => { setPage("home"); setCrop(""); setState(""); }} />
      }
    </>
  );
}

function HomePage({ crop, setCrop, state, setState, canPredict, onPredict }) {
  return (
    <div className="page">
      <div className="header">
        <span className="header-icon">🌽</span>
        <span className="header-title">CropCast</span>
        <span className="header-subtitle">Seasonal Yield Forecasting</span>
      </div>
      <div className="main">
        <div className="card">
          <h1 className="card-title">Predict Crop Yield</h1>
          <p className="card-desc">Select a crop and state to generate a yield forecast.</p>

          <div className="field">
            <label htmlFor="crop-select">Crop</label>
            <select
              id="crop-select"
              value={crop}
              onChange={e => setCrop(e.target.value)}
              className={crop === "" ? "empty" : ""}
            >
              <option value="" disabled>Select a crop</option>
              <option value="Corn">Corn</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="state-select">State</label>
            <select
              id="state-select"
              value={state}
              onChange={e => setState(e.target.value)}
              className={state === "" ? "empty" : ""}
            >
              <option value="" disabled>Select a state</option>
              {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <hr className="divider" />

          <button
            className={`btn-predict ${canPredict ? "active" : "disabled"}`}
            onClick={canPredict ? onPredict : undefined}
            disabled={!canPredict}
          >
            Predict Yield
          </button>

          {!canPredict && (
            <p className="helper-text">Select a crop and state to continue</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultsPage({ crop, state, onBack }) {
  return (
    <div className="page">
      <div className="results-header">
        <button className="back-btn" onClick={onBack} title="Go back">←</button>
        <div className="rh-info">
          <h2>Yield Forecast Results</h2>
          <p>{crop} · {state}</p>
        </div>
      </div>
      <div className="results-main">
        <div className="results-card">
          <div className="rc-header">
            <div>
              <h3>Yield Prediction</h3>
              <p>Forecast for {crop} in {state}</p>
            </div>
            <span className="status-badge">Model Pending</span>
          </div>
          <div className="rc-body">
            <div className="meta-row">
              <div className="meta-chip">
                <div className="meta-chip-label">Crop</div>
                <div className="meta-chip-value">{crop}</div>
              </div>
              <div className="meta-chip">
                <div className="meta-chip-label">State</div>
                <div className="meta-chip-value">{state}</div>
              </div>
              <div className="meta-chip">
                <div className="meta-chip-label">Yield (bu/ac)</div>
                <div className="meta-chip-value empty">—</div>
              </div>
            </div>
            <div className="placeholder-box">
              <strong>No prediction available yet</strong>
              <p>The prediction model has not been connected.<br />Results will appear here once the model is integrated.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
