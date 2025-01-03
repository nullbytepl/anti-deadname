# Anti-Deadname PW 🏳️‍⚧️💥

### [Install here!](https://nd.pedali.ca/)

This userscript visually replaces deadnames and words in gramatical forms (in case of Polish) with your chosen ones on university websites.

**This is PURELY VISUAL and ONLY VISIBLE TO YOU.**

Currently, the script only works on select WUT's (PW - Politechnika Warszawska) websites:
- [USOS PW](https://usosweb.usos.pw.edu.pl/)
- [Leon PW](https://leon.pw.edu.pl/)
- [Studia3 ELKA PW](https://studia.elka.pw.edu.pl/)
- [Studia2 ELKA PW](https://studia2.elka.pw.edu.pl/)

In the future, the script might support more websites and other universities.

## Installation

(If you don't like reading simply head to the [script's page](https://nd.pedali.ca/))

1. Install an userscript manager. I recommend [Violentmonkey](https://violentmonkey.github.io/). 
   If you want to use the script on mobile, Firefox for Android supports extensions, so you can use Violentmonkey there.
2. Go to the [script's page](https://nd.pedali.ca/) and click install. If you installed an userscript manager, it should prompt you to install the script. Confirm the installation.
3. Go to any supported website and you will be redirected to the settings page. Set your preferred name, gramatical gender and your favourite emoji (mine is ";p" but you can have fun with it!).
4. Settings are saved automatically. You can change them at any time by going to the [script's homepage](https://nd.pedali.ca/) again.

## Privacy
This script operates around a very sensitive topic. I understand the privacy concerns that come with it.

The script or the website does not collect any data. The settings are stored in your browser's local storage and are not shared with anyone. The script does not communicate with any servers. No third party websites can see your settings.

The page and build process happens fully on Cloudflare's pages service. Cloudflare does log general analytics (i.e. country-level geolocation data based on your IP), but nothing identifying is stored. 

The script does not use any third party libraries or services.

The script built on the website is fully replicable on your own machine. Simply run a release build (as described later in this document) and the generated script will be 1:1 identical to the one on the website.

## Technical bs
The script is built in a VERY overcomplicated way, but that also makes it extendable. The whole thing is built in Typescript, compiled with Webpack using custom plugins (see [headers/](headers/)). 

The script abstracts DOM apis using a simple `para_html` submodule (see [para_html.ts](src/utils/para_html.ts)). This allows for easy manipulation of the DOM and makes the script less prone to error (i.e manipulating an objet that doesn't exist).

The support for pages is built by creating a `Site` abstract class (see [site.ts](src/model/site.ts)). Every implementation of a site (i.e. `UsosSiteImpl` or `LeonSiteImpl`) implements this class and has methods that check whether the user is currently on the page and the method that replaces the text.

### Building
1. Install Node.js and npm.
2. Install dependencies with `npm install`
3. To build a development version, run `npx webpack --config .\webpack\dev.ts`. This will generate a file called `out/bundle.dev.js`. You can serve this file with any http server (e.g. `python -m http.server`) and install it in your userscript manager. Depending on your userscript manager of choice, you might need to rename it to `bundle.user.js` first, though.
4. To build a production version, run `npx webpack --config .\webpack\release.ts`. This will generate a file called `out/bundle.user.js`. This file is minified and has a smaller size than the development version. The generated file is identical to the one on the website, provided the same code is used.

To replicate a Cloudflare Pages build, run `npx webpack --config .\webpack\release.ts` with `CF_PAGES` environment variable set to `true`. This will generate `bundle.user.js` in the `web/` directory instead of `out/`.
