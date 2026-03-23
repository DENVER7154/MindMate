import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <div className="landing-grain" />

      <nav className="landing-nav">
        <span className="landing-wordmark">MindMate</span>
        <div className="landing-nav-links">
          <button className="landing-nav-btn ghost" onClick={() => navigate("/login")}>Sign in</button>
          <button className="landing-nav-btn filled" onClick={() => navigate("/register")}>Get started</button>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-text">
          <p className="landing-eyebrow">AI-powered journaling</p>
          <h1 className="landing-headline">
            Write freely.<br />
            <em>Understand yourself.</em>
          </h1>
          <p className="landing-subhead">
            MindMate analyzes the emotional tone of every entry using VADER sentiment analysis —
            so you can track how you really feel over time, not just what you write.
          </p>
          <div className="landing-cta-row">
            <button className="landing-cta-primary" onClick={() => navigate("/register")}>
              Start journaling free
            </button>
            <button className="landing-cta-secondary" onClick={() => navigate("/login")}>
              I have an account
            </button>
          </div>
        </div>

        <div className="landing-hero-visual">
          <div className="mock-card">
            <div className="mock-card-header">
              <span className="mock-card-title">Today's entry</span>
              <span className="mock-score positive">+0.741</span>
            </div>
            <p className="mock-card-text">
              "Had a really productive morning. Finished the project I've been putting off for weeks — feeling genuinely proud of myself."
            </p>
            <div className="mock-bar-wrap">
              <div className="mock-bar-track">
                <div className="mock-bar-fill" style={{ width: "87%" }} />
                <div className="mock-bar-mid" />
              </div>
              <div className="mock-bar-labels"><span>−1</span><span>0</span><span>+1</span></div>
            </div>
            <span className="mock-mood-tag">positive</span>
          </div>

          <div className="mock-card mock-card-2">
            <div className="mock-card-header">
              <span className="mock-card-title">Yesterday</span>
              <span className="mock-score negative">−0.312</span>
            </div>
            <p className="mock-card-text">
              "Felt a bit overwhelmed today. Too many things at once."
            </p>
            <div className="mock-bar-wrap">
              <div className="mock-bar-track">
                <div className="mock-bar-fill negative" style={{ width: "34%" }} />
                <div className="mock-bar-mid" />
              </div>
              <div className="mock-bar-labels"><span>−1</span><span>0</span><span>+1</span></div>
            </div>
            <span className="mock-mood-tag negative">negative</span>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <div className="feature-item">
          <span className="feature-icon">✦</span>
          <h3>Sentiment scoring</h3>
          <p>Every entry gets a VADER compound score from −1 to +1, calculated instantly on save.</p>
        </div>
        <div className="feature-item">
          <span className="feature-icon">✦</span>
          <h3>Mood over time</h3>
          <p>A live chart maps your emotional trajectory across all your entries.</p>
        </div>
        <div className="feature-item">
          <span className="feature-icon">✦</span>
          <h3>Private & secure</h3>
          <p>Your journal is yours alone — JWT auth keeps every entry tied to your account.</p>
        </div>
      </section>

      <footer className="landing-footer">
        <span className="landing-wordmark small">MindMate</span>
        <span>Built with Django + React</span>
      </footer>
    </div>
  );
}

export default Landing;
