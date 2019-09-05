package com.grts.choose.managerweb.controller;

import com.alibaba.fastjson.JSONObject;
import com.grts.choose.api.model.CareerOrientation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;


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
    public String getExer(String exr){
        return null;
    }
}
