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
            <h1>10 Most Recent Potluck Ideas</h1>
        <ul>
            {videos ?
                videos.map((video: { title: string, url: string}) => (
                <li><a href={video.url}>{video.title}</a></li>
                ))
                : "Not found"}

        </ul>
    </div>
    );
};
