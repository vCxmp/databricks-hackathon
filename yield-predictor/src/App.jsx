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

  body {
    font-family: 'DM Sans', sans-serif;
    background: #f5f4f0;
    color: #1a1a1a;
  }

  .page {
    min-height: 100vh;
    background: #f5f4f0;
    display: flex;
    flex-direction: column;
  }

  .header {
    background: #fff;
    border-bottom: 1px solid #e4e2db;
    padding: 20px 40px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .header-icon { font-size: 22px; }

  .header-title {
    font-family: 'DM Serif Display', serif;
    font-size: 20px;
    color: #1a1a1a;
    font-weight: 400;
  }

  .header-subtitle {
    font-size: 13px;
    color: #888;
    margin-left: auto;
    font-weight: 400;
  }

  .main {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
  }

  .card {
    background: #fff;
    border: 1px solid #e4e2db;
    border-radius: 10px;
    padding: 48px;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  }

  .card-title {
    font-family: 'DM Serif Display', serif;
    font-size: 26px;
    font-weight: 400;
    color: #1a1a1a;
    margin-bottom: 6px;
  }

  .card-desc {
    font-size: 14px;
    color: #888;
    margin-bottom: 36px;
    line-height: 1.5;
  }

  .field { margin-bottom: 20px; }

  label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: #444;
    margin-bottom: 6px;
  }

  select {
    width: 100%;
    padding: 11px 14px;
    border: 1px solid #d8d6cf;
    border-radius: 7px;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    color: #1a1a1a;
    background: #fff;
    appearance: none;
    cursor: pointer;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23999' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
  }

  select:focus {
    border-color: #4a7c3f;
    box-shadow: 0 0 0 3px rgba(74,124,63,0.1);
  }

  select.empty { color: #aaa; }

  select option { color: #1a1a1a; }

  .divider {
    border: none;
    border-top: 1px solid #e4e2db;
    margin: 28px 0;
  }

  .btn-predict {
    width: 100%;
    padding: 13px;
    border-radius: 7px;
    font-size: 14px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.15s;
    border: none;
  }

  .btn-predict.active {
    background: #4a7c3f;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 1px 4px rgba(74,124,63,0.3);
  }

  .btn-predict.active:hover { background: #3d6934; }

  .btn-predict.disabled {
    background: #f0eeea;
    color: #bbb;
    cursor: not-allowed;
    border: 1px solid #e4e2db;
  }

  .helper-text {
    text-align: center;
    font-size: 12px;
    color: #bbb;
    margin-top: 10px;
  }

  /* Results */
  .results-header {
    background: #fff;
    border-bottom: 1px solid #e4e2db;
    padding: 18px 40px;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .back-btn {
    background: none;
    border: 1px solid #d8d6cf;
    border-radius: 7px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    color: #555;
    transition: all 0.15s;
    flex-shrink: 0;
  }

  .back-btn:hover {
    background: #f5f4f0;
    border-color: #bbb;
    color: #1a1a1a;
  }

  .rh-info h2 {
    font-family: 'DM Serif Display', serif;
    font-size: 18px;
    font-weight: 400;
    color: #1a1a1a;
  }

  .rh-info p {
    font-size: 12px;
    color: #999;
    margin-top: 2px;
  }

  .results-main {
    flex: 1;
    padding: 48px 24px;
    display: flex;
    justify-content: center;
  }

  .results-card {
    background: #fff;
    border: 1px solid #e4e2db;
    border-radius: 10px;
    width: 100%;
    max-width: 600px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
    align-self: flex-start;
  }

  .rc-header {
    padding: 28px 36px;
    border-bottom: 1px solid #e4e2db;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .rc-header h3 {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    font-weight: 400;
    color: #1a1a1a;
  }

  .rc-header p {
    font-size: 13px;
    color: #999;
    margin-top: 4px;
  }

  .status-badge {
    font-size: 11px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 100px;
    background: #fdf3d0;
    color: #a07800;
    border: 1px solid #f0df9a;
    white-space: nowrap;
  }

  .rc-body { padding: 36px; }

  .meta-row {
    display: flex;
    gap: 12px;
    margin-bottom: 28px;
  }

  .meta-chip {
    background: #f5f4f0;
    border: 1px solid #e4e2db;
    border-radius: 6px;
    padding: 10px 16px;
    flex: 1;
  }

  .meta-chip-label {
    font-size: 11px;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 500;
    margin-bottom: 4px;
  }

  .meta-chip-value {
    font-size: 15px;
    font-weight: 500;
    color: #1a1a1a;
  }

  .meta-chip-value.empty { color: #ccc; }

  .placeholder-box {
    border: 1.5px dashed #d8d6cf;
    border-radius: 8px;
    padding: 48px 32px;
    text-align: center;
    background: #fafaf8;
  }

  .placeholder-box strong {
    display: block;
    font-size: 15px;
    color: #888;
    font-weight: 500;
    margin-bottom: 6px;
  }

  .placeholder-box p {
    font-size: 13px;
    color: #bbb;
    line-height: 1.7;
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
        <span className="header-title">Crop Yield Predictor</span>
        <span className="header-subtitle">Agricultural Forecasting Tool</span>
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

