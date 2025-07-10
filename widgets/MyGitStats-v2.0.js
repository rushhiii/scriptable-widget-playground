// icon-color: black; icon-glyph: chalkboard-teacher;

const username = "rushhiii"; // replace with your github username
const token = Keychain.get("github_token"); // replace this with you token

// const size = config.widgetFamily || "large";
const size = config.widgetFamily || "medium";
// const size = config.widgetFamily || "small";


const themePresets = {
  auto: Device.isUsingDarkAppearance()
    ? { colors: ["#000244", "#000233", "#000000"], locations: [0.0, 0.5, 1.0], head: "#ffffff", text: "#909692", acc: "#3094ff" }
    : { colors: ["#e6f2f1", "#bff2c2"], locations: [0, 1], head: "#000000", text: "#5a615c", acc: "#006edb" },


  blue: {
    // colors: ["#0d1117", "#1E2838", "#1f6feb"],
    // locations: [1.0, 0.5, 0.0],
    // head: "#ffffff", text: "#c0c0c0", acc: "#58a6ff"
    colors: ["#0A0C1C", "#121C3C", "#263B73"],
    locations: [0, 0.5, 1],
    head: "#ffffff",
    text: "#c0c0c0",
    acc: "#8ac7ff"

  },
  gray: {
    colors: [
      "#202631", // Cloudy navy gray
      "#2D3440", // Muted slate
      "#3C4454", // Blue-gray storm cloud
      "#525D6F", // Electric gray blue
      "#7A8699"  // Lighter edge storm sky
    ],
    locations: [0.0, 0.25, 0.5, 0.75, 1.0],
    head: "#EAEAEA",       // soft lightning white
    text: "#C7CCD5",       // light gray
    acc: "#8AB4F8"         // stormy blue accent

  },
  night: {
    colors: [
      "#000000", // Pure black
      "#04050A", // Subtle hint of navy
      "#0A0F1A", // Faint cool midnight
      "#111827"  // Deep twilight blue-gray
    ],
    locations: [0.0, 0.4, 0.75, 1.0],
    head: "#ffffff",        // bright title/icon
    text: "#B0B8C0",        // soft gray text
    acc: "#42A5F5"
  },
  day: {
    colors: [
      "#E1F5FE", // Very light sky blue
      "#B3E5FC", // Soft cyan
      "#81D4FA", // True sky blue
      "#4FC3F7", // Deeper cyan
      "#29B6F6"  // iOS-like vibrant blue
    ],
    locations: [0.0, 0.25, 0.5, 0.75, 1.0],
    head: "#000000",        // dark title/icon
    text: "#32555f",         // bluish-gray text
    acc: "#007AFF"          // standard iOS accent blue

  },

  gitgreen: {
    colors: ["#defefa", "#bfffd1"],
    locations: [0, 1],
    head: "#000000", text: "#5a615c", acc: "#000000"
  },
  green: {
    colors: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    locations: [0.0, 0.25, 0.5, 0.75, 1.0],
    head: "#0a0e27", // 0a0e27
    text: "#000000",
    acc: "#216e39"
  },
  indigo: {
    colors: ["#000244", "#000233", "#000000"],
    locations: [0, 0.5, 1],
    head: "#ffffff", text: "#909692", acc: "#ffffff"
  },
  dark: {
    colors: ["#101411", "#101411"],
    locations: [0, 1],
    head: "#ffffff", text: "#909692", acc: "#3094ff"
  },
  light: {
    colors: ["#ffffff", "#ffffff"],
    locations: [0, 1],
    head: "#000000", text: "#5a615c", acc: "#006edb"
  }
};

