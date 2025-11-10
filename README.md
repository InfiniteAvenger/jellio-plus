# Jellio+# Jellio+ 🎬# Jellio+ 🎬# Jellio (Fork)
> Stream your Jellyfin library directly in Stremio with seamless integration

[![Jellyfin Version](https://img.shields.io/badge/Jellyfin-10.11.x-blue)](https://jellyfin.org/)> **Stream your Jellyfin library directly in Stremio with seamless integration**

[![.NET](https://img.shields.io/badge/.NET-9.0-purple)](https://dotnet.microsoft.com/)

[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

[![Release](https://img.shields.io/github/v/release/InfiniteAvenger/jellio-plus)](https://github.com/InfiniteAvenger/jellio-plus/releases)

[![Jellyfin Version](https://img.shields.io/badge/Jellyfin-10.11.x-blue)](https://jellyfin.org/)> **Stream your Jellyfin library directly in Stremio with seamless integration**This is a fork of [Vanchaxy’s Jellio plugin](https://github.com/vanchaxy/jellio), which connects Jellyfin to Stremio so you can stream your Jellyfin library inside Stremio.

Jellio+ is a modern fork of [Vanchaxy's original Jellio plugin](https://github.com/vanchaxy/jellio), updated and enhanced for **Jellyfin 10.11.x** compatibility. This plugin creates a bridge between your Jellyfin media server and Stremio, allowing you to stream your personal media library directly within the Stremio interface.

[![.NET](https://img.shields.io/badge/.NET-9.0-purple)](https://dotnet.microsoft.com/)

## Features

[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)This fork is updated for **Jellyfin 10.11.2**.

- **Full Library Integration** - Access your entire Jellyfin movie and TV show collection in Stremio

- **Smart Search** - Find content across your Jellyfin libraries with Stremio's search functionality  [![Release](https://img.shields.io/github/v/release/InfiniteAvenger/jellio-plus)](https://github.com/InfiniteAvenger/jellio-plus/releases)

- **Cross-Platform** - Works on all Stremio-supported devices (Windows, macOS, Linux, Android, iOS)

- **Jellyseer Integration** - Optional integration with Jellyseer for content requests[![Jellyfin Version](https://img.shields.io/badge/Jellyfin-10.11.x-blue)](https://jellyfin.org/)

- **High Performance** - Optimized for Jellyfin 10.11.x with .NET 9

- **Secure Access** - Respects Jellyfin user permissions and authenticationJellio+ is a modern fork of [Vanchaxy's original Jellio plugin](https://github.com/vanchaxy/jellio), updated and enhanced for **Jellyfin 10.11.x** compatibility. This plugin creates a bridge between your Jellyfin media server and Stremio, allowing you to stream your personal media library directly within the Stremio interface.

- **Rich Metadata** - Displays posters, descriptions, ratings, and cast information

- **Multiple Formats** - Supports various video codecs and quality options[![.NET](https://img.shields.io/badge/.NET-9.0-purple)](https://dotnet.microsoft.com/)All credit for the original work goes to Vanchaxy. This version includes small updates to keep the plugin working with the latest Jellyfin release.



## Screenshots## ✨ Features



### Browsing Your Library in Stremio[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

![Jellio Streaming in Stremio](assets/jellio-stream.PNG)

*Access your Jellyfin movies with full metadata, multiple quality options, and streaming sources*- 🎭 **Full Library Integration** - Access your entire Jellyfin movie and TV show collection in Stremio



### Content Discovery and Requests- 🔍 **Smart Search** - Find content across your Jellyfin libraries with Stremio's search functionality  [![Release](https://img.shields.io/github/v/release/InfiniteAvenger/jellio-plus)](https://github.com/InfiniteAvenger/jellio-plus/releases)---

![Jellyseer Integration](assets/jellyseer-integration.PNG)  

*Browse and discover content with Jellyseer integration for seamless requesting*- 📱 **Cross-Platform** - Works on all Stremio-supported devices (Windows, macOS, Linux, Android, iOS)



## Quick Start- 🎯 **Jellyseer Integration** - Optional integration with Jellyseer for content requests



### Installation- ⚡ **High Performance** - Optimized for Jellyfin 10.11.x with .NET 9



**Method 1: Repository Installation (Recommended)**- 🔐 **Secure Access** - Respects Jellyfin user permissions and authenticationJellio+ is a modern fork of [Vanchaxy's original Jellio plugin](https://github.com/vanchaxy/jellio), updated and enhanced for **Jellyfin 10.11.x** compatibility. This plugin creates a bridge between your Jellyfin media server and Stremio, allowing you to stream your personal media library directly within the Stremio interface.## Install



1. Open Jellyfin Dashboard > **Plugins** > **Repositories**- 🎨 **Rich Metadata** - Displays posters, descriptions, ratings, and cast information

2. Add the repository URL:

   ```- 📺 **Multiple Formats** - Supports various video codecs and quality options

   https://raw.githubusercontent.com/InfiniteAvenger/jellio-plus/metadata/jellyfin-repo-manifest.json

   ```

3. Navigate to **Plugins** > **Catalog**

4. Search for "Jellio" and click **Install**## 🖼️ Screenshots## ✨ Features**Option 1: From Repository**

5. Restart your Jellyfin server



**Method 2: Manual Installation**

### Browsing Your Library in Stremio

1. Download the latest release from [GitHub Releases](https://github.com/InfiniteAvenger/jellio-plus/releases)

2. Extract the ZIP file to your Jellyfin plugins directory:

   - **Windows**: `C:\ProgramData\Jellyfin\Server\plugins\Jellio\`

   - **Linux**: `/var/lib/jellyfin/plugins/Jellio/`*Access your Jellyfin movies with full metadata, multiple quality options, and streaming sources*- 🎭 **Full Library Integration** - Access your entire Jellyfin movie and TV show collection in Stremio1. In Jellyfin, go to **Dashboard → Plugins → Repositories**

   - **Docker**: `/config/plugins/Jellio/`

3. Restart Jellyfin



### Configuration### Content Discovery & Requests- 🔍 **Smart Search** - Find content across your Jellyfin libraries with Stremio's search functionality  2. Add this URL:



1. **Access Plugin Settings**![Jellyseer Integration] 

   ```

   https://your-jellyfin-server:8096/jellio*Browse and discover content with Jellyseer integration for seamless requesting*- 📱 **Cross-Platform** - Works on all Stremio-supported devices (Windows, macOS, Linux, Android, iOS)

   ```



2. **Configure Libraries**

   - Select which Jellyfin libraries to expose (Movies, TV Shows, etc.)## 🚀 Quick Start- 🎯 **Jellyseer Integration** - Optional integration with Jellyseer for content requests   ```

   - Set content filtering preferences



3. **Jellyseer Integration** (Optional)

   - Add your Jellyseer server URL### Installation- ⚡ **High Performance** - Optimized for Jellyfin 10.11.x with .NET 9   https://raw.githubusercontent.com/InfiniteAvenger/jellio-plus/metadata/jellyfin-repo-manifest.json

   - Enter your Jellyseer API key

   - Enable request functionality



4. **Generate Addon URL****Method 1: Repository Installation (Recommended)**- 🔐 **Secure Access** - Respects Jellyfin user permissions and authentication   ```

   - Copy the generated Stremio addon URL

   - Note: This URL is unique to your setup



5. **Install in Stremio**1. Open Jellyfin Dashboard → **Plugins** → **Repositories**- 🎨 **Rich Metadata** - Displays posters, descriptions, ratings, and cast information3. Go to **Plugins → Catalog**, find **Jellio**, and install it

   - Open Stremio > **Addons** > **Community Addons**

   - Click **Add via URL**2. Add the repository URL:

   - Paste your addon URL and install

   ```- 📺 **Multiple Formats** - Supports various video codecs and quality options4. Restart Jellyfin




## Support

   - Paste your addon URL and install

- **Bug Reports**: [GitHub Issues](https://github.com/InfiniteAvenger/jellio-plus/issues)

- **Discussions**: [GitHub Discussions](https://github.com/InfiniteAvenger/jellio-plus/discussions)   ```   ```

- **Documentation**: [Wiki](https://github.com/InfiniteAvenger/jellio-plus/wiki)
