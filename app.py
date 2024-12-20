from flask import Flask, render_template, jsonify
import speedtest

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/speedtest', methods=['GET'])
def run_speedtest():
    try:
        st = speedtest.Speedtest()
        st.get_best_server()
        download_speed = st.download() / 1e+6  # Convert to Mbps
        upload_speed = st.upload() / 1e+6  # Convert to Mbps
        ping = st.results.ping
        server = st.results.server['host']
        return jsonify({
            "download_speed": round(download_speed, 2),
            "upload_speed": round(upload_speed, 2),
            "ping": round(ping, 2),
            "server": server
        })
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
