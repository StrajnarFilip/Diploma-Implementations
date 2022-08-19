package development.blog.logic;

import org.apache.commons.codec.binary.Hex;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.MessageDigest;

@Service
public class Cryptographic {
    public String randomHex() {
        SecureRandom random = new SecureRandom();
        byte bytes[] = new byte[32];
        random.nextBytes(bytes);

        return Hex.encodeHexString(bytes).toUpperCase();
    }

    public String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] passwordInBytes = password.getBytes(Charset.forName("UTF8"));
        byte[] hashedPassword = md.digest(passwordInBytes);
        return Hex.encodeHexString(hashedPassword).toUpperCase();
    }
}
