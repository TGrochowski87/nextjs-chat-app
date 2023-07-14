using System.Net;
using ChatApi.Common.Exceptions;

namespace ChatApi.Common
{
  public record Error
  {
    public HttpStatusCode ErrorCode { get; private set; }

    public string Message { get; private set; }

    public List<Error> Details { get; private set; }

    public Exception InnerException { get; private set; }

    public Error(HttpStatusCode errorCode, string message, List<Error>? details = null, Exception? innerException = null)
    {
      ErrorCode = errorCode;
      Message = message;
      Details = details ?? new List<Error>();
      InnerException = innerException ?? new NoException();
    }

    public static Error FromException(Exception exception)
    {
      return new Error(HttpStatusCode.InternalServerError, exception.Message, innerException: exception.InnerException);
    }
  }
}