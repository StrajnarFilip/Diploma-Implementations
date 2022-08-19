package development.blog.data;

import development.blog.representations.request.Login;
import development.blog.logic.Cryptographic;
import development.blog.representations.request.Register;
import development.blog.representations.response.UserInformation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Service
public class UserData {
    Connection connection;
    Cryptographic cryptographic;

    @Autowired
    public UserData(Database database, Cryptographic cryptographic) {
        this.connection = database.getConnection();
        this.cryptographic = cryptographic;
    }

    public String userHashedPassword(String email) throws SQLException {
        final String sql = "SELECT password FROM public.user WHERE email=?;";
        PreparedStatement statement =
                this.connection.prepareStatement(sql);
        statement.setString(1, email);
        ResultSet rs = statement.executeQuery();
        rs.next();
        return rs.getString(1);
    }

    public Long userId(Login login) throws Exception {
        final String sql = "SELECT iduser FROM public.user WHERE email=? AND password=?;";
        PreparedStatement statement =
                this.connection.prepareStatement(sql);
        statement.setString(1, login.getEmail());
        statement.setString(2, cryptographic.hashPassword(login.getPassword()));
        ResultSet rs = statement.executeQuery();
        rs.next();
        return rs.getLong(1);
    }

    public Boolean userExists(Login loginRequest) {
        final String sql = "SELECT COUNT(*) FROM public.user WHERE email=? AND password=?;";
        try {
            PreparedStatement statement =
                    this.connection.prepareStatement(sql);
            statement.setString(1, loginRequest.getEmail());
            statement.setString(2, loginRequest.getPassword());
            ResultSet rs = statement.executeQuery();
            rs.next();
            return rs.getInt(1) == 1;
        } catch (Exception e) {
            return false;
        }
    }

    public void setUserToken(Long userId, String newToken) throws SQLException {
        final String sql = "UPDATE public.user SET cookie=? WHERE iduser=?;";
        PreparedStatement statement =
                this.connection.prepareStatement(sql);
        statement.setString(1, newToken);
        statement.setLong(2, userId);
        statement.execute();
    }

    public UserInformation getUserInformation(String token) throws SQLException {
        final String sql = "SELECT iduser,email,role FROM public.user WHERE cookie=?;";
        PreparedStatement statement =
                this.connection.prepareStatement(sql);
        statement.setString(1, token);

        ResultSet rs = statement.executeQuery();
        rs.next();

        Long id = rs.getLong("iduser");
        String email = rs.getString("email");
        String role = rs.getString("role");

        return new UserInformation(id, email, role);
    }

    public Boolean emailUnique(String email) {
        final String sql = "SELECT COUNT(*) FROM public.user WHERE email=?;";
        try {
            PreparedStatement statement =
                    this.connection.prepareStatement(sql);
            statement.setString(1, email);
            ResultSet rs = statement.executeQuery();
            rs.next();
            return rs.getInt(1) == 0;
        } catch (Exception e) {
            return false;
        }
    }

    public void registerNewUser(Register register) throws Exception {
        final String sql = "INSERT INTO public.user (email,password) VALUES (?,?);";
        PreparedStatement statement =
                this.connection.prepareStatement(sql);
        statement.setString(1, register.getEmail());
        statement.setString(2, cryptographic.hashPassword(register.getPassword()));
        statement.execute();
    }
}

