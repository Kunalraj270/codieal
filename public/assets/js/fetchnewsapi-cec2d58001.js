

console.log('working');

const searchform = document.querySelector('.search');
const input = document.querySelector('.input');
const newsList = document.querySelector('.news-list');

searchform.addEventListener('submit' , retrieve);

function retrieve(e) {
    e.preventDefault();

    const apiKey = `9ab00a2b8aca430bb87f49f64fcb3a2a`;
    let topic = input.value;

    let url = ` https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;

    fetch(url).then((res)=>{
        return res.json()
    }).then((data)=>{
        data.articles.forEach(article => {
            let li = document.createElement('li');
            let a  = document.createElement('a');
            a.setAttribute('href' , article.url);
            a.setAttribute('target' , '_blank');
            a.textContent = article.title;
            li.appendChild(a);
            newsList.appendChild(li);
        })
    })

}

