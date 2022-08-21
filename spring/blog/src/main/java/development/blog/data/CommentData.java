package development.blog.data;

import development.blog.representations.request.NewComment;
import development.blog.representations.response.CommentResponse;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;

@Service
public class CommentData {
    Connection connection;
    CommonData commonData;

    public CommentData(Database database, CommonData commonData) {
        this.connection = database.getConnection();
        this.commonData = commonData;
    }

    public ArrayList<CommentResponse> commentsOfPost(Long id) throws SQLException {
        final String sql = "SELECT idcomment,content,post_idpost,user_iduser FROM public.comment WHERE post_idpost=?;";
        PreparedStatement statement =
                this.connection.prepareStatement(sql);
        statement.setLong(1, id);
        ResultSet rs = statement.executeQuery();
        ArrayList<CommentResponse> comments = new ArrayList<CommentResponse>();

        while (rs.next()) {
            comments.add(new CommentResponse(
                    rs.getLong(1),
                    rs.getString(2),
                    rs.getLong(3),
                    rs.getLong(4)
            ));
        }
        return comments;
    }

    public CommentResponse addComment(NewComment newComment, Long userId) throws SQLException {
        final String sql = "INSERT INTO public.comment (content,post_idpost,user_iduser) VALUES (?,?,?);";
        PreparedStatement statement =
                this.connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        statement.setString(1, newComment.getContent());
        statement.setLong(2, newComment.getPostId());
        statement.setLong(3, userId);
        statement.executeUpdate();

        ResultSet rs = statement.getGeneratedKeys();
        rs.next();

        Long generatedId = rs.getLong(1);
        return getCommentById(generatedId);
    }

    public CommentResponse getCommentById(Long id) throws SQLException {
        final String sql = "SELECT idcomment,content,post_idpost,user_iduser FROM public.comment WHERE idcomment=?;";
        PreparedStatement statement =
                this.connection.prepareStatement(sql);
        statement.setLong(1, id);
        ResultSet rs = statement.executeQuery();
        rs.next();

        return new CommentResponse(
                rs.getLong(1),
                rs.getString(2),
                rs.getLong(3),
                rs.getLong(4)
        );
    }

    public void deleteComment(Long commentId, Long userId) throws SQLException {
        final String sql = "DELETE FROM public.comment where idcomment=? AND user_iduser=?;";
        PreparedStatement statement =
                this.connection.prepareStatement(sql);
        statement.setLong(1, commentId);
        statement.setLong(2, userId);
        statement.executeUpdate();
    }
}
