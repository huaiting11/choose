package com.grts.choose.api.mapper;

import com.grts.choose.api.model.AbilityType;
import com.grts.choose.common.base.dao.BaseDao;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface AbilityTypeMapper extends BaseDao<AbilityType> {
    @Select("select * from t_abilitytype")
    public List<AbilityType> getAll();

}
