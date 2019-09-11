package com.grts.choose.api.mapper;

import com.grts.choose.api.model.AbilityVideo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface AbilityVideoeMapper {
    @Select("select * from t_abilityvideo where abilitytype = #{abilityType}")
    public List<AbilityVideo> findByType(String abilityType);
    //INSERT INTO table_name (列1, 列2,...) VALUES (值1, 值2,....)
    @Insert("INSERT INTO t_abilityvideo (id,showName,storeName,abilitytype) values (#{id},#{showName},#{storeName},#{abilitytype})")
    public void save(AbilityVideo abilityType);
}
