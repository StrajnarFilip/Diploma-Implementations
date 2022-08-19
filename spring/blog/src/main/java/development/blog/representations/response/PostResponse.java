package development.blog.representations.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PostResponse {
    Long idPost;
    String title;

    public PostResponse(Long idPost, String title) {
        this.idPost = idPost;
        this.title = title;
    }
    @JsonProperty("idpost")
    public Long getIdPost() {
        return idPost;
    }

    @JsonProperty("title")
    public String getTitle() {
        return title;
    }
}
