using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
#pragma warning disable CS8618

namespace ChatApi.Database
{
  public class Message
  {
    [Key]
    public long Id { get; set; }
  
    [Required]
    public string Content { get; set; }
  
    [Required]
    public DateTime CreateTime { get; set; }
  
    [Required]
    public int RoomId { get; set; }
  
    [Required] 
    public string SenderConnectionId { get; set; }
  
    [ForeignKey("RoomId")] 
    public virtual Room Room { get; set; }
  }
}