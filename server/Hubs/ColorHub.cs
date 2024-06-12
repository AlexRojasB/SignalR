using Microsoft.AspNetCore.SignalR;

namespace server.Hubs;
public class ColorHub : Hub {

    // [Authorize] to set security
    public async Task JoinGroup(string groupName) {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
    }

    public Task TriggerGroup(string groupName) {
        return Clients.Group(groupName).SendAsync("TriggerColor", groupName);
    }
}