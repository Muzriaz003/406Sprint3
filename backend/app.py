from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/report', methods=['POST'])
def report_pothole():
    data = request.get_json()
    lat = data.get('lat')
    lng = data.get('lng')
    print(f'Received pothole report at {lat}, {lng}')
    return jsonify({"status": "received", "lat": lat, "lng": lng}), 200

if __name__ == '__main__':
    app.run(debug=True)
