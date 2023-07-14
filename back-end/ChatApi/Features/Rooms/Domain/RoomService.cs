using ChatApi.Common;
using ChatApi.Database;
using ChatApi.Features.Rooms.Domain.Repository;

namespace ChatApi.Features.Rooms.Domain
{
  public class RoomService : IRoomService
  {
    private readonly IRoomRepository _roomRepository;
    // Maybe this can be used for deleting messages when room is empty
    //private readonly IHubContext<MessageHub.MessageHub> _messageHubContext;

    public RoomService(IRoomRepository roomRepository)
    {
      _roomRepository = roomRepository;
    }

    public List<Room> GetAllRooms() => _roomRepository.GetAllRooms();
    public Result<Room> GetRoom(int roomId) => _roomRepository.GetRoom(roomId);

    public Result IncrementHeadCount(int roomId) => _roomRepository.IncrementHeadCount(roomId);

    public Result DecrementHeadCount(int roomId)
    {
      var decrementResult = _roomRepository.DecrementHeadCount(roomId);
      if (decrementResult.IsFailure) return decrementResult;

      var isRoomEmptyResult = _roomRepository.IsRoomEmpty(roomId);
      if (isRoomEmptyResult.IsFailure) return isRoomEmptyResult;

      return isRoomEmptyResult.Value ? _roomRepository.ClearMessages(roomId) : Result.Success();
    }

    public List<Message> GetMessages(int roomId) 
      => _roomRepository.GetMessages(roomId);

    public Result AddMessage(Message message)
      => _roomRepository.AddMessage(message);
  }
}