using aspnetcore.BlogContext;
using aspnetcore.Models;
using MvcMovie.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace aspnetcore;

public class Authentication
{
    public static bool UserIsAdmin(postgresContext context, Controller controller)
    {
        var user = GetUser(context, controller);
        return user.Role == "admin";
    }

    public static bool UserExists(postgresContext context, Controller controller)
    {
        return context.Users
        .Any(user => user.Cookie == controller.Request.Headers.Authorization[0]);
    }

    public static string? UsersToken(Controller controller)
    {
        try
        {
            return controller.Request.Headers.Authorization[0];
        }
        catch
        {
            return null;
        }
    }

    public static User GetUser(postgresContext context, Controller controller)
    {
        var token = controller.Request.Headers.Authorization[0];
        if (token.Length != 64)
        {
            throw new Exception("Token is invalid.");
        }

        return context.Users
        .Single(user => user.Cookie == token);
    }
    public static async Task<bool> LogoutUser(postgresContext context, Controller controller)
    {
        try
        {
            var user = GetUser(context, controller);

            context.Users.Update(user);
            user.Cookie = "";
            await context.SaveChangesAsync();

            return true;
        }
        catch
        {
            return false;
        }
    }
}