package development.blog.logic;

import development.blog.data.CommentData;
import development.blog.data.UserData;
import development.blog.representations.request.NewComment;
import development.blog.representations.response.CommentResponse;
import development.blog.representations.response.Id;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class Comment {
    UserData userData;
    CommentData commentData;

    public Comment(UserData userData, CommentData commentData) {
        this.userData = userData;
        this.commentData = commentData;
    }

    public ResponseEntity<ArrayList<CommentResponse>> commentsOfPost(Long postId) {
        try {
            return ResponseEntity.ok(commentData.commentsOfPost(postId));
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<CommentResponse> create(NewComment newComment, String token) {

        try {
            Long userId = userData.getUserInformation(token).getId();
            return ResponseEntity.ok(commentData.addComment(newComment, userId));
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Id> delete(Long commentId, String token) {
        try {
            Long userId = userData.getUserInformation(token).getId();
            commentData.deleteComment(commentId, userId);
            return ResponseEntity.ok(new Id(commentId));
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
