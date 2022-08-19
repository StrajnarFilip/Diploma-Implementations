package development.blog.representations.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Login {
    String email;
    String password;

    public Login(String email, String password) {
        this.email = email;
        this.password = password;
    }

    @JsonProperty("email")
    public String getEmail() {
        return email;
    }

    @JsonProperty("password")
    public String getPassword() {
        return password;
    }
}
