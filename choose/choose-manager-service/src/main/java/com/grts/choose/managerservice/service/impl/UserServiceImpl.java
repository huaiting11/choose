package com.grts.choose.managerservice.service.impl;

import com.grts.choose.api.mapper.UserMapper;
import com.grts.choose.api.model.User;
import com.grts.choose.managerservice.base.BaseService;
import com.grts.choose.managerservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class UserServiceImpl extends BaseService<UserMapper, User> implements UserService  {
    @Autowired
    private UserMapper userMapper;
    @RequestMapping("user")
    @ResponseBody
    public User getUser(){

        return userMapper.getById("111");
    }
}
