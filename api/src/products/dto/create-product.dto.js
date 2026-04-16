"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var browser_1 = require("../../generated/prisma/browser");
var CreateProductDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _categoryId_decorators;
    var _categoryId_initializers = [];
    var _categoryId_extraInitializers = [];
    var _unit_decorators;
    var _unit_initializers = [];
    var _unit_extraInitializers = [];
    var _pricePerUnit_decorators;
    var _pricePerUnit_initializers = [];
    var _pricePerUnit_extraInitializers = [];
    var _stockQuantity_decorators;
    var _stockQuantity_initializers = [];
    var _stockQuantity_extraInitializers = [];
    var _minOrderQty_decorators;
    var _minOrderQty_initializers = [];
    var _minOrderQty_extraInitializers = [];
    var _photoUrls_decorators;
    var _photoUrls_initializers = [];
    var _photoUrls_extraInitializers = [];
    var _isActive_decorators;
    var _isActive_initializers = [];
    var _isActive_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateProductDto() {
                /* @IsUUID()
                 supplierId: string;
               */
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.categoryId = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _categoryId_initializers, void 0));
                this.unit = (__runInitializers(this, _categoryId_extraInitializers), __runInitializers(this, _unit_initializers, void 0));
                this.pricePerUnit = (__runInitializers(this, _unit_extraInitializers), __runInitializers(this, _pricePerUnit_initializers, void 0));
                this.stockQuantity = (__runInitializers(this, _pricePerUnit_extraInitializers), __runInitializers(this, _stockQuantity_initializers, void 0));
                this.minOrderQty = (__runInitializers(this, _stockQuantity_extraInitializers), __runInitializers(this, _minOrderQty_initializers, void 0));
                this.photoUrls = (__runInitializers(this, _minOrderQty_extraInitializers), __runInitializers(this, _photoUrls_initializers, void 0));
                this.isActive = (__runInitializers(this, _photoUrls_extraInitializers), __runInitializers(this, _isActive_initializers, void 0));
                __runInitializers(this, _isActive_extraInitializers);
            }
            CreateProductDto._OPENAPI_METADATA_FACTORY = function () {
                return { name: { required: true, type: function () { return String; } }, categoryId: { required: true, type: function () { return String; } }, unit: { required: true, type: function () { return Object; } }, pricePerUnit: { required: true, type: function () { return Number; }, minimum: 0 }, stockQuantity: { required: true, type: function () { return Number; }, minimum: 0 }, minOrderQty: { required: true, type: function () { return Number; }, minimum: 0 }, photoUrls: { required: true, type: function () { return [String]; } }, isActive: { required: false, type: function () { return Boolean; } } };
            };
            return CreateProductDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsString)()];
            _categoryId_decorators = [(0, class_validator_1.IsString)()];
            _unit_decorators = [(0, class_validator_1.IsEnum)(browser_1.PricingUnit)];
            _pricePerUnit_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _stockQuantity_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _minOrderQty_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _photoUrls_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsOptional)()];
            _isActive_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _categoryId_decorators, { kind: "field", name: "categoryId", static: false, private: false, access: { has: function (obj) { return "categoryId" in obj; }, get: function (obj) { return obj.categoryId; }, set: function (obj, value) { obj.categoryId = value; } }, metadata: _metadata }, _categoryId_initializers, _categoryId_extraInitializers);
            __esDecorate(null, null, _unit_decorators, { kind: "field", name: "unit", static: false, private: false, access: { has: function (obj) { return "unit" in obj; }, get: function (obj) { return obj.unit; }, set: function (obj, value) { obj.unit = value; } }, metadata: _metadata }, _unit_initializers, _unit_extraInitializers);
            __esDecorate(null, null, _pricePerUnit_decorators, { kind: "field", name: "pricePerUnit", static: false, private: false, access: { has: function (obj) { return "pricePerUnit" in obj; }, get: function (obj) { return obj.pricePerUnit; }, set: function (obj, value) { obj.pricePerUnit = value; } }, metadata: _metadata }, _pricePerUnit_initializers, _pricePerUnit_extraInitializers);
            __esDecorate(null, null, _stockQuantity_decorators, { kind: "field", name: "stockQuantity", static: false, private: false, access: { has: function (obj) { return "stockQuantity" in obj; }, get: function (obj) { return obj.stockQuantity; }, set: function (obj, value) { obj.stockQuantity = value; } }, metadata: _metadata }, _stockQuantity_initializers, _stockQuantity_extraInitializers);
            __esDecorate(null, null, _minOrderQty_decorators, { kind: "field", name: "minOrderQty", static: false, private: false, access: { has: function (obj) { return "minOrderQty" in obj; }, get: function (obj) { return obj.minOrderQty; }, set: function (obj, value) { obj.minOrderQty = value; } }, metadata: _metadata }, _minOrderQty_initializers, _minOrderQty_extraInitializers);
            __esDecorate(null, null, _photoUrls_decorators, { kind: "field", name: "photoUrls", static: false, private: false, access: { has: function (obj) { return "photoUrls" in obj; }, get: function (obj) { return obj.photoUrls; }, set: function (obj, value) { obj.photoUrls = value; } }, metadata: _metadata }, _photoUrls_initializers, _photoUrls_extraInitializers);
            __esDecorate(null, null, _isActive_decorators, { kind: "field", name: "isActive", static: false, private: false, access: { has: function (obj) { return "isActive" in obj; }, get: function (obj) { return obj.isActive; }, set: function (obj, value) { obj.isActive = value; } }, metadata: _metadata }, _isActive_initializers, _isActive_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateProductDto = CreateProductDto;
