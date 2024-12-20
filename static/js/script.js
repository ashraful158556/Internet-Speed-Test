document.getElementById('test-btn').addEventListener('click', () => {
    const speedMeter = document.getElementById('speed-meter');
    const testButton = document.getElementById('test-btn');
    const resultsDiv = document.getElementById('results');

    // Reset Results
    document.getElementById('download').textContent = '--';
    document.getElementById('upload').textContent = '--';
    document.getElementById('ping').textContent = '--';
    document.getElementById('server').textContent = '--';
    resultsDiv.style.display = 'none';

    // Disable button during test
    testButton.disabled = true;
    testButton.textContent = "Testing...";

    // Animate Meter
    let progress = 0;
    const interval = setInterval(() => {
        if (progress < 100) {
            progress += 10;
            speedMeter.style.width = `${progress}%`;
        }
    }, 300);

    // Fetch Speed Test Data
    fetch('/speedtest')
        .then(response => response.json())
        .then(data => {
            clearInterval(interval);
            speedMeter.style.width = "100%";

            // Update Results
            document.getElementById('download').textContent = data.download_speed;
            document.getElementById('upload').textContent = data.upload_speed;
            document.getElementById('ping').textContent = data.ping;
            document.getElementById('server').textContent = data.server;
            resultsDiv.style.display = 'block';

            // Reset button
            testButton.disabled = false;
            testButton.textContent = "Run Speed Test";

            // Reset meter after a delay
            setTimeout(() => {
                speedMeter.style.width = "0%";
            }, 2000);
        })
        .catch(error => {
            clearInterval(interval);
            alert('Error running speed test.');
            testButton.disabled = false;
            testButton.textContent = "Run Speed Test";
            speedMeter.style.width = "0%";
        });
});
