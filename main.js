let isMarkerVisible = false;
let planetStates = {};

window.onload = () => {
    let scene = document.querySelector("#scene");
    
    scene.addEventListener("markerFound", (e) => {
        isMarkerVisible = true;
    });
    
    scene.addEventListener("markerLost", (e) => {
        isMarkerVisible = false;
    });
    
    // Configurar cliques quando a cena estiver pronta
    scene.addEventListener("loaded", () => {
        const planets = [
            { id: "sun", defaultScale: "2 2 2", enlargedScale: "5 5 5", audioPath: null },
            { id: "mercury", defaultScale: "0.15 0.15 0.15", enlargedScale: "0.3 0.3 0.3", audioPath: "./assets/mercury.mp3" },
            { id: "venus", defaultScale: "0.25 0.25 0.25", enlargedScale: "0.5 0.5 0.5", audioPath: "./assets/venus.mp3" },
            { id: "earth", defaultScale: "0.3 0.3 0.3", enlargedScale: "0.6 0.6 0.6", audioPath: "./assets/earth.mp3" },
            { id: "mars", defaultScale: "0.15 0.15 0.15", enlargedScale: "0.3 0.3 0.3", audioPath: "./assets/mars.mp3" },
            { id: "jupiter", defaultScale: "1 1 1", enlargedScale: "2 2 2", audioPath: "./assets/jupiter.mp3" },
            { id: "saturn", defaultScale: "0.9 0.9 0.9", enlargedScale: "1.8 1.8 1.8", audioPath: "./assets/saturn.mp3" },
            { id: "uranus", defaultScale: "0.36 0.36 0.36", enlargedScale: "0.72 0.72 0.72", audioPath: "./assets/uranus.mp3" },
            { id: "neptune", defaultScale: "0.35 0.35 0.35", enlargedScale: "0.7 0.7 0.7", audioPath: "./assets/neptune.mp3" }
        ];
        
        // Criar um mapa de planetas
        const planetMap = {};
        planets.forEach(planet => {
            planetMap[planet.id] = planet;
            planetStates[planet.id] = false;
        });
        
        // Variável para armazenar o áudio atual
        let currentAudio = null;
        
        // Função para tocar áudio usando caminho direto
        function playPlanetAudio(audioPath) {
            if (!audioPath) return;
            
            // Parar o áudio atual se estiver tocando
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            
            // Criar novo elemento de áudio
            currentAudio = new Audio(audioPath);
            currentAudio.play().catch(error => {
                console.log("Erro ao tocar áudio:", error);
            });
        }
        
        // Usar evento de raycaster na cena para detectar cliques em todos os planetas
        scene.addEventListener("click", function(event) {
            if (!isMarkerVisible) return;
            
            const intersected = event.detail.intersectedEl || event.detail.intersected;
            if (!intersected) return;
            
            // Encontrar o planeta clicado (pode ser o elemento ou um pai)
            let planetElement = intersected;
            let planetId = null;
            
            // Verificar se o elemento clicado é um planeta
            while (planetElement && planetElement !== scene) {
                planetId = planetElement.id;
                if (planetId && planetMap[planetId]) {
                    break;
                }
                planetElement = planetElement.parentElement;
            }
            
            if (planetId && planetMap[planetId]) {
                const planet = planetMap[planetId];
                const clickedPlanet = document.querySelector(`#${planetId}`);
                
                if (clickedPlanet) {
                    // Tocar áudio do planeta
                    playPlanetAudio(planet.audioPath);
                    
                    // Alternar tamanho do planeta
                    if (planetStates[planetId]) {
                        clickedPlanet.setAttribute("scale", planet.defaultScale);
                        planetStates[planetId] = false;
                    } else {
                        clickedPlanet.setAttribute("scale", planet.enlargedScale);
                        planetStates[planetId] = true;
                    }
                }
            }
        });
    });
}