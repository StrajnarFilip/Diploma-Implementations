package development.blog.data;

import org.springframework.stereotype.Service;

import java.sql.*;

@Service
public class CommonData {
    Connection connection;

    public CommonData(Database database) {
        this.connection = database.getConnection();
    }

    public void deleteById(Long id, String tableName, String idAttributeName) throws SQLException {
        final String sql = "DELETE FROM public." + tableName + " WHERE " + idAttributeName + "=?;";
        PreparedStatement statement =
                this.connection.prepareStatement(sql);
        statement.setLong(1, id);
        statement.executeUpdate();
    }
}
