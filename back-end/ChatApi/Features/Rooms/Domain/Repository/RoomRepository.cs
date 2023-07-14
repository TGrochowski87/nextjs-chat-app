using System.Net;
using ChatApi.Common;
using ChatApi.Database;

namespace ChatApi.Features.Rooms.Domain.Repository
{
  public class RoomRepository : IRoomRepository
  {
    static RoomRepository()
    {
      CreateStaticData();
    }
  
    public List<Room> GetAllRooms()
    {
      using var context = new DatabaseContext();

      return context.Rooms.ToList();
    }

    public Result<Room> GetRoom(int roomId)
    {
      using var context = new DatabaseContext();

      var room = context.Rooms.FirstOrDefault(r => r.Id == roomId);
      return room ?? Result.Failure<Room>(new Error(HttpStatusCode.NotFound, $"Room of ID = {roomId} could not be found."));
    }

    public Result<bool> IsRoomEmpty(int roomId)
    {
      using var context = new DatabaseContext();
    
      var room = context.Rooms.Find(roomId);
      if(room == null)
        return Result.Failure<bool>(new Error(HttpStatusCode.NotFound, $"Could not find room with ID = {roomId}"));

      return room.HeadCount == 0;
    }

    public Result IncrementHeadCount(int roomId)
    {
      using var context = new DatabaseContext();

      try
      {
        var room = context.Rooms.Find(roomId);
        if(room == null)
          return Result.Failure(new Error(HttpStatusCode.NotFound, $"Could not find room with ID = {roomId}"));

        room.HeadCount++;
        context.SaveChanges();
        return Result.Success();
      }
      catch (Exception exception)
      {
        return Result.Failure(Error.FromException(exception));
      }
    }

    public Result DecrementHeadCount(int roomId)
    {
      using var context = new DatabaseContext();

      try
      {
        var room = context.Rooms.Find(roomId);
      
        if(room == null)
          return Result.Failure(new Error(HttpStatusCode.NotFound, $"Could not find room with ID = {roomId}."));
      
        if(room.HeadCount == 0)
          return Result.Failure(new Error(HttpStatusCode.BadRequest, $"Room with ID = {roomId} is currently empty."));

        room.HeadCount--;
        context.SaveChanges();
        return Result.Success();
      }
      catch (Exception exception)
      {
        return Result.Failure(Error.FromException(exception));
      }
    }

    public List<Message> GetMessages(int roomId)
    {
      using var context = new DatabaseContext();

      return context.Messages.Where(m => m.RoomId == roomId).ToList();
    }

    public Result AddMessage(Message message)
    {
      using var context = new DatabaseContext();

      try
      {
        context.Messages.Add(message);
      
        context.SaveChanges();
        return Result.Success();
      }
      catch (Exception exception)
      {
        return Result.Failure(Error.FromException(exception));
      }
    }

    public Result ClearMessages(int roomId)
    {
      using var context = new DatabaseContext();

      try
      {
        var messages = context.Messages.Where(m => m.RoomId == roomId);
        context.RemoveRange(messages);
      
        context.SaveChanges();
        return Result.Success();
      }
      catch (Exception exception)
      {
        return Result.Failure(Error.FromException(exception));
      }
    }

    private static void CreateStaticData()
    {
      using var context = new DatabaseContext();

      var rooms = new List<Room>
      {
        new() {Id = 1, Name = "Room #1", HeadCount = 0},
        new() {Id = 2, Name = "Room #2", HeadCount = 0},
        new() {Id = 3, Name = "Room #3", HeadCount = 0},
      };
    
      context.Rooms.AddRange(rooms);
      context.SaveChanges();
    }
  }
}