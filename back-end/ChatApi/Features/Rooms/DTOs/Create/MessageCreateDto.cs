namespace ChatApi.Features.Rooms.DTOs.Create
{
  public record MessageCreateDto(string Content, DateTime CreateTime, string SenderConnectionId);
}