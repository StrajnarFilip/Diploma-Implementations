package development.blog.representations.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserInformation {
    Long id;
    String email;
    String role;

    public UserInformation(Long id, String email, String role) {
        this.id = id;
        this.email = email;
        this.role = role;
    }

    @JsonProperty("id")
    public Long getId() {
        return id;
    }

    @JsonProperty("email")
    public String getEmail() {
        return email;
    }

    @JsonProperty("role")
    public String getRole() {
        return role;
    }

    @JsonIgnore
    public Boolean isAdmin() {
        return this.role.equalsIgnoreCase("admin");
    }
}
