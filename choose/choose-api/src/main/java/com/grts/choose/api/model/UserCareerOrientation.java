package com.grts.choose.api.model;

public class UserCareerOrientation {
    /**
     *  id                   varchar(32),
     *    careerOrientation_id varchar(32),
     *    user_id              varchar(32),
     *    sequence             int
     * );
     */
    private String id;
    private CareerOrientation careerOrientation;
    private User user;
    private Integer sequence;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public CareerOrientation getCareerOrientation() {
        return careerOrientation;
    }

    public void setCareerOrientation(CareerOrientation careerOrientation) {
        this.careerOrientation = careerOrientation;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }
}
