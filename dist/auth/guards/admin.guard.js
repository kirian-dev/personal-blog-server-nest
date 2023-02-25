"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
const common_1 = require("@nestjs/common");
const errors_constants_1 = require("./../../common/constants/errors.constants");
class AdminGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user.roles.includes('admin')) {
            throw new common_1.ForbiddenException(errors_constants_1.ACCESS_RIGHTS_ERROR);
        }
        return true;
    }
}
exports.AdminGuard = AdminGuard;
//# sourceMappingURL=admin.guard.js.map