const heatmapThemes = {
  auto: Device.isUsingDarkAppearance()
    ? {
      bg: ["#0d1117", "#0d1117", "#0d1117"],
      text: "#ffffff",
      accent: "#56d364",
      box: ["#2e2f37", "#196c2e", "#196c2e", "#2ea043", "#56d364"]
    }
    : {
      bg: ["#ffffff", "#ffffff", "#ffffff"],
      text: "#000000",
      accent: size === "small" ? "#A0A0A0" : "#116329",
      box: ["#eff2f5", "#aceebb", "#4ac26b", "#2da44e", "#116329"]
    },
  light: {
    bg: ["#ffffff", "#ffffff", "#ffffff"],
    text: "#000000",
    accent: size === "small" ? "#A0A0A0" : "#116329",
    box: ["#eff2f5", "#aceebb", "#4ac26b", "#2da44e", "#116329"]
  },
  dark: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#ffffff",
    accent: "#56d364",
    box: ["#2e2f37", "#196c2e", "#196c2e", "#2ea043", "#56d364"]
  },
  red: {
    bg: ["#1e1e1e", "#1e1e1e", "#1e1e1e"],
    text: "#ffffff",
    accent: "#fd4c56",
    box: ["#3a2e30", "#5f2f31", "#ad3b39", "#ae3c3c", "#fd4c56"]
  },
  green: {
    bg: ["#ebedf0", "#9be9a8", "#40c463"],
    text: "#0a0e27",
    accent: "#216e39",
    box: ["#CACACA", "#9be9a8", "#40c463", "#30a14e", "#216e39"]
  },
  // New themes added below
  forestCalm: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#e9f5db",
    accent: "#95d5b2",
    box: ["#0d1b1e", "#1b4332", "#2d6a4f", "#52b788", "#95d5b2"]
  },
  forestCanopy: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#f4a261",
    accent: "#80ffdb",
    box: ["#0d1b1e", "#1d3a3f", "#3a7d44", "#57cc99", "#80ffdb"]
  },
  cyberPurple: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#ffffff",
    accent: "#c77dff",
    box: ["#1a1a2e", "#4b0082", "#6a0dad", "#9b59b6", "#c77dff"]
  },
  sunsetGold: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#ffffff",
    accent: "#fcd34d",
    box: ["#1a1a1a", "#a05a2c", "#e76f51", "#f4a261", "#fcd34d"]
  },
  nordBlueV1: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#00bfff",
    accent: "#ffd700",
    box: ["#1a1a2e", "#113f67", "#1c7293", "#00bfff", "#ffd700"]
  },
  nordBlueV2: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#c9d1d9",
    accent: "#43D0FF",
    box: ["#1a1a2e", "#113f67", "#1c7293", "#0086B3", "#43D0FF", "#ffd700"]
  },
  sunsetDusk: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#f9c74f",
    accent: "#ff8e9e",
    box: ["#1e1e2e", "#42275a", "#734b6d", "#b06ab3", "#ff8e9e"]
  },
  earthyWarm: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#7fb069",
    accent: "#fae588",
    box: ["#1a120b", "#3c2a21", "#9a5b13", "#d4a017", "#fae588"]
  },
  arcticIce: {
    bg: ["#0d1117", "#0d1117", "#0d1117"],
    text: "#ff6d00",
    accent: "#e0e1dd",
    box: ["#050505", "#1b263b", "#415a77", "#778da9", "#e0e1dd"]
  }
};


const langColors = {
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  TypeScript: "#2b7489",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Go: "#00ADD8",
  Ruby: "#701516",
  Shell: "#89e051",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Rust: "#dea584",
  Dart: "#00B4AB"
};


const rawParam = args.widgetParameter || "";
// const rawParam = args.widgetParameter || "heatmap,forestCalm";
// const parts = rawParam.toLowerCase().split(",").map(s => s.trim());
const parts = rawParam.split(",").map(s => s.trim());

// With this improved version:
let isHeatmap = parts.includes("heatmap");
let repoPath = "";
let statType = "";
let themeParam = "";

// First pass - look for stat type and repo path
for (let part of parts) {
  if (part === "heatmap") continue;
  
  if (["stars", "commits", "views", "currstreak", "contributions", "allcommits", "repos", "longstreak", "followers", "following", "issues", "prs"].includes(part)) {
    statType = part;
  } else if (part.includes("/")) {
    repoPath = part;
  }
}

// Second pass - look for theme (prioritize heatmap themes if in heatmap mode)
for (let part of parts) {
  if (part === "heatmap") continue;
  
  if (isHeatmap && heatmapThemes[part]) {
    themeParam = part;
    break;
  } else if (!isHeatmap && themePresets[part]) {
    themeParam = part;
    break;
  }
}

// Default theme if none specified
if (!themeParam) {
  themeParam = isHeatmap ? "auto" : "auto";
}


const UI = {
  small: { font: 12, headfont: 24, lineSpacing: 4, logo: 26, pad: 10 },
  medium: { font: 13, headfont: 24, lineSpacing: 5, logo: 38, pad: 14 },
  large: { font: 14, headfont: 26, lineSpacing: 6, logo: 55, pad: 16 }
}[size];

const now = new Date();
const year = now.getFullYear();
const shortyearLabel = `${year.toString().slice(-2)}`;
const thisYearStart = new Date(year, 0, 1).toISOString();
const today = now.toISOString();


const selectedTheme = themePresets[themeParam];

function getHeatmapColor(count) {
  const boxes = heatmapThemes[themeParam].box;
  if (count === 0) return new Color(boxes[0]);
  if (count >= 20) return new Color(boxes[4]);
  if (count >= 10) return new Color(boxes[3]);
  if (count >= 5) return new Color(boxes[2]);
  if (count >= 1) return new Color(boxes[1]);
  return new Color(boxes[0]);
}

