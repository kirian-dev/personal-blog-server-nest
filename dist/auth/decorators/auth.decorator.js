"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const admin_guard_1 = require("../guards/admin.guard");
const jwt_guard_1 = require("../guards/jwt.guard");
const roles_enum_1 = require("../../common/enums/roles.enum");
const Auth = (role = roles_enum_1.Role.User) => (0, common_1.applyDecorators)(role === roles_enum_1.Role.Admin
    ? (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard)
    : (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard));
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map