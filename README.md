# Friend-ready personal gaming website

Inspired by the **structure** of https://about.japwhite.fr/ — profile home, settings and devices, skins, and gaming setup. This is an original design and codebase, with no age counter or date-of-birth field.

## Open it

1. Unzip the folder.
2. Double-click `index.html` to open the home page in your browser. All pages work locally, without a server or installation.
3. Click the **Settings**, **Skins**, and **Setup** tabs to view the other pages.

## Make it yours

Open `config.js` in Notepad or VS Code and change the values between quotes.

- **Name and intro:** `name`, `shortName`, `handle`, `headline`, `description`, `note`.
- **Avatar:** place your own `avatar.png` under `assets/`, then set `avatarImage: 'assets/avatar.png'`.
- **Colors:** edit `accent` and `accentSecondary` (hex colors).
- **osu! profile:** set `osuUsername` to enable the real profile button. No rank or pp is invented or fetched.
- **Social links:** fill in the `url` values. Leave a URL blank to show a faded, non-clickable placeholder.
- **Settings:** `settings` object. Rapid-trigger and in-game values are examples until you edit them.
- **Gear:** add, remove, or rename objects in `gear`.
- **Skins:** edit the `skins` array. They're **illustrative demo entries**, not real downloads. Add your own names and `https://` download links to turn them into a real library. Filter buttons already work.

Only change the text **inside the quotes**, keeping commas and brackets intact. In `headline`, the single `<span>` is there to style the slash. You can replace the rest of the text.

## Publishing

This is a static site, so you can upload the extracted files to GitHub Pages, Netlify, or Cloudflare Pages. Upload **all files together**, keeping `assets/` as a folder.

### Quick hosting with Netlify Drop

1. Visit https://app.netlify.com/drop
2. Drag the extracted `friend-profile-site` folder into the upload area.
3. Netlify provides a public URL. Edit `config.js` locally and re-upload the folder when you want to change content.

## Files

- `index.html` — home
- `settings.html` — settings & devices
- `skins.html` — filterable skins
- `setup.html` — hardware setup
- `config.js` — **all editable content**
- `assets/site.js` — rendering, menus, and filters
- `assets/styles.css` — all styling
- `assets/favicon.svg` — site icon

No framework, npm, third-party tracking, or external dependencies are used. The site works offline and is mobile-friendly.

## Privacy check before sharing

- This template contains no personal logins, tokens, local file links, analytics, or tracking scripts. It does **not** have permission to inspect files elsewhere on the computer.
- Opening `index.html` from a Windows PC may show a browser address like `file:///C:/Users/YourWindowsName/Downloads/friend-profile-site/index.html`. That is **only the local file location shown in your browser**, not data embedded in the website. It will not be the public URL when uploaded to hosting.
- Replace `PlayerName`, profile links, and demo hardware in `config.js` with your friend's details before publishing. Every blank social URL is a disabled placeholder.
- When posting on GitHub, the **repository/owner name and commit metadata** can be public. If your friend wants the site under their identity, have them upload it from **their** GitHub account or use their own hosting.
- Do not upload other files from your computer, or any photos with unwanted metadata. Upload only the contents of this folder.


## Speed player visual and sound button

The homepage's animated hitcircle illustration is built from local HTML/CSS; it is not linked to any external account. The sound button plays the local `assets/do-not-redeem.mp3` only when clicked. To replace the clip, put another MP3 at that path, or update the audio `src` in `assets/site.js`.


## Dempsey's settings (screenshots supplied)
Updated the Settings page with osu!standard 1920x1080 fullscreen at 360 Hz, basically unlimited framerate, legacy audio on, 2 ms global offset, 100% dim, T/H keys, Wooting 60HE actuation 0.80 mm and RT activate/release 0.30/0.20 mm (continuous RT off), Wacom CTL-672 OpenTabletDriver area 77x49 mm at -90 degrees, NuPhy BH65, Alienware AW2725DF monitor, and Bose QuietComfort 25 headphones.

## Tablet firmware link
Settings page lists Dempsey’s Wacom CTL-672 1000 Hz custom firmware, with an external link to https://files.shav.it/osu/tablet/. This website does not contain a firmware download or update code. Flashing custom firmware is at the hardware owner’s discretion; follow the source’s precautions.

The homepage section cards remain, but the “Explore my corner” title and the “Three tabs” tagline have been removed.


## Dempsey social links

Home has a clickable osu! profile button and active osu!, Twitch, YouTube, and Discord links (https://discord.gg/htquJgpPdd). Change them in `config.js` under `osuUsername` and `socials`.


### Site theme and card captions

Uses the five-color palette: `#2C3E50`, `#34495E`, `#7F8C8D`, `#BDC3C7`, `#ECF0F1`.
The homepage Skins Library card caption now says **list of skins I use**.

The card image screenshots from the latest messages were not available as source files when this version was packaged, so the existing previews have been kept.


## Skins library

The Skins page now shows just vv_idke_trail and _• xishu, with links to the user's supplied skins.osuck.net pages. Filter controls and six demonstration skins were removed. Preview pictures are osu! gameplay images previously provided for this website, not independently confirmed screenshots from the specific skin versions. To change a preview, replace the image in `assets/` or edit the `preview` entry in `config.js`.
