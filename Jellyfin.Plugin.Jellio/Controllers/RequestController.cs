using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using Jellyfin.Plugin.Jellio.Helpers;
using Jellyfin.Plugin.Jellio.Models;
using Microsoft.AspNetCore.Mvc;

namespace Jellyfin.Plugin.Jellio.Controllers;

[ApiController]
[ConfigAuthorize]
[Route("jellio/{config}/jellyseerr")]
public class RequestController : ControllerBase
{
    private static HttpClient CreateHttpClient(string baseUrl, string? apiKey)
    {
        var client = new HttpClient
        {
            BaseAddress = new Uri(baseUrl.TrimEnd('/') + "/")
        };
        client.Timeout = TimeSpan.FromSeconds(10);
        if (!string.IsNullOrWhiteSpace(apiKey))
        {
            client.DefaultRequestHeaders.Add("X-Api-Key", apiKey);
        }

        return client;
    }

    [HttpGet]
    public async Task<IActionResult> CreateRequest(
        [ConfigFromBase64Json] ConfigModel? config,
        [FromQuery] string type,
        [FromQuery] int? tmdbId,
        [FromQuery] string? imdbId,
        [FromQuery] string? title,
        [FromQuery] int? season,
        [FromQuery] int? episode
    )
    {
        if (config is null)
        {
            return BadRequest("Invalid or missing configuration.");
        }

        if (!config.JellyseerrEnabled || string.IsNullOrWhiteSpace(config.JellyseerrUrl))
        {
            return BadRequest("Jellyseerr is not configured.");
        }

        int? maybeTmdbId = tmdbId;

        try
        {
            using var client = CreateHttpClient(config.JellyseerrUrl!, config.JellyseerrApiKey);

            // Resolve TMDB ID via Jellyseerr search if not provided
            if (maybeTmdbId is null)
            {
                if (string.IsNullOrWhiteSpace(title))
                {
                    return Problem("Either tmdbId or title parameter is required.", statusCode: 400);
                }

                var searchUri = $"api/v1/search?query={Uri.EscapeDataString(title!)}";
                using var resp = await client.GetAsync(searchUri);
                if (resp.IsSuccessStatusCode)
                {
                    using var doc = JsonDocument.Parse(await resp.Content.ReadAsStreamAsync());
                    if (doc.RootElement.TryGetProperty("results", out var results) && results.ValueKind == JsonValueKind.Array)
                    {
                        foreach (var el in results.EnumerateArray())
                        {
                            var mediaType = el.TryGetProperty("mediaType", out var mt) ? mt.GetString() : null;
                            if (!string.IsNullOrEmpty(mediaType) && string.Equals(mediaType, type, StringComparison.OrdinalIgnoreCase))
                            {
                                if (el.TryGetProperty("id", out var idEl) && idEl.TryGetInt32(out var idVal))
                                {
                                    maybeTmdbId = idVal;
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            if (maybeTmdbId is null)
            {
                return Problem("Unable to resolve TMDB id for request.", statusCode: 502);
            }

            int id = maybeTmdbId.Value;
            int[]? seasons = null;
            if (string.Equals(type, "tv", StringComparison.OrdinalIgnoreCase))
            {
                // Always request the entire season if a season is specified
                if (season.HasValue)
                {
                    seasons = new[] { season.Value };
                }
            }

            var body = new
            {
                mediaType = string.Equals(type, "tv", StringComparison.OrdinalIgnoreCase) ? "tv" : "movie",
                mediaId = id,
                seasons
            };

            using var createResp = await client.PostAsJsonAsync("api/v1/request", body);
            if (createResp.IsSuccessStatusCode)
            {
                // Return a simple success message
                // Stremio will attempt to play this URL, fail gracefully, but the request is already sent
                return Content("✓ Content request sent to Jellyseerr successfully!", "text/plain");
            }

            return Problem($"Jellyseerr request failed with status {(int)createResp.StatusCode}.", statusCode: 502);
        }
        catch
        {
            return Problem("Could not reach Jellyseerr.", statusCode: 502);
        }
    }
}
