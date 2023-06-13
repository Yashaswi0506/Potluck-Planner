from flask import Flask, render_template, jsonify ,request
import requests
from dotenv import load_dotenv
import os
from flask_cors import CORS, cross_origin

load_dotenv()

app = Flask(__name__)

cors = CORS(app , origins = "*")

search_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
details_url = "https://maps.googleapis.com/maps/api/place/details/json"

key = os.getenv('MAPS_API_KEY')

@app.route('/location' , methods=['POST'])
@cross_origin()
def results():
    location = request.get_json().get('location')
    print("location", location)
    search_payload = {"key":key, "query":location}
    search_req = requests.get(search_url, params=search_payload)
    search_json = search_req.json()


    place_id = search_json["results"][0]["place_id"]

    details_payload = {"key":key, "placeid":place_id}
    details_resp = requests.get(details_url, params=details_payload)
    details_json = details_resp.json()

    url = details_json["result"]["url"]
    return jsonify({'result' : url})



if __name__ ==  "__main__":
    app.run(host='0.0.0.0', port = 7000 ,debug=True)
