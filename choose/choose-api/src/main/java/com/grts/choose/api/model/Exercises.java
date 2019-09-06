package com.grts.choose.api.model;

import com.grts.choose.common.base.entity.BaseEntity;

/**
 * 习题
 */
public class Exercises extends BaseEntity<Exercises> {
    private String id;
    /**
     * 题目
     */
    private String title;
    /**
     * 职业方向
     */
    private String answer;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private CareerOrientation careerOrientation;
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getOptionA() {
        return optionA;
    }

    public void setOptionA(String optionA) {
        this.optionA = optionA;
    }

    public String getOptionB() {
        return optionB;
    }

    public void setOptionB(String optionB) {
        this.optionB = optionB;
    }

    public String getOptionC() {
        return optionC;
    }

    public void setOptionC(String optionC) {
        this.optionC = optionC;
    }

    public String getOptionD() {
        return optionD;
    }

    public void setOptionD(String optionD) {
        this.optionD = optionD;
    }

    public CareerOrientation getCareerOrientation() {
        return careerOrientation;
    }

    public void setCareerOrientation(CareerOrientation careerOrientation) {
        this.careerOrientation = careerOrientation;
    }
}
