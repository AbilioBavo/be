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
exports.AuthController = void 0;
var openapi = require("@nestjs/swagger");
var common_1 = require("@nestjs/common");
var login_dto_1 = require("./dto/login.dto");
var reset_Password_dto_1 = require("./dto/reset-Password.dto");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("./jwt-auth.guard");
var AuthController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('auth'), (0, common_1.Controller)('auth')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _create_decorators;
    var _login_decorators;
    var _refreshToken_decorators;
    var _resetPassword_decorators;
    var _confirmResetPassword_decorators;
    var _createSupplierProfile_decorators;
    var AuthController = _classThis = /** @class */ (function () {
        function AuthController_1(authService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
        }
        AuthController_1.prototype.create = function (createAuthDto) {
            return this.authService.create(createAuthDto);
        };
        AuthController_1.prototype.login = function (loginDto) {
            return this.authService.login(loginDto);
        };
        AuthController_1.prototype.refreshToken = function (userId) {
            return this.authService.refreshToken(userId);
        };
        AuthController_1.prototype.resetPassword = function (email) {
            return this.authService.resetPassword(email);
        };
        AuthController_1.prototype.confirmResetPassword = function (resetPasswordDto) {
            return this.authService.confirmResetPassword(resetPasswordDto);
        };
        AuthController_1.prototype.createSupplierProfile = function (request, dto) {
            return this.authService.createSupplierProfile(request.user.userId, dto);
        };
        return AuthController_1;
    }());
    __setFunctionName(_classThis, "AuthController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _create_decorators = [(0, common_1.Post)('register'), (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }), openapi.ApiResponse({ status: 201 })];
        _login_decorators = [(0, common_1.Post)('login'), (0, common_1.HttpCode)(200), (0, swagger_1.ApiOperation)({
                summary: 'Login a user',
                description: 'Authenticates a user using email and password and returns an access token.',
            }), (0, swagger_1.ApiBody)({
                type: login_dto_1.LoginDto,
                description: 'User login credentials',
                examples: {
                    example1: {
                        summary: 'Valid login payload',
                        value: {
                            email: 'user@example.com',
                            password: 'strongPassword123',
                        },
                    },
                },
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'User successfully authenticated',
                schema: {
                    example: {
                        accessToken: 'jwt-token-here',
                        user: {
                            id: 1,
                            email: 'user@example.com',
                        },
                    },
                },
            }), (0, swagger_1.ApiUnauthorizedResponse)({
                description: 'Invalid email or password',
            }), (0, swagger_1.ApiBadRequestResponse)({
                description: 'Invalid request payload',
            }), openapi.ApiResponse({ status: 200 })];
        _refreshToken_decorators = [(0, common_1.Post)('token-refresh'), (0, common_1.HttpCode)(200), (0, swagger_1.ApiOperation)({ summary: 'Refresh authentication token' }), openapi.ApiResponse({ status: 200 })];
        _resetPassword_decorators = [(0, common_1.Post)('reset-password'), (0, common_1.HttpCode)(200), (0, swagger_1.ApiOperation)({
                summary: 'reset password request',
                description: 'description',
            }), (0, swagger_1.ApiBody)({
                type: String,
                description: 'User email for password reset',
                examples: {
                    example1: {
                        summary: 'User email for password reset',
                        value: {
                            email: 'user@example.com',
                        },
                    },
                },
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'otp code sent to email if it exists',
            }), openapi.ApiResponse({ status: 200 })];
        _confirmResetPassword_decorators = [(0, common_1.Post)('confirm-reset-password'), (0, swagger_1.ApiOperation)({
                summary: 'Confirm reset password request',
                description: 'description',
            }), (0, swagger_1.ApiBody)({
                type: reset_Password_dto_1.ResetPasswordDto,
                description: 'User email, otp code and new password for confirming password reset',
                examples: {
                    example1: {
                        summary: 'User email, otp code and new password for confirming password reset',
                        value: {
                            email: 'user@example.com',
                            otp: '123456',
                            newPassword: 'newPassword123',
                        },
                    },
                },
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'otp code sent to email if it exists',
            }), (0, common_1.HttpCode)(200), openapi.ApiResponse({ status: 200 })];
        _createSupplierProfile_decorators = [(0, common_1.Post)('create-supplier'), (0, swagger_1.ApiOperation)({
                summary: 'Create supplier profile',
                description: 'Creates a supplier profile for a user with the given details.',
            }), (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard), openapi.ApiResponse({ status: 201 })];
        __esDecorate(_classThis, null, _create_decorators, { kind: "method", name: "create", static: false, private: false, access: { has: function (obj) { return "create" in obj; }, get: function (obj) { return obj.create; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _login_decorators, { kind: "method", name: "login", static: false, private: false, access: { has: function (obj) { return "login" in obj; }, get: function (obj) { return obj.login; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _refreshToken_decorators, { kind: "method", name: "refreshToken", static: false, private: false, access: { has: function (obj) { return "refreshToken" in obj; }, get: function (obj) { return obj.refreshToken; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resetPassword_decorators, { kind: "method", name: "resetPassword", static: false, private: false, access: { has: function (obj) { return "resetPassword" in obj; }, get: function (obj) { return obj.resetPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _confirmResetPassword_decorators, { kind: "method", name: "confirmResetPassword", static: false, private: false, access: { has: function (obj) { return "confirmResetPassword" in obj; }, get: function (obj) { return obj.confirmResetPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createSupplierProfile_decorators, { kind: "method", name: "createSupplierProfile", static: false, private: false, access: { has: function (obj) { return "createSupplierProfile" in obj; }, get: function (obj) { return obj.createSupplierProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthController = _classThis;
}();
exports.AuthController = AuthController;