function createGradientBackground() {
  const theme = heatmapThemes[themeParam];
  const gradient = new LinearGradient();
  gradient.colors = theme.bg.map(c => new Color(c));
  gradient.locations = [0.0, 0.5, 1.0];
  return gradient;
}

function makeGradient(theme) {
  const g = new LinearGradient();
  g.colors = theme.colors.map(c => new Color(c));
  g.locations = theme.locations;
  return g;
}

// === GRAPHQL Query ===
const graphQLQuery = `
{
  user(login: "${username}") {
    contributionsThisYear: contributionsCollection(from: "${thisYearStart}", to: "${today}") {
      totalCommitContributions
    }
    contributionsAllTime: contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
    pullRequests(states: [OPEN, MERGED, CLOSED]) { totalCount }
    issues(states: [OPEN, CLOSED]) { totalCount }
    repositories(first: 100, isFork: false) {
      nodes {
        stargazerCount
        defaultBranchRef {
          target {
            ... on Commit {
              history { totalCount }
            }
          }
        }
      }
    }
  }
}`;
async function fetchGraphQLStats() {
  const req = new Request("https://api.github.com/graphql");
  req.method = "POST";
  req.headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
  req.body = JSON.stringify({ query: graphQLQuery });

  const json = await req.loadJSON();
  const user = json.data.user;

  const commits2025 = user.contributionsThisYear.totalCommitContributions;
  const totalContributions = user.contributionsAllTime.contributionCalendar.totalContributions;
  const totalPRs = user.pullRequests.totalCount;
  const totalIssues = user.issues.totalCount;
  const totalCommits = user.repositories.nodes.reduce((sum, repo) =>
    sum + (repo.defaultBranchRef?.target?.history?.totalCount || 0), 0);
  const totalStars = user.repositories.nodes.reduce((sum, repo) =>
    sum + (repo.stargazerCount || 0), 0);


  const allDays = user.contributionsAllTime.contributionCalendar.weeks.flatMap(w => w.contributionDays);
  const todayStr = new Date().toISOString().split("T")[0];

  let currentStreak = 0;
  for (let i = allDays.length - 1; i >= 0; i--) {
    const d = allDays[i];
    if (d.date === todayStr) continue;
    if (d.contributionCount > 0) currentStreak++;
    else break;
  }

  let longestStreak = 0, temp = 0;
  for (const d of allDays) {
    if (d.contributionCount > 0) {
      temp++;
      longestStreak = Math.max(temp, longestStreak);
    } else temp = 0;
  }

  return {
    commits2025,
    totalCommits,
    totalContributions,
    totalPRs,
    totalIssues,
    currentStreak,
    longestStreak,
    totalStars
  };
}

async function fetchUserInfo() {
  const req = new Request(`https://api.github.com/users/${username}`);
  req.headers = { Authorization: `Bearer ${token}` };
  return await req.loadJSON();
}

async function fetchTopLanguage(limit = 12) {
  // async function fetchTopLanguagesShortform(limit = 6) {
  const req = new Request(`https://api.github.com/users/${username}/repos?per_page=100`);
  req.headers = { Authorization: `Bearer ${token}` };
  const data = await req.loadJSON();

  const langCount = {};
  let total = 0;

  for (let repo of data) {
    const lang = repo.language;
    if (lang) {
      langCount[lang] = (langCount[lang] || 0) + 1;
      total++;
    }
  }

  const shortMap = {
    JavaScript: "JS", TypeScript: "TS", Python: "PY", Java: "JAVA",
    C: "C", "C++": "CPP", "C#": "CS", HTML: "HTML", CSS: "CSS",
    PHP: "PHP", Ruby: "RB", Shell: "SH", Go: "GO", Kotlin: "KT",
    Swift: "SW", Rust: "RS", Dart: "DART"
  };

  return Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([lang, count]) => {
      const short = shortMap[lang] || lang.slice(0, 3).toUpperCase();
      const percent = ((count / total) * 100).toFixed(1) + "%";
      return [short, percent, lang]; // ← return full info
    });
}

