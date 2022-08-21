package development.blog.data;

import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.Properties;

@Service
public class Database {
    final String url = "jdbc:postgresql://localhost:5433/postgres";
    Properties props;

    public Database() {
        props = new Properties();
        props.setProperty("user", "postgres");
        props.setProperty("password", "f5da15f2addf6857266afd80d19bd20da241f8bf334af04f");
    }

    public Connection getConnection() {
        try {
            return DriverManager.getConnection(url, props);
        } catch (Exception e) {
            return null;
        }
    }
}
