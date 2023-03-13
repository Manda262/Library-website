"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const citalacRouter_1 = __importDefault(require("./routers/citalacRouter"));
const zahtevRouter_1 = __importDefault(require("./routers/zahtevRouter"));
const adminRouter_1 = __importDefault(require("./routers/adminRouter"));
const knjigaRouter_1 = __importDefault(require("./routers/knjigaRouter"));
const raspolozivostRouter_1 = __importDefault(require("./routers/raspolozivostRouter"));
const zaduzenjeRouter_1 = __importDefault(require("./routers/zaduzenjeRouter"));
const ocenaRouter_1 = __importDefault(require("./routers/ocenaRouter"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json({ limit: '100mb' }));
mongoose_1.default.connect('mongodb://localhost:27017/projekat');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express_1.default.Router();
router.use('/citalac', citalacRouter_1.default);
router.use('/zahtev', zahtevRouter_1.default);
router.use('/admin', adminRouter_1.default);
router.use('/knjiga', knjigaRouter_1.default);
router.use('/raspolozivost', raspolozivostRouter_1.default);
router.use('/zaduzenje', zaduzenjeRouter_1.default);
router.use('/ocena', ocenaRouter_1.default);
router.use(express_1.default.static('public'));
router.use('/uploads', express_1.default.static(__dirname + '/public'));
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map