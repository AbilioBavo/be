"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyAccountDto = void 0;
var openapi = require("@nestjs/swagger");
var VerifyAccountDto = /** @class */ (function () {
    function VerifyAccountDto() {
    }
    VerifyAccountDto._OPENAPI_METADATA_FACTORY = function () {
        return { email: { required: true, type: function () { return String; } }, otp: { required: true, type: function () { return String; } } };
    };
    return VerifyAccountDto;
}());
exports.VerifyAccountDto = VerifyAccountDto;
