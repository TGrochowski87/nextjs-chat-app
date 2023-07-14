using System.ComponentModel.DataAnnotations;

namespace ChatApi.Database
{
#pragma warning disable CS8618

  public class Room
  {
    [Key]
    public int Id { get; set; }
  
    [Required]
    public string Name { get; set; }
  
    [Required]
    public int HeadCount { get; set; }

    public virtual ICollection<Message> Messages { get; } = new List<Message>();
  }
}