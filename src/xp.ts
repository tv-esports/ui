interface LevelRole {
    level: number;
    xpRequired: number;
    role: string;
}

export function progressBar(currentXP: number, xpRequired: number) {
    const progress = Math.floor((currentXP / xpRequired) * 100);
    const remaining = 100 - progress;
  
    const validProgress = Math.min(Math.max(progress, 0), 100);
    const validRemaining = Math.min(Math.max(remaining, 0), 100);
  
    const progressBarString = generateColoredProgressBar(validProgress, validRemaining);
  
    return {
      progressBarString,
      missingXP: xpRequired - currentXP,
    };
  }

  function generateColoredProgressBar(progress: number, remaining: number) {
    const colorMap = ['░', '█']; // Swap the order of colors
    const progressBarArray = [];

    for (let i = 0; i < progress; i++) {
        progressBarArray.push(colorMap[1]); // Use the color for progress
    }

    for (let i = 0; i < remaining; i++) {
        progressBarArray.push(colorMap[0]); // Use the color for remaining
    }

    return progressBarArray.join('');
}


export function calculateXPForNextLevel(currentLevel: number) {
    const nextLevelData = levelRoles.find((role) => role.level === currentLevel + 1);

    if (nextLevelData) {
        return nextLevelData.xpRequired;
    } else {
        // Return a default value if the next level data is not found
        return -1; // You can return any default value indicating no next level or handle it accordingly
    }
}

export const levelRoles: LevelRole[] = [
    { level: 0, xpRequired: 100, role: '1184213602304016484' },
    { level: 1, xpRequired: 155, role: '1184213602304016484' },
    { level: 2, xpRequired: 220, role: '1184213602304016484' },
    { level: 3, xpRequired: 295, role: '1184213655173206157' },
    { level: 4, xpRequired: 380, role: '1184213655173206157' },
    { level: 5, xpRequired: 475, role: '1184213655173206157' },
    { level: 6, xpRequired: 580, role: '1184213655173206157' },
    { level: 7, xpRequired: 695, role: '1184213655173206157' },
    { level: 8, xpRequired: 820, role: '1184213655173206157' },
    { level: 9, xpRequired: 955, role: '1184213655173206157' },
    { level: 10, xpRequired: 1100, role: '1184213710831628401' },
    { level: 11, xpRequired: 1255, role: '1184213710831628401' },
    { level: 12, xpRequired: 1420, role: '1184213710831628401' },
    { level: 13, xpRequired: 1595, role: '1184213710831628401' },
    { level: 14, xpRequired: 1780, role: '1184213710831628401' },
    { level: 15, xpRequired: 1975, role: '1184213710831628401' },
    { level: 16, xpRequired: 2180, role: '1184213710831628401' },
    { level: 17, xpRequired: 2395, role: '1184213710831628401' },
    { level: 18, xpRequired: 2620, role: '1184213710831628401' },
    { level: 19, xpRequired: 2855, role: '1184213710831628401' },
    { level: 20, xpRequired: 3100, role: '1184213752992772247' },
    { level: 21, xpRequired: 3355, role: '1184213752992772247' },
    { level: 22, xpRequired: 3620, role: '1184213752992772247' },
    { level: 23, xpRequired: 3895, role: '1184213752992772247' },
    { level: 24, xpRequired: 4180, role: '1184213752992772247' },
    { level: 25, xpRequired: 4475, role: '1184213752992772247' },
    { level: 26, xpRequired: 4780, role: '1184213752992772247' },
    { level: 27, xpRequired: 5095, role: '1184213752992772247' },
    { level: 28, xpRequired: 5420, role: '1184213752992772247' },
    { level: 29, xpRequired: 5755, role: '1184213752992772247' },
    { level: 30, xpRequired: 6100, role: '1184213752992772247' },
    { level: 31, xpRequired: 6455, role: '1184213752992772247' },
    { level: 32, xpRequired: 6820, role: '1184213752992772247' },
    { level: 33, xpRequired: 7195, role: '1184213752992772247' },
    { level: 34, xpRequired: 7580, role: '1184213752992772247' },
    { level: 35, xpRequired: 7975, role: '1184213792230490263' },
    { level: 36, xpRequired: 8380, role: '1184213792230490263' },
    { level: 37, xpRequired: 8795, role: '1184213792230490263' },
    { level: 38, xpRequired: 9220, role: '1184213792230490263' },
    { level: 39, xpRequired: 9655, role: '1184213792230490263' },
    { level: 40, xpRequired: 10100, role: '1184213792230490263' },
    { level: 41, xpRequired: 10555, role: '1184213792230490263' },
    { level: 42, xpRequired: 11020, role: '1184213792230490263' },
    { level: 43, xpRequired: 11495, role: '1184213792230490263' },
    { level: 44, xpRequired: 11980, role: '1184213792230490263' },
    { level: 45, xpRequired: 12475, role: '1184213792230490263' },
    { level: 46, xpRequired: 12980, role: '1184213792230490263' },
    { level: 47, xpRequired: 13495, role: '1184213792230490263' },
    { level: 48, xpRequired: 14020, role: '1184213792230490263' },
    { level: 49, xpRequired: 14555, role: '1184213792230490263' },
    { level: 50, xpRequired: 15100, role: '1186953493806845994' },
];