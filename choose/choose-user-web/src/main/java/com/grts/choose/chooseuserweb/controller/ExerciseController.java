package com.grts.choose.chooseuserweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
@Controller
@RequestMapping("exercises")
public class ExerciseController {
    @RequestMapping("index")
    public String exercises(){
        return "exercise/exerciseList";
    }

}
