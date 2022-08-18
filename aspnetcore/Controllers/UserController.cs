using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;
using aspnetcore.BlogContext;
using aspnetcore.Models;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using aspnetcore;

namespace MvcMovie.Controllers
{
    public class UserController : Controller
    {
        [HttpPost("/login")]
        public async Task<ActionResult<TextResponse>> Login([FromBody] LoginRequest login)
        {

            var context = postgresContext.DefaultContext;
            if (context.Users.Any(user => user.Email == login.Email) && CheckPassword(login))
            {
                var token = Convert.ToHexString(RandomNumberGenerator.GetBytes(32));
                var user = context.Users.Single(user => user.Email == login.Email);
                context.Users.Update(user);
                user.Cookie = token;
                await context.SaveChangesAsync();

                this.Response.Cookies.Append("token", token);
                return new TextResponse { Text = token };
            }
            else
            {
                Response.StatusCode = 401;
                return Unauthorized("Email or password is incorrect.");
            }
        }

        [HttpPost("/register")]
        public async Task<ActionResult<TextResponse>> Register([FromBody] RegisterRequest newUser)
        {
            var context = postgresContext.DefaultContext;
            if (context.Users.Any(user => user.Email == newUser.Email))
            {
                return Conflict("E-mail is already in use.");
            }

            if (newUser.Email is null || newUser.Password is null)
            {
                return Conflict("Email and Password are required.");
            }
            else
            {
                await context.AddAsync(new User
                {
                    Email = newUser.Email,
                    Password = ComputeHash(newUser.Password)
                });

                await context.SaveChangesAsync();
                return new TextResponse { Text = newUser.Email };
            }
        }

        [HttpGet("/user-information")]
        public ActionResult<UserInformation> MyUserInformation()
        {
            try
            {
                var context = postgresContext.DefaultContext;
                var user = Authentication.GetUser(context, this);
                return Ok(new UserInformation
                {
                    Id = user.Iduser,
                    Email = user.Email,
                    Role = user.Role
                });
            }
            catch
            {
                return Unauthorized("User does not exist");
            }
        }


        [HttpPost("/logout")]
        public async Task<ActionResult<TextResponse>> Logout()
        {
            if (Authentication.UsersToken(this) is not null)
            {
                var success = await Authentication
                .LogoutUser(postgresContext.DefaultContext, this);
                if (success)
                {
                    return new TextResponse { Text = "OK" };
                }
                else
                {
                    Response.StatusCode = 400;
                    return new TextResponse { Text = "Failed to log out." };
                }
            }
            return Unauthorized("User token is null.");
        }

        private static string ComputeHash(string input)
        {
            var inputBytes = UnicodeEncoding.UTF8.GetBytes(input);
            var sha = SHA256.Create();

            var result = sha.ComputeHash(inputBytes);
            return System.Convert.ToHexString(result);
        }

        private static bool CheckPassword(LoginRequest login)
        {
            var context = postgresContext.DefaultContext;
            var savedUser = context.Users.Single(user => user.Email == login.Email);
            return login.Password is not null ? savedUser.Password == ComputeHash(login.Password) : false;
        }
    }
}