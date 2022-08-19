package development.blog.representations.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NewPost {
    String title;

    protected NewPost() {
    }

    public NewPost(String title) {
        this.title = title;
    }

    @JsonProperty("title")
    public String getTitle() {
        return title;
    }
}
