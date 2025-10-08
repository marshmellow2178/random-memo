package com.init330.demo0811.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.ObjectSchema;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.media.StringSchema;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        Schema<?> errorSchema = new ObjectSchema()
                .addProperty("status", new StringSchema().example("400"))
                .addProperty("code", new StringSchema().example("INVALID_REQUEST"))
                .addProperty("message", new StringSchema().example("잘못된 요청입니다"))
                .addProperty("timestamp", new StringSchema().example("2020-09-09 09:09:09"));

        Components components = new Components()
                .addSchemas("ErrorResponse", errorSchema)
                .addSecuritySchemes(
                        "bearerAuth",
                        new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                );

        return new OpenAPI()
                .components(components)
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .info(new Info().title("Memo API")
                        .version("1.0")
                        .description("""
                            모든 API는 실패 시 다음으로 응답
                            ```json
                            {
                                "status": 400,
                                "code": "INVALID_REQUEST",
                                "message": "잘못된 요청입니다",
                                "timestamp": "2020-09-09 09:09:09",
                            }
                            ```
                            """));
    }
}
