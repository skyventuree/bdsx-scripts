// simple tellraw by soraboken/xq0bpm_
import { Actor, NetworkIdentifier, PacketId } from "bdsx";

const system = server.registerSystem(0, 0);

export function tellraw (playerName: string, message: string, optionalJSON?: string) {
    optionalJSON = "," + optionalJSON || "";
    system.executeCommand(`tellraw {playerName} \{"rawtext":[\{"text":"{message}"\}]{optionalJSON}\}`, res => {
        console.log(res);
    })
}