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
public class ManagerController {
    @Autowired
    RestTemplate restTemplate;
    @RequestMapping("hello")
    public String user(){
        return "home";
    }

    @RequestMapping("hello1")
    @ResponseBody
    public  String  get(){
        //JSONObject info = JSONObject.parseObject(restTemplate.getForObject("http://manager-producer/user", String.class));
        User user = restTemplate.getForObject("http://manager-producer/user", User.class);
        JSONObject infos = new JSONObject();
        infos.put("user",user);
        return  infos.toJSONString(); //返回json 字符串
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

}
