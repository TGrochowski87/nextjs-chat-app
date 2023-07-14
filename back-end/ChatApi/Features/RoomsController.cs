using ChatApi.Common;
using ChatApi.Features.Rooms.Domain;
using ChatApi.Features.Rooms.DTOs;
using ChatApi.Features.Rooms.DTOs.Get;
using Microsoft.AspNetCore.Mvc;

namespace ChatApi.Features
{
  [ApiController]
  [Route("api/[controller]")]
  public class RoomsController : ChatControllerBase
  {
    private readonly IRoomService _roomService;
    private readonly Mapper _mapper;

    public RoomsController(IRoomService roomService)
    {
      _roomService = roomService;
      _mapper = new Mapper();
    }

    [Route("")]
    [HttpGet]
    public ActionResult<List<RoomDto>> GetRooms()
    {
      var rooms = _roomService.GetAllRooms();
      return Ok(rooms.ConvertAll(room => _mapper.Map(room)));
    }

    [Route("{id}")]
    [HttpGet]
    public ActionResult<RoomDto> GetRoom([FromRoute] int id)
    {
      var getRoomResult = _roomService.GetRoom(id);
      return getRoomResult.IsSuccess ? _mapper.Map(getRoomResult.Value) : MapFailedResult<RoomDto>(getRoomResult);
    }

    [Route("{id}/increment")]
    [HttpPatch]
    public IActionResult IncrementHeadCount([FromRoute] int id)
    {
      var result = _roomService.IncrementHeadCount(id);
      return result.IsSuccess ? NoContent() : MapFailedResult(result);
    }

    [Route("{id}/decrement")]
    [HttpPatch]
    public IActionResult DecrementHeadCount([FromRoute] int id)
    {
      var result = _roomService.DecrementHeadCount(id);
      return result.IsSuccess ? NoContent() : MapFailedResult(result);
    }

    [Route("{id}/messages")]
    [HttpGet]
    public ActionResult<List<MessageDto>> GetMessages([FromRoute] int id)
    {
      var messages = _roomService.GetMessages(id);
      return Ok(messages.ConvertAll(message => _mapper.Map(message)));
    }

    [Route("{id}/messages")]
    [HttpPost]
    public IActionResult AddMessage([FromRoute] int id, [FromBody] MessageDto messageDto)
    {
      var message = _mapper.Map(messageDto, id);
      var result = _roomService.AddMessage(message);
      return result.IsSuccess ? NoContent() : MapFailedResult(result);
    }
  }
}