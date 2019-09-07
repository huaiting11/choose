package com.grts.choose.api.mapper;

import com.grts.choose.api.model.UserCareerOrientation;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserCareerOrientationMapper {
    @Select("select * from t_user_careerorientation where  user_id = #{userId}")
    @Results({
            @Result(property="user",column="user_id",one=@One(select="com.grts.choose.api.mapper.UserMapper.getById")),
            @Result(property="careerOrientation",column="careerOrientation_id",one=@One(select="com.grts.choose.api.mapper.CareerOrientationMapper.getById"))
    })
    public List<UserCareerOrientation> getUserCarrByUser(String userId);
}
