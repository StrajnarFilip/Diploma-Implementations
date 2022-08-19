package development.blog.logic;

import development.blog.data.Database;
import development.blog.data.UserData;
import development.blog.representations.request.Login;
import development.blog.representations.request.Register;
import development.blog.representations.response.Text;
import development.blog.representations.response.UserInformation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

import java.sql.SQLException;

@Service
public class User {
    static final Logger log = LoggerFactory.getLogger(User.class);
    UserData userData;
    Cryptographic cryptographic;

    public User(UserData userData, Cryptographic cryptographic) {
        this.userData = userData;
        this.cryptographic = cryptographic;
    }

    public ResponseEntity<UserInformation> userInformation(String token) {
        try {
            return ResponseEntity.ok(userData.getUserInformation(token));
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<Text> login(Login login) {
        try {
            String newToken = loginProcedure(login);
            return ResponseEntity.ok(new Text(newToken));
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Text> register(Register register) {
        try {
            if (userData.emailUnique(register.getEmail())) {
                userData.registerNewUser(register);
                return ResponseEntity.ok(new Text("OK"));
            } else {
                log.info("Email already in use.");
                return new ResponseEntity(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Text> logout(String token) {
        try {
            logoutProcedure(token);
            return ResponseEntity.ok(new Text("OK"));
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    String loginProcedure(Login login) throws Exception {
        String newToken = cryptographic.randomHex();
        Long userId = userData.userId(login);
        userData.setUserToken(userId, newToken);
        return newToken;
    }

    void logoutProcedure(String token) throws Exception {
        final UserInformation user = userData.getUserInformation(token);
        userData.setUserToken(user.getId(), "");
    }
}
