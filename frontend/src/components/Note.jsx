function Note({ note, onDelete }) {
  const score = note.sentiment_score;

  const getMood = (s) => {
    if (s >= 0.05) return { label: "positive", sign: "+" };
    if (s <= -0.05) return { label: "negative", sign: "" };
    return { label: "neutral", sign: "" };
  };

  const mood = getMood(score);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Bar width: score is -1 to 1, map to 0–100%
  const barPercent = ((score + 1) / 2) * 100;

  return (
    <article className="note-card">
      <div className="note-top">
        <div className="note-meta">
          <h3 className="note-title">{note.title}</h3>
          <span className="note-date">{formatDate(note.created_at)}</span>
        </div>
        <div className={`note-score ${mood.label}`}>
          <span className="score-number">{mood.sign}{score.toFixed(3)}</span>
          <span className="score-label">{mood.label}</span>
        </div>
      </div>

      <p className="note-content">{note.content}</p>

      <div className="sentiment-bar-container">
        <div className="sentiment-bar-track">
          <div
            className={`sentiment-bar-fill ${mood.label}`}
            style={{ width: `${barPercent}%` }}
          />
          <div className="sentiment-bar-center" />
        </div>
        <div className="sentiment-bar-labels">
          <span>−1</span>
          <span>0</span>
          <span>+1</span>
        </div>
      </div>

      <button className="delete-btn" onClick={() => onDelete(note.id)}>delete</button>
    </article>
  );
}

export default Note;
