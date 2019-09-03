package com.grts.choose.managerweb.controller;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

@Controller
public class ManagerController {
    @Autowired
    RestTemplate restTemplate;
    @RequestMapping("hello")
    public String user(){
        return "home";
    }

    @RequestMapping("hello1")
    @ResponseBody
    public  String  get(){
        //JSONObject info = JSONObject.parseObject(restTemplate.getForObject("http://manager-producer/user", String.class));
        return  restTemplate.getForObject("http://manager-producer/user", String.class); //返回json 字符串
    }
}
