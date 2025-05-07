package com.gx.fileprocessor.app.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


public class FileUtils {

	public static void moveFileToFolder(File file, String destinationFolder) {
        try {
            Path sourcePath = file.toPath();
            Path targetDir = Paths.get(destinationFolder);
            Path targetPath = targetDir.resolve(file.getName());

         // Logging the paths for debugging
            System.out.println("Source path: " + sourcePath.toString());
            System.out.println("Target path: " + targetPath.toString());
            
            if (!Files.exists(targetDir)) {
                Files.createDirectories(targetDir);
                System.out.println("Created target directory: " + targetDir);
            }

            Files.move(sourcePath, targetPath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File moved to: " + targetPath);
            
        } catch (IOException e) {
            System.err.println("Failed to move file: " + file.getName() + " - " + e.getMessage());
        }
    }

   
     //  moving a file to the ProcessFailed File folder.
  
    public static void moveFileToErrorFolder(File file, String errorFolder) {
        moveFileToFolder(file, errorFolder);
    }
	
}
