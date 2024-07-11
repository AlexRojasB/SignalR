using Microsoft.AspNetCore.SignalR;

namespace server.Hubs;
public class ViewHub : Hub<IHubClient> 
{
    public static int ViewCount {get;set;} = 0;

    public async override Task OnConnectedAsync() {
        ViewCount++;
        await Clients.All.ViewCountUpdate(ViewCount);
    }

    public async override Task OnDisconnectedAsync(Exception? exception) {
        ViewCount--;
        await Clients.All.ViewCountUpdate(ViewCount);
    }
}

public interface IHubClient {
    Task ViewCountUpdate(int viewCount);
}