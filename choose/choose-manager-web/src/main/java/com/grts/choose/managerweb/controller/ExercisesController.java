package com.grts.choose.managerweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("exercises")
public class ExercisesController {
    @RequestMapping("index")
    public String index(){
        return "manager/exercises";
    }

}
