const fs = require("fs");

const BASE_URL = "https://screencaps.sakuta.app"

let finalObject = {
    imageAmount: 0,
    animeAmount: 0,
    images: []
};


// Create Object
fs.readdirSync("./").forEach(dir => {
    if(!isNaN(dir)) {
        finalObject.animeAmount++;
        fs.readdirSync(`./${dir}/`).forEach(file => {
            finalObject.imageAmount++;
            finalObject.images.push({
                anime: dir,
                fileName: file,
                url: `${BASE_URL}/${dir}/${file}`
            });
        });
    }
});


// Write index.json
fs.writeFile("index.json", JSON.stringify(finalObject), (err) => {
    if(err) throw err;
});


// Write README.md
const readme = `# sakutaapp/screencaps

![GitHub repo size](https://img.shields.io/github/repo-size/sakutaapp/screencaps?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/sakutaapp/screencaps?style=flat-square)
![Image amount](https://img.shields.io/badge/images-${finalObject.imageAmount}-success?style=flat-square)
![Anime amount](https://img.shields.io/badge/animes-${finalObject.animeAmount}-success?style=flat-square)

This repository features **${finalObject.imageAmount}** screencaps from a total of **${finalObject.animeAmount}** animes. These can be used for websites or e.g. as wallpapers. An index of all images can be found in JSON format [here](https://screencaps.sakuta.app/index.json)!

## Contribution Guidelines
- Place images into a folder for the anime they're from. As the folder name, use the Sakuta/AniList ID of the anime.
- Whilst images may contain characters, they should not be the main focus of the image.
- Images may not contain any spoilers.
- Images may not contain any NSFW content.
- The main focus of the images should be landscapes or cityscapes.
- Images may not contain any subtitles or similar.
- After adding images, please run \`node index-creator.js\`. (NodeJS needs to be installed for this!)

Tip: You can find good screencaps [here](https://fancaps.net/)!`;

fs.writeFile("README.md", readme, (err) => {
    if(err) throw err;
});