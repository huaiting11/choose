package com.grts.choose.managerservice.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.grts.choose.api.mapper.CareerOrientationMapper;
import com.grts.choose.api.mapper.ExercisesDao;
import com.grts.choose.api.model.CareerOrientation;
import com.grts.choose.api.model.Exercises;
import com.grts.choose.api.model.User;
import com.grts.choose.common.utils.IdGen;
import com.grts.choose.managerservice.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class ExercisesServiceImpl extends BaseService<ExercisesDao,Exercises> {
    @Autowired
    CareerOrientationMapper careerOrientationMapper;
    @Autowired
    ExercisesDao exercisesDao;
    @RequestMapping("getType")
    @ResponseBody
    public List<CareerOrientation> getType(){
        return  careerOrientationMapper.getType();
    }
    @RequestMapping("getExr")
    @ResponseBody
    public PageInfo<Exercises>  getExr(String exr,String careerId,String pageNo,String pageSize){
        User users = new User();
        PageHelper.startPage(Integer.valueOf(pageNo), Integer.valueOf(pageSize));
        Exercises exercises = null;
        if(exr != null && !exr.equals("null") ){
            exercises = JSONObject.toJavaObject(JSONObject.parseObject(exr), Exercises.class);
        }else{
            exercises = new Exercises();
        }
        if(careerId != null && !careerId.equals("null") && !careerId.equals("")){
            CareerOrientation careerOrientation = new CareerOrientation();
            careerOrientation.setId(careerId);
            exercises.setCareerOrientation(careerOrientation);
        }
        List<Exercises> exercisesList = exercisesDao.findList(exercises);
        PageInfo<Exercises> pageInfo = new PageInfo<>(exercisesList);
        return pageInfo;
    }
    @RequestMapping("getExerById")
    @ResponseBody
    public Exercises getExerById(String exerId){
        return  exercisesDao.getExerById(exerId);
    }

    @RequestMapping(value = "savaExer", method = RequestMethod.POST)
    @ResponseBody
    public String savaExer(@RequestBody Exercises exercises){
        save(exercises);
        return "success";
    }

}
