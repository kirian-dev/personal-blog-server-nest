"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cors_middleware_1 = require("./common/middlewares/cors.middleware");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors({ origin: true, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' });
    app.use(new cors_middleware_1.CorsMiddleware().use);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map