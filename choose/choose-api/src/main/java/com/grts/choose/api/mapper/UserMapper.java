package com.grts.choose.api.mapper;


import com.grts.choose.api.model.User;
import com.grts.choose.common.base.dao.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper extends BaseDao<User> {
    @Select("select * from t_user where id = #{userId}")
    public User getById(String userId);
    @Select("select * from t_user ")
    public User  findList();
}

