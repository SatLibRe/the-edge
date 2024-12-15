import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [totalPayout, setTotalPayout] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/posts/")
      .then((response) => response.json())
      .then((data) => {    
        setPosts(data);
        const total = data.reduce((sum, post) => sum + post.net_pl, 0);
        setTotalPayout(total);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="page2-container">
      {/* Left Ad */}
      <div className="left-ad">
        <p>Ad Space</p>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <h1 className="page-title">THE EDGE</h1>
          <h2 className="subtitle">Here to win -- and whine</h2>
        </header>

        {/* Main Content */}
        <div className="content">
          {/* Left Column */}
          <div className="left-column">
            <div className="main-article">
              <h2 className="article-title">THE EDGE</h2>
              <p>Here to win -- and whine</p>
            </div>
            {posts.map((post) => (      
              <div key={post.id} className="post-card">
                {console.log(post.net_pl)}              
                <h3>
                  {post.team_for} vs. {post.team_against}
                </h3>
                <p>
                  <strong>Date Bet Placed:</strong>{" "}
                  {new Date(post.date_bet_placed).toLocaleDateString()}
                </p>
                <p>
                  <strong>Bet Placed:</strong> {post.bet_placed}
                </p>
                <p>
                  <strong>Payout:</strong> ${post.payout}
                </p>
                <p>
                  <strong>Net P/L:</strong> ${post.net_pl}
                </p>
                <p>
                  <strong>Odds:</strong> {post.odds}
                </p>
                <p>
                  <strong>Amount Bet:</strong> ${post.amount_bet}
                </p>
                {post.content != null && (
                <p>
                  <strong>Thoughts:</strong> {post.content}
                </p>
                )}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="right-column">
            <div className="sidebar">
              <h3>Total Payout</h3>
              <p className="payout-total">${totalPayout}</p>
            </div>
            <div className="sidebar">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <a href="#">Betting Tips</a>
                </li>
                <li>
                  <a href="#">Past Results</a>
                </li>
                <li>
                  <a href="#">Top Teams</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>Inspired by ESPN Page 2 - All rights reserved © 2024</p>
        </footer>
      </div>

      {/* Right Ad */}
      <div className="right-ad">
        <img src="https://i.ebayimg.com/images/g/BugAAOSwPGlituBf/s-l400.jpg" ></img>
      </div>
    </div>
  );
}

export default App;
