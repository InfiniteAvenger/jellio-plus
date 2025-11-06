using System;
using System.Security.Claims;
using Jellyfin.Data.Queries;
using MediaBrowser.Controller.Devices;
using MediaBrowser.Controller.Entities;
using MediaBrowser.Controller.Library;

namespace Jellyfin.Plugin.Jellio.Helpers;

public static class RequestHelpers
{
    internal static Guid? GetCurrentUserId(ClaimsPrincipal claimsPrincipal)
    {
        var userIdString = claimsPrincipal.FindFirstValue("Jellyfin-UserId");

        if (string.IsNullOrEmpty(userIdString))
        {
            return null;
        }

        if (!Guid.TryParse(userIdString, out var userIdGuid))
        {
            return null;
        }

        return userIdGuid;
    }

    internal static User? GetCurrentUser(ClaimsPrincipal claimsPrincipal, IUserManager userManager)
    {
        var userId = GetCurrentUserId(claimsPrincipal);
        return userId == null ? null : userManager.GetUserById(userId.Value);
    }

    internal static Guid? GetUserIdByAuthToken(
        string authToken,
        IDeviceManager deviceManager
    )
    {
        var items = deviceManager
            .GetDevices(new DeviceQuery { AccessToken = authToken, Limit = 1 })
            .Items;

        return items.Count == 0 ? null : items[0].UserId;
    }
}
