function SentimentChart({ notes }) {
  const W = 600;
  const H = 120;
  const PAD = { top: 16, right: 24, bottom: 24, left: 40 };

  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const sorted = [...notes].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  const toY = (score) => PAD.top + ((1 - score) / 2) * innerH;
  const toX = (i) => PAD.left + (i / (sorted.length - 1)) * innerW;

  const points = sorted.map((n, i) => ({ x: toX(i), y: toY(n.sentiment_score), score: n.sentiment_score, title: n.title }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${PAD.top + innerH} L ${PAD.left} ${PAD.top + innerH} Z`;

  const zeroY = toY(0);

  return (  
    <div className="chart-wrapper">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="chart-svg">
        <line x1={PAD.left} y1={zeroY} x2={W - PAD.right} y2={zeroY} stroke="#e2e2e2" strokeWidth="1" strokeDasharray="4 4" />
        <path d={areaD} fill="url(#chartGradient)" opacity="0.15" />
        <path d={pathD} fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />

        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="3.5" fill={p.score >= 0.05 ? "#2d6a4f" : p.score <= -0.05 ? "#c1121f" : "#666"} />
          </g>
        ))}

        <text x={PAD.left - 8} y={toY(1) + 4} textAnchor="end" fontSize="9" fill="#999">+1</text>
        <text x={PAD.left - 8} y={zeroY + 4} textAnchor="end" fontSize="9" fill="#999">0</text>
        <text x={PAD.left - 8} y={toY(-1) + 4} textAnchor="end" fontSize="9" fill="#999">−1</text>

        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="chart-x-labels">
        {sorted.map((n, i) => (
          (i === 0 || i === sorted.length - 1 || sorted.length <= 5) && (
            <span key={i} className="chart-x-label" style={{ left: `${((i / (sorted.length - 1)) * 100).toFixed(1)}%` }}>
              {new Date(n.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          )
        ))}
      </div>
    </div>
  );
}

export default SentimentChart;
