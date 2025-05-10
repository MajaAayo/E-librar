import React, { useState, useEffect, useCallback } from 'react';
import { FaGooglePlay, FaApple } from 'react-icons/fa';

const AboutUs = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const toggleComingSoon = useCallback(() => {
    setShowComingSoon((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? 'hidden' : 'auto';
      return newState;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('storage', () => {});

    return () => {
      window.removeEventListener('storage', () => {});
      document.body.style.overflow = 'auto'; // Cleanup overflow style
    };
  }, []);

  return (
    <>
      <main>
        <section className="about-us">
          <div className="container">
            <div className="about-us-header">
            <h1>About Us</h1>
            </div>
            <p>
              Libopedia is a digital platform for arts and literature. Besides being an online store for physical books with one of the largest catalogs, Libopedia is also the only commercial platform for e-books and audiobooks. Libopedia is also the online ticketing partner.
            </p>
            <p>
              Libopedia was started in February 2019 as an e-commerce platform for selling physical books. Libopedia became a prominent company for the online book business after a few months of its launch and also started assisting publishers to explore and expand the book market. Libopedia has been helping publishers in making their paperbacks and hardcovers available worldwide through major retailers.
            </p>

            <div className="mobile-app-section">
              <h2>Experience Libopedia On The Go</h2>
              <p>Access your favorite books anytime, anywhere with our mobile application</p>
              
              <div className="mobile-app-content">
                <div className="mobile-app-image">
                  <img src="/assets/LOGO/37.png" alt="Libopedia Mobile App" />
                </div>
                
                <div className="download-options">
                  <h3>Download Our App</h3>
                  <p>Get full access to our library with our feature-rich mobile application</p>
                  
                  <div className="download-buttons">
                    <button 
                      className="download-btn play-store" 
                      onClick={toggleComingSoon} 
                      aria-label="Download from Google Play"
                    >
                      <FaGooglePlay className="icon" />
                      <div className="btn-text">
                        <span>GET IT ON</span>
                        <span>Google Play</span>
                      </div>
                    </button>
                    
                    <button 
                      className="download-btn app-store" 
                      onClick={toggleComingSoon} 
                      aria-label="Download from App Store"
                    >
                      <FaApple className="icon" />
                      <div className="btn-text">
                        <span>Download on the</span>
                        <span>App Store</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <p>
              In April 2020, Libopedia came up with an e-book platform of its own to facilitate readers with access to books from several of the major publishers, thus becoming the only commercial platform where publishers and authors can sell e-books to readers. New titles have been continuously added as e-books, which can be read conveniently from Android and iOS apps. In the subsequent lockdown, Libopedia also started selling audiobooks on its platform.
            </p>

            <p>
              Libopedia has also been helping organizations set up their own library with bulk book provision and a friendly cataloging system. Besides, Libopedia has also been providing promotion, ticketing, and entrance management services for arts and literature events.
            </p>

            <p>
              It thrills us we could turn our passion into a range of valuable products and services. We hope you enjoy our products and services as much as we enjoy offering them to you. If you have questions, please contact us.
            </p>

            <p>
              Sincerely,
            </p>
            <p>
              Libopedia Team
            </p>
          </div>
        </section>
      </main>

      {/* Updated Coming Soon Modal */}
      {showComingSoon && (
        <div 
          className="modal-overlay" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="coming-soon-title"
        >
          <div className="coming-soon-modal">
            <h3 id="coming-soon-title">Coming Soon!</h3>
            <p>The Libopedia mobile app will be available for download in the coming weeks.</p>
            <p>Stay tuned for updates on our release date!</p>
            <button 
              className="close-modal-btn" 
              onClick={toggleComingSoon} 
              aria-label="Close Coming Soon Modal"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutUs;