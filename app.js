document.addEventListener('DOMContentLoaded', () => {
            const getDiv = document.getElementById('main');
            const getbtn = document.getElementById('btn');
            const loader = document.getElementById('loader');
            const searchInput = document.getElementById('search');
            
            const fetchNews = (query) => {
                loader.style.display = 'block';
                getDiv.innerHTML = '';
                
                fetch(`https://newsapi.org/v2/everything?q=${query}&from=2025-06-09&sortBy=publishedAt&apiKey=4a93df04fe42433b9ba2bf0637bd19a6`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        loader.style.display = 'none';
                        
                        if (data.articles && data.articles.length > 0) {
                            data.articles.forEach((item) => {
                                const imageUrl = item.urlToImage || 'https://via.placeholder.com/400x200?text=News+Image';
                                
                                getDiv.innerHTML += `
                                    <div class="card">
                                        <img src="${imageUrl}" class="card-img-top" alt="${item.title}">
                                        <div class="card-body">
                                            <div class="card-source">${item.source.name}</div>
                                            <h5 class="card-title">${item.title}</h5>
                                            <div class="card-author">${item.author || 'Unknown Author'}</div>
                                            <p class="card-text">${item.description || 'No description available.'}</p>
                                            <a href="${item.url}" target="_blank" class="card-btn">Read Full Story</a>
                                        </div>
                                    </div>
                                `;
                            });
                        } else {
                            getDiv.innerHTML = `
                                <div class="error-message">
                                    <h3>No Articles Found</h3>
                                    <p>Please try a different search term.</p>
                                </div>
                            `;
                        }
                    })
                    .catch((error) => {
                        loader.style.display = 'none';
                        getDiv.innerHTML = `
                            <div class="error-message">
                                <h3>Failed to Load News</h3>
                                <p>Please check your internet connection and try again.</p>
                                <p><small>Error: ${error.message}</small></p>
                            </div>
                        `;
                    });
            };
            
            getbtn.addEventListener('click', () => {
                const getSearch = searchInput.value.trim();
                if (getSearch) {
                    fetchNews(getSearch);
                }
                searchInput.value = ''
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const getSearch = searchInput.value.trim();
                    if (getSearch) {
                        fetchNews(getSearch);
                        searchInput.value = ''
                    }
                }
                
            });
            
            document.querySelectorAll('.topic').forEach(topic => {
                topic.addEventListener('click', () => {
                    const topicName = topic.getAttribute('data-topic');
                    searchInput.value = topicName;
                    fetchNews(topicName);
                });
            });
            
            fetchNews('technology');
        });