package catlog.example.catlog;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

public class ImageUtils {

    public static byte[] convertImageToByteArray(String filePath) throws IOException {
        File file = new File(filePath);
        return Files.readAllBytes(file.toPath());
    }
}