async function fetchRepoStat(repoPath, statType) {
  let json = {};
  let repoName = "";
  let repoUrl = "";

  if (repoPath) {
    const req = new Request(`https://api.github.com/repos/${repoPath}`);
    req.headers = { Authorization: `Bearer ${token}` };
    json = await req.loadJSON();
    repoName = json?.name || repoPath.split("/")[1];
    repoUrl = json?.html_url || `https://github.com/${repoPath}`;
  }

  const ghStats = await fetchGraphQLStats();
  // console.log(ghStats);
  // console.log("currentStreak:", ghStats?.currentStreak);

  const userInfo = await fetchUserInfo();

  // fallback display name
  const title = repoPath ? repoName : username;
  const link = repoPath ? repoUrl : `https://github.com/${username}`;

  // let value = 0;
  // let label = "";


  let statValue = 0;
  let type = "";
  if (statType === "stars") {
    statValue = json.stargazers_count;
    type = "stars";
  } else if (statType === "commits") {
    statValue = ghStats.commits2025;
    type = `${year} commits`;
  } else if (statType === "views") {
    // const viewsReq = new Request(`${repoUrl}/traffic/views`);
    // viewsReq.headers = headers;
    const viewsReq = new Request(`${baseUrl}/traffic/views`);
    viewsReq.headers = { Authorization: `Bearer ${token}` };

    const views = await viewsReq.loadJSON();
    statValue = views.count || 0;
    type = "views";
  } else if (statType === "currstreak") {
    statValue = ghStats.currentStreak;
    type = "current streak";
  } else if (statType === "contributions") {
    statValue = ghStats.totalContributions;
    type = "contributions";
  } else if (statType === "allcommits") {
    statValue = ghStats.totalCommits;
    type = "total commits";
  } else if (statType === "repos") {
    statValue = userInfo.public_repos;
    type = "repos";
  } else if (statType === "longstreak") {
    statValue = ghStats.longestStreak;
    type = "longest streak";
  } else if (statType === "followers") {
    statValue = userInfo.followers;
    type = "Followers";
  } else if (statType === "following") {
    statValue = userInfo.following;
    type = "Following";
  } else if (statType === "prs") {
    statValue = ghStats.totalPRs;
    type = "PRs";
  } else if (statType === "issues") {
    statValue = ghStats.totalIssues;
    type = "Total Issues";
  }

  // return { label, value, title, link };
  return {
    name: json.name,
    statValue,
    url: json.html_url,
    type
  };
}

async function fetchHeatmapData() {
  const now = new Date();
  const fromDate = new Date(now);
  fromDate.setDate(now.getDate() - 133); // ~19 weeks

  const query = `{
    user(login: "${username}") {
      contributionsCollection(from: "${fromDate.toISOString()}", to: "${now.toISOString()}") {
        totalCommitContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }`;

  const req = new Request("https://api.github.com/graphql");
  req.method = "POST";
  req.headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
  req.body = JSON.stringify({ query });

  const json = await req.loadJSON();
  const contribData = json.data.user.contributionsCollection;

  // calculate streak
  const allDays = contribData.contributionCalendar.weeks.flatMap(w => w.contributionDays);
  const todayStr = new Date().toISOString().split("T")[0];
  let currentStreak = 0;
  for (let i = allDays.length - 1; i >= 0; i--) {
    const d = allDays[i];
    if (d.date === todayStr) continue;
    if (d.contributionCount > 0) currentStreak++;
    else break;
  }

  return {
    ...contribData,
    currentStreak
  };
}

function calculateCurrentStreak(weeks) {
  const allDays = weeks.flatMap(w => w.contributionDays);
  const todayStr = new Date().toISOString().split("T")[0];

  let currentStreak = 0;
  for (let i = allDays.length - 1; i >= 0; i--) {
    const d = allDays[i];
    if (d.date === todayStr) continue;
    if (d.contributionCount > 0) currentStreak++;
    else break;
  }

  return currentStreak;
}


async function createHeatmapWidget() {
  const data = await fetchHeatmapData();
  const weeks = data.contributionCalendar.weeks;
  const total = data.contributionCalendar.totalContributions;
  const streak = data.currentStreak;

  const widget = new ListWidget();
  widget.backgroundGradient = createGradientBackground();
  widget.setPadding(11, 11, 11, 11);
  widget.addSpacer();

  const grid = widget.addStack();
  grid.layoutHorizontally();
  grid.centerAlignContent();

  const boxSize = 13;
  const boxSpacing = 3;
  const displayWeeks = weeks;

  grid.addSpacer();

  for (let w = 0; w < displayWeeks.length; w++) {
    const col = grid.addStack();
    col.layoutVertically();
    col.spacing = boxSpacing;

    for (let d = 0; d < 7; d++) {
      const day = displayWeeks[w].contributionDays[d];
      const cell = col.addStack();
      cell.size = new Size(boxSize, boxSize);
      cell.backgroundColor = getHeatmapColor(day?.contributionCount || 0);
      cell.cornerRadius = 2;
    }
    grid.addSpacer(boxSpacing);
  }

  grid.addSpacer();
  widget.addSpacer();

  const footer = widget.addStack();
  footer.layoutHorizontally();
  footer.centerAlignContent();

  footer.addSpacer(12);
  const totalText = footer.addText(`${streak} `);
  totalText.textColor = new Color(heatmapThemes[themeParam]?.accent || "#00ff4e");
  totalText.font = Font.heavySystemFont(12);
  const totalText2 = footer.addText(`day streak`);
  totalText2.textColor = new Color(heatmapThemes[themeParam]?.text || "#ffffff");
  totalText2.font = Font.mediumSystemFont(11);

  footer.addSpacer();

  const contribText = footer.addText(`+${total} `);
  contribText.textColor = new Color(heatmapThemes[themeParam]?.accent || "#00ff4e");
  contribText.font = Font.heavySystemFont(12);
  const contribText2 = footer.addText(`contributions`);
  contribText2.textColor = new Color(heatmapThemes[themeParam]?.text || "#ffffff");
  contribText2.font = Font.mediumSystemFont(11);

  footer.addSpacer(12);
  widget.addSpacer();

  return widget;
}

