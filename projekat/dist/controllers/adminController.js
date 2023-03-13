"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_1 = __importDefault(require("../models/admin"));
class AdminController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            admin_1.default.findOne({ 'username': username, 'password': password }, (err, admin) => {
                if (err)
                    console.log(err);
                else
                    res.json(admin);
            });
        };
        this.promeniBrDana = (req, res) => {
            let username = req.body.username;
            let brDana = req.body.brDana;
            admin_1.default.updateOne({ 'username': username }, { $set: { 'brDana': brDana } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=adminController.js.map