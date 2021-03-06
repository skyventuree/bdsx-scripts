// simple tellraw by soraboken/xq0bpm_
import { Actor, NetworkIdentifier, PacketId } from "bdsx";

export function tellraw (playerName: string, message: string, optionalJSON?: string) {
    optionalJSON = "," + optionalJSON || "";
    server.executeCommand(`tellraw {playerName} \{"rawtext":[\{"text":"{message}"\}]{optionalJSON}\}`)
}