using System.Net.Mime;
using System.Reflection;
using Jellyfin.Plugin.Jellio.Helpers;
using MediaBrowser.Controller;
using MediaBrowser.Controller.Dto;
using MediaBrowser.Controller.Library;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Jellyfin.Plugin.Jellio.Controllers;

[ApiController]
[Route("jellio")]
public class WebController : ControllerBase
{
    private readonly IUserManager _userManager;
    private readonly IUserViewManager _userViewManager;
    private readonly IDtoService _dtoService;
    private readonly IServerApplicationHost _serverApplicationHost;
    private readonly Assembly _executingAssembly = Assembly.GetExecutingAssembly();

    public WebController(
        IUserManager userManager,
        IUserViewManager userViewManager,
        IDtoService dtoService,
        IServerApplicationHost serverApplicationHost
    )
    {
        _userManager = userManager;
        _userViewManager = userViewManager;
        _dtoService = dtoService;
        _serverApplicationHost = serverApplicationHost;
    }

    [HttpGet]
    [HttpGet("configure")]
    [HttpGet("{config?}/configure")]
    public IActionResult GetIndex(string? config = null)
    {
        const string ResourceName = "Jellyfin.Plugin.Jellio.Web.index.html";

        var resourceStream = _executingAssembly.GetManifestResourceStream(ResourceName);

        if (resourceStream == null)
        {
            return NotFound($"Resource {ResourceName} not found.");
        }

        return new FileStreamResult(resourceStream, "text/html");
    }

    [Authorize]
    [HttpGet("server-info")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [Produces(MediaTypeNames.Application.Json)]
    public IActionResult GetServerInfo()
    {
        var user = RequestHelpers.GetCurrentUser(User, _userManager);
        if (user == null)
        {
            return Unauthorized();
        }

        var friendlyName = _serverApplicationHost.FriendlyName;
        var libraries = LibraryHelper.GetUserLibraries(user, _userViewManager, _dtoService);

        return Ok(new { name = friendlyName, libraries });
    }
}
