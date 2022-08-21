package development.blog.data;

import development.blog.logic.User;
import development.blog.representations.request.NewSegment;
import development.blog.representations.response.PostResponse;
import development.blog.representations.response.SegmentResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;

@Service
public class SegmentData {
    static final Logger log = LoggerFactory.getLogger(User.class);
    Connection connection;
    CommonData commonData;

    public SegmentData(Database database, CommonData commonData) {
        this.connection = database.getConnection();
        this.commonData = commonData;
    }

    public ArrayList<SegmentResponse> segmentsOfPost(Long id) throws SQLException {
        final String sql = "SELECT idsegment,post_idpost,type,text,source FROM public.segment WHERE post_idpost=?;";
        PreparedStatement statement =
                this.connection.prepareStatement(sql);
        statement.setLong(1,id);
        ResultSet rs = statement.executeQuery();
        ArrayList<SegmentResponse> segments = new ArrayList<SegmentResponse>();

        while (rs.next()) {
            segments.add(new SegmentResponse(
                    rs.getLong(1),
                    rs.getLong(2),
                    rs.getString(3),
                    rs.getString(4),
                    rs.getString(5)
            ));
        }
        return segments;
    }

    public SegmentResponse addSegment(NewSegment newSegment) throws SQLException {
        final String sql = "INSERT INTO public.segment (post_idpost,type,text,source) VALUES (?,?,?,?);";
        PreparedStatement statement =
                this.connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        statement.setLong(1, newSegment.getPostIdPost());
        statement.setString(2, newSegment.getType());
        statement.setString(3, newSegment.getText());
        statement.setString(4, newSegment.getSource());

        statement.executeUpdate();

        ResultSet rs = statement.getGeneratedKeys();
        rs.next();

        Long generatedId = rs.getLong(1);

        return getSegmentById(generatedId);
    }

    public SegmentResponse getSegmentById(Long id) throws SQLException {
        final String sqlSegment = "SELECT idsegment,post_idpost,type,text,source FROM public.segment WHERE idsegment=?;";
        PreparedStatement segmentStatement =
                this.connection.prepareStatement(sqlSegment);
        segmentStatement.setLong(1, id);
        ResultSet segmentRs = segmentStatement.executeQuery();
        segmentRs.next();

        return new SegmentResponse(
                segmentRs.getLong(1),
                segmentRs.getLong(2),
                segmentRs.getString(3),
                segmentRs.getString(4),
                segmentRs.getString(5)
        );
    }

    public void deleteSegment(Long id) throws SQLException {
        commonData.deleteById(id, "segment", "idsegment");
    }
}
