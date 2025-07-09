// Widget Data and Templates
const WIDGETS_DATA = {
    'github-stats': {
        name: 'GitHub Stats Widget',
        description: 'Display your GitHub contribution heatmap with customizable themes and stats.',
        category: 'social',
        icon: 'fab fa-github',
        features: [
            'Contribution heatmap',
            'Multiple themes',
            'Repository stats',
            'Commit tracking',
            'Customizable colors'
        ],
        preview: {
            small: 'images/previews/github-stats-small.png',
            medium: 'images/previews/github-stats-medium.png',
            large: 'images/previews/github-stats-large.png'
        },
        config: {
            username: {
                type: 'text',
                label: 'GitHub Username',
                required: true,
                placeholder: 'rushhiii',
                help: 'Your GitHub username'
            },
            token: {
                type: 'password',
                label: 'GitHub Token (Optional)',
                required: false,
                placeholder: 'ghp_xxxxxxxxxxxx',
                help: 'Personal access token for private repos'
            },
            theme: {
                type: 'select',
                label: 'Theme',
                required: true,
                options: [
                    { value: 'auto', label: 'Auto (System)' },
                    { value: 'blue', label: 'Blue' },
                    { value: 'gray', label: 'Gray' },
                    { value: 'night', label: 'Night' },
                    { value: 'green', label: 'Green' }
                ],
                default: 'auto'
            },
            size: {
                type: 'select',
                label: 'Widget Size',
                required: true,
                options: [
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' }
                ],
                default: 'medium'
            }
        },
        template: `// icon-color: black; icon-glyph: chalkboard-teacher;

const username = "{{username}}"; // replace with your github username
const token = Keychain.get("github_token"); // replace this with your token

const size = config.widgetFamily || "{{size}}";

const themePresets = {
  auto: Device.isUsingDarkAppearance()
    ? { colors: ["#000244", "#000233", "#000000"], locations: [0.0, 0.5, 1.0], head: "#ffffff", text: "#909692", acc: "#3094ff" }
    : { colors: ["#e6f2f1", "#bff2c2"], locations: [0, 1], head: "#000000", text: "#5a615c", acc: "#006edb" },

  blue: {
    colors: ["#0A0C1C", "#121C3C", "#263B73"],
    locations: [0, 0.5, 1],
    head: "#ffffff",
    text: "#c0c0c0",
    acc: "#8ac7ff"
  },
  gray: {
    colors: ["#202631", "#2D3440", "#3C4454", "#525D6F", "#7A8699"],
    locations: [0.0, 0.25, 0.5, 0.75, 1.0],
    head: "#EAEAEA",
    text: "#C7CCD5",
    acc: "#8AB4F8"
  },
  night: {
    colors: ["#000000", "#04050A", "#0A0F1A", "#111827"],
    locations: [0.0, 0.4, 0.75, 1.0],
    head: "#ffffff",
    text: "#ffffff",
    acc: "#8AB4F8"
  }
};

const theme = themePresets["{{theme}}"] || themePresets.auto;

// Rest of the GitHub Stats widget code...
// [Widget implementation continues...]`
    },

    'countdown': {
        name: 'Countdown Widget',
        description: 'Beautiful countdown timers for important events, birthdays, and anniversaries.',
        category: 'productivity',
        icon: 'fas fa-calendar-check',
        features: [
            'Multiple events',
            'Custom colors',
            'Icon support',
            'Anniversary tracking',
            'Birthday countdown'
        ],
        preview: {
            small: 'images/previews/countdown-small.png',
            medium: 'images/previews/countdown-medium.png',
            large: 'images/previews/countdown-large.png'
        },
        config: {
            apiUrl: {
                type: 'text',
                label: 'Google Sheets API URL',
                required: true,
                placeholder: 'https://script.google.com/macros/s/...',
                help: 'URL to your Google Sheets Web App'
            },
            colorPalette: {
                type: 'select',
                label: 'Color Palette',
                required: true,
                options: [
                    { value: 'default', label: 'Default Colors' },
                    { value: 'warm', label: 'Warm Colors' },
                    { value: 'cool', label: 'Cool Colors' },
                    { value: 'pastel', label: 'Pastel Colors' }
                ],
                default: 'default'
            },
            showIcons: {
                type: 'checkbox',
                label: 'Show Event Icons',
                default: true,
                help: 'Display emoji icons for events'
            }
        },
        template: `// icon-color: brown; icon-glyph: calendar-check;

// === CONFIG ===
const SHEET_API_URL = "{{apiUrl}}"; // YOUR API URL here
const colorPalette = ["#CB2443", "#8e44ad", "#2980b9", "#F79F39", "#CEA834", "#7b9a50"];

// === Fetch Data from Google Sheets Web App ===
const req = new Request(SHEET_API_URL);

// === Local cache setup ===
const fm = FileManager.iCloud();
const dataDir = fm.joinPath(fm.documentsDirectory(), ".cache");
if (!fm.fileExists(dataDir)) fm.createDirectory(dataDir);

const dataPath = fm.joinPath(dataDir, "events_cache.json");

// Fetch data from online or fallback to local cache
async function loadEventData() {
  try {
    const req = new Request(SHEET_API_URL);
    const data = await req.loadJSON();
    fm.writeString(dataPath, JSON.stringify(data));
    return data;
  } catch (e) {
    if (fm.fileExists(dataPath)) {
      const data = JSON.parse(fm.readString(dataPath));
      return data;
    } else {
      throw new Error("No data available online or locally.");
    }
  }
}

const events = await loadEventData();

// Rest of the Countdown widget code...
// [Widget implementation continues...]`
    },

    'quotes': {
        name: 'Quote Widget',
        description: 'Daily inspirational quotes from famous philosophers and thinkers.',
        category: 'lifestyle',
        icon: 'fas fa-quote-right',
        features: [
            'Multiple categories',
            'Random quotes',
            'Custom themes',
            'Size options',
            'Philosopher collections'
        ],
        preview: {
            small: 'images/previews/quotes-small.png',
            medium: 'images/previews/quotes-medium.png',
            large: 'images/previews/quotes-large.png'
        },
        config: {
            category: {
                type: 'select',
                label: 'Quote Category',
                required: true,
                options: [
                    { value: 'machiavelli', label: 'Machiavelli' },
                    { value: 'kafka', label: 'Kafka' },
                    { value: 'zen', label: 'Zen' },
                    { value: 'aurelius', label: 'Marcus Aurelius' },
                    { value: 'fyodor', label: 'Fyodor Dostoevsky' },
                    { value: 'gita', label: 'Bhagavad Gita' },
                    { value: 'myquotes', label: 'My Quotes' }
                ],
                default: 'machiavelli'
            },
            widgetSize: {
                type: 'select',
                label: 'Widget Size',
                required: true,
                options: [
                    { value: 's', label: 'Small' },
                    { value: 'm', label: 'Medium' },
                    { value: 'l', label: 'Large' }
                ],
                default: 'm'
            },
            forceIndex: {
                type: 'number',
                label: 'Force Quote Index (Optional)',
                required: false,
                placeholder: '540',
                help: 'Force a specific quote by index number'
            }
        },
        template: `// icon-color: purple; icon-glyph: quote-right;

// === Start: Param Handling ===
const defaultCategory = "{{category}}";
const defaultSize = config.widgetFamily === "small" ? "s" : config.widgetFamily === "medium" ? "m" : "l";
const validSizes = ["s", "m", "l"];
const validCategories = ["myquotes", "gita", "test", "zen", "machiavelli", "aurelius", "fyodor", "kafka"];

const param = args.widgetParameter ? args.widgetParameter.trim().toLowerCase() : defaultCategory;
const parts = param.split(",");
let category = defaultCategory;
let sizeParam = "{{widgetSize}}";
let forcedIndex = {{forceIndex}} || null;

for (const p of parts) {
  const trimmed = p.trim();
  if (validCategories.includes(trimmed)) {
    category = trimmed;
  } else if (validSizes.includes(trimmed)) {
    sizeParam = trimmed;
  } else if (!isNaN(parseInt(trimmed))) {
    forcedIndex = parseInt(trimmed);
  }
}

// Determine widget size fallback
let widgetSize;
if (validSizes.includes(sizeParam)) {
  widgetSize = sizeParam;
} else if (config.widgetFamily === "medium") {
  widgetSize = "m";
} else if (config.widgetFamily === "large") {
  widgetSize = "l";
} else {
  widgetSize = "s";
}

// If category is invalid, just refresh and exit
if (!validCategories.includes(category)) {
  console.warn("⚠️ Invalid category. Refreshing...");
  Script.complete();
  return;
}

const fm = FileManager.iCloud();

// Rest of the Quote widget code...
// [Widget implementation continues...]`
    },

    'weather': {
        name: 'Weather Widget',
        description: 'Minimal weather display with current conditions and forecast.',
        category: 'utility',
        icon: 'fas fa-cloud-sun',
        features: [
            'Current weather',
            'Temperature display',
            'Weather icons',
            'Minimal design',
            'Location-based'
        ],
        preview: {
            small: 'images/previews/weather-small.png',
            medium: 'images/previews/weather-medium.png',
            large: 'images/previews/weather-large.png'
        },
        config: {
            apiKey: {
                type: 'password',
                label: 'OpenWeather API Key',
                required: true,
                placeholder: 'your-api-key-here',
                help: 'Get your free API key from OpenWeatherMap'
            },
            location: {
                type: 'text',
                label: 'Location',
                required: false,
                placeholder: 'Auto-detect',
                help: 'Leave empty for auto-detection'
            },
            units: {
                type: 'select',
                label: 'Temperature Units',
                required: true,
                options: [
                    { value: 'metric', label: 'Celsius (°C)' },
                    { value: 'imperial', label: 'Fahrenheit (°F)' },
                    { value: 'kelvin', label: 'Kelvin (K)' }
                ],
                default: 'metric'
            }
        },
        template: `// icon-color: cyan; icon-glyph: cloud-sun;

// === Weather Configuration ===
const API_KEY = "{{apiKey}}";
const LOCATION = "{{location}}" || null;
const UNITS = "{{units}}";

// === Weather API Setup ===
async function getWeatherData() {
    let url;
    if (LOCATION) {
        url = \`https://api.openweathermap.org/data/2.5/weather?q=\${LOCATION}&appid=\${API_KEY}&units=\${UNITS}\`;
    } else {
        Location.setAccuracyToThreeKilometers();
        const location = await Location.current();
        url = \`https://api.openweathermap.org/data/2.5/weather?lat=\${location.latitude}&lon=\${location.longitude}&appid=\${API_KEY}&units=\${UNITS}\`;
    }
    
    const req = new Request(url);
    return await req.loadJSON();
}

// Get weather data
const weather = await getWeatherData();

// Rest of the Weather widget code...
// [Widget implementation continues...]`
    },

    'time-progress': {
        name: 'Time Progress Widget',
        description: 'Visual progress bars showing the passage of time for different periods.',
        category: 'productivity',
        icon: 'fas fa-clock',
        features: [
            'Multiple time periods',
            'Progress bars',
            'Customizable colors',
            'Year/Month/Week/Day',
            'Visual indicators'
        ],
        preview: {
            small: 'images/previews/time-progress-small.png',
            medium: 'images/previews/time-progress-medium.png',
            large: 'images/previews/time-progress-large.png'
        },
        config: {
            showYear: {
                type: 'checkbox',
                label: 'Show Year Progress',
                default: true
            },
            showMonth: {
                type: 'checkbox',
                label: 'Show Month Progress',
                default: true
            },
            showWeek: {
                type: 'checkbox',
                label: 'Show Week Progress',
                default: true
            },
            showDay: {
                type: 'checkbox',
                label: 'Show Day Progress',
                default: true
            },
            colorTheme: {
                type: 'select',
                label: 'Color Theme',
                required: true,
                options: [
                    { value: 'blue', label: 'Blue' },
                    { value: 'green', label: 'Green' },
                    { value: 'orange', label: 'Orange' },
                    { value: 'purple', label: 'Purple' },
                    { value: 'gradient', label: 'Gradient' }
                ],
                default: 'blue'
            }
        },
        template: `// icon-color: orange; icon-glyph: clock;

// === Time Progress Configuration ===
const SHOW_YEAR = {{showYear}};
const SHOW_MONTH = {{showMonth}};
const SHOW_WEEK = {{showWeek}};
const SHOW_DAY = {{showDay}};
const COLOR_THEME = "{{colorTheme}}";

// === Color Themes ===
const colorThemes = {
    blue: { primary: "#007AFF", secondary: "#5AC8FA", background: "#E5F4FF" },
    green: { primary: "#34C759", secondary: "#7ED321", background: "#E8F5E8" },
    orange: { primary: "#FF9500", secondary: "#FFCC02", background: "#FFF4E6" },
    purple: { primary: "#5856D6", secondary: "#AF52DE", background: "#F0EFFF" },
    gradient: { primary: "#007AFF", secondary: "#5856D6", background: "#F0F0F0" }
};

const theme = colorThemes[COLOR_THEME] || colorThemes.blue;

// === Time Calculations ===
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();
const currentDay = now.getDate();
const currentHour = now.getHours();
const currentMinute = now.getMinutes();

// Rest of the Time Progress widget code...
// [Widget implementation continues...]`
    },

    'aqi': {
        name: 'AQI Widget',
        description: 'Air Quality Index display with color-coded health indicators.',
        category: 'utility',
        icon: 'fas fa-leaf',
        features: [
            'Real-time AQI',
            'Color coding',
            'Health indicators',
            'Location-based',
            'Air quality tips'
        ],
        preview: {
            small: 'images/previews/aqi-small.png',
            medium: 'images/previews/aqi-medium.png',
            large: 'images/previews/aqi-large.png'
        },
        config: {
            apiKey: {
                type: 'password',
                label: 'OpenWeather API Key',
                required: true,
                placeholder: 'your-api-key-here',
                help: 'Get your free API key from OpenWeatherMap'
            },
            location: {
                type: 'text',
                label: 'Location',
                required: false,
                placeholder: 'Auto-detect',
                help: 'Leave empty for auto-detection'
            },
            showTips: {
                type: 'checkbox',
                label: 'Show Health Tips',
                default: true,
                help: 'Display health recommendations based on AQI'
            }
        },
        template: `// icon-color: green; icon-glyph: leaf;

// === AQI Configuration ===
const API_KEY = "{{apiKey}}";
const LOCATION = "{{location}}" || null;
const SHOW_TIPS = {{showTips}};

// === AQI API Setup ===
async function getAQIData() {
    let url;
    if (LOCATION) {
        url = \`http://api.openweathermap.org/data/2.5/air_pollution?q=\${LOCATION}&appid=\${API_KEY}\`;
    } else {
        Location.setAccuracyToThreeKilometers();
        const location = await Location.current();
        url = \`http://api.openweathermap.org/data/2.5/air_pollution?lat=\${location.latitude}&lon=\${location.longitude}&appid=\${API_KEY}\`;
    }
    
    const req = new Request(url);
    return await req.loadJSON();
}

// AQI Color mapping
const aqiColors = {
    1: { color: "#00E400", label: "Good" },
    2: { color: "#FFFF00", label: "Fair" },
    3: { color: "#FF7E00", label: "Moderate" },
    4: { color: "#FF0000", label: "Poor" },
    5: { color: "#8F3F97", label: "Very Poor" }
};

// Get AQI data
const aqiData = await getAQIData();

// Rest of the AQI widget code...
// [Widget implementation continues...]`
    },

    'birthday': {
        name: 'Birthday Widget',
        description: 'Track upcoming birthdays and anniversaries with age calculations.',
        category: 'lifestyle',
        icon: 'fas fa-birthday-cake',
        features: [
            'Birthday tracking',
            'Age calculations',
            'Anniversary support',
            'Countdown display',
            'Custom events'
        ],
        preview: {
            small: 'images/previews/birthday-small.png',
            medium: 'images/previews/birthday-medium.png',
            large: 'images/previews/birthday-large.png'
        },
        config: {
            name: {
                type: 'text',
                label: 'Person Name',
                required: true,
                placeholder: 'John Doe',
                help: 'Name of the person'
            },
            birthday: {
                type: 'date',
                label: 'Birthday',
                required: true,
                help: 'Date of birth'
            },
            showAge: {
                type: 'checkbox',
                label: 'Show Age',
                default: true,
                help: 'Display current age'
            },
            theme: {
                type: 'select',
                label: 'Theme',
                required: true,
                options: [
                    { value: 'celebration', label: 'Celebration' },
                    { value: 'minimal', label: 'Minimal' },
                    { value: 'colorful', label: 'Colorful' },
                    { value: 'elegant', label: 'Elegant' }
                ],
                default: 'celebration'
            }
        },
        template: `// icon-color: pink; icon-glyph: birthday-cake;

// === Birthday Configuration ===
const PERSON_NAME = "{{name}}";
const BIRTHDAY = "{{birthday}}";
const SHOW_AGE = {{showAge}};
const THEME = "{{theme}}";

// === Date Calculations ===
const today = new Date();
const birthDate = new Date(BIRTHDAY);
const thisYear = today.getFullYear();
const nextBirthday = new Date(thisYear, birthDate.getMonth(), birthDate.getDate());

// If birthday has passed this year, calculate for next year
if (nextBirthday < today) {
    nextBirthday.setFullYear(thisYear + 1);
}

// Calculate age
const age = thisYear - birthDate.getFullYear();
const hasHadBirthdayThisYear = today >= new Date(thisYear, birthDate.getMonth(), birthDate.getDate());
const currentAge = hasHadBirthdayThisYear ? age : age - 1;

// Calculate days until birthday
const millisecondsPerDay = 24 * 60 * 60 * 1000;
const daysUntilBirthday = Math.ceil((nextBirthday - today) / millisecondsPerDay);

// Rest of the Birthday widget code...
// [Widget implementation continues...]`
    },

    'schedule': {
        name: 'Schedule Widget',
        description: 'Display your university or work schedule with upcoming classes.',
        category: 'productivity',
        icon: 'fas fa-calendar-alt',
        features: [
            'Class schedule',
            'Time display',
            'Subject tracking',
            'Room numbers',
            'Color coding'
        ],
        preview: {
            small: 'images/previews/schedule-small.png',
            medium: 'images/previews/schedule-medium.png',
            large: 'images/previews/schedule-large.png'
        },
        config: {
            scheduleType: {
                type: 'select',
                label: 'Schedule Type',
                required: true,
                options: [
                    { value: 'university', label: 'University' },
                    { value: 'work', label: 'Work' },
                    { value: 'school', label: 'School' },
                    { value: 'custom', label: 'Custom' }
                ],
                default: 'university'
            },
            timezone: {
                type: 'select',
                label: 'Timezone',
                required: true,
                options: [
                    { value: 'UTC', label: 'UTC' },
                    { value: 'EST', label: 'Eastern Time' },
                    { value: 'PST', label: 'Pacific Time' },
                    { value: 'CST', label: 'Central Time' },
                    { value: 'MST', label: 'Mountain Time' }
                ],
                default: 'UTC'
            },
            showRooms: {
                type: 'checkbox',
                label: 'Show Room Numbers',
                default: true,
                help: 'Display classroom/room information'
            }
        },
        template: `// icon-color: blue; icon-glyph: calendar-alt;

// === Schedule Configuration ===
const SCHEDULE_TYPE = "{{scheduleType}}";
const TIMEZONE = "{{timezone}}";
const SHOW_ROOMS = {{showRooms}};

// === Schedule Data Structure ===
const scheduleData = {
    Monday: [
        { time: "09:00", subject: "Mathematics", room: "Room 101", duration: 60 },
        { time: "11:00", subject: "Physics", room: "Lab 201", duration: 90 },
        { time: "14:00", subject: "Computer Science", room: "Room 305", duration: 75 }
    ],
    Tuesday: [
        { time: "10:00", subject: "Chemistry", room: "Lab 102", duration: 90 },
        { time: "13:00", subject: "English", room: "Room 205", duration: 50 }
    ],
    // Add more days as needed...
};

// === Get Current Day and Time ===
const now = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDay = days[now.getDay()];
const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes

// Get today's schedule
const todaySchedule = scheduleData[currentDay] || [];

// Rest of the Schedule widget code...
// [Widget implementation continues...]`
    }
};

// Export for use in main.js
window.WIDGETS_DATA = WIDGETS_DATA;
