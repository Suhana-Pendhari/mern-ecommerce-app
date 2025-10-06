import React from 'react';
import '../componentStyles/Footer.css';
import {Phone, Mail, GitHub, LinkedIn, YouTube, Instagram} from '@mui/icons-material';

function Footer() {
  return (
    <footer className="footer">
        <div className="footer-container">
            {/* Section1 */}
            <div className="footer-section contact">
                <h3>Contact Us</h3>
                <p><Phone fontSize='small'/>Phone : +9970573403</p>
                <p><Mail fontSize='small'/>Email : suhanapendhari786@gmail.com</p>
            </div>

            {/* Section2 */}
            <div className="footer-section social">
                <h3>Follow me</h3>
                <div className="social-links">
                    <a href="" target='_blank'>
                        <GitHub className="social-icon"/>
                    </a>
                    <a href="" target='_blank'>
                        <LinkedIn className="social-icon"/>
                    </a>
                    <a href="" target='_blank'>
                        <YouTube className="social-icon"/>
                    </a>
                    <a href="" target='_blank'>
                        <Instagram className="social-icon"/>
                    </a>
                </div>
            </div>

            {/* Section3 */}
            <div className="footer-section about">
                <h3>About</h3>
                <p>I am Suhana! Currently I am pasuing my B.Tech degree in CSE from ADCET</p>
            </div>
        </div>
        <div className="footer-bottom">
            <p>&copy; 2025 SuhanaPendhari . All rights reserved</p>
        </div>
    </footer>
  )
}

export default Footer