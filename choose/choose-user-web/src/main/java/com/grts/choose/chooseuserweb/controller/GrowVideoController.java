package com.grts.choose.chooseuserweb.controller;

import com.alibaba.fastjson.JSONObject;
import com.grts.choose.api.model.AbilityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

@Controller
@RequestMapping("grow")
public class GrowVideoController {
    @Autowired
    RestTemplate restTemplate;
    @RequestMapping("index")
    public String index(){
        return "grow/grow";
    }
    @RequestMapping("getAbilityType")
    @ResponseBody
    public String getAbilityType(){
        JSONObject info = new JSONObject();
        AbilityType[]  abilityTypes = restTemplate.getForObject("http://manager-producer/video/getAbility", AbilityType[].class);
        info.put("abilityType",abilityTypes);
        return  info.toJSONString();
    }
}
