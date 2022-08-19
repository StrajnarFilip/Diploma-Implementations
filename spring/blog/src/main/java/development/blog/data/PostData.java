package development.blog.data;

import development.blog.logic.User;
import development.blog.representations.response.PostResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;

@Service
public class PostData {
    static final Logger log = LoggerFactory.getLogger(User.class);
    CommonData commonData;
    Connection connection;

    public PostData(Database database, CommonData commonData) {
        this.connection = database.getConnection();
        this.commonData = commonData;
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
        statement.setLong(1, id);

        ResultSet rs = statement.executeQuery();

        rs.next();
        return new PostResponse(
                rs.getLong(1),
                rs.getString(2)
        );
    }

    public Long addPost(String title) throws SQLException {
        final String sql = "INSERT INTO public.post (title) VALUES (?);";
        PreparedStatement statement =
                this.connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        statement.setString(1, title);
        statement.executeUpdate();

        ResultSet rs = statement.getGeneratedKeys();
        rs.next();

        return rs.getLong(1);
    }

    public void deletePost(Long id) throws SQLException {
        commonData.deleteById(id, "comment", "post_idpost");
        commonData.deleteById(id, "segment", "post_idpost");
        commonData.deleteById(id, "post", "idpost");
    }
}
