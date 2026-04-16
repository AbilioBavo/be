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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MpesaGateway = void 0;
var common_1 = require("@nestjs/common");
var crypto_1 = require("crypto");
var constants_1 = require("constants");
var dotenv = require("dotenv");
dotenv.config();
var MpesaGateway = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var MpesaGateway = _classThis = /** @class */ (function () {
        function MpesaGateway_1() {
            this.apiBaseUrl = process.env.MPESA_API_BASE_URL;
            this.apiKey = process.env.MPESA_API_KEY;
            this.publicKey = process.env.MPESA_PUBLIC_KEY;
            this.serviceProviderCode = process.env.MPESA_SERVICE_PROVIDER_CODE;
        }
        MpesaGateway_1.prototype.initiatePayment = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var token, payload, response, result, error_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            console.log('Generating bearer token for M-Pesa API');
                            token = this.generateBearerToken(this.apiKey, this.publicKey);
                            console.log('Bearer token generated successfully');
                            payload = {
                                input_TransactionReference: data.orderId.substring(0, 20),
                                input_CustomerMSISDN: (_a = data.customerPhone) === null || _a === void 0 ? void 0 : _a.replace(/\D/g, ''),
                                input_Amount: data.amount,
                                input_ThirdPartyReference: "ORDER".concat(data.orderId).substring(0, 20),
                                input_ServiceProviderCode: this.serviceProviderCode,
                            };
                            console.log('Initiating M-Pesa payment with payload:', payload);
                            return [4 /*yield*/, fetch("".concat(this.apiBaseUrl, ":18352/ipg/v1x/c2bPayment/singleStage/"), {
                                    method: 'POST',
                                    headers: {
                                        Authorization: "Bearer ".concat(token),
                                        'Content-Type': 'application/json',
                                        Accept: 'application/json',
                                        Origin: 'https://developer.mpesa.vm.co.mz',
                                    },
                                    body: JSON.stringify(payload),
                                })];
                        case 1:
                            response = _b.sent();
                            console.log('M-Pesa API response status:', response.status);
                            return [4 /*yield*/, response.json()];
                        case 2:
                            result = _b.sent();
                            if (!response.ok) {
                                throw new Error(JSON.stringify(result) || response.statusText);
                            }
                            return [2 /*return*/, {
                                    success: true,
                                    transactionId: result.output_TransactionID,
                                    code: result.output_ResponseCode,
                                    message: 'Pagamento iniciado com sucesso',
                                }];
                        case 3:
                            error_1 = _b.sent();
                            throw new common_1.InternalServerErrorException(error_1.message);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        MpesaGateway_1.prototype.processWebhook = function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var orderId, status;
                return __generator(this, function (_a) {
                    orderId = payload.input_ThirdPartyReference;
                    status = 'pending';
                    if (payload.transactionStatus === 'Success')
                        status = 'success';
                    if (payload.transactionStatus === 'Failed')
                        status = 'failed';
                    return [2 /*return*/, { success: true, orderId: orderId, status: status }];
                });
            });
        };
        MpesaGateway_1.prototype.refund = function (transactionId, amount) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, {
                            success: false,
                            message: 'M-Pesa refund requires manual B2C flow',
                        }];
                });
            });
        };
        MpesaGateway_1.prototype.generateBearerToken = function (apiKey, publicKey) {
            var formattedKey = "-----BEGIN PUBLIC KEY-----\n".concat(publicKey, "\n-----END PUBLIC KEY-----");
            console.log('Encrypting API key for M-Pesa authentication');
            var encrypted = crypto_1.default.publicEncrypt({
                key: formattedKey,
                padding: constants_1.default.RSA_PKCS1_PADDING,
            }, Buffer.from(apiKey));
            //console.log('API key encrypted successfully', { encrypted: encrypted.toString('base64') });
            return encrypted.toString('base64');
        };
        return MpesaGateway_1;
    }());
    __setFunctionName(_classThis, "MpesaGateway");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MpesaGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MpesaGateway = _classThis;
}();
exports.MpesaGateway = MpesaGateway;
