package com.grts.choose.chooseuserweb.controller;

import com.alibaba.fastjson.JSONObject;
import com.grts.choose.api.model.Exercises;
import com.grts.choose.api.model.UserCareerOrientation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

@Controller
@RequestMapping("exercises")
public class ExerciseController {
    @Autowired
    RestTemplate restTemplate;
    @RequestMapping("index")
    public String exercises(){
        return "exercise/exerciseList";
    }
    @RequestMapping("getCarrorByUser")
    @ResponseBody
    public String getCarrorByUser(String userId){
        UserCareerOrientation[] userCarr = restTemplate.getForObject("http://SERVICE-PRODUCER/exercise/getCarrorByUser?userId="+userId, UserCareerOrientation[].class);
        JSONObject info = new JSONObject();
        info.put("userCarr",userCarr);
        return  info.toJSONString();
    }
    @RequestMapping("getExercisesByCarr")
    @ResponseBody
    public String getExercisesByCarr(String carrId){
        Exercises[] exerList = restTemplate.getForObject("http://SERVICE-PRODUCER/exercise/getExercisesByCarr?carrId="+carrId, Exercises[].class);
        JSONObject info = new JSONObject();
        info.put("exerList",exerList);
        return info.toJSONString();
    }


}