async function createHeatmapSmallWidget() {
  const data = await fetchHeatmapData();
  const weeks = data.contributionCalendar.weeks.slice(-7); // last 5 weeks
  // const weeks = data.contributionCalendar.weeks.slice(-7).reverse();
  const widget = new ListWidget();
  widget.backgroundGradient = createGradientBackground();
  // widget.setPadding(10, 10, 10, 10);
  widget.useDefaultPadding();

  widget.addSpacer();

  // === Header: Month + GitHub logo ===
  const header = widget.addStack();
  header.layoutHorizontally();
  header.centerAlignContent();

  const monthName = new Date().toLocaleDateString("en-US", { month: "long" });
  const monthText = header.addText(monthName);
  // const monthText = header.addText(`September`);
  monthText.font = Font.semiboldSystemFont(UI.headfont - 6);
  monthText.textColor = new Color(heatmapThemes[themeParam]?.text || "#ffffff");

  header.addSpacer();

  const logoImg = await new Request("https://i.imgur.com/MJzROGa.png").loadImage();

  // const githubLogo = SFSymbol.named("logo.github");
  const logo = header.addImage(logoImg);
  logo.imageSize = new Size(UI.logo - 2, UI.logo - 2);
  logo.tintColor = new Color(heatmapThemes[themeParam].text);

  // header.addSpacer(0);
  widget.addSpacer(5);

  // === Grid (5x7) ===
  const grid = widget.addStack();
  grid.layoutHorizontally();
  grid.centerAlignContent();

  const boxSize = 18;
  const boxSpacing = 2;


  // grid.addSpacer();
  const days = ["S", "M", "T", "W", "T", "F", "S"];



  for (let w = 0; w < weeks.length; w++) {
    const col = grid.addStack();
    col.layoutVertically();
    col.spacing = boxSpacing;

    const labelWrap = col.addStack();
    labelWrap.layoutHorizontally();
    labelWrap.size = new Size(boxSize, boxSize); // restricts label width
    labelWrap.centerAlignContent(); // center horizontally

    // addSpacer() on both sides for dead-center label
    // labelWrap.addSpacer();
    const label = labelWrap.addText(days[w]);
    label.font = Font.systemFont(UI.font); // slight bump from -2
    label.textColor = new Color(heatmapThemes[themeParam].accent);
    label.centerAlignText();
    label.lineLimit = 1;
    // label.minimumScaleFactor = 0.5;
    // labelWrap.addSpacer();
    // col.addSpacer(2);


    for (let d = 0; d < 5; d++) {
      const day = weeks[w].contributionDays[d];
      const cell = col.addStack();
      cell.size = new Size(boxSize, boxSize);
      cell.backgroundColor = getHeatmapColor(day?.contributionCount || 0);
      cell.cornerRadius = 2;
    }

    grid.addSpacer(2);
  }

  widget.addSpacer();

  return widget;
}

function formatNumber(value) {
  value = parseInt(value);
  if (!value) return "0";
  if (value < 1000) return value.toString();
  const units = ["k", "m", "b", "t"];
  const order = Math.floor(Math.log10(value) / 3);
  const num = (value / Math.pow(1000, order)).toFixed(1).replace(/\.0$/, "");
  return num + units[order - 1];
}

