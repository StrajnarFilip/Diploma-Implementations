package development.blog.controllers;

import development.blog.logic.Comment;
import development.blog.representations.request.NewComment;
import development.blog.representations.response.CommentResponse;
import development.blog.representations.response.Id;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE},
        allowedHeaders = "*")
@RestController
public class CommentController {
    Comment comment;

    public CommentController(Comment comment) {
        this.comment = comment;
    }

    @GetMapping("/post-comments/{id}")
    public ResponseEntity<ArrayList<CommentResponse>> postComments(
            @PathVariable("id") Long postId) {
        return comment.commentsOfPost(postId);
    }

    @PostMapping("/comment")
    public ResponseEntity<CommentResponse> newComment(
            @RequestHeader("Authorization") String token,
            @RequestBody NewComment newComment) {
        return comment.create(newComment, token);
    }

    @DeleteMapping("/comment/{id}")
    public ResponseEntity<Id> deleteComment(
            @RequestHeader("Authorization") String token,
            @PathVariable("id") Long id) {
        return comment.delete(id, token);
    }


}
