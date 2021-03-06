"use strict";
// Modification of warplist.ts by madeofstown
// https://github.com/randommouse/bdsx-scripts
// Adding messages and make database a bit more useful (multiple home support?)
Object.defineProperty(exports, "__esModule", { value: true });
// Home <=> Warp, don't know why.
const bdsx_1 = require("bdsx");
const fs = require("fs");
const playerlist_1 = require("./playerlist");
const tdtp_1 = require("./tdtp");
const tellraw_1 = require("./tellraw");
let dbFile = "homelist.json";
let warpDB = [];
let system = server.registerSystem(0, 0);
// Load Database on Server Start
fs.readFile(dbFile, (err, data) => {
    console.log('[HOME] Database ' + dbFile + ' LOADED');
});
// Save Database on Server Shutdown
system.shutdown = function () {
    let filedata = JSON.stringify(warpDB);
    fs.writeFile(dbFile, filedata, () => {
        console.log('[HOME] Database ' + dbFile + ' saved.');
    });
};
// Hooked
bdsx_1.command.hook.on((cmdString, originName) => {
    // get home name or assign default '.home' if not specified (aka undefined)
    let homeName = cmdString.split(' ')[1] || ".home";
    if (cmdString.startsWith('/sethome')) {
        let originActor = playerlist_1.connectionList.nXNet.get(originName).getActor();
        let originEntity = playerlist_1.connectionList.n2Ent.get(originName);
        let originPosition = system.getComponent(originEntity, MinecraftComponent.Position);
        let originXuid = playerlist_1.connectionList.nXXid.get(originName);
        let dimId = originActor.getDimension();
        let xPos = originPosition.data.x;
        let yPos = originPosition.data.y;
        let zPos = originPosition.data.z;
        let dbObject = warpDB.find((obj) => obj.xuid == originXuid);
        let warpEntry = new WarpDBEntry(homeName, dimId, xPos, yPos, zPos);
        if (dbObject != undefined) {
            let dbIndex = warpDB.indexOf(dbObject);
            let warpObject = dbObject.warp.find((obj) => obj.name == homeName);
            if (warpObject != undefined) {
                console.log('Existing: ' + warpObject.name);
                let warpIndex = warpDB[dbIndex].warp.indexOf(warpObject);
                warpDB[dbIndex].warp[warpIndex] = warpEntry;
                console.log(JSON.stringify(warpDB));
                return 0;
            }
            else {
                warpDB[dbIndex].warp.push(warpEntry);
                console.log(JSON.stringify(warpDB));
                return 0;
            }
        }
        else {
            let playerEntry = new PlayerDBEntry(originXuid, originName);
            playerEntry.addWarp(homeName, dimId, xPos, yPos, xPos);
            warpDB.push(playerEntry);
        }
        console.log(JSON.stringify(warpDB));
        tellraw_1.tellraw(originName, "Home set! Use '/home " + homeName + "' to teleport to this spot.");
    }
    if (cmdString.startsWith('/home')) {
        let originActor = playerlist_1.connectionList.nXNet.get(originName).getActor();
        let originXuid = playerlist_1.connectionList.nXXid.get(originName);
        let oiriginDimId = originActor.getDimension();
        let dbObject = warpDB.find((obj) => obj.xuid == originXuid);
        if (dbObject != undefined) {
            let dbIndex = warpDB.indexOf(dbObject);
            let warpObject = dbObject.warp.find((obj) => obj.name == homeName);
            console.log(warpObject);
            if (warpObject != undefined) {
                if (warpObject.dimId == oiriginDimId) {
                    system.executeCommand(`tp ${originName} ${warpObject.x} ${warpObject.y} ${warpObject.z}`, cb => { });
                }
                else {
                    tdtp_1.tdTeleport(originName, warpObject.dimId, warpObject.x, warpObject.y, warpObject.z);
                }
                tellraw_1.tellraw(originName, "Teleported you to " + homeName);
                return 0;
            }
            else {
                tellraw_1.tellraw(originName, homeName + " does not exist!");
            }
        }
    }
});
// Database Entry Classes
class PlayerDBEntry {
    constructor(xuid, name) {
        this.xuid = xuid;
        this.name = name;
        this.warp = [];
    }
    addWarp(name, dimensionId, xPos, yPos, zPos) {
        let content = {
            name: name,
            dimId: dimensionId,
            x: xPos,
            y: yPos,
            z: zPos
        };
        this.warp.push(content);
    }
}
class WarpDBEntry {
    constructor(name, dimensionId, xPos, yPos, zPos) {
        this.name = name;
        this.dimId = dimensionId;
        this.x = xPos;
        this.y = yPos;
        this.z = zPos;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZDQUE2QztBQUM3Qyw4Q0FBOEM7QUFDOUMsK0VBQStFOztBQUUvRSxpQ0FBaUM7QUFDakMsK0JBQXlEO0FBQ3pELHlCQUEwQjtBQUMxQiw2Q0FBOEM7QUFDOUMsaUNBQW9DO0FBQ3BDLHVDQUFvQztBQUVwQyxJQUFJLE1BQU0sR0FBRyxlQUFlLENBQUM7QUFDN0IsSUFBSSxNQUFNLEdBQVEsRUFBRSxDQUFBO0FBQ3BCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXhDLGdDQUFnQztBQUNoQyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFTLEVBQUUsRUFBRTtJQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQztBQUV6RCxDQUFDLENBQUMsQ0FBQztBQUVILG1DQUFtQztBQUNuQyxNQUFNLENBQUMsUUFBUSxHQUFHO0lBQ2QsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQ3pELENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQyxDQUFBO0FBRUQsU0FBUztBQUNULGNBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBaUIsRUFBRSxVQUFlLEVBQUUsRUFBRTtJQUNuRCwyRUFBMkU7SUFDM0UsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENB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