function getRandomInt() {
    return Math.floor(Math.random() * (50 - 5 + 1)) + 5
}

export const randomData = () => ({
    labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    datasets: [
        {
            label: 'Data One',
            backgroundColor: '#5777FAFF',
            borderColor: '#5777FAFF',
            data: [
                getRandomInt(),
                getRandomInt(),
                getRandomInt(),
                getRandomInt(),
                getRandomInt(),
                getRandomInt(),
                getRandomInt(),
                getRandomInt(),
                getRandomInt(),
                getRandomInt(),
                getRandomInt(),
                getRandomInt()
            ]
        }
    ]
})

export const options = {
    tension: 0.5,
    scales: {
        y: {
            beginAtZero: true,
            min: 0,
            max: 100
        }
    },
    legend: {
        display: true
    },
    responsive: true,
    maintainAspectRatio: false
}
