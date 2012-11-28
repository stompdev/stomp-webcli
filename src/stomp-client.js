client = 0;

function stomp_connect(login, passcode, hostname) {
    client = Stomp.client("ws://" + hostname + ":61623/");
    client.connect(login, passcode, function(frame) {
        document.write("Connected with \"" + hostname + "\"\n");
        client.subscribe("/queue/manager", function(msg) {
            document.write("Received: " + msg);
        });
    });
}

function stomp_set_all(uuid, update, periodic) {
    if (client == 0) {
        document.write("Not connected.\n");
    } else {
        client.send("/queue/" + uuid, {}, "SET_ALL " + update + " " + periodic);
        document.write("Sent: \"SET_ALL " + update + " " + periodic + "\".\n");
    }
}

function stomp_set(uuid, sensor, update, periodic) {
    if (client == 0) {
        document.write("Not connected.\n");
    } else {
        client.send("/queue/" + uuid, {}, "SET " + sensor + " " + update + " " + periodic);
        document.write("Sent \"SET " + sensor + " " + update + " " + periodic + "\".\n");
    }
}

function stomp_get(uuid, sensor) {
    if (client == 0) {
        document.write("Not connected.\n");
    } else {
        client.send("/queue/" + uuid, {}, "GET " + sensor);
        document.write("Sent \"GET " + sensor + "\".\n");
    }
}

function stomp_update(uuid, sensor) {
    if (client == 0) {
        document.write("Not connected.\n");
    } else {
        client.send("/queue/" + uuid, {}, "UPDATE " + sensor);
        document.write("Sent \"UPDATE " + sensor + "\".\n");
    }
}

function stomp_disconnect() {
    client.disconnect();
    client = 0;
    document.write("Disconnected.\n");
}
