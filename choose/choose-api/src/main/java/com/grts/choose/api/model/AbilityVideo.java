package com.grts.choose.api.model;

public class AbilityVideo {
    private String id;
    private String showName;
    private String storeName;
    private String abilitytype;
    private Integer sequence;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getShowName() {
        return showName;
    }

    public void setShowName(String showName) {
        this.showName = showName;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public String getAbilitytype() {
        return abilitytype;
    }

    public void setAbilitytype(String abilitytype) {
        this.abilitytype = abilitytype;
    }

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }
}