async function createWidget() {
  const userInfo = await fetchUserInfo();
  const language = await fetchTopLanguage();
  const ghStats = await fetchGraphQLStats();

  const showRepoStats =
    [
      "stars", "commits", "views",
      "currstreak", "contributions", "allcommits",
      "repos", "longstreak", "followers", "following",
      "issues", "prs"
    ].includes(statType);

  const repoStats = showRepoStats ? await fetchRepoStat(repoPath, statType) : null;
  const logoImg = await new Request("https://i.imgur.com/MJzROGa.png").loadImage();

  const w = new ListWidget();
  w.backgroundGradient = makeGradient(selectedTheme);

  const headClr = new Color(selectedTheme.head);
  const textClr = new Color(selectedTheme.text);
  const accClr = new Color(selectedTheme.acc);

  const data = { userInfo, language, ghStats, repoStats, logoImg, headClr, textClr, accClr };

  switch (size) {
    case "small": renderSmallLayout(w, data); break;
    case "medium": renderMediumLayout(w, data); break;
    case "large": renderLargeLayout(w, data); break;
  }

  w.url = `https://github.com/${username}`;


  return w;
}


function renderSmallLayout(w, { userInfo, language, ghStats, repoStats, logoImg, headClr, textClr, accClr }) {

  w.useDefaultPadding();


  const f = (UI.font) - 1;
  const addLine = (label, value, icon = "") => {
    const isZero = !value || value === 0;
    const line = w.addText(`${icon} ${label}: ${isZero ? "" : formatNumber(value)}`);
    line.font = Font.mediumSystemFont(f);
    line.textColor = isZero ? Color.gray() : textClr;
    line.lineLimit = 1;
    line.opacity = isZero ? 0.5 : 1;
    w.addSpacer(UI.lineSpacing);
  };


  if (repoStats) {
    const row = w.addStack();
    row.layoutHorizontally();
    row.centerAlignContent();

    const head = row.addText(username);
    head.font = Font.mediumSystemFont(UI.headfont);
    head.textColor = headClr;
    // head.lineLimit = 2;
    head.minimumScaleFactor = 0.6;

    row.addSpacer();

    const offset = (UI.logo) + 5;
    const img = row.addImage(logoImg);
    img.imageSize = new Size(offset, offset);
    img.tintColor = headClr; // any accent color

    w.addSpacer();
    const stat = w.addText(formatNumber(repoStats.statValue));
    stat.font = Font.mediumSystemFont(UI.headfont + 12); // 36 = 24 + 12
    stat.textColor = accClr;

    // const statTitle = w.addText(`${repoStats.name} (${repoStats.type})`);
    // statTitle.font = Font.systemFont(UI.font);
    // statTitle.textColor = textClr;
    if (repoPath) {
      const statTitle = w.addText(`${repoStats.name} (${repoStats.type})`);
      statTitle.font = Font.systemFont(UI.font);
      statTitle.textColor = textClr;
    } else {
      const statTitle = w.addText(`${repoStats.type}`);
      statTitle.font = Font.systemFont(UI.font);
      statTitle.textColor = textClr;
    }
  } else {
    w.addSpacer(0);

    const header = w.addStack();
    header.layoutHorizontally();
    header.centerAlignContent();

    const title = header.addText(`${username}'s GitHub Stats`);
    title.font = Font.boldSystemFont(UI.font);
    title.textColor = headClr;
    title.lineLimit = 2;
    header.addSpacer();
    const logo = header.addImage(logoImg);
    logo.imageSize = new Size(UI.logo, UI.logo);
    logo.tintColor = headClr;

    // w.addSpacer(UI.lineSpacing);
    // w.addSpacer(6);
    w.addSpacer();

    // max 5
    addLine("Curr Streak", `${ghStats.currentStreak} d`, "🔥");
    addLine(`Commits ('${shortyearLabel})`, ghStats.commits2025, "🕒");
    addLine("Contributions", ghStats.totalContributions, "📅");
    // addLine("PRs", ghStats.totalPRs, "🔃");
    addLine("Repos", userInfo.public_repos, "📦");
    addLine("Followers", userInfo.followers, "👥");
    // addLine("Following", userInfo.following, "🔄");
    // if (language) addLine("Top Language", language, "💻");
    // addLine("Total Commits (all-time)", ghStats.totalCommits, "📜");
    // addLine("Total Issues", ghStats.totalIssues, "❗");
    // addLine("Repos", userInfo.public_repos, "📦");
    // addLine("Longest Streak", `${ghStats.longestStreak} days`, "🏆");
    w.addSpacer();

  }

}

