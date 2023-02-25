"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseConfig = void 0;
const common_1 = require("@nestjs/common");
let MongooseConfig = class MongooseConfig {
    createMongooseOptions() {
        return {
            uri: process.env.MONGODB_URI,
            dbName: process.env.MONGODB_NAME,
        };
    }
};
MongooseConfig = __decorate([
    (0, common_1.Injectable)()
], MongooseConfig);
exports.MongooseConfig = MongooseConfig;
//# sourceMappingURL=mongo.config.js.map