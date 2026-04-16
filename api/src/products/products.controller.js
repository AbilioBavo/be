"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
var openapi = require("@nestjs/swagger");
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
//import { JwtAuthGuard } from 'src/jwt-auth.guard';
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var roles_decorator_1 = require("../auth/roles.decorator");
var roles_guard_1 = require("../auth/roles.guard");
var ProductsController = function () {
    var _classDecorators = [(0, common_1.Controller)('products')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _update_decorators;
    var _remove_decorators;
    var _createCategory_decorators;
    var _findAll_decorators;
    var _findOne_decorators;
    var _getProductsByCategory_decorators;
    var _deactivateProduct_decorators;
    var _getProductsBySupplier_decorators;
    var ProductsController = _classThis = /** @class */ (function () {
        function ProductsController_1(productsService) {
            this.productsService = (__runInitializers(this, _instanceExtraInitializers), productsService);
        }
        ProductsController_1.prototype.create = function (req, createProductDto) {
            return this.productsService.create(req.user.userId, createProductDto);
        };
        //c268f38f-465a-496b-af39-70cb397e400d
        ProductsController_1.prototype.update = function (req, id, updateProductDto) {
            return this.productsService.update(req.user.userId, id, updateProductDto);
        };
        ProductsController_1.prototype.remove = function (id) {
            return this.productsService.remove(+id);
        };
        ProductsController_1.prototype.createCategory = function (req, category) {
            return this.productsService.createCategory(req.user.userId, category);
        };
        ProductsController_1.prototype.findAll = function () {
            return this.productsService.getProducts();
        };
        ProductsController_1.prototype.findOne = function (id) {
            return this.productsService.getProductById(id);
        };
        ProductsController_1.prototype.getProductsByCategory = function (slug) {
            return this.productsService.getProductsByCategory(slug);
        };
        ProductsController_1.prototype.deactivateProduct = function (id) {
            return this.productsService.deactivateProduct(id);
        };
        ProductsController_1.prototype.getProductsBySupplier = function (supplierId) {
            return this.productsService.getProductsBySupplier(supplierId);
        };
        return ProductsController_1;
    }());
    __setFunctionName(_classThis, "ProductsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)('create'), (0, common_2.UseGuards)(jwt_auth_guard_1.JwtGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('SUPPLIER'), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: Object })];
        _update_decorators = [(0, common_1.Patch)('update/:id'), (0, common_2.UseGuards)(jwt_auth_guard_1.JwtGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('SUPPLIER'), openapi.ApiResponse({ status: 200 })];
        _remove_decorators = [(0, common_1.Delete)(':id'), (0, common_2.UseGuards)(jwt_auth_guard_1.JwtGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('SUPPLIER'), openapi.ApiResponse({ status: 200, type: String })];
        _createCategory_decorators = [(0, common_1.Post)('/category/create'), (0, common_2.UseGuards)(jwt_auth_guard_1.JwtGuard, roles_guard_1.RolesGuard), (0, roles_decorator_1.Roles)('ADMIN'), openapi.ApiResponse({ status: 201, type: Object })];
        _findAll_decorators = [(0, common_1.Get)(), openapi.ApiResponse({ status: 200, type: Object })];
        _findOne_decorators = [(0, common_1.Get)(':id'), openapi.ApiResponse({ status: 200, type: Object })];
        _getProductsByCategory_decorators = [(0, common_1.Get)('/category/:name'), openapi.ApiResponse({ status: 200, type: Object })];
        _deactivateProduct_decorators = [(0, common_1.Delete)('/deactivate/:id'), openapi.ApiResponse({ status: 200, type: Object })];
        _getProductsBySupplier_decorators = [(0, common_1.Get)('/supplier/:id'), openapi.ApiResponse({ status: 200, type: Object })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _update_decorators, { kind: "method", name: "update", static: false, private: false, access: { has: function (obj) { return "update" in obj; }, get: function (obj) { return obj.update; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _remove_decorators, { kind: "method", name: "remove", static: false, private: false, access: { has: function (obj) { return "remove" in obj; }, get: function (obj) { return obj.remove; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createCategory_decorators, { kind: "method", name: "createCategory", static: false, private: false, access: { has: function (obj) { return "createCategory" in obj; }, get: function (obj) { return obj.createCategory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findAll_decorators, { kind: "method", name: "findAll", static: false, private: false, access: { has: function (obj) { return "findAll" in obj; }, get: function (obj) { return obj.findAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _findOne_decorators, { kind: "method", name: "findOne", static: false, private: false, access: { has: function (obj) { return "findOne" in obj; }, get: function (obj) { return obj.findOne; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProductsByCategory_decorators, { kind: "method", name: "getProductsByCategory", static: false, private: false, access: { has: function (obj) { return "getProductsByCategory" in obj; }, get: function (obj) { return obj.getProductsByCategory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deactivateProduct_decorators, { kind: "method", name: "deactivateProduct", static: false, private: false, access: { has: function (obj) { return "deactivateProduct" in obj; }, get: function (obj) { return obj.deactivateProduct; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProductsBySupplier_decorators, { kind: "method", name: "getProductsBySupplier", static: false, private: false, access: { has: function (obj) { return "getProductsBySupplier" in obj; }, get: function (obj) { return obj.getProductsBySupplier; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductsController = _classThis;
}();
exports.ProductsController = ProductsController;
