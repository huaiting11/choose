package com.grts.choose.chooseuserweb.controller;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

@Controller

public class UserController {
    @Autowired
    RestTemplate restTemplate;
    @RequestMapping("hello")
    @ResponseBody
    public String hiService() {
         JSONObject info = JSONObject.parseObject(restTemplate.getForObject("http://SERVICE-PRODUCER/user?id=11", String.class));
         return  info.toJSONString(); //返回json 字符串
    }
}
