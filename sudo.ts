import { Actor, NetworkIdentifier, PacketId, command } from "bdsx";
import { tellraw } from "./tellraw";

const system = server.registerSystem(0, 0);

command.hook.on((cmd: string, origin: any) => {
    if(cmd.startsWith("/sudo")) {
        let param = cmd.split(' ').slice(1);
        let playerName = param[0];
        let textc = param.slice(1).join(' ');
        if (textc.startsWith("/")) {
            system.executeCommand(`execute {playerName} ~ ~ ~ {textc}`, res => {
                console.log(res);
            })
        } else {
            tellraw("@a", `<{playerName}> {textc}`);
            }
    }
    return 0;
})