function renderMediumLayout(w, { userInfo, language, ghStats, logoImg, headClr, textClr, accClr }) {
  w.setPadding(UI.pad, UI.pad, UI.pad, UI.pad);
  w.addSpacer();

  const header = w.addStack();
  header.layoutHorizontally();
  header.centerAlignContent(); // bottomAlignContent

  const title = header.addText(`${username}'s GitHub Stats`);
  title.font = Font.boldSystemFont(UI.headfont);
  title.textColor = headClr;
  title.minimumScaleFactor = 0.8;
  title.lineLimit = 2;

  header.addSpacer();

  const logo = header.addImage(logoImg);
  logo.imageSize = new Size(UI.logo, UI.logo);
  logo.tintColor = headClr;

  w.addSpacer();


  const grid = w.addStack();
  grid.layoutHorizontally();
  // grid.centerAlignContent();


  const addTo = (stack, label, value, icon) => {
    if (!value || value === 0 || value === "0") return;
    const line = stack.addText(`${icon} ${label}: ${(value)}`);
    line.font = Font.mediumSystemFont(UI.font);
    line.textColor = textClr;
    line.opacity = 1;
    stack.addSpacer(UI.lineSpacing);
  };


  const col1 = grid.addStack();
  col1.layoutVertically();


  // addTo(col1, "Public Repos", userInfo.public_repos, "📦");
  // addTo(col1, "Followers", userInfo.followers, "👥");
  // // addTo(col1, "Commits (2025)", ghStats.commits2025, "🕒");
  // addTo(col1, `Commits('${shortyearLabel})`, ghStats.commits2025, "🕒");
  // addTo(col1, "Streak", `${ghStats.currentStreak}d`, "🔥"); 

  // addTo(col1, "Stars Earned", ghStats.totalStars, "⭐");
  // addTo(col1, `Commits ('${shortyearLabel})`, ghStats.commits2025, "🕒");
  // addTo(col1, "Total Commits", ghStats.totalCommits, "📜");
  // addTo(col1, "Issues", ghStats.totalIssues, "❗");
  // addTo(col1, "PRs", ghStats.totalPRs, "🔃");

  addTo(col1, "Stars Earned", formatNumber(ghStats.totalStars), "⭐");
  addTo(col1, `Commits ('${shortyearLabel})`, formatNumber(ghStats.commits2025), "🕒");
  addTo(col1, "Total Commits", formatNumber(ghStats.totalCommits), "📜");
  addTo(col1, "Issues", formatNumber(ghStats.totalIssues), "❗");
  addTo(col1, "PRs", formatNumber(ghStats.totalPRs), "🔃");


  // const col3 = grid.addStack();
  // col3.layoutVertically();

  grid.addSpacer(25);

  const col2 = grid.addStack();
  col2.layoutVertically();
  // col2.rightAlignText();

  // addTo(col2, "Issues", ghStats.totalIssues, "❗");
  addTo(col2, "Streak", `${ghStats.currentStreak}d`, "🔥");
  addTo(col2, "Longest", `${ghStats.longestStreak}d`, "🏆");
  addTo(col2, "Public Repos", userInfo.public_repos, "📦");
  addTo(col2, "Followers", userInfo.followers, "👥");
  // addTo(col2, "Top Language", language, "💻");


  // Only add row if value is not 0 or falsy
  // const addTo = (label, value, icon) => {
  //   if (!value || value === 0) return;
  //   const row = w.addStack();
  //   row.layoutHorizontally();
  //   const txt = row.addText(`${icon} ${label}: ${formatNumber(value)}`);
  //   txt.font = Font.mediumSystemFont(UI.font);
  //   txt.textColor = textClr;
  //   txt.opacity = 1;
  //   w.addSpacer(UI.lineSpacing);
  // };


  //   // if (language) addLine("Top Language", language, "💻");
  // // max 5
  // addLine("Current Streak", `${ghStats.currentStreak} days`, "🔥");
  // // addLine("Longest Streak", `${ghStats.longestStreak} days`, "🏆");
  // addLine(`Commits (${year})`, ghStats.commits2025, "🕒");
  // // addLine(`Commits ('${shortyearLabel})`, ghStats.commits2025, "🕒");
  // addLine("Total Commits (all-time)", ghStats.totalCommits, "📜");
  // addLine("Contributions", ghStats.totalContributions, "📅");
  // addLine("Public Repos", userInfo.public_repos, "📦");
  // // addLine("Total Issues", ghStats.totalIssues, "❗");
  // // addLine("PRs", ghStats.totalPRs, "🔃");
  // // if (language) addLine("Top Language", language, "💻");
  // // addLine("Followers", userInfo.followers, "👥");
  // // addLine("Following", userInfo.following, "🔄");


  w.addSpacer();
}

