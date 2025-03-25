// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    console.log('Workflow Diagram loaded!');
    
    // Add hover effect to highlight the current phase and connected phases
    const phases = document.querySelectorAll('.phase');
    
    phases.forEach(phase => {
        phase.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        phase.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
        
        // Add click event to phases for potential future interactivity
        phase.addEventListener('click', function() {
            const phaseId = this.getAttribute('id');
            console.log(`Phase ${phaseId} clicked`);
            // Future functionality can be added here
        });
    });
}); 