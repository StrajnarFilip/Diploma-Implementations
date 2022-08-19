package development.blog.representations.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Comment {
    Long idComment;
    String content;
    Long postId;
    Long userId;

    public Comment(Long idComment, String content, Long postId, Long userId) {
        this.idComment = idComment;
        this.content = content;
        this.postId = postId;
        this.userId = userId;
    }

    @JsonProperty("idcomment")
    public Long getIdComment() {
        return idComment;
    }

    @JsonProperty("content")
    public String getContent() {
        return content;
    }

    @JsonProperty("postIdpost")
    public Long getPostId() {
        return postId;
    }

    @JsonProperty("userIduser")
    public Long getUserId() {
        return userId;
    }
}
