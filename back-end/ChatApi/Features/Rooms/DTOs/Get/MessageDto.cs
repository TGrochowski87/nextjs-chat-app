namespace ChatApi.Features.Rooms.DTOs.Get
{
  public record MessageDto(long Id, string Content, DateTime CreateTime, string SenderConnectionId);
}

/*public class MessageDto
{
  public long Id { get; private set; }
  
  public string Content { get; private set; }
  
  public DateTime CreateTime { get; private set; }
  
  public int RoomId { get; private set; }
  
  public string SenderConnectionId { get; private set; }

  public MessageDto(long id, string content, DateTime createTime, int roomId, string senderConnectionId)
  {
    Id = id;
    Content = content;
    CreateTime = createTime;
    RoomId = roomId;
    SenderConnectionId = senderConnectionId;
  }
}*/