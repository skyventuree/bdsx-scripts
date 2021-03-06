"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tellraw = void 0;
function tellraw(playerName, message, optionalJSON) {
    optionalJSON = "," + optionalJSON || "";
    server.executeCommand(`tellraw {playerName} \{"rawtext":[\{"text":"{message}"\}]{optionalJSON}\}`);
}
exports.tellraw = tellraw;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVsbHJhdy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlbGxyYXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsU0FBZ0IsT0FBTyxDQUFFLFVBQWtCLEVBQUUsT0FBZSxFQUFFLFlBQXFCO0lBQy9FLFlBQVksR0FBRyxHQUFHLEdBQUcsWUFBWSxJQUFJLEVBQUUsQ0FBQztJQUN4QyxNQUFNLENBQUMsY0FBYyxDQUFDLDJFQUEyRSxDQUFDLENBQUE7QUFDdEcsQ0FBQztBQUhELDBCQUdDIn0=