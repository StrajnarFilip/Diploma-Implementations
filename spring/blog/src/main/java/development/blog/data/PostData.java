package development.blog.data;

import development.blog.representations.response.PostResponse;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

@Service
public class PostData {
    Connection connection;

    public PostData(Database database) {
        this.connection = database.getConnection();
    }

    public ArrayList<PostResponse> getAllPosts() throws SQLException {
        final String sql = "SELECT idpost,title FROM public.post;";
        PreparedStatement statement =
                this.connection.prepareStatement(sql);
        ResultSet rs = statement.executeQuery();
        ArrayList<PostResponse> posts = new ArrayList<PostResponse>();

        while (rs.next()) {
            posts.add(new PostResponse(
                    rs.getLong(1),
                    rs.getString(2)
            ));
        }
        return posts;
    }

    public PostResponse getPost(Long id) throws SQLException {
        final String sql = "SELECT idpost,title FROM public.post WHERE idpost=?;";
        PreparedStatement statement =
                this.connection.prepareStatement(sql);
        statement.setLong(1, 2);

        ResultSet rs = statement.executeQuery();

        rs.next();
        return new PostResponse(
                rs.getLong(1),
                rs.getString(2)
        );
    }

    public void addPost(String title) throws SQLException {
        final String sql = "INSERT INTO public.post (title) VALUES (?);";
        PreparedStatement statement =
                this.connection.prepareStatement(sql);
        statement.setString(1, title);
        statement.execute();
    }

    public void deletePost(Long id) throws SQLException {
        final String sqlComments = "DELETE FROM public.comment WHERE post_idpost=?;";
        PreparedStatement statementComment =
                this.connection.prepareStatement(sqlComments);
        statementComment.setLong(1, id);
        statementComment.execute();

        final String sqlSegments = "DELETE FROM public.segment WHERE post_idpost=?;";
        PreparedStatement statementSegment =
                this.connection.prepareStatement(sqlSegments);
        statementSegment.setLong(1, id);
        statementSegment.execute();

        final String sql = "DELETE FROM public.post WHERE idpost=?;";
        PreparedStatement statement =
                this.connection.prepareStatement(sql);
        statement.setLong(1, id);
        statement.execute();
    }
}
