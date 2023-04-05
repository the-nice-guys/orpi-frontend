export function getRandomInt() {
    return Math.floor(Math.random() * (50 - 5 + 1)) + 5
}

export const randomData = () => ({
    labels: [

    ],
    datasets: [
        {
            label: 'Data One',
            backgroundColor: '#5777FAFF',
            borderColor: '#5777FAFF',
            data: [
            ]
        }
    ]
})

export const options = {
    tension: 0.5,
    animation: false,
    scales: {
        x: {
            ticks: {
                maxTicksLimit: 5
            }
        },
        y: {
            beginAtZero: true,
            min: 0,
            max: 100,
        }
    },
    legend: {
        display: true
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        zoom: {
            pan: {
                enabled: true,
                mode: 'xy'
            },
            zoom: {
                limits: {
                    y: {
                        min: 0,
                        max: 100
                    }
                },
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
                mode: 'xy',
            }
        }
    }
}
