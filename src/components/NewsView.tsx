import { useEffect, useState } from "react"
type NewsAPI = {
    title: string
}
export default function NewsView() {
    const [news, setNews] = useState([]);
    const getNews = async () => {
        const apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=aaf2bae3828c4eb69d82b0089438ecc8&pageSize=3'

        const req = await fetch(apiUrl);
        const res: {articles: NewsAPI[]} = await req.json();
        
        setNews(res.articles);
    }
    useEffect(() => {
        getNews().then(() => {})
    }, [])
    return(
        <>
            <h3>The Headlines</h3>
            <div className="newsView">
            {news && news.map(((item, index) => (
                <div className="newsCard">
                <h2>{item.title}</h2>
                </div>
            )))}
            </div>
        </>
    )
}