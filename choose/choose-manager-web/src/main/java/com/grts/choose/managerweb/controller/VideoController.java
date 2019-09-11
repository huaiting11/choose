package com.grts.choose.managerweb.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;
import com.grts.choose.api.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.ClassUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("video")
public class VideoController {
    @Autowired
    RestTemplate restTemplate;
    @RequestMapping("index")
    public String index(){
        return "manager/videoList";

    }
    @RequestMapping("getAbilityType")
    @ResponseBody
    public String getAbilityType(){
        JSONObject info = new JSONObject();
        AbilityType[]  abilityTypes = restTemplate.getForObject("http://manager-producer/video/getAbility", AbilityType[].class);
        info.put("abilityType",abilityTypes);
        return  info.toJSONString();
    }
    @RequestMapping("uploadVideo")
    public String uploadVideo(@RequestParam("file") MultipartFile[] multipartFile,String carrId){
        List<String> oNames = new ArrayList<String>();
        List<String> fNames = new ArrayList<String>();
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
                String uploadPath = path + File.separator + oName;
                File file1 = new File(uploadPath);
                fNames.add("http://localhost:8080/"+oName);
                file1.mkdirs();
                file.transferTo(file1);

            }catch (Exception e){
                e.printStackTrace();
            }

        }
        Video video =new Video();
        video.setOldNeme(oNames);   // 旧的
        video.setStoreName(fNames); // 新的存储地址
        video.setTypeId(carrId);
        ResponseEntity<String> responseEntity = restTemplate.postForEntity("http://manager-producer/video/uploadVideo",video,String.class);
        return "manager/videoList";
    }

    @RequestMapping("getVideoList")
    @ResponseBody
    public String getVideoList(String pageSize,String pageNo,String typeId){
        PageInfo<AbilityVideo> videoList = restTemplate.getForObject("http://manager-producer/video/getVideoList?pageSize="+pageSize+"&&pageNo="+pageNo+"&&typeId="+typeId, PageInfo.class);
        JSONObject info = new JSONObject();
        info.put("page",videoList);
        return  info.toJSONString();

    }

}
