"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DatabaseServer_1 = __importDefault(require("./DatabaseServer"));
console.log(process.env.BACKUP_DATABASE_GATEWAY);
new DatabaseServer_1.default();
