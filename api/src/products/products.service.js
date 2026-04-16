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
exports.ProductsService = void 0;
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
var ProductsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProductsService = _classThis = /** @class */ (function () {
        function ProductsService_1(prisma) {
            this.prisma = prisma;
        }
        ProductsService_1.prototype.create = function (userId, createProductDto) {
            return __awaiter(this, void 0, void 0, function () {
                var supplier;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log('Creating product for user ID: ', userId);
                            return [4 /*yield*/, this.prisma.supplierProfile.findUnique({
                                    where: { userId: userId },
                                })];
                        case 1:
                            supplier = _a.sent();
                            /*if (supplier?.role !== 'SUPPLIER') {
                              throw new NotFoundException('Supplier not found');
                            }*/
                            if (!supplier) {
                                throw new common_2.NotFoundException('Supplier not found');
                            }
                            this.prisma.category.findUnique({
                                where: { id: createProductDto.categoryId },
                            }).then(function (category) {
                                if (!category) {
                                    throw new common_2.NotFoundException('Category not found');
                                }
                            }).catch(function (error) {
                                throw error;
                            });
                            return [2 /*return*/, this.prisma.product.create({
                                    data: __assign(__assign({}, createProductDto), { supplierId: supplier.id }),
                                })];
                    }
                });
            });
        };
        ProductsService_1.prototype.findAll = function () {
            return "This action returns all products";
        };
        ProductsService_1.prototype.findOne = function (id) {
            return "This action returns a #".concat(id, " product");
        };
        ProductsService_1.prototype.update = function (userId, productId, updateProductDto) {
            return __awaiter(this, void 0, void 0, function () {
                var supplier, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.supplierProfile.findUnique({
                                where: { userId: userId },
                            })];
                        case 1:
                            supplier = _a.sent();
                            if (!supplier) {
                                throw new common_2.NotFoundException('Utilizador não possui perfil de fornecedor.');
                            }
                            return [4 /*yield*/, this.prisma.product.updateMany({
                                    where: {
                                        id: productId,
                                        supplierId: supplier.id, // Só atualiza se o produto for deste fornecedor
                                    },
                                    data: updateProductDto,
                                })];
                        case 2:
                            updated = _a.sent();
                            // 3. Se o count for 0, o produto não existe ou não pertence a este fornecedor
                            if (updated.count === 0) {
                                throw new common_2.NotFoundException('Produto não encontrado ou sem permissão para editar.');
                            }
                            return [2 /*return*/, { message: 'Produto atualizado com sucesso' }];
                    }
                });
            });
        };
        ProductsService_1.prototype.remove = function (id) {
            return "This action removes a #".concat(id, " product");
        };
        ProductsService_1.prototype.createCategory = function (userId, category) {
            return __awaiter(this, void 0, void 0, function () {
                var admin, slug;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findFirst({
                                where: {
                                    id: userId,
                                    role: 'ADMIN',
                                },
                            })];
                        case 1:
                            admin = _a.sent();
                            if (!admin) {
                                throw new common_2.NotFoundException('Utilizador não possui perfil de administrador.');
                            }
                            slug = category.name
                                .toLowerCase()
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "") // Remove acentos
                                .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
                                .replace(/\s+/g, "-");
                            return [2 /*return*/, this.prisma.category.create({
                                    data: {
                                        name: category.name,
                                        description: category.description,
                                        slug: slug,
                                        isActive: true,
                                    },
                                })];
                    }
                });
            });
        };
        ProductsService_1.prototype.findAllCategories = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.category.findMany({
                            where: {
                                isActive: true,
                            },
                        })];
                });
            });
        };
        ProductsService_1.prototype.findOneCategory = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var category;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.category.findUnique({
                                where: { id: id },
                            })];
                        case 1:
                            category = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProductsService_1.prototype.updateCategory = function (id, category) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.category.update({
                            where: { id: id },
                            data: {
                                name: category.name,
                                description: category.description,
                            },
                        })];
                });
            });
        };
        ProductsService_1.prototype.getProductsByCategory = function (categoryName) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.category.findMany({
                            where: { slug: categoryName },
                            include: {
                                products: {
                                    include: {
                                        supplier: true,
                                    },
                                },
                            },
                        })];
                });
            });
        };
        ProductsService_1.prototype.getProductsBySupplier = function (supplierId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.product.findMany({
                            where: { supplierId: supplierId },
                        })];
                });
            });
        };
        ProductsService_1.prototype.getProducts = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.product.findMany({
                            include: {
                                category: true,
                                supplier: true,
                            },
                        })];
                });
            });
        };
        ProductsService_1.prototype.getProductById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.product.findUnique({
                                where: { id: id },
                                include: {
                                    category: true,
                                    supplier: true,
                                },
                            })];
                        case 1:
                            product = _a.sent();
                            if (!product) {
                                throw new common_2.NotFoundException('Product not found');
                            }
                            return [2 /*return*/, product];
                    }
                });
            });
        };
        ProductsService_1.prototype.deactivateProduct = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.product.update({
                            where: { id: id },
                            data: { isActive: false },
                        })];
                });
            });
        };
        return ProductsService_1;
    }());
    __setFunctionName(_classThis, "ProductsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProductsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProductsService = _classThis;
}();
exports.ProductsService = ProductsService;
