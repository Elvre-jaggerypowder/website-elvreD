import './AboutSection.css';

function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-text" data-aos="fade-right">
          <span className="about-tag">✦ PURE & NATURAL ✦</span>
          <h2>Pure & Natural <span className="highlight">Jaggery Powder</span></h2>  {/* ✅ CHANGED - Removed golden goodness */}
          <p>
            At ELVRE, we bring you jaggery as nature intended – unrefined, chemical-free, 
            and packed with essential minerals. Made fresh from sugarcane juice using 
            traditional methods, our jaggery powder retains all its natural nutrients 
            including iron, calcium, magnesium, and potassium.
          </p>
          <div className="about-features">
            <div className="feature">
              <span>✓</span> Made With Love and Care  {/* ✅ CHANGED */}
            </div>
            <div className="feature">
              <span>✓</span> Rich in Minerals
            </div>
            <div className="feature">
              <span>✓</span> Farmer Made
            </div>
            <div className="feature">
              <span>✓</span> No Preservatives
            </div>
          </div>
        </div>
        <div className="about-image" data-aos="fade-left">
          {/* ✅ REMOVED - bowl.png image (sugar in cup) */}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;