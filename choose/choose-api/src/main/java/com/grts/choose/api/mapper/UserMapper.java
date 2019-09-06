package com.grts.choose.api.mapper;


import com.grts.choose.api.model.User;
import com.grts.choose.common.base.dao.BaseDao;

import java.util.List;

//@Mapper
public interface UserMapper extends BaseDao<User> {
   // @Select("select * from t_user where id = #{userId}")
    public User getById(String userId);
    public List<String> getSchoolName();
}

