"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
    }));
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin ||
                /^http:\/\/localhost:\d+$/.test(origin) ||
                /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) {
                callback(null, true);
                return;
            }
            callback(new Error(`Origin ${origin} tidak diizinkan CORS`), false);
        },
        credentials: true,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'Origin',
            'X-Requested-With',
        ],
        optionsSuccessStatus: 204,
    });
    const port = process.env.PORT ? Number(process.env.PORT) : 3001;
    await app.listen(port);
    console.log(`Server jalan di http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map