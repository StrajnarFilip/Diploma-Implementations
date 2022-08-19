package development.blog.controllers;

import development.blog.logic.Segment;
import development.blog.representations.request.NewPost;
import development.blog.representations.request.NewSegment;
import development.blog.representations.response.Id;
import development.blog.representations.response.SegmentResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(
        origins = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE},
        allowedHeaders = "*")
@RestController
public class SegmentController {
    Segment segment;

    public SegmentController(Segment segment) {
        this.segment = segment;
    }

    @GetMapping("/post-segments/{id}")
    public ResponseEntity<ArrayList<SegmentResponse>> segmentsOfPost(
            @PathVariable("id") Long postId) {
        return segment.segmentsOfPost(postId);
    }

    @PostMapping("/segment")
    public ResponseEntity<SegmentResponse> newSegment(
            @RequestHeader("Authorization") String token,
            @RequestBody NewSegment newSegment) {
        return segment.create(newSegment, token);
    }

    @DeleteMapping("/segment/{id}")
    public ResponseEntity<Id> deleteSegment(
            @RequestHeader("Authorization") String token,
            @PathVariable("id") Long id) {
        return segment.delete(id, token);
    }
}
