package com.grts.choose.managerweb.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;
import com.grts.choose.api.model.CareerOrientation;
import com.grts.choose.api.model.Exercises;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import java.awt.print.Book;


@Controller
@RequestMapping("exercises")
public class ExercisesController {
    @Autowired
    RestTemplate restTemplate;
    @RequestMapping("index")
    public String index(){
        return "manager/exercises";
    }
    @RequestMapping("getType")
    @ResponseBody
    public String getExerList(){
        CareerOrientation[] list = restTemplate.getForObject("http://manager-producer/getType", CareerOrientation[].class);
        JSONObject info = new JSONObject();
        info.put("typeList",list);
        return  info.toJSONString();
    }
    @RequestMapping("getExer")
    @ResponseBody
    public String getExer(String exr, String careerId,String pageNo,String pageSize){
        PageInfo<Exercises> page = restTemplate.getForObject("http://manager-producer/getExr?exr="+exr+"&&careerId="+careerId +"&&pageNo="+pageNo+"&&pageSize="+pageSize, PageInfo.class);
        JSONObject info = new JSONObject();
        info.put("page",page);
        return info.toJSONString();
    }
    @RequestMapping("exerEdit")
    public String exerEdit(String exerId, Model model){
        model.addAttribute("exerId" ,exerId);
        return "manager/exerEdit";
    }
    @RequestMapping("link")
    @ResponseBody
    public String link(){
        JSONObject info = new JSONObject();
        info.put("success",true);
        return info.toJSONString();
    }
    @RequestMapping("getExerById")
    @ResponseBody
    public String getExerById(String exerId){
        Exercises exercises = restTemplate.getForObject("http://manager-producer/getExerById?exerId="+exerId, Exercises.class);
        JSONObject info = new JSONObject();
        info.put("exercises",exercises);
        return  info.toJSONString();
    }
    @RequestMapping("savaExer")
    @ResponseBody
    public String savaExer(String exer){
        Exercises exercises  = JSONObject.toJavaObject(JSONObject.parseObject(exer), Exercises.class);
        ResponseEntity<String> responseEntity= restTemplate.postForEntity("http://manager-producer/savaExer",exercises,String.class);
        JSONObject info = new JSONObject();
        info.put("success",true);
        return info.toJSONString();
    }

}
