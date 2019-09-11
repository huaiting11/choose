package com.grts.choose.managerservice.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.grts.choose.api.mapper.AbilityTypeMapper;
import com.grts.choose.api.mapper.AbilityVideoeMapper;
import com.grts.choose.api.model.AbilityType;
import com.grts.choose.api.model.AbilityVideo;
import com.grts.choose.api.model.Video;
import com.grts.choose.common.utils.IdGen;
import com.grts.choose.managerservice.base.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("video")
public class VideoServiceImpl extends BaseService<AbilityTypeMapper, AbilityType> {
    @Autowired
    private  AbilityTypeMapper abilityTypeMapper;
    @Autowired
    private AbilityVideoeMapper abilityVideoeMapper;
    @RequestMapping("getAbility")
    @ResponseBody
    public List<AbilityType> getAbility(){
        return abilityTypeMapper.getAll();
    }

    @RequestMapping("getVideoList")
    @ResponseBody
    public PageInfo<AbilityVideo> getVideoList(String pageSize,String pageNo,String typeId){
        PageHelper.startPage(Integer.valueOf(pageNo), Integer.valueOf(pageSize));
        List<AbilityVideo> list = abilityVideoeMapper.findByType(typeId);
        return  new PageInfo<>(list);
    }
    @RequestMapping( value = "uploadVideo", method = RequestMethod.POST)
    @ResponseBody
    public String uploadVideo(@RequestBody Video  files){
        List<String> ofiles = files.getOldNeme();
        List<String> nfiles = files.getStoreName();
        for (int i = 0; i < ofiles.size(); i++) {
            AbilityVideo abilityVideo = new AbilityVideo();
            abilityVideo.setAbilitytype(files.getTypeId());
            abilityVideo.setId(IdGen.uuid());
            abilityVideo.setShowName(nfiles.get(i));
            abilityVideo.setStoreName(ofiles.get(i));
            abilityVideoeMapper.save(abilityVideo);
        }
        return "success";

    }
}
