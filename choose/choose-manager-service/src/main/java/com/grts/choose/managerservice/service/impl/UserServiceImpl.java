package com.grts.choose.managerservice.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.grts.choose.api.mapper.UserMapper;
import com.grts.choose.api.model.User;
import com.grts.choose.common.persistence.Page;
import com.grts.choose.managerservice.base.BaseService;
import com.grts.choose.managerservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class UserServiceImpl extends BaseService<UserMapper, User> implements UserService  {
    @Autowired
    private UserMapper userMapper;
    @RequestMapping("user")
    @ResponseBody
    public User getUserById(){

        return userMapper.getById("111");
    }
    @RequestMapping("getUser")
    @ResponseBody
    public Page<User> getUser(String user, HttpServletRequest request, HttpServletResponse response,String pageSize,String pageNo){
        request.setAttribute("pageNo",pageNo);
        request.setAttribute("PageSize",pageSize);
        Page<User> page =  new Page<User>(request,response);
        User users = new User();
        return findPage(page, users);
    }
}
