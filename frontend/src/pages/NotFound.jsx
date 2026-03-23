import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <div className="notfound-grain" />
      <div className="notfound-inner">
        <span className="notfound-code">404</span>
        <h1 className="notfound-headline">Page not found.</h1>
        <p className="notfound-sub">This page doesn't exist or was moved.</p>
        <button className="notfound-btn" onClick={() => navigate("/")}>
          ← back to MindMate
        </button>
      </div>
    </div>
  );
}

export default NotFound;
