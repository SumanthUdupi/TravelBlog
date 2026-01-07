// Timeline UI Logic
export function initTimeline() {
    const timelineContainer = document.querySelector('.timeline-container');

    if (!timelineContainer) {
        return; // No timeline on this page
    }

    console.log('Timeline UI initialized');

    // Add scroll-triggered animations for timeline events
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    const events = timelineContainer.querySelectorAll('.timeline-event');
    events.forEach(event => {
        event.classList.add('timeline-hidden'); // Ensure CSS handles this
        observer.observe(event);
    });
}
