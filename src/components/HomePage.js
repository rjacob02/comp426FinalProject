import React from 'react';

export default function HomePage({ onStart }) {
    return (
        <div className='homepage-body'>
            <main className="homepage">
            <header>
                <h1 className="homepage-title">Welcome to Your Personal Diary Application</h1>
                <p className="homepage-subtitle">Capture your thoughts, dreams, and stories, and get inspired from our daily quotes!</p>
                <p className="homepage-cta">Start documenting your life today</p>

            </header>
            <section className="homepage-actions">
                <button onClick={onStart} className="start-button">
                    Get Started
                </button>
            </section>
            </main>
        </div>
        
    );
}
