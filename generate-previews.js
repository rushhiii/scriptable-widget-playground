const fs = require('fs');
const path = require('path');

// Widget data for generating previews
const widgets = [
    { name: 'quotes', title: 'Daily Quote', color: '#5856D6', subtitle: 'Wisdom & Inspiration' },
    { name: 'weather', title: 'Weather', color: '#34C759', subtitle: '22°C Sunny' },
    { name: 'time-progress', title: 'Time Progress', color: '#007AFF', subtitle: 'Year 65% Complete' },
    { name: 'aqi', title: 'Air Quality', color: '#32D74B', subtitle: 'Good (25 AQI)' },
    { name: 'birthday', title: 'Birthday', color: '#FF3B30', subtitle: 'John: 5 days' },
    { name: 'schedule', title: 'Schedule', color: '#8E44AD', subtitle: 'Next: Math 10:00' }
];

const sizes = {
    small: { width: 150, height: 150, titleSize: 14, subtitleSize: 10 },
    medium: { width: 300, height: 150, titleSize: 18, subtitleSize: 12 },
    large: { width: 300, height: 300, titleSize: 24, subtitleSize: 16 }
};

widgets.forEach(widget => {
    Object.entries(sizes).forEach(([sizeName, dimensions]) => {
        const svg = `<svg width="${dimensions.width}" height="${dimensions.height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${widget.color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${widget.color};stop-opacity:0.8" />
    </linearGradient>
  </defs>
  <rect width="${dimensions.width}" height="${dimensions.height}" fill="url(#grad1)" rx="12"/>
  <text x="${dimensions.width / 2}" y="${dimensions.height / 2 - 10}" font-family="Arial, sans-serif" font-size="${dimensions.titleSize}" fill="white" text-anchor="middle" dy="0.35em" font-weight="bold">
    ${widget.title}
  </text>
  <text x="${dimensions.width / 2}" y="${dimensions.height / 2 + 15}" font-family="Arial, sans-serif" font-size="${dimensions.subtitleSize}" fill="white" text-anchor="middle" dy="0.35em">
    ${widget.subtitle}
  </text>
  <text x="${dimensions.width / 2}" y="${dimensions.height - 20}" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle" dy="0.35em" opacity="0.8">
    ${sizeName.charAt(0).toUpperCase() + sizeName.slice(1)} Widget
  </text>
</svg>`;

        const filePath = path.join(__dirname, `images/previews/${widget.name}-${sizeName}.svg`);
        fs.writeFileSync(filePath, svg);
        console.log(`Created ${widget.name}-${sizeName}.svg`);
    });
});

console.log('All preview images generated successfully!');
