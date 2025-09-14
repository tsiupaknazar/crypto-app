import axios from "axios";
import { useEffect, useState } from "react";

import cryptoImg from "../assets/crypto-news.webp";

import { NewsSkeleton } from "../components/skeletons/NewsSkeleton";

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = `https://newsdata.io/api/1/latest?apikey=${import.meta.env.VITE_NEWS_API_KEY}&q=crypto&language=en`;

    useEffect(() => {
        axios.get(url).then((response) => {
            setNews(response.data.results);
            setLoading(false);
            console.log(response.data.results);
        }).catch(() => setLoading(false));
    }, [url]);

    return (
        <div className='rounded-div my-4'>
            <h1 className='text-2xl font-bold my-2'>10 Crypto News For Today</h1>
            <div className="mt-6">
                {loading && Array.from({ length: 5 }).map((_, i) => <NewsSkeleton key={i} />)}
                {news.slice(0, 10).map((article) => (
                    <div key={article.article_id} className="mb-4 p-4 border border-gray-700 rounded-lg hover:bg-secondary transition duration-300 flex items-center gap-12">
                        {article.image_url === null ? <img src={cryptoImg} alt="News Image Placeholder" className="w-40" /> : <img src={article.image_url} alt={article.title} className="w-40" />}
                        <span className="w-full">
                            <h2 className="font-bold text-lg">{article.title}</h2>
                            <p>{article.description.slice(0, 150)}...</p>
                            {/*description, link, creator*/}
                            <span className="flex items-center justify-between mt-2">
                                <p>By <span className="text-sm underline">{article.creator ? article.creator : "Unknown"}</span></p>
                                <button className="bg-button text-btnText px-4 py-2 rounded-lg shadow-lg">
                                    <a className="" href={article.link} target="_blank">Read full</a>
                                </button>
                            </span>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewsPage