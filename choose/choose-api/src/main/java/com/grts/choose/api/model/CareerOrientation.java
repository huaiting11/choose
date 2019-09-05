package com.grts.choose.api.model;

/**
 * 职业方向
 */
public class CareerOrientation {
    private  String id;
    /**
     * '职业方向'
     */
    private  String name;
    /**
     * 职业方向描述
     */
    private  String  description;
    /**
     * 分布
     */
    private  String distribution;

    private  Integer sequence;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDistribution() {
        return distribution;
    }

    public void setDistribution(String distribution) {
        this.distribution = distribution;
    }

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }
}
