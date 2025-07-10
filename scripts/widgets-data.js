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
            small: [
                'images/previews/githubstats/githubstats_s_1.png',
                'images/previews/githubstats/githubstats_s_2.png',
                'images/previews/githubstats/githubstats_s_6.png',
                'images/previews/githubstats/github_stats_s_3.PNG'
            ],
            medium: [
                'images/previews/githubstats/githubstats_m_1.png',
                'images/previews/githubstats/githubstats_m_4.png',
                'images/previews/githubstats/github_stats_m.png',
                'images/previews/githubstats/github_stats_m_3.PNG',
                'images/previews/githubstats/github_stats_m_4.PNG',
                'images/previews/githubstats/github_stats_m_5.png'
            ],
            large: [
                'images/previews/githubstats/githubstats_l.png'
            ]
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
                required: false,
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
        templateFile: 'widgets/MyGitStats-v2.0.js'
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
            small: [
                'images/previews/countdown/countdown_s.PNG',
                'images/previews/countdown/countdown_1_s.PNG',
                'images/previews/countdown/countdown_age_s.PNG',
                'images/previews/countdown/countdown_bday_s.PNG'
            ],
            medium: [
                'images/previews/countdown/countdown_m.PNG',
                'images/previews/countdown/countdown_col_m.PNG'
            ],
            large: [
                'images/previews/countdown/countdown_l.PNG',
                'images/previews/countdown/countdown_col_l.png'
            ]
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
        templateFile: 'widgets/MyCountdowns.js'
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
            small: [
                'images/previews/quotes/quote_s.png',
                'images/previews/quotes/quote_s_1.png',
                'images/previews/quotes/quote_s_2.png',
                'images/previews/quotes/quote_s_3.png'
            ],
            medium: [
                'images/previews/quotes/quote_m_1.png',
                'images/previews/quotes/quote_m_2.png',
                'images/previews/quotes/quote_m_3.png',
                'images/previews/quotes/quote_m_4.png'
            ],
            large: [
                'images/previews/quotes/quote_l_1.png',
                'images/previews/quotes/quote_l_2.png'
            ]
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
        templateFile: 'widgets/MyQuotes.js'
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
            small: [
                'images/previews/weather/weather_s_1.PNG',
                'images/previews/weather/weather_s_2.png',
                'images/previews/weather/weather_showcase_s.png'
            ],
            medium: [
                'images/previews/weather/weather_showcase.png'
            ],
            large: [
                'images/previews/weather/weather_showcase.png'
            ]
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
        templateFile: 'widgets/MinimalWeather.js'
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
            small: [
                'images/previews/timeprogress/timeprogress_s_1.png',
                'images/previews/timeprogress/timeprogress_s_2.png',
                'images/previews/timeprogress/timeprogress_s_3.png',
                'images/previews/timeprogress/timeprogress_s_4.png',
                'images/previews/timeprogress/timeprogress_s_5.png',
                'images/previews/timeprogress/timeprogress_s_6.png',
                'images/previews/timeprogress/timeprogress_s_7.png'
            ],
            medium: [
                'images/previews/timeprogress/timeprogress_m_1.png',
                'images/previews/timeprogress/timeprogress_m_2.png'
            ],
            large: [
                'images/previews/timeprogress/timeprogress_l.png'
            ]
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
        templateFile: 'widgets/ModularTimeProgress.js'
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
            small: [
                'images/placeholder.png'
            ],
            medium: [
                'images/placeholder.png'
            ],
            large: [
                'images/placeholder.png'
            ]
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
        templateFile: 'widgets/OpenWeatherAQI.js'
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
            small: [
                'images/previews/birthday/birthday_s.png'
            ],
            medium: [
                'images/previews/birthday/birthday_showcase.png'
            ],
            large: [
                'images/previews/birthday/birthday_showcase.png'
            ]
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
        templateFile: 'widgets/HowOldmi.js'
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
            small: [
                'images/previews/schedule/schedule_s.png',
                'images/previews/schedule/schedule_s_1.png'
            ],
            medium: [
                'images/previews/schedule/schedule_m.png'
            ],
            large: [
                'images/previews/schedule/schedule_l.png',
                'images/previews/schedule/schedule_l_1.png'
            ]
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
        templateFile: 'widgets/MyUniSchedule.js'
    }
};

// Export for use in main.js
window.WIDGETS_DATA = WIDGETS_DATA;
