"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
class IdValidationPipe {
    transform(value, meta) {
        if (meta.type !== 'param')
            return value;
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            throw new common_1.BadRequestException();
        }
        return value;
    }
}
exports.IdValidationPipe = IdValidationPipe;
//# sourceMappingURL=id-validation.pipe.js.map