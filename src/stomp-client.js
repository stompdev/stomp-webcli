client = 0;

function stomp_connect(login, passcode, hostname) {
    jQuery("#stomp_output").append("Connecting...</br>");
    client = Stomp.client("ws://" + hostname + "/");
    client.connect(login, passcode, function(frame) {
        jQuery("#stomp_output").append("Connected with \"" + hostname + "\".</br>");
            client.subscribe("/queue/manager", function(msg) {
            jQuery("#stomp_output").append("Received: \"" + msg + "\".</br>");
        });
    });
}

function stomp_set_all(uuid, update, periodic) {
    if (client == 0) {
        jQuery("#stomp_output").append("Not connected.</br>");
    } else {
        client.send("/queue/" + uuid, {}, "SET_ALL " + update + " " + periodic);
        jQuery("#stomp_output").append("Sent: \"SET_ALL " + update + " " + periodic + "\".</br>");
    }
}

function stomp_set(uuid, sensor, update, periodic) {
    if (client == 0) {
        jQuery("#stomp_output").append("Not connected.</br>");
    } else {
        client.send("/queue/" + uuid, {}, "SET " + sensor + " " + update + " " + periodic);
        jQuery("#stomp_output").append("Sent \"SET " + sensor + " " + update + " " + periodic + "\".</br>");
    }
}

function stomp_get(uuid, sensor) {
    if (client == 0) {
        jQuery("#stomp_output").append("Not connected.</br>");
    } else {
        client.send("/queue/" + uuid, {}, "GET " + sensor);
        jQuery("#stomp_output").append("Sent \"GET " + sensor + "\".</br>");
    }
}

function stomp_update(uuid, sensor) {
    if (client == 0) {
        jQuery("#stomp_output").append("Not connected.</br>");
    } else {
        client.send("/queue/" + uuid, {}, "UPDATE " + sensor);
        jQuery("#stomp_output").append("Sent \"UPDATE " + sensor + "\".</br>");
    }
}

function stomp_disconnect() {
    if (client == 0) {
        jQuery("#stomp_output").append("Not connected.</br>");
    } else {
        client.disconnect();
        client = 0;
        jQuery("#stomp_output").append("Disconnected.</br>");
    }
}
