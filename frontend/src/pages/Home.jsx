import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import SentimentChart from "../components/SentimentChart";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getNotes(); }, []);

  const getNotes = () => {
    api.get("/api/notes/")
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}/`)
      .then((res) => { if (res.status === 204) getNotes(); })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    setLoading(true);
    api.post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          setContent(""); setTitle(""); setIsWriting(false); getNotes();
        }
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  };

  const avgSentiment = notes.length
    ? (notes.reduce((sum, n) => sum + n.sentiment_score, 0) / notes.length).toFixed(2)
    : null;

  const getMoodLabel = (score) => {
    if (score >= 0.05) return "positive";
    if (score <= -0.05) return "negative";
    return "neutral";
  };

  return (
    <div className="home">
      <div className="home-grain" />

      <header className="home-header">
        <div className="header-left">
          <span className="home-wordmark">MindMate</span>
          <span className="home-tagline">your emotional journal</span>
        </div>
        <div className="header-center">
          {avgSentiment !== null && (
            <div className="avg-pill">
              <span className="avg-pill-label">avg mood</span>
              <span className={`avg-pill-score ${getMoodLabel(parseFloat(avgSentiment))}`}>
                {parseFloat(avgSentiment) >= 0.05 ? "+" : ""}{avgSentiment}
              </span>
              <span className={`avg-pill-mood ${getMoodLabel(parseFloat(avgSentiment))}`}>
                {getMoodLabel(parseFloat(avgSentiment))}
              </span>
            </div>
          )}
        </div>
        <div className="header-right">
          <a href="/logout" className="logout-link">sign out</a>
        </div>
      </header>

      <main className="home-main">
        {notes.length > 1 && (
          <section className="chart-section">
            <div className="section-label">mood over time</div>
            <SentimentChart notes={[...notes].reverse()} />
          </section>
        )}

        <section className="entries-section">
          <div className="entries-bar">
            <div className="section-label">
              {notes.length} {notes.length === 1 ? "entry" : "entries"}
            </div>
            <button className="write-btn" onClick={() => setIsWriting(!isWriting)}>
              {isWriting ? "✕ cancel" : "+ new entry"}
            </button>
          </div>

          {isWriting && (
            <form className="entry-form" onSubmit={createNote}>
              <input
                className="entry-title-input"
                type="text"
                placeholder="Give this entry a title…"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="entry-content-input"
                placeholder="What's on your mind today?"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
              />
              <div className="form-footer">
                <span className="form-hint">VADER will score your entry on save</span>
                <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? "saving…" : "save entry →"}
                </button>
              </div>
            </form>
          )}

          <div className="notes-list">
            {notes.length === 0 && !isWriting && (
              <div className="empty-state">
                <p className="empty-headline">No entries yet.</p>
                <p className="empty-sub">Start writing to see your emotional patterns emerge.</p>
                <button className="write-btn" onClick={() => setIsWriting(true)}>Write your first entry</button>
              </div>
            )}
            {notes.map((note) => (
              <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
