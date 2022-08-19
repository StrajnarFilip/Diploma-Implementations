package development.blog.logic;

import development.blog.data.SegmentData;
import development.blog.data.UserData;
import development.blog.representations.request.NewSegment;
import development.blog.representations.response.Id;
import development.blog.representations.response.SegmentResponse;
import development.blog.representations.response.Text;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class Segment {
    static final Logger log = LoggerFactory.getLogger(Segment.class);
    SegmentData segmentData;
    UserData userData;

    public Segment(SegmentData segmentData, UserData userData) {
        this.segmentData = segmentData;
        this.userData = userData;
    }

    public ResponseEntity<ArrayList<SegmentResponse>> segmentsOfPost(Long postId) {
        try {
            return ResponseEntity.ok(segmentData.segmentsOfPost(postId));
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<SegmentResponse> create(NewSegment newSegment, String token) {
        try {
            if (!userData.getUserInformation(token).isAdmin()) {
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
            }
            SegmentResponse generated = segmentData.addSegment(newSegment);
            return ResponseEntity.ok(generated);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Id> delete(Long id, String token) {
        try {
            if (!userData.getUserInformation(token).isAdmin()) {
                return new ResponseEntity(HttpStatus.UNAUTHORIZED);
            }
            segmentData.deleteSegment(id);
            return ResponseEntity.ok(new Id(id));
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
