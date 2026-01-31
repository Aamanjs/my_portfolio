import React from 'react';
import './Education Section.css';


const EducationSection = () => {
    return (
        // The ID links this section to the "Education" link in the Navbar
        <section id="education" className="education-section">
            <div className="section-container">
                <h2 className="section-title">
                    My <span className="highlight">Education</span>
                </h2>

                {/* Timeline Item 1: Post Graduation Degree */}
                <div className="timeline-item">
                    <span className="timeline-year">2025 - 2026</span>
                    <h3 className="timeline-title">Post Graduation Diploma in Advance Computing</h3>
                    <p className="timeline-institution"> CDAC Bangalore</p>
                    <p className="timeline-details">A rigorous, hands-on program focused on advanced software engineering. I mastered core technologies including Java, Spring, and Web Development, while strengthening my foundation in DSA, OS, and DBMS. The curriculum emphasized practical learning, allowing me to build and deploy real-world projects using modern development standards.</p>
                </div>
                
                {/* Timeline Item 2: Bachelor's Degree */}
                <div className="timeline-item">
                    <span className="timeline-year">2020 - 2024</span>
                    <h3 className="timeline-title">Bachelor of  Engineering in Computer Science</h3>
                    <p className="timeline-institution"> Vishwaniketan's iMEET, Khalapur</p>
                    <p className="timeline-details">Completed BE in Computer Engineering with core skills in software development, DSA, OS, DBMS, and modern technologies, strengthened through practical projects, hands-on learning, and active participation in NSS activities.</p>
                </div>
                
                {/* Timeline Item 3: Higher Secondary */}
                <div className="timeline-item">
                    <span className="timeline-year">2018 - 2020</span>
                    <h3 className="timeline-title">Higher Secondary Certificate (HSC)</h3>
                    <p className="timeline-institution">Bharti Vidyapeeth Prashala & Junior College, Navi-Mumbai</p>
                    <p className="timeline-details">Completed with a focus on Physics, Chemistry, and Mathematics (PCM), providing a strong analytical foundation.</p>
                </div>

                <div className="timeline-item">
                    <span className="timeline-year">2017 - 2018</span>
                    <h3 className="timeline-title">10th Standard</h3>
                    <p className="timeline-institution">Seventh-Day Adventist Higher Secondary School, Navi-Mumbai</p>
                    <p className="timeline-details">Completed 10th standard in March 2018, building strong fundamentals across core academic subjects and developing disciplined study habits.</p>
                </div>


            </div>
        </section>
    );
};

export default EducationSection;
