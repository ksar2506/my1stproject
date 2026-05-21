// Check if we are on the Analytics page
if (document.getElementById("bettingChart")) {
    const ctx = document.getElementById("bettingChart").getContext("2d");

    // Create the Chart.js graph
    const myChart = new Chart(ctx, {
        type: 'bar', // Change the type as needed: bar, line, pie, etc.
        data: {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [{
                label: 'Betting Trends',
                data: [10, 20, 30, 40, 50], // Replace with actual data
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

const playGameButton = document.getElementById("play-game-btn");
const gameFrameWrapper = document.getElementById("game-frame-wrapper");

if (playGameButton && gameFrameWrapper) {
    playGameButton.addEventListener("click", () => {
        gameFrameWrapper.hidden = false;
        playGameButton.hidden = true;
    });
}
