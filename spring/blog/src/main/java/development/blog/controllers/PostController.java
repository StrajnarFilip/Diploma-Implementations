package development.blog.controllers;

import development.blog.logic.Post;
import development.blog.representations.request.NewPost;
import development.blog.representations.response.Id;
import development.blog.representations.response.PostResponse;
import development.blog.representations.response.Text;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE},
        allowedHeaders = "*")
@RestController
public class PostController {
    Post post;

    public PostController(Post post) {
        this.post = post;
    }

    @GetMapping("/posts")
    public ResponseEntity<ArrayList<PostResponse>> allPosts() {
        return post.all();
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<PostResponse> postById(
            @PathVariable("id") Long id) {
        return post.byID(id);
    }

    @PostMapping("/post")
    public ResponseEntity<Id> newPost(
            @RequestHeader("Authorization") String token,
            @RequestBody NewPost newPost) {
        return post.create(newPost, token);
    }

    @DeleteMapping("/post/{id}")
    public ResponseEntity<Text> deletePost(
            @RequestHeader("Authorization") String token,
            @PathVariable("id") Long id) {
        return post.delete(id, token);
    }

}
