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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
//import { UpdateAuthDto } from './dto/update-auth.dto';
var prisma_1 = require("../lib/prisma");
var bcrypt = require("bcrypt");
var enums_1 = require("../generated/prisma/enums");
var common_2 = require("@nestjs/common");
var crypto = require("crypto");
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(prisma, jwtService, mailService) {
            this.prisma = prisma;
            this.jwtService = jwtService;
            this.mailService = mailService;
        }
        AuthService_1.prototype.create = function (createAuthDto) {
            return __awaiter(this, void 0, void 0, function () {
                var email, password, phone, role, passwordHash, userStatus, otp, user, _, result, otpCode, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = createAuthDto.email, password = createAuthDto.password, phone = createAuthDto.phone, role = createAuthDto.role;
                            return [4 /*yield*/, bcrypt.hash(password, 10)];
                        case 1:
                            passwordHash = _a.sent();
                            userStatus = enums_1.AccountStatus.INACTIVE;
                            otp = crypto.randomInt(100000, 999999).toString();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 5, , 6]);
                            return [4 /*yield*/, prisma_1.prisma.user.create({
                                    data: {
                                        email: email,
                                        phone: phone,
                                        role: role,
                                        status: userStatus,
                                        otpSecret: otp, // Guarda o OTP para verificação futura
                                        passwordHash: passwordHash,
                                    },
                                })];
                        case 3:
                            user = _a.sent();
                            _ = user.passwordHash, result = __rest(user, ["passwordHash"]);
                            return [4 /*yield*/, this.mailService.sendWelcomeEmail(email, otp)];
                        case 4:
                            otpCode = _a.sent();
                            //console.log('otpCode object: ', otpCode);
                            return [2 /*return*/, result];
                        case 5:
                            error_1 = _a.sent();
                            if (error_1.code === '23505') { // Unique violation
                                throw new common_2.ConflictException('Email already exists');
                            }
                            else {
                                throw error_1; // rethrow other errors
                            }
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.login = function (loginDto) {
            return __awaiter(this, void 0, void 0, function () {
                var email, password, user, isPasswordValid, payload, access_token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = loginDto.email, password = loginDto.password;
                            return [4 /*yield*/, prisma_1.prisma.user.findUnique({ where: { email: email } })];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_2.ConflictException('Invalid credentials');
                            }
                            return [4 /*yield*/, bcrypt.compare(password, user.passwordHash)];
                        case 2:
                            isPasswordValid = _a.sent();
                            if (!isPasswordValid) {
                                throw new common_2.ConflictException('Invalid credentials');
                            }
                            payload = { sub: user.id, email: user.email, role: user.role };
                            return [4 /*yield*/, this.jwtService.signAsync(payload)];
                        case 3:
                            access_token = _a.sent();
                            return [2 /*return*/, {
                                    token: access_token,
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.verifyAccount = function (VerifyAccountDto) {
            return __awaiter(this, void 0, void 0, function () {
                var email, otp, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = VerifyAccountDto.email, otp = VerifyAccountDto.otp;
                            return [4 /*yield*/, this.prisma.user.findUnique({ where: { email: email } })];
                        case 1:
                            user = _a.sent();
                            if (!user || user.otpSecret !== otp) {
                                throw new common_2.UnauthorizedException('Código inválido ou expirado.');
                            }
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.id },
                                    data: {
                                        status: enums_1.AccountStatus.ACTIVE,
                                        otpSecret: null, // Limpa o código após o uso por segurança
                                    },
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'Conta verificada com sucesso!' }];
                    }
                });
            });
        };
        AuthService_1.prototype.refreshToken = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user, payload, access_token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { id: userId } })];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_2.UnauthorizedException();
                            payload = { sub: user.id, email: user.email };
                            return [4 /*yield*/, this.jwtService.signAsync(payload)];
                        case 2:
                            access_token = _a.sent();
                            return [2 /*return*/, {
                                    token: access_token,
                                    // Opcional: Gerar um novo refresh_token também (rotação de tokens)
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.resetPassword = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var user, otp, otpCode;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({ where: { email: email } })];
                        case 1:
                            user = _a.sent();
                            if (!user) return [3 /*break*/, 4];
                            otp = crypto.randomInt(100000, 999999).toString();
                            // Guardamos o OTP no campo otpSecret (podes expirar em 10-15 min) TODO
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.id },
                                    data: { otpSecret: otp },
                                })];
                        case 2:
                            // Guardamos o OTP no campo otpSecret (podes expirar em 10-15 min) TODO
                            _a.sent();
                            console.log("OTP para ".concat(email, ": ").concat(otp));
                            return [4 /*yield*/, this.mailService.sendWelcomeEmail(email, otp)];
                        case 3:
                            otpCode = _a.sent();
                            console.log('otpCode object: ', otpCode);
                            return [2 /*return*/, {
                                    message: 'Enviámos um código de 6 dígitos para o seu email.',
                                }];
                        case 4: 
                        // Para segurança, não revelamos se o email existe ou não
                        return [2 /*return*/, {
                                message: 'Se o email existir, enviámos um código de 6 dígitos.',
                            }];
                    }
                });
            });
        };
        AuthService_1.prototype.confirmResetPassword = function (ResetPasswordDto) {
            return __awaiter(this, void 0, void 0, function () {
                var email, otp, newPassword, user, passwordHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = ResetPasswordDto.email, otp = ResetPasswordDto.otp, newPassword = ResetPasswordDto.newPassword;
                            return [4 /*yield*/, this.prisma.user.findUnique({ where: { email: email } })];
                        case 1:
                            user = _a.sent();
                            // Verifica se o utilizador existe e se o código coincide
                            if (!user || user.otpSecret !== otp) {
                                throw new common_2.UnauthorizedException('Código inválido ou expirado.');
                            }
                            return [4 /*yield*/, bcrypt.hash(newPassword, 10)];
                        case 2:
                            passwordHash = _a.sent();
                            return [4 /*yield*/, this.prisma.user.update({
                                    where: { id: user.id },
                                    data: {
                                        passwordHash: passwordHash,
                                        otpSecret: null, // Limpa o código após o uso por segurança
                                    },
                                })];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, { message: 'Password atualizada com sucesso!' }];
                    }
                });
            });
        };
        AuthService_1.prototype.createSupplierProfile = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var companyName, nuit, location, deliveryRadiusKm, bankAccountRef, commissionRate, SupplierProfile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            companyName = dto.companyName, nuit = dto.nuit, location = dto.location, deliveryRadiusKm = dto.deliveryRadiusKm, bankAccountRef = dto.bankAccountRef, commissionRate = dto.commissionRate;
                            return [4 /*yield*/, this.prisma.supplierProfile.create({
                                    data: {
                                        userId: userId,
                                        companyName: companyName,
                                        nuit: nuit,
                                        //location,
                                        deliveryRadiusKm: deliveryRadiusKm,
                                        bankAccountRef: bankAccountRef,
                                        commissionRate: commissionRate,
                                    },
                                })];
                        case 1:
                            SupplierProfile = _a.sent();
                            return [2 /*return*/, { message: "Perfil do fornecedor criado com sucesso! Nome: ".concat(SupplierProfile.companyName), status: 'success' }];
                    }
                });
            });
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
