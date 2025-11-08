# Jellio (Fork)

This is a fork of [Vanchaxy’s Jellio plugin](https://github.com/vanchaxy/jellio), which connects Jellyfin to Stremio so you can stream your Jellyfin library inside Stremio.
This fork is updated for **Jellyfin 10.11.2**.

All credit for the original work goes to Vanchaxy. This version includes small updates to keep the plugin working with the latest Jellyfin release.

---

## Install

**Option 1: From Repository**

1. In Jellyfin, go to **Dashboard → Plugins → Repositories**
2. Add this URL:

   ```
   https://raw.githubusercontent.com/InfiniteAvenger/jellio-jellyfin10.11.x/metadata/jellyfin-repo-manifest.json
   ```
3. Go to **Plugins → Catalog**, find **Jellio**, and install it
4. Restart Jellyfin

**Option 2: Manual**

1. Download the latest `.zip` from [Releases](https://github.com/InfiniteAvenger/jellio-jellyfin10.11.x/releases)
2. Extract it to your Jellyfin plugins folder

   * Windows: `C:\ProgramData\Jellyfin\Server\plugins\Jellio\`
   * Linux: `/var/lib/jellyfin/plugins/Jellio/`
   * Docker: `/config/plugins/Jellio/`
3. Restart Jellyfin

---

## Setup

1. Open the plugin at:

   ```
   https://<your-jellyfin-server>/jellio
   ```
2. Add your Jellyseer **API Key** and Jellyseer address.
3. Choose which libraries (Movies, TV Shows) to expose
4. Copy the generated addon URL
5. In Stremio, go to **Addons → Community Addons → Add via URL**, paste it, and install

---

## Requirements

* Jellyfin 10.11.0 or higher
* .NET 9 (included with Jellyfin 10.11.x)
* Stremio with internet access to your Jellyfin server
