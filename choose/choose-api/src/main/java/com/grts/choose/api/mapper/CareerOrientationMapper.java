package com.grts.choose.api.mapper;

import com.grts.choose.api.model.CareerOrientation;
import com.grts.choose.api.model.Exercises;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
@Mapper
public interface CareerOrientationMapper {
    @Select("select * from t_careerOrientation")
    public List<CareerOrientation> getType();
    @Select("select * from t_careerOrientation where id = #{id}")
    public CareerOrientation getById(String id);


}
