package com.grts.choose.api.mapper;


import com.grts.choose.api.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;


@Mapper
public interface UserMapper {
    @Select("select * from t_user where id = #{userId}")
    public User getById(String userId);
}

