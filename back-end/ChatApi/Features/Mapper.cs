using ChatApi.Database;
using ChatApi.Features.Rooms.DTOs;
using ChatApi.Features.Rooms.DTOs.Get;

namespace ChatApi.Features
{
  public class Mapper
  {
    public RoomDto Map(Room room)
    {
      return new RoomDto(
        Id: room.Id,
        Name: room.Name,
        HeadCount: room.HeadCount);
    }

    public MessageDto Map(Message message)
    {
      return new MessageDto(
        Id: message.Id,
        Content: message.Content,
        CreateTime: message.CreateTime,
        SenderConnectionId: message.SenderConnectionId);
    }

    public Message Map(MessageDto message, int roomId)
    {
      return new Message
      {
        Id = message.Id,
        Content = message.Content,
        CreateTime = message.CreateTime,
        RoomId = roomId,
        SenderConnectionId = message.SenderConnectionId
      };
    }
  }
}