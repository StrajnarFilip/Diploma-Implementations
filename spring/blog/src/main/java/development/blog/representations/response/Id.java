package development.blog.representations.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Id {
    Long id;

    public Id(Long id) {
        this.id = id;
    }

    @JsonProperty("id")
    public Long getId() {
        return id;
    }
}
