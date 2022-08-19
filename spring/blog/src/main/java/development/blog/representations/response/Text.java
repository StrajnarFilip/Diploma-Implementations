package development.blog.representations.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Text {
    String text;

    public Text(String text) {
        this.text = text;
    }

    @JsonProperty("text")
    public String getText() {
        return text;
    }
}
