package com.grts.choose.api.model;

import com.grts.choose.common.base.entity.BaseEntity;

public class AbilityType  extends BaseEntity<AbilityType> {
    private String id;
    private String name;

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
}
