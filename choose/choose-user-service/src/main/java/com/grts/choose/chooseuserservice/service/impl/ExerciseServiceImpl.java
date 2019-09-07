package com.grts.choose.chooseuserservice.service.impl;

import com.grts.choose.api.mapper.UserCareerOrientationMapper;
import com.grts.choose.api.model.UserCareerOrientation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("exercise")
public class ExerciseServiceImpl {
    @Autowired
    UserCareerOrientationMapper userCareerMapper;
    @RequestMapping("getCarrorByUser")
    @ResponseBody
    public List<UserCareerOrientation> getCarrorByUser(String userId){
        return  userCareerMapper.getUserCarrByUser(userId);
    }

}
