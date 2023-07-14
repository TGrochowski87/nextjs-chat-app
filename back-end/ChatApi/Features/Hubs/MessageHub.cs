using ChatApi.Features.Rooms.DTOs.Create;
using Microsoft.AspNetCore.SignalR;

namespace ChatApi.Features.Hubs
{
  public class MessageHub : Hub
  {
    public async Task ForwardMessage(int roomId, MessageCreateDto receivedMessage)
    {
      await Groups.AddToGroupAsync(Context.ConnectionId, $"room-{roomId}");
      await Clients.Group($"room-{roomId}").SendAsync("ReceiveMessage", receivedMessage);
    }
  }
}