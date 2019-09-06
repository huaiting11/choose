package com.grts.choose.managerweb.controller;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.PageInfo;
import com.grts.choose.api.model.User;
import com.grts.choose.common.persistence.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("user")
public class UserController {
    @Autowired
    RestTemplate restTemplate;
    @RequestMapping("index")
    public String user(){
        return "manager/userList";
    }
    @RequestMapping("getUser")
    @ResponseBody
    public  String  getUser(HttpServletRequest request, HttpServletResponse response){
        //JSONObject info = JSONObject.parseObject(restTemplate.getForObject("http://manager-producer/user", String.class));
        String pageSize = request.getParameter("pageSize");
        String pageNo = request.getParameter("pageNo");
        PageInfo<User> user = restTemplate.getForObject("http://manager-producer/getUser?pageSize="+pageSize+"&&pageNo="+pageNo, PageInfo.class);
        JSONObject infos = new JSONObject();
        infos.put("page",user);
        return  infos.toJSONString(); //返回json 字符串
    }
    @RequestMapping("getSchool")
    @ResponseBody
    public String getSchool(){
        String[] schools = restTemplate.getForObject("http://manager-producer/getSchool?",String[].class);
        JSONObject info = new JSONObject();
        info.put("schoolName",schools);
        return  info.toJSONString();
    }


}
