"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProfileDto = void 0;
var openapi = require("@nestjs/swagger");
var GetProfileDto = /** @class */ (function () {
    function GetProfileDto(partial) {
        Object.assign(this, partial);
    }
    GetProfileDto._OPENAPI_METADATA_FACTORY = function () {
        return { userId: { required: true, type: function () { return String; } }, phone: { required: false, type: function () { return String; } }, email: { required: true, type: function () { return String; } }, role: { required: true, type: function () { return String; } }, status: { required: true, type: function () { return String; } } };
    };
    return GetProfileDto;
}());
exports.GetProfileDto = GetProfileDto;
