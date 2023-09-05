"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");

let Patient = class Patient {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid')
], Patient.prototype, "id", void 0);

__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false })
], Patient.prototype, "firstName", void 0);

__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false })
], Patient.prototype, "lastName", void 0);

__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: false })
], Patient.prototype, "dateOfBirth", void 0);

Patient = __decorate([
    (0, typeorm_1.Entity)()
], Patient);

exports.default = Patient;
//# sourceMappingURL=patient.js.map
