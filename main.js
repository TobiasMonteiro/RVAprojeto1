let isMarkerVisible = false;

window.onload = () => {
    let scene = document.querySelector("#scene");
    
    let currentAudio = null;
    
    function playPlanetAudio(planetId) {
        console.log("Tocando áudio para:", planetId);
        
        if (currentAudio) {
            try {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            } catch(e) {
                console.log("Erro ao pausar áudio:", e);
            }
        }
        
        const planetAudioMap = {
            "mercury": "mercuryAudio",
            "venus": "venusAudio",
            "earth": "earthAudio",
            "mars": "marsAudio",
            "jupiter": "jupiterAudio",
            "saturn": "saturnAudio",
            "uranus": "uranusAudio",
            "neptune": "neptuneAudio"
        };
        
        const audioId = planetAudioMap[planetId];
        if (!audioId) {
            console.log("Nenhum áudio mapeado para:", planetId);
            return;
        }
        
        const htmlAudio = document.querySelector(`#${audioId}`);
        if (htmlAudio) {
            try {
                htmlAudio.currentTime = 0;
                const playPromise = htmlAudio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log("Áudio tocando:", audioId);
                        currentAudio = htmlAudio;
                    }).catch(error => {
                        console.log("Erro ao tocar áudio HTML5:", error);
                    });
                } else {
                    currentAudio = htmlAudio;
                }
            } catch(e) {
                console.log("Erro ao tocar áudio HTML5:", e);
            }
        }
    }
    
    const planetButtons = {
        "btnMercury": "mercury",
        "btnVenus": "venus",
        "btnEarth": "earth",
        "btnMars": "mars",
        "btnJupiter": "jupiter",
        "btnSaturn": "saturn",
        "btnUranus": "uranus",
        "btnNeptune": "neptune"
    };
    
    Object.keys(planetButtons).forEach(btnId => {
        const button = document.getElementById(btnId);
        if (button) {
            button.addEventListener("click", function() {
                const planetId = planetButtons[btnId];
                playPlanetAudio(planetId);
                button.style.transform = "scale(0.95)";
                setTimeout(() => {
                    button.style.transform = "scale(1)";
                }, 100);
            });
            button.addEventListener("mouseenter", function() {
                button.style.opacity = "0.8";
            });
            button.addEventListener("mouseleave", function() {
                button.style.opacity = "1";
            });
        }
    });
}