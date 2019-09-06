package com.grts.choose.api.mapper;

import com.grts.choose.api.model.Exercises;
import com.grts.choose.common.base.dao.BaseDao;

import java.util.List;

public interface ExercisesDao extends BaseDao<Exercises> {
    public List<Exercises> findList(Exercises exercises);
    public Exercises getExerById(String exerId);


}
