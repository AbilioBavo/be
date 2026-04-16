"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryDto = void 0;
var openapi = require("@nestjs/swagger");
var CreateCategoryDto = /** @class */ (function () {
    function CreateCategoryDto() {
    }
    CreateCategoryDto._OPENAPI_METADATA_FACTORY = function () {
        return { name: { required: true, type: function () { return String; } }, description: { required: false, type: function () { return String; } } };
    };
    return CreateCategoryDto;
}());
exports.CreateCategoryDto = CreateCategoryDto;
