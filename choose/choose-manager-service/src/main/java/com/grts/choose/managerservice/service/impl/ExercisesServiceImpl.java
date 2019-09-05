package com.grts.choose.managerservice.service.impl;

import com.grts.choose.api.mapper.CareerOrientationMapper;
import com.grts.choose.api.model.CareerOrientation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class ExercisesServiceImpl {
    @Autowired
    CareerOrientationMapper careerOrientationMapper;
    @RequestMapping("getType")
    @ResponseBody
    public List<CareerOrientation> getType(){
        return  careerOrientationMapper.getType();
    }

}
