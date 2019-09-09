package com.grts.choose.api.mapper;

import com.grts.choose.api.model.Exercises;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ExercisesMapper {
    @Select("select * from t_exercises")
    public List<Exercises> getAll();
    @Select("select * from t_exercises where careerOrientation_id = #{carOrientId}  order by rand() limit 15")
    public List<Exercises> getAllByCarOrient(String carOrientId);

}
