import './home.scss';

function Home() {
  return (
    <div className="home-container">
      <div className="welcome-container">
        <span className="welcome-txt">Welcome</span>
        <span className="name-txt">Full Name</span>
        <span className="major-txt">Major</span>
      </div>
      <div className="btn-group">
        <button>View CV</button>
      </div>
    </div>
  );
}

export default Home;
