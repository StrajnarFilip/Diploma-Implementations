package development.blog.representations.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NewSegment {
    Long postIdPost;
    String type;
    String text;
    String source;

    protected NewSegment() {
    }

    public NewSegment(Long postIdPost, String type, String text, String source) {
        this.postIdPost = postIdPost;
        this.type = type;
        this.text = text;
        this.source = source;
    }

    @JsonProperty("postIdpost")
    public Long getPostIdPost() {
        return postIdPost;
    }

    @JsonProperty("type")
    public String getType() {
        return type;
    }

    @JsonProperty("text")
    public String getText() {
        return text;
    }

    @JsonProperty("source")
    public String getSource() {
        return source;
    }
}