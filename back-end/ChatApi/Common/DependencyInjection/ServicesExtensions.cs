using ChatApi.Features.Rooms.Domain;
using ChatApi.Features.Rooms.Domain.Repository;

namespace ChatApi.Common.DependencyInjection
{
  public static class ServicesExtensions
  {
    public static IServiceCollection AddApiServices(this IServiceCollection services)
    {
      return services
        .AddScoped<IRoomRepository, RoomRepository>()
        .AddScoped<IRoomService, RoomService>();
    }
  }
}