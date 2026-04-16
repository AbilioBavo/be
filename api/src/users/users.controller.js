"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
var openapi = require("@nestjs/swagger");
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var swagger_1 = require("@nestjs/swagger");
(0, swagger_1.ApiTags)('users');
var UsersController = function () {
    var _classDecorators = [(0, common_1.Controller)('users')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getDocuments_decorators;
    var _getProfile_decorators;
    var _uploadDocument_decorators;
    var _updateUser_decorators;
    var _verifyUser_decorators;
    var UsersController = _classThis = /** @class */ (function () {
        function UsersController_1(usersService) {
            this.usersService = (__runInitializers(this, _instanceExtraInitializers), usersService);
        }
        UsersController_1.prototype.getDocuments = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.usersService.getDocuments(id)];
                });
            });
        };
        UsersController_1.prototype.getProfile = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.usersService.getProfile(id)];
                });
            });
        };
        UsersController_1.prototype.uploadDocument = function (file, body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.usersService.uploadDocument(__assign(__assign({}, body), { file: file }))];
                });
            });
        };
        UsersController_1.prototype.updateUser = function (email, updateUserDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.usersService.update(email, updateUserDto)];
                });
            });
        };
        UsersController_1.prototype.verifyUser = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.usersService.verifyUser(email)];
                });
            });
        };
        return UsersController_1;
    }());
    __setFunctionName(_classThis, "UsersController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getDocuments_decorators = [(0, common_1.Get)(':id/documents'), (0, swagger_1.ApiOperation)({
                summary: 'Get user documents',
                description: 'Retrieves all uploaded documents associated with a specific user.',
            }), (0, swagger_1.ApiParam)({
                name: 'id',
                example: '123',
                description: 'User ID',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Documents retrieved successfully',
            }), (0, swagger_1.ApiNotFoundResponse)({
                description: 'User not found',
            }), openapi.ApiResponse({ status: 200, type: Object })];
        _getProfile_decorators = [(0, common_1.Get)(':id'), (0, swagger_1.ApiOperation)({
                summary: 'Get user profile',
                description: 'Retrieves the profile details of a user by ID.',
            }), (0, swagger_1.ApiParam)({
                name: 'id',
                example: '123',
                description: 'User ID',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Profile retrieved successfully',
            }), (0, swagger_1.ApiNotFoundResponse)({
                description: 'User not found',
            }), openapi.ApiResponse({ status: 200, type: require("./dto/get-profile.dto").GetProfileDto })];
        _uploadDocument_decorators = [(0, common_1.Post)('upload-document'), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')), (0, common_1.HttpCode)(201), (0, swagger_1.ApiOperation)({
                summary: 'Upload user document',
                description: 'Uploads a document file and associates it with a user.',
            }), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({
                schema: {
                    type: 'object',
                    properties: {
                        userId: {
                            type: 'string',
                            example: '123',
                        },
                        truckId: {
                            type: 'string',
                            example: '456',
                        },
                        type: {
                            type: 'string',
                            examples: ['LICENSE', 'INSURANCE', 'OTHER'],
                        },
                        file: {
                            type: 'string',
                            format: 'binary',
                        },
                    },
                    required: ['userId', 'type', 'file'],
                },
            }), (0, swagger_1.ApiResponse)({
                status: 201,
                description: 'Document uploaded successfully',
            }), (0, swagger_1.ApiBadRequestResponse)({
                description: 'Invalid upload payload',
            }), openapi.ApiResponse({ status: 201, type: Object })];
        _updateUser_decorators = [(0, common_1.Post)('update/:email'), (0, swagger_1.ApiOperation)({
                summary: 'Update user',
                description: 'Updates user information using their email address.',
            }), (0, swagger_1.ApiParam)({
                name: 'email',
                example: 'user@example.com',
                description: 'User email',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'User updated successfully',
            }), (0, swagger_1.ApiBadRequestResponse)({
                description: 'Invalid update payload',
            }), openapi.ApiResponse({ status: 201, type: String })];
        _verifyUser_decorators = [(0, common_1.Post)('verify/:email'), (0, swagger_1.ApiOperation)({
                summary: 'Verify user',
                description: 'Marks the user account as verified.',
            }), (0, swagger_1.ApiParam)({
                name: 'email',
                example: 'user@example.com',
                description: 'User email',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'User verified successfully',
            }), openapi.ApiResponse({ status: 201, type: String })];
        __esDecorate(_classThis, null, _getDocuments_decorators, { kind: "method", name: "getDocuments", static: false, private: false, access: { has: function (obj) { return "getDocuments" in obj; }, get: function (obj) { return obj.getDocuments; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProfile_decorators, { kind: "method", name: "getProfile", static: false, private: false, access: { has: function (obj) { return "getProfile" in obj; }, get: function (obj) { return obj.getProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _uploadDocument_decorators, { kind: "method", name: "uploadDocument", static: false, private: false, access: { has: function (obj) { return "uploadDocument" in obj; }, get: function (obj) { return obj.uploadDocument; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateUser_decorators, { kind: "method", name: "updateUser", static: false, private: false, access: { has: function (obj) { return "updateUser" in obj; }, get: function (obj) { return obj.updateUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyUser_decorators, { kind: "method", name: "verifyUser", static: false, private: false, access: { has: function (obj) { return "verifyUser" in obj; }, get: function (obj) { return obj.verifyUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsersController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsersController = _classThis;
}();
exports.UsersController = UsersController;
