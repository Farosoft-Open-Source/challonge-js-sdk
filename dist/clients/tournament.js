"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTournament = exports.get = exports.getAll = void 0;
const axios_1 = require("axios");
const API_KEY = process.env.CHALLONGE_API_KEY;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get("https://api.challonge.com/v1/tournaments.json?api_key=" + API_KEY);
        const list = { tournaments: [] };
        if (Array.isArray(response.data)) {
            response.data.map(tourny => {
                const jsonData = JSON.stringify(tourny);
                const t = JSON.parse(jsonData).tournament;
                return t;
            }).map(parsedTourney => list.tournaments.push(parsedTourney));
        }
        return list;
    });
}
exports.getAll = getAll;
function get({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get("https://api.challonge.com/v1/tournaments/" + id + ".json?api_key=" + API_KEY).catch(reason => {
            console.log(reason);
            return { status: 400, data: {} };
        });
        if (response.status != 200) {
            return {};
        }
        const jsonData = JSON.stringify(response.data);
        return JSON.parse(jsonData);
    });
}
exports.get = get;
function deleteTournament({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.delete("https://api.challonge.com/v1/tournaments/" + id + ".json?api_key=" + API_KEY).catch(reason => {
            console.log(reason);
            return { status: 400, data: {} };
        });
        if (response.status != 200) {
            return {};
        }
        const jsonData = JSON.stringify(response.data);
        return JSON.parse(jsonData);
    });
}
exports.deleteTournament = deleteTournament;
get({ id: 9094424 }).then(list => console.log(list));
