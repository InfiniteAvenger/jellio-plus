using System;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Jellyfin.Plugin.Jellio.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;

namespace Jellyfin.Plugin.Jellio.Helpers;

public class Base64JsonModelBinder : IModelBinder
{
    public Task BindModelAsync(ModelBindingContext bindingContext)
    {
        ArgumentNullException.ThrowIfNull(bindingContext);

        var value = bindingContext.ValueProvider.GetValue(bindingContext.ModelName).FirstValue;
        if (string.IsNullOrWhiteSpace(value))
        {
            // Return success with null value - let controller/filter handle it
            bindingContext.Result = ModelBindingResult.Success(null);
            return Task.CompletedTask;
        }

        try
        {
            var json = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(value));
            var result = JsonSerializer.Deserialize<ConfigModel>(json);
            
            // Return success even if deserialization returns null
            bindingContext.Result = ModelBindingResult.Success(result);
            return Task.CompletedTask;
        }
        catch
        {
            // Return success with null on error - let controller/filter handle it
            bindingContext.Result = ModelBindingResult.Success(null);
            return Task.CompletedTask;
        }
    }
}
