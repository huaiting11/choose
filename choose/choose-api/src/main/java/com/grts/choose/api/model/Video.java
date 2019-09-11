package com.grts.choose.api.model;

import java.util.List;

public class Video {
    private List<String>  StoreName;
    private List<String> oldNeme;
    private String typeId;

    public List<String> getStoreName() {
        return StoreName;
    }

    public void setStoreName(List<String> storeName) {
        StoreName = storeName;
    }

    public List<String> getOldNeme() {
        return oldNeme;
    }

    public void setOldNeme(List<String> oldNeme) {
        this.oldNeme = oldNeme;
    }

    public String getTypeId() {
        return typeId;
    }

    public void setTypeId(String typeId) {
        this.typeId = typeId;
    }
}
