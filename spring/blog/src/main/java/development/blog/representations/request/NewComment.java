package development.blog.representations.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NewComment {
    Long postId;
    String content;

    public NewComment(Long postId, String content) {
        this.postId = postId;
        this.content = content;
    }
    @JsonProperty("postId")
    public Long getPostId() {
        return postId;
    }
    @JsonProperty("content")
    public String getContent() {
        return content;
    }
}
