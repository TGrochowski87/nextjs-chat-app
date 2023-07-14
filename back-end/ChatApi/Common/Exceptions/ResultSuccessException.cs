namespace ChatApi.Common.Exceptions
{
  public class ResultSuccessException : Exception
  {
    internal ResultSuccessException()
      : base("Tried to access an error of a successful result.")
    { }
  }
}