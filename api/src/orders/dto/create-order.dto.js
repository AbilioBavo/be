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
exports.CreateOrderDto = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var enums_1 = require("../../generated/prisma/enums");
var CreateOrderDto = function () {
    var _a;
    var _productId_decorators;
    var _productId_initializers = [];
    var _productId_extraInitializers = [];
    var _quantity_decorators;
    var _quantity_initializers = [];
    var _quantity_extraInitializers = [];
    var _deliveryAddress_decorators;
    var _deliveryAddress_initializers = [];
    var _deliveryAddress_extraInitializers = [];
    var _latitude_decorators;
    var _latitude_initializers = [];
    var _latitude_extraInitializers = [];
    var _longitude_decorators;
    var _longitude_initializers = [];
    var _longitude_extraInitializers = [];
    var _scheduledAt_decorators;
    var _scheduledAt_initializers = [];
    var _scheduledAt_extraInitializers = [];
    var _deliveryType_decorators;
    var _deliveryType_initializers = [];
    var _deliveryType_extraInitializers = [];
    var _isCod_decorators;
    var _isCod_initializers = [];
    var _isCod_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateOrderDto() {
                this.productId = __runInitializers(this, _productId_initializers, void 0);
                this.quantity = (__runInitializers(this, _productId_extraInitializers), __runInitializers(this, _quantity_initializers, void 0));
                this.deliveryAddress = (__runInitializers(this, _quantity_extraInitializers), __runInitializers(this, _deliveryAddress_initializers, void 0));
                this.latitude = (__runInitializers(this, _deliveryAddress_extraInitializers), __runInitializers(this, _latitude_initializers, void 0));
                this.longitude = (__runInitializers(this, _latitude_extraInitializers), __runInitializers(this, _longitude_initializers, void 0));
                this.scheduledAt = (__runInitializers(this, _longitude_extraInitializers), __runInitializers(this, _scheduledAt_initializers, void 0));
                this.deliveryType = (__runInitializers(this, _scheduledAt_extraInitializers), __runInitializers(this, _deliveryType_initializers, void 0));
                this.isCod = (__runInitializers(this, _deliveryType_extraInitializers), __runInitializers(this, _isCod_initializers, void 0));
                __runInitializers(this, _isCod_extraInitializers);
            }
            CreateOrderDto._OPENAPI_METADATA_FACTORY = function () {
                return { productId: { required: true, type: function () { return String; }, format: "uuid" }, quantity: { required: true, type: function () { return Number; }, minimum: 0.1 }, deliveryAddress: { required: true, type: function () { return String; } }, latitude: { required: false, type: function () { return Number; } }, longitude: { required: false, type: function () { return Number; } }, scheduledAt: { required: true, type: function () { return String; } }, deliveryType: { required: true, type: function () { return Object; } }, isCod: { required: true, type: function () { return Boolean; } } };
            };
            return CreateOrderDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _productId_decorators = [(0, class_validator_1.IsUUID)()];
            _quantity_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0.1)];
            _deliveryAddress_decorators = [(0, class_validator_1.IsString)()];
            _latitude_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _longitude_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _scheduledAt_decorators = [(0, class_validator_1.IsDateString)()];
            _deliveryType_decorators = [(0, class_validator_1.IsEnum)(enums_1.DeliveryType)];
            _isCod_decorators = [(0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _productId_decorators, { kind: "field", name: "productId", static: false, private: false, access: { has: function (obj) { return "productId" in obj; }, get: function (obj) { return obj.productId; }, set: function (obj, value) { obj.productId = value; } }, metadata: _metadata }, _productId_initializers, _productId_extraInitializers);
            __esDecorate(null, null, _quantity_decorators, { kind: "field", name: "quantity", static: false, private: false, access: { has: function (obj) { return "quantity" in obj; }, get: function (obj) { return obj.quantity; }, set: function (obj, value) { obj.quantity = value; } }, metadata: _metadata }, _quantity_initializers, _quantity_extraInitializers);
            __esDecorate(null, null, _deliveryAddress_decorators, { kind: "field", name: "deliveryAddress", static: false, private: false, access: { has: function (obj) { return "deliveryAddress" in obj; }, get: function (obj) { return obj.deliveryAddress; }, set: function (obj, value) { obj.deliveryAddress = value; } }, metadata: _metadata }, _deliveryAddress_initializers, _deliveryAddress_extraInitializers);
            __esDecorate(null, null, _latitude_decorators, { kind: "field", name: "latitude", static: false, private: false, access: { has: function (obj) { return "latitude" in obj; }, get: function (obj) { return obj.latitude; }, set: function (obj, value) { obj.latitude = value; } }, metadata: _metadata }, _latitude_initializers, _latitude_extraInitializers);
            __esDecorate(null, null, _longitude_decorators, { kind: "field", name: "longitude", static: false, private: false, access: { has: function (obj) { return "longitude" in obj; }, get: function (obj) { return obj.longitude; }, set: function (obj, value) { obj.longitude = value; } }, metadata: _metadata }, _longitude_initializers, _longitude_extraInitializers);
            __esDecorate(null, null, _scheduledAt_decorators, { kind: "field", name: "scheduledAt", static: false, private: false, access: { has: function (obj) { return "scheduledAt" in obj; }, get: function (obj) { return obj.scheduledAt; }, set: function (obj, value) { obj.scheduledAt = value; } }, metadata: _metadata }, _scheduledAt_initializers, _scheduledAt_extraInitializers);
            __esDecorate(null, null, _deliveryType_decorators, { kind: "field", name: "deliveryType", static: false, private: false, access: { has: function (obj) { return "deliveryType" in obj; }, get: function (obj) { return obj.deliveryType; }, set: function (obj, value) { obj.deliveryType = value; } }, metadata: _metadata }, _deliveryType_initializers, _deliveryType_extraInitializers);
            __esDecorate(null, null, _isCod_decorators, { kind: "field", name: "isCod", static: false, private: false, access: { has: function (obj) { return "isCod" in obj; }, get: function (obj) { return obj.isCod; }, set: function (obj, value) { obj.isCod = value; } }, metadata: _metadata }, _isCod_initializers, _isCod_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateOrderDto = CreateOrderDto;
