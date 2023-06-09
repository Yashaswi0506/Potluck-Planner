"""
Simple app to render a map and show places of interests based on the address entered
"""

from flask import Flask, render_template, request, url_for, redirect
from googleapiclient.discovery import build
from dotenv import load_dotenv
import os

load_dotenv()


app = Flask(__name__, static_url_path='/static')       # our Flask app
youtube = build('youtube', 'v3', developerKey=os.getenv('YOUTUBE_API_KEY'))



def youtube_search_keyword(query, max_results):
    search_keyword = youtube.search().list(q = query, part = "id, snippet", maxResults = max_results, order = "date").execute()

    results = search_keyword.get("items", [])

    videos = []

    for result in results:
        if result['id']['kind'] == "youtube#video":
            video_id = result["id"]["videoId"]
            video_url = f"https://www.youtube.com/watch?v={video_id}"
            video_title = result["snippet"]["title"]
            video_info = f"{video_title} - {video_url}"
            videos.append(video_info)
                        
    print("videos:\n", "\n".join(videos), "\n")
    return videos


@app.route('/')
def index():
    query = 'potluck recipe ideas'
    max_results = 10
    videos = youtube_search_keyword(query, max_results)
    return render_template('index.html', videos=videos)

                                  
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
