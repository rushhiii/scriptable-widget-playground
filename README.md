# Scriptable Widget Playground 🎮

A modern, interactive web playground for [Scriptable](https://scriptable.app) iOS widgets. Customize, preview, and generate code for beautiful iOS widgets with ease.

## 🚀 Features

- **Interactive Widget Gallery** - Browse all available widgets with live previews
- **Real-time Configuration** - Customize themes, parameters, and settings
- **Code Generation** - Auto-generate configured widget code
- **QR Code Export** - Instant QR codes for easy Scriptable import
- **Theme Support** - Dark/Light mode with beautiful UI
- **Responsive Design** - Works perfectly on desktop and mobile
- **No Build Process** - Pure HTML, CSS, and JavaScript

## 🎯 Available Widgets

1. **GitHub Stats Widget** - Display your GitHub contribution heatmap
2. **Countdown Widget** - Beautiful countdowns for important events
3. **Quote Widget** - Daily inspirational quotes with multiple themes
4. **Weather Widget** - Minimal weather information display
5. **Time Progress Widget** - Visual progress bars for time periods
6. **AQI Widget** - Air quality index with color coding
7. **Birthday Widget** - Track upcoming birthdays and anniversaries
8. **Schedule Widget** - University/work schedule display

## 🛠️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/rushhiii/Scriptable-Playground.git
   cd Scriptable-Playground
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Visit `http://localhost:3000`

## 🎨 How to Use

1. **Browse Widgets** - Explore the widget gallery
2. **Select a Widget** - Click on any widget to open the configuration panel
3. **Customize Settings** - Adjust parameters, themes, and display options
4. **Preview Changes** - See real-time updates in the preview pane
5. **Generate Code** - Get your customized widget code
6. **Export Options**:
   - Copy code to clipboard
   - Download as `.js` file
   - Scan QR code to import directly to Scriptable

## 📱 Widget Configuration

Each widget supports various configuration options:

### GitHub Stats Widget
- Username
- Theme (auto, blue, gray, night, etc.)
- Size (small, medium, large)
- Token (optional, for private repos)

### Countdown Widget
- Event name and date
- Color palette
- Icon selection
- Background themes

### Quote Widget
- Category (machiavelli, kafka, zen, etc.)
- Size preferences
- Font styling
- Background colors

*...and many more customization options for each widget!*

## 🌐 Deployment

### GitHub Pages
```bash
npm run deploy
```

### Netlify
1. Connect your repository to Netlify
2. Build command: `echo "Static site"`
3. Publish directory: `.`

### Vercel
1. Import project to Vercel
2. Framework preset: Other
3. Build command: (leave empty)
4. Output directory: `.`

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add New Widgets** - Create widget definitions in `scripts/widgets-data.js`
2. **Improve UI/UX** - Enhance styles in `styles/main.css`
3. **Add Features** - Extend functionality in `scripts/main.js`
4. **Fix Bugs** - Report issues and submit fixes
5. **Documentation** - Improve README and inline comments

### Adding a New Widget

1. Add widget definition to `scripts/widgets-data.js`
2. Include preview images in `images/previews/`
3. Define configuration parameters
4. Add code template with placeholder variables
5. Test the configuration and code generation

## 📁 Project Structure

```
Scriptable-Playground/
├── index.html              # Main HTML file
├── styles/
│   └── main.css            # All styling
├── scripts/
│   ├── main.js             # Main application logic
│   └── widgets-data.js     # Widget definitions and templates
├── images/
│   ├── previews/           # Widget preview screenshots
│   └── icons/              # Widget icons
├── README.md               # This file
└── package.json            # Dependencies and scripts
```

## 🎯 Roadmap

- [ ] **Live Code Editor** - In-browser code editing with syntax highlighting
- [ ] **Widget Templates** - Pre-made themes and layouts
- [ ] **Community Widgets** - User-submitted widget gallery
- [ ] **Mobile App** - Companion app for easier widget management
- [ ] **Widget Store** - Marketplace for premium widgets
- [ ] **Backup/Sync** - Cloud storage for widget configurations

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- **Scriptable App** - Amazing iOS automation platform
- **Widget Community** - Inspiration and feedback
- **Open Source Libraries** - PrismJS, QRCode.js, and more

## 📞 Support

- **GitHub Issues** - Report bugs and request features
- **Portfolio** - [rushi-bashfolio.netlify.app](https://rushi-bashfolio.netlify.app)
- **GitHub** - [@rushhiii](https://github.com/rushhiii)

---

**Made with ❤️ for the Scriptable community by Rushi**
