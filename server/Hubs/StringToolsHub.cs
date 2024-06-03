using Microsoft.AspNetCore.SignalR;

namespace server.Hubs;
public class StringToolsHub : Hub {
    public string GetFullName(string firstName, string lastName) {
        return $"{firstName} {lastName}";
    }
}