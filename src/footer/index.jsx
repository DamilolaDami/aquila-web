import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-logo">
                    AQUILA
                </div>
                <div className="footer-links">
                    <a href="/">Home</a>
                    <a href="/about">About Us</a>
                    <a href="/jobs">Jobs</a>
                    <a href="/contact">Contact</a>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-social">
                    <a href="#" className="social-icon">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" className="social-icon">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="social-icon">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="#" className="social-icon">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
                <div className="footer-contact">
                    <p>Email: info@aquila.com</p>
                    <p>Phone: +1234567890</p>
                </div>
            </div>
            <div className="footer-disclaimer">
                <p>This website is for informational purposes only. All rights reserved. | Privacy Policy</p>
            </div>

            <style jsx>
                {`
                    .footer {
                        background-color: #222;
                        color: #fff;
                        padding: 40px 0;
                        text-align: center;
                    }
                    .footer-top, .footer-bottom {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 0 20px;
                        margin-bottom: 20px;
                    }
                    .footer-logo img {
                        width: 100px;
                        height: auto;
                    }
                    .footer-links a {
                        color: #fff;
                        margin: 0 15px;
                        text-decoration: none;
                        font-size: 16px;
                    }
                    .footer-social .social-icon {
                        color: #fff;
                        font-size: 24px;
                        margin: 0 10px;
                        text-decoration: none;
                    }
                    .footer-contact {
                        text-align: left;
                    }
                    .footer-disclaimer {
                        font-size: 14px;
                    }
                `}
            </style>
        </footer>
    );
}

export default Footer;
