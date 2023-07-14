namespace ChatApi.Common.Exceptions
{
  public class ResultFailureException : Exception
  {
    internal ResultFailureException() 
      : base("Tried to access a value of a failed result.")
    { }
  }
}