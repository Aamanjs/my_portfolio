import React from 'react';
import './WorkExperience.css';

// Assuming global styles (like .section-title, .highlight, .section-container) are available.

const WorkAndExperienceSection = () => {
    return (
        // The IDs allow navigation from both the "Work" and "Experience" Navbar links
        <section id="work" className="work-experience-section">
            <a id="experience" style={{ position: 'absolute', top: '-100px', visibility: 'hidden' }}></a>
            <div className="section-container">
                <h2 className="section-title">
                    Work <span className="highlight">&</span> Experience
                </h2>
                
                <div className="experience-list">
                    {/* Experience Item 1: Current Role */}
                    <div className="experience-item">
                        <h3 className="job-title">IT Executive (Database Validation)</h3>
                        <p className="job-company">SBFC Finance Limited, Thane, Maharashtra | 2024 - 2025</p>
                        <ul className="job-responsibilities">
                            <li>Validated backend data pipelines and ensured accuracy between frontend UI and backend APIs across 29+ collections.</li>
                            <li>Performed SQL-based data validation, debugging, and error tracking for multiple backend module.</li>
                            <li>Improved backend reliability by resolving 100+ defects with structured analysis and testing.</li>
                            <li>Enhanced system efficiency by reducing defect leakage by 80% and improving test coverage by 90%.</li>
                        </ul>
                    </div>
                    
                    {/* Experience Item 2: Previous Role */}
                    <div className="experience-item">
                        <h3 className="job-title">Data Analyst</h3>
                        <p className="job-company">ShareWorld Solutions, Belapur, Maharashtra | 2023 - 2024</p>
                        <ul className="job-responsibilities">
                            <li>Extracted, transformed, and validated datasets using SQL for dashboard and backend requirements.</li>
                            <li>Designed analytical reports using Power BI, improving decision-making efficiency.</li>
                            <li>Supported documentation and data flow mapping for internal applications.</li>
                        </ul>
                    </div> 
                </div>
            </div>
        </section>
    );
};

export default WorkAndExperienceSection;