function renderLargeLayout(w, { userInfo, language, ghStats, logoImg, headClr, textClr, accClr }) {
  w.setPadding(UI.pad, UI.pad, UI.pad, UI.pad);
  w.addSpacer(0);

  const header = w.addStack();
  header.layoutHorizontally();
  header.centerAlignContent(); // bottomAlignContent

  const title = header.addText(`${username}'s GitHub Stats`);
  title.font = Font.boldSystemFont(UI.headfont);
  title.textColor = headClr;
  title.minimumScaleFactor = 0.8;
  title.lineLimit = 2;

  header.addSpacer();

  const logo = header.addImage(logoImg);
  logo.imageSize = new Size(UI.logo, UI.logo);
  logo.tintColor = headClr;

  w.addSpacer();


  const grid = w.addStack();
  grid.layoutHorizontally();
  // grid.centerAlignContent();

  const addTo = (stack, label, value, icon) => {
    if (!value || value === 0 || value === "0") return;
    const line = stack.addText(`${icon} ${label}: ${value}`);
    line.font = Font.mediumSystemFont(UI.font);
    line.textColor = Color.lightGray(); // textClr Color.gray()
    line.opacity = 1;
    stack.addSpacer(UI.lineSpacing);
  };




  const col2 = grid.addStack();
  col2.layoutVertically();
  // col2.rightAlignText();

  // addTo(col2, "Issues", ghStats.totalIssues, "❗");
  addTo(col2, "Streak", `${ghStats.currentStreak}d`, "🔥");
  addTo(col2, "Longest", `${ghStats.longestStreak}d`, "🏆");
  addTo(col2, "Public Repos", userInfo.public_repos, "📦");
  addTo(col2, "Followers", userInfo.followers, "👥");


  grid.addSpacer(25);


  const col1 = grid.addStack();
  col1.layoutVertically();

  addTo(col1, "Stars Earned", formatNumber(ghStats.totalStars), "⭐");
  addTo(col1, `Commits ('${shortyearLabel})`, formatNumber(ghStats.commits2025), "🕒");
  addTo(col1, "Total Commits", formatNumber(ghStats.totalCommits), "📜");
  addTo(col1, "Issues", formatNumber(ghStats.totalIssues), "❗");
  addTo(col1, "PRs", formatNumber(ghStats.totalPRs), "🔃");



  w.addSpacer(7);

  const subtitle = w.addText("💻 Top Language:");;
  subtitle.font = Font.mediumSystemFont(UI.font + 1);
  subtitle.textColor = new Color("#D4D4D4"); // textClr Color.gray()

  w.addSpacer(5);

  // const topLangs = language;

  const langGrid = w.addStack();
  langGrid.layoutHorizontally();

  const langCol1 = langGrid.addStack();
  langCol1.layoutVertically();
  langCol1.spacing = UI.lineSpacing;

  langGrid.addSpacer(10)

  const langCol2 = langGrid.addStack();
  langCol2.layoutVertically();
  langCol2.spacing = UI.lineSpacing;

  for (let i = 0; i < language.length; i++) {
    const [short, percent, original] = language[i];
    const colorHex = langColors[original] || "#cccccc";
    const dot = "●";

    const lineStack = (i < Math.ceil(language.length / 2) ? langCol1 : langCol2).addStack();
    lineStack.layoutHorizontally();

    const dotText = lineStack.addText(dot);
    dotText.textColor = new Color(colorHex);
    dotText.font = Font.mediumSystemFont(UI.font + 1);
    lineStack.addSpacer(5);

    const labelText = lineStack.addText(`${short} ${percent}`);
    labelText.textColor = Color.lightGray();
    labelText.font = Font.mediumSystemFont(UI.font);
  }

  // addTo(col1, "Total Stars Earned", ghStats.totalStars, "⭐");
  // addTo(col1, "Public Repos", userInfo.public_repos, "📦");
  // addTo(col1, "Followers", userInfo.followers, "👥");
  // addTo(col1, `Commits ('${year})`, ghStats.commits2025, "🕒");
  // addTo(col1, "Total Commits", ghStats.totalCommits, "📜");
  // addTo(col1, "Issues", ghStats.totalIssues, "❗");
  // addTo(col1, "PRs", ghStats.totalPRs, "🔃");
  // addTo(col1, "Streak", `${ghStats.currentStreak}d`, "🔥");
  // addTo(col1, "Longest", `${ghStats.longestStreak}d`, "🏆");

  w.addSpacer();

}

// ===================================
const widget = isHeatmap
  ? (size === "small" ? await createHeatmapSmallWidget() : await createHeatmapWidget())
  : await createWidget();

// if (!config.runsInWidget) await widget.presentSmall();
if (!config.runsInWidget && size === "small") await widget.presentSmall();
else if (!config.runsInWidget && size === "medium") await widget.presentMedium();
else if (!config.runsInWidget && size === "large") await widget.presentLarge();
Script.setWidget(widget);
Script.complete();