package com.grts.choose.managerservice;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
@MapperScan(basePackages = "com.grts.choose.api.mapper")
public class ChooseManagerServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChooseManagerServiceApplication.class, args);
    }

}
