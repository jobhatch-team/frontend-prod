/**
 * Fallback chart rendering using canvas API 
 * Used if Chart.js doesn't load properly
 */

// Main function to render a radar chart using canvas
function renderFallbackRadarChart(canvasId, data) {
    console.log('Using fallback radar chart implementation with data:', data);
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Labels
    const labels = [
        'Technical Skills', 
        'Interview Preparation', 
        'Resume Readiness', 
        'Job Search Activity'
    ];
    
    // Values
    const values = [
        data.technicalSkills || 0,
        data.interviewPreparation || 0,
        data.resumeReadiness || 0,
        data.jobSearchActivity || 0
    ];
    
    // Draw background grid
    drawGrid(ctx, centerX, centerY, radius, labels.length);
    
    // Draw data
    drawDataPoints(ctx, centerX, centerY, radius, values, labels.length);
    
    // Draw labels
    drawLabels(ctx, centerX, centerY, radius, labels);
    
    console.log('Fallback radar chart rendered successfully');
}

// Draw the background grid
function drawGrid(ctx, centerX, centerY, radius, numPoints) {
    // Draw circles
    for (let i = 1; i <= 10; i += 2) {
        const r = (radius / 10) * i;
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.stroke();
    }
    
    // Draw axis lines
    for (let i = 0; i < numPoints; i++) {
        const angle = (i * 2 * Math.PI / numPoints) - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
            centerX + radius * Math.cos(angle),
            centerY + radius * Math.sin(angle)
        );
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.stroke();
    }
}

// Draw the data points and shape
function drawDataPoints(ctx, centerX, centerY, radius, data, numPoints) {
    // Draw shape
    ctx.beginPath();
    for (let i = 0; i < numPoints; i++) {
        const angle = (i * 2 * Math.PI / numPoints) - Math.PI / 2;
        const value = data[i];
        const r = (radius / 10) * value;
        
        if (i === 0) {
            ctx.moveTo(
                centerX + r * Math.cos(angle),
                centerY + r * Math.sin(angle)
            );
        } else {
            ctx.lineTo(
                centerX + r * Math.cos(angle),
                centerY + r * Math.sin(angle)
            );
        }
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(92, 147, 237, 0.2)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(92, 147, 237, 1)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw points
    for (let i = 0; i < numPoints; i++) {
        const angle = (i * 2 * Math.PI / numPoints) - Math.PI / 2;
        const value = data[i];
        const r = (radius / 10) * value;
        
        ctx.beginPath();
        ctx.arc(
            centerX + r * Math.cos(angle),
            centerY + r * Math.sin(angle),
            4,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = 'rgba(92, 147, 237, 1)';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// Draw the labels around the chart
function drawLabels(ctx, centerX, centerY, radius, labels) {
    const numPoints = labels.length;
    
    ctx.font = '12px Arial, sans-serif';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i < numPoints; i++) {
        const angle = (i * 2 * Math.PI / numPoints) - Math.PI / 2;
        const x = centerX + (radius + 20) * Math.cos(angle);
        const y = centerY + (radius + 20) * Math.sin(angle);
        
        // Adjust text alignment based on position
        if (Math.cos(angle) < -0.1) {
            ctx.textAlign = 'right';
        } else if (Math.cos(angle) > 0.1) {
            ctx.textAlign = 'left';
        } else {
            ctx.textAlign = 'center';
        }
        
        ctx.fillText(labels[i], x, y);
    }
}

// Make the function globally available
window.renderFallbackRadarChart = renderFallbackRadarChart; 