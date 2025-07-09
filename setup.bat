@echo off
REM Development setup script for Windows

echo 🚀 Setting up Scriptable Widget Playground...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Create basic favicon
echo 🎨 Creating favicon...
if not exist favicon.ico (
    echo Creating placeholder favicon...
    copy /y nul favicon.ico > nul
)

REM Create placeholder images
echo 🖼️ Creating placeholder images...
if not exist images\previews mkdir images\previews

REM Create test images for each widget
for %%w in (github-stats countdown quotes weather time-progress aqi birthday schedule) do (
    for %%s in (small medium large) do (
        if not exist "images\previews\%%w-%%s.png" (
            copy "images\placeholder.png" "images\previews\%%w-%%s.png" > nul
        )
    )
)

echo ✅ Placeholder images created

REM Create development config
echo 📄 Creating development configuration...
echo { > .vscode\settings.json
echo   "liveServer.settings.port": 3000, >> .vscode\settings.json
echo   "liveServer.settings.root": ".", >> .vscode\settings.json
echo   "liveServer.settings.CustomBrowser": "chrome", >> .vscode\settings.json
echo   "liveServer.settings.NoBrowser": false >> .vscode\settings.json
echo } >> .vscode\settings.json

echo ✅ Development setup complete!
echo.
echo 🎯 Next steps:
echo    1. Run 'npm start' to start the development server
echo    2. Visit http://localhost:3000 to see your playground
echo    3. Add your actual widget screenshots to images/previews/
echo    4. Update widget templates in scripts/widgets-data.js
echo    5. Test widget configuration and code generation
echo.
echo 📝 Available commands:
echo    npm start    - Start development server
echo    npm run dev  - Start development server with auto-reload
echo    npm run deploy - Deploy to GitHub Pages
echo.
pause
