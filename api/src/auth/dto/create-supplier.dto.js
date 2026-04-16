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
exports.CreateSupplierProfileDto = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateSupplierProfileDto = function () {
    var _a;
    var _companyName_decorators;
    var _companyName_initializers = [];
    var _companyName_extraInitializers = [];
    var _nuit_decorators;
    var _nuit_initializers = [];
    var _nuit_extraInitializers = [];
    var _location_decorators;
    var _location_initializers = [];
    var _location_extraInitializers = [];
    var _deliveryRadiusKm_decorators;
    var _deliveryRadiusKm_initializers = [];
    var _deliveryRadiusKm_extraInitializers = [];
    var _bankAccountRef_decorators;
    var _bankAccountRef_initializers = [];
    var _bankAccountRef_extraInitializers = [];
    var _commissionRate_decorators;
    var _commissionRate_initializers = [];
    var _commissionRate_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateSupplierProfileDto() {
                this.companyName = __runInitializers(this, _companyName_initializers, void 0);
                this.nuit = (__runInitializers(this, _companyName_extraInitializers), __runInitializers(this, _nuit_initializers, void 0));
                //@IsNotEmpty()
                this.location = (__runInitializers(this, _nuit_extraInitializers), __runInitializers(this, _location_initializers, void 0));
                this.deliveryRadiusKm = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _deliveryRadiusKm_initializers, void 0));
                this.bankAccountRef = (__runInitializers(this, _deliveryRadiusKm_extraInitializers), __runInitializers(this, _bankAccountRef_initializers, void 0));
                this.commissionRate = (__runInitializers(this, _bankAccountRef_extraInitializers), __runInitializers(this, _commissionRate_initializers, void 0));
                __runInitializers(this, _commissionRate_extraInitializers);
            }
            CreateSupplierProfileDto._OPENAPI_METADATA_FACTORY = function () {
                return { companyName: { required: true, type: function () { return String; } }, nuit: { required: false, type: function () { return String; } }, location: { required: true, type: function () { return String; } }, deliveryRadiusKm: { required: false, type: function () { return Number; } }, bankAccountRef: { required: false, type: function () { return String; } }, commissionRate: { required: false, type: function () { return Number; } } };
            };
            return CreateSupplierProfileDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _companyName_decorators = [(0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsString)()];
            _nuit_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _location_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _deliveryRadiusKm_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _bankAccountRef_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _commissionRate_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            __esDecorate(null, null, _companyName_decorators, { kind: "field", name: "companyName", static: false, private: false, access: { has: function (obj) { return "companyName" in obj; }, get: function (obj) { return obj.companyName; }, set: function (obj, value) { obj.companyName = value; } }, metadata: _metadata }, _companyName_initializers, _companyName_extraInitializers);
            __esDecorate(null, null, _nuit_decorators, { kind: "field", name: "nuit", static: false, private: false, access: { has: function (obj) { return "nuit" in obj; }, get: function (obj) { return obj.nuit; }, set: function (obj, value) { obj.nuit = value; } }, metadata: _metadata }, _nuit_initializers, _nuit_extraInitializers);
            __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
            __esDecorate(null, null, _deliveryRadiusKm_decorators, { kind: "field", name: "deliveryRadiusKm", static: false, private: false, access: { has: function (obj) { return "deliveryRadiusKm" in obj; }, get: function (obj) { return obj.deliveryRadiusKm; }, set: function (obj, value) { obj.deliveryRadiusKm = value; } }, metadata: _metadata }, _deliveryRadiusKm_initializers, _deliveryRadiusKm_extraInitializers);
            __esDecorate(null, null, _bankAccountRef_decorators, { kind: "field", name: "bankAccountRef", static: false, private: false, access: { has: function (obj) { return "bankAccountRef" in obj; }, get: function (obj) { return obj.bankAccountRef; }, set: function (obj, value) { obj.bankAccountRef = value; } }, metadata: _metadata }, _bankAccountRef_initializers, _bankAccountRef_extraInitializers);
            __esDecorate(null, null, _commissionRate_decorators, { kind: "field", name: "commissionRate", static: false, private: false, access: { has: function (obj) { return "commissionRate" in obj; }, get: function (obj) { return obj.commissionRate; }, set: function (obj, value) { obj.commissionRate = value; } }, metadata: _metadata }, _commissionRate_initializers, _commissionRate_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateSupplierProfileDto = CreateSupplierProfileDto;
