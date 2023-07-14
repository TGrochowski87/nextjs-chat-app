using ChatApi.Common;
using ChatApi.Database;

namespace ChatApi.Features.Rooms.Domain
{
  public interface IRoomService
  {
    List<Room> GetAllRooms();
    Result<Room> GetRoom(int roomId);
    Result IncrementHeadCount(int roomId);
    Result DecrementHeadCount(int roomId);
  
    List<Message> GetMessages(int roomId);
    Result AddMessage(Message message);
  }
}