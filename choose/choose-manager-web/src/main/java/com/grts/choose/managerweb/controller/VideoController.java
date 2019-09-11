package com.grts.choose.managerweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("video")
public class VideoController {
    @RequestMapping("index")
    public String index(){
        return "manager/videoList";

    }
    @RequestMapping("uploadVideo")
    public String uploadVideo(@RequestParam("file") MultipartFile[] multipartFile,String carrId){
        List<String> oNames = new ArrayList<String>();
        List<String> fNames = new ArrayList<String>();
        List<String> carr = new ArrayList<String>();
        carr.add(carrId);
        for (int i = 0; i < multipartFile.length; i++) {
            MultipartFile file = multipartFile[i];
            if (file.getSize()==0) {
                continue;
            }
            String oName = file.getOriginalFilename();
            oNames.add(oName);
            try {
                File path = new File(ResourceUtils.getURL("classpath:").getPath());
                File upload = new File(path.getAbsolutePath(), "static/video/");
                if (!upload.exists()) upload.mkdirs();
                String uploadPath = upload + File.separator + oName;
                File file1 = new File(uploadPath);
                file1.mkdirs();
                file.transferTo(file1);
                fNames.add(file1.getName());
            }catch (Exception e){
                e.printStackTrace();
            }

        }
        List<List<String>> result = new ArrayList<List<String>>();
        result.add(carr);
        result.add(oNames);
        result.add(fNames);
        return "manager/videoList";
    }

}
