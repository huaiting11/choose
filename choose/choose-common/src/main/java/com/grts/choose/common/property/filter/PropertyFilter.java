package com.grts.choose.common.property.filter;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.JSONSerializer;
import com.alibaba.fastjson.serializer.PropertyPreFilter;
import com.alibaba.fastjson.serializer.SerializerFeature;

public class PropertyFilter implements PropertyPreFilter {
    private Map<Class<?>, String[]> includes = new HashMap<Class<?>, String[]>();
    private Map<Class<?>, String[]> excludes = new HashMap<Class<?>, String[]>();
    static {
        JSON.DEFAULT_GENERATE_FEATURE |= SerializerFeature.DisableCircularReferenceDetect.getMask();
    }

    public PropertyFilter() {

    }

    public PropertyFilter(Map<Class<?>, String[]> includes) {
        super();
        this.includes = includes;
    }

    public boolean apply(JSONSerializer serializer, Object source, String name) {
        //对象为空。直接放行
        if (source == null) {
            return true;
        }
        // 获取当前需要序列化的对象的类对象
        Class<?> clazz = source.getClass();
        // 无需序列的对象、寻找需要过滤的对象，可以提高查找层级
        // 找到不需要的序列化的类型
        for (Map.Entry<Class<?>, String[]> item : this.excludes.entrySet()) {
            // isAssignableFrom()，用来判断类型间是否有继承关系
            if (item.getKey().isAssignableFrom(clazz)) {
                String[] strs = item.getValue();

                // 该类型下 此 name 值无需序列化
                if (isHave(strs, name)) {
                    return false;
                }else {
                    return true;
                }
            }
        }
        // 需要序列的对象集合为空 表示 全部需要序列化
        if (this.includes.isEmpty()) {
            return true;
        }
        for (Map.Entry<Class<?>, String[]> item : this.includes.entrySet()) {
            if (item.getKey().isAssignableFrom(clazz)) {
                String[] strs = item.getValue();
                if (isHave(strs, name) || strs.length == 0) {
                    return true;
                }else {
                    return false;
                }
            }
        }

        return true;
    }

    /*
     * 此方法有两个参数，第一个是要查找的字符串数组，第二个是要查找的字符或字符串
     */
    public static boolean isHave(String[] strs, String s) {

        for (int i = 0; i < strs.length; i++) {
            if (strs[i].equals(s)) {
                return true;
            }
        }
        return false;
    }

    public Map<Class<?>, String[]> getIncludes() {
        return includes;
    }

    public void setIncludes(Map<Class<?>, String[]> includes) {
        this.includes = includes;
    }

    public Map<Class<?>, String[]> getExcludes() {
        return excludes;
    }

    public void setExcludes(Map<Class<?>, String[]> excludes) {
        this.excludes = excludes;
    }
}

