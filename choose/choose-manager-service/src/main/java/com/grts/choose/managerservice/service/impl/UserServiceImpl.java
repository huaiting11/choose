package com.grts.choose.managerservice.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.grts.choose.api.mapper.UserMapper;
import com.grts.choose.api.model.User;
import com.grts.choose.managerservice.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class UserServiceImpl extends BaseService<UserMapper, User>   {
    @Autowired
    private UserMapper userMapper;
    @RequestMapping("user")
    @ResponseBody
    public User getUserById(){

        return userMapper.getById("111");
    }
    @RequestMapping("getUser")
    @ResponseBody
    public PageInfo<User> getUser(String pageSize,String pageNo){
        User users = new User();
        PageHelper.startPage(Integer.valueOf(pageNo), Integer.valueOf(pageSize));
        List<User> userList = userMapper.findList(users);
        return new PageInfo<>(userList);
    }
    @RequestMapping("getSchool")
    @ResponseBody
    public List<String> getSchool(){
        return  userMapper.getSchoolName();
    }

}
