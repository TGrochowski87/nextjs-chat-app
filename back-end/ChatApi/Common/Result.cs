using System.Net;
using ChatApi.Common.Exceptions;

namespace ChatApi.Common
{
  public class Result<T> : Result
  {
    private readonly T _value;

    public T Value => IsSuccess ? _value : throw new ResultFailureException();

    internal Result(T value, bool isSuccess, Error? error) 
      : base(isSuccess, error)
    {
      _value = value;
    }

    public static implicit operator Result<T>(T value)
    {
      if (value is Result<T> resultValue)
      {
        return new Result<T>(resultValue.Value, resultValue.IsSuccess, resultValue.Error);
      }

      return Success(value);
    }
  }

  public class Result
  {
    private readonly Error? _error;
  
    public bool IsSuccess { get; }
    public bool IsFailure => !IsSuccess;

    public Error Error => _error ?? throw new ResultSuccessException();

    protected Result(bool isSuccess, Error? error)
    {
      IsSuccess = isSuccess;
      _error = error;
    }

    public static Result Success() 
      => new(true, null);

    public static Result Failure(string message)
    {
      var error = new Error(errorCode: HttpStatusCode.BadRequest, message: message);
      return new Result(false, error);
    }

    public static Result<T> Success<T>(T value) 
      => new(value, true, null);
  
    public static Result<T?> Failure<T>(string message)
    {
      var error = new Error(errorCode: HttpStatusCode.BadRequest, message: message);
      return new Result<T?>(default, false, error);
    }

    public static Result<TE> Failure<TE>(Error error)
      => new (default!, false, error);

    public static Result Failure(Error error) 
      => new (false, error);
  }
}