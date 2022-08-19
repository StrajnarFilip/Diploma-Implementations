package development.blog.logic;

import development.blog.data.Database;
import development.blog.data.PostData;
import development.blog.data.UserData;
import development.blog.representations.request.NewPost;
import development.blog.representations.response.Id;
import development.blog.representations.response.PostResponse;
import development.blog.representations.response.Text;
import development.blog.representations.response.UserInformation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Locale;

@Service
public class Post {
    static final Logger log = LoggerFactory.getLogger(Post.class);
    PostData postData;
    UserData userData;

    public Post(PostData postData, UserData userData) {
        this.postData = postData;
        this.userData = userData;
    }

    public ResponseEntity<ArrayList<PostResponse>> all() {
        try {
            return ResponseEntity.ok(postData.getAllPosts());
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<PostResponse> byID(Long id) {
        try {
            return ResponseEntity.ok(postData.getPost(id));
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Id> create(NewPost post, String token) {
        try {
            if (!userData.getUserInformation(token).isAdmin()) {
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
            }
            postData.addPost(post.getTitle());
            // TODO: no hardcoded ID value
            return ResponseEntity.ok(new Id(1l));
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Text> delete(Long id, String token) {
        try {
            if (!userData.getUserInformation(token).isAdmin()) {
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
            }
            postData.deletePost(id);
            return ResponseEntity.ok(new Text("OK"));
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
