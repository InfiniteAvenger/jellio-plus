using System;
using Jellyfin.Data.Enums;
using MediaBrowser.Controller.Dto;
using MediaBrowser.Controller.Library;
using MediaBrowser.Model.Dto;
using MediaBrowser.Model.Library;

namespace Jellyfin.Plugin.Jellio.Helpers;

public static class LibraryHelper
{
    internal static BaseItemDto[] GetUserLibraries(Guid userId, IUserManager userManager, IUserViewManager userViewManager, IDtoService dtoService)
    {
        var user = userManager.GetUserById(userId);
        if (user == null)
        {
            return Array.Empty<BaseItemDto>();
        }

        var query = new UserViewQuery { User = user };
        var folders = userViewManager.GetUserViews(query);

        var dtoOptions = new DtoOptions(false);
        var dtos = Array.ConvertAll(folders, i => dtoService.GetBaseItemDto(i, dtoOptions, user));
        return Array.FindAll(
            dtos,
            dto =>
                dto.Type is BaseItemKind.CollectionFolder
                && dto.CollectionType is CollectionType.tvshows or CollectionType.movies
        );
    }
}
