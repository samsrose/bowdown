import { Vector3 } from 'three'

import { players } from './players'
import { player1, playerUuid } from './player1'
import { scene } from './scene'
import { addOtherPlayerArrow } from './arrow'
import { newChatMessage } from './chat'

var serverAddress
if (process.env.NODE_ENV == 'production') {
    serverAddress = 'ws://ec2-18-191-136-250.us-east-2.compute.amazonaws.com:18181'
} else {
    serverAddress = 'ws://localhost:18181'
}

const ws = new WebSocket(serverAddress);

ws.onmessage = function onMessage(message) {
    var message = JSON.parse(message.data)
    if (message.players) {
        players.init(message.players);
    }
    if (message.player) {
        var player = message.player;
        if (player == playerUuid) {
            if (message.damage) {
                player1.takeDamage(message.damage)
            }
        } else if (message.chatMessage) {
            newChatMessage(message.chatMessage)
        }else {
            if (message.status==='disconnected') {
                // player disconnected, remove
                scene.remove(players.get(player).scene)
                delete players.get(player)
            } else if (!players.get(player)) {
                players.add(player, message.position, message.race)
            } else if (players.get(player).gltf && message.position && message.rotation!=null) {
                players.move(player, message.position, message.rotation, message.movementAction, message.bowAction)
            }
        }
    } else if (message.arrow) {
        addOtherPlayerArrow(message.arrow)
    }
}

function sendMessage(message) {
    if (ws.readyState) {
        ws.send(JSON.stringify(message))
    }
}

export { ws, sendMessage }