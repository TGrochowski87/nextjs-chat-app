using ChatApi.Features.Hubs.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatApi.Features.Hubs;

public class RoomHub : Hub
{
  public async Task UpdateRoom(RoomUpdate roomUpdate)
  {
    await Clients.All.SendAsync("NotifyRoomUpdate", roomUpdate);
  }
}