package development.blog.representations.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CommentResponse {
    Long idComment;
    String content;
    Long postIdPost;
    Long userIdUser;

    public CommentResponse(Long idComment, String content, Long postIdPost, Long userIdUser) {
        this.idComment = idComment;
        this.content = content;
        this.postIdPost = postIdPost;
        this.userIdUser = userIdUser;
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
    public Long getPostIdPost() {
        return postIdPost;
    }

    @JsonProperty("userIduser")
    public Long getUserIdUser() {
        return userIdUser;
    }
}