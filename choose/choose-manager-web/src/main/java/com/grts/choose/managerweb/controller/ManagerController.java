package com.grts.choose.managerweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ManagerController {
    @RequestMapping("hello")
    public String user(){
        return "home";
    }
}
