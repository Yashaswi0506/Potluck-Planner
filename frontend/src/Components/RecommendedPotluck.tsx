import {useEffect, useState} from "react";
import axios from "axios";


export const RecommendedPotluck = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const videoRes = await axios({
                method: 'get',
                headers: {"Access-Control-Allow-Origin": "*"},
                url: "http://localhost:8000/recommended"
            });
            return videoRes.data;
        };

        console.log(getVideos());

        getVideos().then(value => {
            console.log(value);
            setVideos(value);
        });
    }, []);

    return (
         <div className="flex flex-col items-center bg-slate-700 w-4/5 mx-auto p-5 rounded-box">
              <h1 className="text-white text-2xl font-bold mb-4">10 Most Recent Potluck Ideas</h1>
              <ul className="flex flex-col gap-2">
                {videos ? (
                  videos.map((video) => (
                    <li key={video.url}>
                      <a href={video.url} className="text-blue-500 hover:underline">
                        {video.title}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="text-white">Not found</li>
                )}
              </ul>
            </div>
    );
};
