const fs = require('fs');

// Read the file
let content = fs.readFileSync('./assets/songs.json', 'utf8');

// Remove JavaScript-style comments at the end
content = content.replace(/\/\/.*$/gm, '');

// Fix the structure: each song is in its own array [], we need one single array
// Pattern: ],\n[\n replaces with just ,\n
content = content.replace(/\],\s*\n*\s*\[/g, ',');

// The main problem: lyrics have literal newlines inside the JSON strings
// We need to find strings and escape the newlines within them

// Strategy: Process the file line by line, detecting when we're inside a string value
// and when we're outside. Escape newlines inside strings.

// Actually, a simpler approach: extract each song object by matching the pattern
// and manually reconstruct
const songPattern = /\{\s*"number":\s*(\d+),\s*"title":\s*"([^"]*(?:\\.[^"]*)*)"/g;

// Even simpler: use a state machine to escape newlines inside strings
let result = '';
let inString = false;
let prevChar = '';

for (let i = 0; i < content.length; i++) {
    const char = content[i];

    if (char === '"' && prevChar !== '\\') {
        inString = !inString;
        result += char;
    } else if (inString && (char === '\n' || char === '\r')) {
        // Escape newline inside string
        if (char === '\n') {
            result += '\\n';
        } else if (char === '\r') {
            // Skip \r, will use \n for consistency
        }
    } else if (inString && char === '\t') {
        result += '\\t';
    } else {
        result += char;
    }

    prevChar = char;
}

// Remove trailing commas before closing brackets
result = result.replace(/,\s*\]/g, ']');

// Ensure it starts with [ and ends with ]
result = result.trim();
if (!result.startsWith('[')) {
    result = '[' + result;
}
if (!result.endsWith(']')) {
    result = result + ']';
}

try {
    // Parse to validate
    const songs = JSON.parse(result);

    // Clean up each song
    const cleanedSongs = songs.map((song, index) => {
        // Trim title (collapse multiple spaces to one)
        const title = (song.title || '').replace(/\s+/g, ' ').trim();

        // Clean lyrics - trim but preserve the escaped newlines
        const lyrics = (song.lyrics || '').trim();

        return {
            number: song.number || index + 1,
            title: title,
            category: song.category || 'Hymn',
            lyrics: lyrics,
            key: song.key || 'G',
            author: song.author || '...',
            isFavorite: song.isFavorite || false
        };
    });

    // Write the fixed JSON with proper formatting
    fs.writeFileSync('./assets/songs.json', JSON.stringify(cleanedSongs, null, 2), 'utf8');
    console.log(`Successfully fixed ${cleanedSongs.length} songs!`);
} catch (error) {
    console.error('Error parsing JSON:', error.message);
    // Write intermediate for debugging
    fs.writeFileSync('./assets/songs-debug.json', result.substring(0, 5000), 'utf8');
    console.log('Debug file written (first 5000 chars)');
}
