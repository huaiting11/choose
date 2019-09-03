package com.grts.choose.chooseuserservice.service.impl;



import com.grts.choose.api.mapper.UserMapper;
import com.grts.choose.chooseuserservice.service.UserService;


import com.grts.choose.api.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class UserServiceImpl implements UserService {
    @Autowired
    UserMapper userMapper;
    @RequestMapping("user")
    @ResponseBody
    public User getById(String id){
         User user = userMapper.getById(id);
         return user;
    }

}
