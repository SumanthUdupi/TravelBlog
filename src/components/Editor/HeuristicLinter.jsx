import React, { useState, useEffect } from 'react';

const HeuristicLinter = ({ text }) => {
  const [stats, setStats] = useState({
    sentences: 0,
    words: 0,
    passive: 0,
    readability: 'Calculating...'
  });

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!text) return;

    const words = text.trim().split(/\s+/).length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
    
    // Heuristic 1: Passive Voice Detection (Basic regex for "to be" + "ed")
    const passiveMatches = (text.match(/\b(am|is|are|was|were|be|been|being)\b\s+\w+ed\b/gi) || []).length;

    // Heuristic 2: Sentence Length (Complex > 20 words)
    const longSentences = text.split(/[.!?]+/).filter(s => s.trim().split(/\s+/).length > 20).length;

    // Calculation: Flesch Reading Ease (Simplified)
    // 206.835 - 1.015(words/sentences) - 84.6(syllables/words)
    // Approximation for syllables: avg 1.5 per word
    const avgWordsPerSentence = words / sentences;
    const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * 1.5);
    
    let grade = 'Accessible';
    if (score < 50) grade = 'Academic/Complex';
    if (score < 30) grade = 'Very Difficult';

    setStats({ sentences, words, passive: passiveMatches, readability: grade });

    const newAlerts = [];
    if (passiveMatches > 2) newAlerts.push('Frequent passive voice detected.');
    if (longSentences > 0) newAlerts.push(`${longSentences} sentences are very long (>20 words).`);
    
    setAlerts(newAlerts);

  }, [text]);

  return (
    <div className="glass-panel" style={{ padding: '1rem', marginTop: '1rem' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', margin: '0 0 0.5rem 0' }}>Writing Assistant</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <div style={{ fontSize: '0.9rem' }}>Run-on Sentences: <strong>{stats.sentences}</strong></div>
        <div style={{ fontSize: '0.9rem' }}>Readability: <strong>{stats.readability}</strong></div>
      </div>

      {alerts.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#d45e5e', fontSize: '0.85rem' }}>
          {alerts.map((alert, i) => (
            <li key={i}>⚠ {alert}</li>
          ))}
        </ul>
      )}
      
      {alerts.length === 0 && (
        <div style={{ color: '#2d8a56', fontSize: '0.85rem' }}>✓ Content looks clean and readable.</div>
      )}
    </div>
  );
};

export default HeuristicLinter;
