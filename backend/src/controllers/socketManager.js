import { Server } from "socket.io";

let connections = {}
let messages = {}
let timeOnline = {}

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {

        console.log("someone connected");

        socket.on("join-call", (path) => {

            if (connections[path] === undefined) {
                connections[path] = [];
            }

            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();

            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path]);
            }

            if (messages[path] !== undefined) {
                for (let a = 0; a < messages[path].length; ++a) {
                    io.to(socket.id).emit("chat-message", messages[path][a]["data"], messages[path][a]["sender"], messages[path][a]["socket-id-sender"])

                }
            }

        })

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        })

        socket.on("chat-message", (data, sender) => {

            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {
                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }
                    return [room, isFound];

                }, ["", false]);

            if (found === true) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({ "sender": sender, "data": data, "socket-id-sender": socket.id });
                console.log("message", matchingRoom, ":", sender, data);

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id)
                })

            }
        })



        socket.on("disconnect", () => {
            const disconnectTime = new Date();
            const diffTime = Math.abs(timeOnline[socket.id] - disconnectTime);

            let key = null;

            // Safe search for the key (room) this socket belonged to
            for (const [k, v] of Object.entries(connections)) {
                if (Array.isArray(v) && v.includes(socket.id)) {
                    key = k;
                    break; // stop after finding the first match
                }
            }

            if (key && Array.isArray(connections[key])) {
                // Notify others in the room that this user left
                connections[key].forEach((id) => {
                    if (id !== socket.id) {
                        io.to(id).emit("user-left", socket.id);
                    }
                });

                // Remove the socket from the room
                connections[key] = connections[key].filter((id) => id !== socket.id);

                // Clean up the room if it's empty
                if (connections[key].length === 0) {
                    delete connections[key];
                }
            }

            delete timeOnline[socket.id];
        });
    })

    return io;
}

