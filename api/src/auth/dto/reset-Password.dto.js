"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordDto = void 0;
var openapi = require("@nestjs/swagger");
var ResetPasswordDto = /** @class */ (function () {
    function ResetPasswordDto() {
    }
    ResetPasswordDto._OPENAPI_METADATA_FACTORY = function () {
        return { email: { required: true, type: function () { return String; } }, otp: { required: true, type: function () { return String; } }, newPassword: { required: true, type: function () { return String; } } };
    };
    return ResetPasswordDto;
}());
exports.ResetPasswordDto = ResetPasswordDto;
