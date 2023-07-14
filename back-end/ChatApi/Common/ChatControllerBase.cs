using System.Net;
using ChatApi.Common.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace ChatApi.Common
{
  public class ChatControllerBase : ControllerBase
  {
    protected static IActionResult MapFailedResult(Result result)
    {
      if (result.IsSuccess)
        throw new ResultSuccessException();

      var error = result.Error;
    
      return error.ErrorCode switch
      {
        HttpStatusCode.BadRequest => new BadRequestObjectResult(error),
        HttpStatusCode.NotFound => new NotFoundObjectResult(error),
        _ => throw new NotImplementedException(
          "The mapper from failed result to action result does not have this scenario implemented.")
      };
    }
  
    protected static ActionResult<T> MapFailedResult<T>(Result result)
    {
      if (result.IsSuccess)
        throw new ResultSuccessException();

      var error = result.Error;
    
      return error.ErrorCode switch
      {
        HttpStatusCode.BadRequest => new BadRequestObjectResult(error),
        HttpStatusCode.NotFound => new NotFoundObjectResult(error),
        _ => throw new NotImplementedException(
          "The mapper from failed result to action result does not have this scenario implemented.")
      };
    }
  }
}