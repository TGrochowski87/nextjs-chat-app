using ChatApi.Common;
using ChatApi.Database;

namespace ChatApi.Features.Rooms.Domain.Repository
{
  public interface IRoomRepository
  {
    List<Room> GetAllRooms();
    Result<Room> GetRoom(int roomId);
    Result<bool> IsRoomEmpty(int roomId);
    Result IncrementHeadCount(int roomId);
    Result DecrementHeadCount(int roomId);
  
    List<Message> GetMessages(int roomId);
    Result AddMessage(Message message);
    Result ClearMessages(int roomId);
  }
}