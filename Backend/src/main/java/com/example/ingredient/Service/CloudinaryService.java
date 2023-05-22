package com.example.ingredient.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinaryConfig;

    public void delete(String path){
        try{
            String[] parts = path.split("/");
            if(parts.length>0){
                Optional<String> name = Arrays.stream(parts[parts.length-1].split("\\.")).findFirst();
                if(name.isPresent()){
                    Map deleteResult = cloudinaryConfig.uploader().destroy(name.get(),ObjectUtils.emptyMap());
                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public String uploadFile(MultipartFile image) {
        try {
            File uploadedFile = convertMultiPartToFile(image);
            Map uploadResult = cloudinaryConfig.uploader().upload(uploadedFile, ObjectUtils.emptyMap());
            boolean isDeleted = uploadedFile.delete();

            if (isDeleted){
                System.out.println("File successfully deleted");
            }else
                System.out.println("File doesn't exist");
            return  uploadResult.get("url").toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }
}
