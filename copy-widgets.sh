#!/bin/bash

# Script to copy widget files from the main Scriptable-Widgets repository
# Run this from the Scriptable-Playground directory

WIDGET_REPO="../Scriptable-Widgets"
IMAGES_DIR="images/previews"

# Create images directory if it doesn't exist
mkdir -p "$IMAGES_DIR"

echo "📱 Copying widget screenshots and creating preview images..."

# Function to copy widget images
copy_widget_images() {
    local widget_dir="$1"
    local widget_name="$2"
    
    if [ -d "$WIDGET_REPO/$widget_dir" ]; then
        echo "Processing $widget_name..."
        
        # Look for README.md files that might contain screenshots
        if [ -f "$WIDGET_REPO/$widget_dir/README.md" ]; then
            # Extract image references from README
            echo "Found README for $widget_name"
        fi
        
        # Look for common image file patterns
        for ext in png jpg jpeg gif; do
            if ls "$WIDGET_REPO/$widget_dir"/*."$ext" 1> /dev/null 2>&1; then
                echo "Found images in $widget_dir"
                cp "$WIDGET_REPO/$widget_dir"/*."$ext" "$IMAGES_DIR/" 2>/dev/null || true
            fi
        done
    fi
}

# Copy images for each widget
copy_widget_images "GitHubStats Widget" "github-stats"
copy_widget_images "Countdown Widget" "countdown"
copy_widget_images "Quote Widget" "quotes"
copy_widget_images "Weather Widget" "weather"
copy_widget_images "TimeProgress Widget" "time-progress"
copy_widget_images "AQI Widget" "aqi"
copy_widget_images "Birthday Widget" "birthday"
copy_widget_images "Schedule Widget" "schedule"

echo "✅ Widget images copied to $IMAGES_DIR"
echo "📝 Don't forget to:"
echo "   1. Update image paths in widgets-data.js"
echo "   2. Add actual screenshots from your widgets"
echo "   3. Optimize images for web (compress, resize)"
echo "   4. Test the site locally with 'npm start'"

# Create a simple HTML file to test images
echo "🔍 Creating image test page..."
cat > test-images.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Image Test</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .image-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .image-item { border: 1px solid #ddd; padding: 10px; border-radius: 8px; }
        .image-item img { width: 100%; height: 200px; object-fit: cover; }
        .image-item h3 { margin: 10px 0 5px 0; }
    </style>
</head>
<body>
    <h1>Widget Preview Images Test</h1>
    <div class="image-grid">
EOF

# Add image entries to test file
widgets=("github-stats" "countdown" "quotes" "weather" "time-progress" "aqi" "birthday" "schedule")
for widget in "${widgets[@]}"; do
    for size in "small" "medium" "large"; do
        echo "        <div class=\"image-item\">" >> test-images.html
        echo "            <h3>$widget - $size</h3>" >> test-images.html
        echo "            <img src=\"images/previews/$widget-$size.png\" alt=\"$widget $size\" onerror=\"this.src='images/placeholder.png'\">" >> test-images.html
        echo "        </div>" >> test-images.html
    done
done

cat >> test-images.html << 'EOF'
    </div>
</body>
</html>
EOF

echo "✅ Created test-images.html - open this file to check your images"
