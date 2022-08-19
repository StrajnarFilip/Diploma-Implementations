package development.blog.controllers;

import development.blog.logic.User;
import development.blog.representations.request.Login;
import development.blog.representations.request.Register;
import development.blog.representations.response.Text;
import development.blog.representations.response.UserInformation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE},
        allowedHeaders = "*")
@RestController
public class UserController {
    User user;

    public UserController(User user) {
        this.user = user;
    }

    @GetMapping("/user-information")
    public ResponseEntity<UserInformation> userInformation(
            @RequestHeader("Authorization") String token) {
        return user.userInformation(token);
    }

    @PostMapping("/login")
    public ResponseEntity<Text> loginAction(
            @RequestBody Login login) {
        return user.login(login);
    }

    @PostMapping("/register")
    public ResponseEntity<Text> registerAction(
            @RequestBody Register register) {
        return user.register(register);
    }

    @PostMapping("/logout")
    public ResponseEntity<Text> logout(
            @RequestHeader("Authorization") String token) {
        return user.logout(token);
    }

}
