using Microsoft.EntityFrameworkCore;
#pragma warning disable CS8618

namespace ChatApi.Database
{
  public class DatabaseContext : DbContext
  {
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseInMemoryDatabase(databaseName: "ChatDatabase");
    }
  
    public DbSet<Room> Rooms { get; set; }
    public DbSet<Message> Messages { get; set; }
  }
}