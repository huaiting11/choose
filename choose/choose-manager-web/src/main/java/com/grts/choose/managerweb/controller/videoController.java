package com.grts.choose.managerweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("video")
public class videoController {
    @RequestMapping("index")
    public String index(){
        return "manager/videoList";

    }

}
