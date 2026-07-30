async function fetchServerStatus() {
    const serverIP = "147.135.6.160:25799";
    const statusBadge = document.getElementById('statusBadge');
    const statusTextEl = document.getElementById('statusText');
    const playerCountEl = document.getElementById('playerCount');
    const playerListEl = document.getElementById('playerList');

    try {
        const response = await fetch(`https://api.mcstatus.io/v2/status/java/${serverIP}`);
        const data = await response.json();
        if (data.online) {
            statusBadge.className = "status-badge status-online";
            statusTextEl.textContent = "Online";
            
            playerCountEl.textContent = `${data.players.online} / ${data.players.max}`;

            if (data.players.list && data.players.list.length > 0) {
                playerListEl.innerHTML = data.players.list.map(player => player.name_html).join(", ");
            } else {
                playerListEl.textContent = "No players currently online.";
            }
        } else {
            statusBadge.className = "status-badge status-offline";
            statusTextEl.textContent = "Offline";
            playerCountEl.textContent = "0";
            playerListEl.textContent = "Server is currently offline.";
        }
    } catch (error) {
        statusBadge.className = "status-badge status-offline";
        statusTextEl.textContent = "Error";
        playerCountEl.textContent = "N/A";
        playerListEl.textContent = "Could not fetch server data.";
    }
}   

fetchServerStatus(); 