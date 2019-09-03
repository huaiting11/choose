package com.grts.choose.common.base.entity;

import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Map;

import com.grts.choose.common.config.Constant;
import com.grts.choose.common.persistence.Page;
import com.grts.choose.common.utils.IdGen;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



public abstract class BaseEntity<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    private static final Logger log = LoggerFactory.getLogger(BaseEntity.class);
    /**
     * 当前实体分页对象
     */
    protected Page<T> page;
    /**
     * 自定义SQL（SQL标识，SQL内容）
     */
    protected Map<String, String> sqlMap;

    public Page<T> getPage() {
        return page;
    }

    public void setPage(Page<T> page) {
        this.page = page;
    }

    public Map<String, String> getSqlMap() {
        return sqlMap;
    }

    public void setSqlMap(Map<String, String> sqlMap) {
        this.sqlMap = sqlMap;
    }

    public Class<?> getFieldType(String field) {
        try {
            Field f = getClass().getDeclaredField(field);
            return f.getType();
        } catch (Exception e) {
            log.error("getFieldType exception:", e);
        }
        return null;
    }

    public Object getFieldValue(String field) {
        try {
            Field f = getClass().getDeclaredField(field);
            PropertyDescriptor pd = new PropertyDescriptor(f.getName(), getClass());
            Method get = pd.getReadMethod();
            return get.invoke(this);
        } catch (Exception e) {
            log.error("getFieldValue exception:", e);
        }
        return null;
    }

    public void setFieldValue(String field, Object value) {
        try {
            Field f = getClass().getDeclaredField(field);
            PropertyDescriptor pd = new PropertyDescriptor(f.getName(), getClass());
            Method set = pd.getWriteMethod();
            set.invoke(this, value);
        } catch (Exception e) {
            log.error("getFieldValue exception:", e);
        }
    }

    @SuppressWarnings("unchecked")
    public T clone() {
        T copy = null;
        Field[] fields = getClass().getDeclaredFields();
        try {
            copy = (T) getClass().newInstance();
            for(Field f : fields) {
                if("serialVersionUID".equals(f.getName())) continue;
                PropertyDescriptor pd = new PropertyDescriptor(f.getName(), getClass());
                Method get = pd.getReadMethod();
                Method set = pd.getWriteMethod();
                set.invoke(copy, get.invoke(this));
            }
        }catch (Exception e) {
            log.error("clone exception:", e);
        }
        return copy;
    }

    /**
     * 插入之前执行方法，子类实现
     */
    public void preInsert() {
        //如果id是字符类型，在插入前生产UUID
        if(!String.class.equals(getFieldType(Constant.IDFIELD))) return;
        try {
            Method setId = getClass().getMethod("setId", String.class);
            setId.invoke(this, IdGen.uuid());
        } catch (Exception e) {
            log.error("preInsert exception:", e);
        }
    }

    /**
     * 更新之前执行方法，子类实现
     */
    public void preUpdate() {

    }

}
