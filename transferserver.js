"use strict";
/// <reference types="minecraft-scripting-types-server" />
/*
 *  *   *   *   *   *   *   *   *   *   *
 *  BDSX2 SCRIPT - transferserver.ts    *
 *  by randmmouse/madeofstown           *
 *  *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
 *  USE/FUNCTION:                                                   *
 *  *   Transfer players to other servers!                          *
 *  *   Place inside ./scripts/ folder                              *
 *  *   To use the /transferserver command in game:                 *
 *  *   ADD "import './transferserver';" TO ./scripts/index.ts      *
 *  *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
 *  REQUIRED CUSTOM SCRIPTS:        *
 *  *   - playerlist.ts             *
 *  *   *   *   *   *   *   *   *   *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferServer = void 0;
const bdsx_1 = require("bdsx");
const playerlist_1 = require("./playerlist");
const packets_1 = require("bdsx/bds/packets");
//Hook and Process the Command '/transferserver <address> <port>'
bdsx_1.command.hook.on((command, originName) => {
    if (command.startsWith('/transferserver')) {
        var splitcmd = command.split(' ');
        if (originName === 'Server') {
            var originNetId = playerlist_1.connectionList.nXNet.get(splitcmd[1]);
            var address = splitcmd[2];
            var port = parseInt(splitcmd[3], 10);
            transferServer(originNetId, address, port);
        }
        else if (originName === 'Script Engine') {
            var originNetId = playerlist_1.connectionList.nXNet.get(splitcmd[1]);
            var address = splitcmd[2];
            var port = parseInt(splitcmd[3], 10);
            transferServer(originNetId, address, port);
        }
        else {
            var originNetId = playerlist_1.connectionList.nXNet.get(originName);
            var address = splitcmd[1];
            var port = parseInt(splitcmd[2], 10);
            transferServer(originNetId, address, port);
        }
        console.log(command, originName, address, port);
        return 0;
    }
});
// Transfer Server Function
function transferServer(networkIdentifier, address, port) {
    if (Number.isInteger(port) != true)
        port = 19132;
    let transferPacket = packets_1.TransferPacket.create();
    transferPacket.address = address;
    transferPacket.port = port;
    transferPacket.sendTo(networkIdentifier, 0);
    transferPacket.dispose();
}
exports.transferServer = transferServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJzZXJ2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0cmFuc2ZlcnNlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMERBQTBEO0FBQzFEOzs7Ozs7Ozs7Ozs7OztHQWNHOzs7QUFFSCwrQkFBa0Q7QUFDbEQsNkNBQThDO0FBQzlDLDhDQUFrRDtBQUdsRCxpRUFBaUU7QUFDakUsY0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLEVBQUU7SUFDbkMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDdkMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNqQyxJQUFJLFVBQVUsS0FBSyxRQUFRLEVBQUU7WUFDekIsSUFBSSxXQUFXLEdBQUcsMkJBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzlDO2FBQU0sSUFBSSxVQUFVLEtBQUssZUFBZSxFQUFFO1lBQ3ZDLElBQUksV0FBVyxHQUFHLDJCQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNyQyxjQUFjLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ0gsSUFBSSxXQUFXLEdBQUcsMkJBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZELElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN6QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRCxPQUFPLENBQUMsQ0FBQztLQUNaO0FBRUwsQ0FBQyxDQUFDLENBQUM7QUFFSCwyQkFBMkI7QUFDM0IsU0FBZ0IsY0FBYyxDQUFDLGlCQUFtQyxFQUFFLE9BQWMsRUFBRSxJQUFXO0lBQzNGLElBQUssTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJO1FBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUNuRCxJQUFJLGNBQWMsR0FBRyx3QkFBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdDLGNBQWMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ2pDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQzNCLGNBQWMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzdCLENBQUM7QUFQRCx3Q0FPQyJ9