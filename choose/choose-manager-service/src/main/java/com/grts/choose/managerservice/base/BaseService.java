package com.grts.choose.managerservice.base;

import com.grts.choose.common.base.dao.BaseDao;
import com.grts.choose.common.base.entity.BaseEntity;
import com.grts.choose.common.config.Constant;
import com.grts.choose.common.persistence.Page;
import com.grts.choose.common.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public abstract class BaseService<D extends BaseDao<T>, T extends BaseEntity<T>> {
    /**
     * 持久层对象
     */
    @Autowired
    protected D dao;

    /**
     * 获取单条数据
     * @param id
     * @return
     */
    public T get(String id) {
        return dao.get(id);
    }

    /**
     * 获取单条数据
     * @param entity
     * @return
     */
    public T get(T entity) {
        return dao.get(entity);
    }

    /**
     * 查询列表数据
     * @param entity
     * @return
     */
    public List<T> findList(T entity) {
        return dao.findList(entity);
    }

    /**
     * 查询分页数据
     * @param page 分页对象
     * @param entity
     * @return
     */
    public Page<T> findPage(Page<T> page, T entity) {
        entity.setPage(page);
        page.setList(dao.findList(entity));
        return page;
    }

    /**
     * 保存数据（插入或更新）
     * @param entity
     */
    @Transactional(readOnly = false)
    public void save(T entity) {
        if(entity.getFieldValue(Constant.IDFIELD) == null ||
                (String.class.equals(entity.getFieldType(Constant.IDFIELD)) &&
                        StringUtils.isEmpty(entity.getFieldValue(Constant.IDFIELD).toString()))) {
            entity.preInsert();
            dao.insert(entity);
        }else {
            entity.preUpdate();
            dao.update(entity);
        }
    }

    /**
     * 删除数据
     * @param entity
     */
    @Transactional(readOnly = false)
    public void delete(T entity) {
        dao.delete(entity);
    }
}

