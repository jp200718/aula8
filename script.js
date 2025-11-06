const cats = document.getElementById("cats");
const search = document.getElementById("form-control");

let cat_gallery = []

function renderGallery(filter) {
    cats.innerHTML = ""
    for (let cat of filter) {
       cats.innerHTML += `
        <figure class="card" onclick="showCatDetails('${cat.name}')">
            <img src="${cat.img}" alt="${cat.name}">
            <figcaption>${cat.name}</figcaption>
        </figure>
        `;
    }
}

function showCatDetails(catName) {
    const cat = cat_gallery.find(c => c.name === catName);
    if (cat) {
        document.getElementById('modalImage').src = cat.img;
        document.getElementById('modalImage').alt = cat.name;
        document.getElementById('modalName').textContent = cat.name;
        document.getElementById('modalDescription').textContent = cat.description;
        document.getElementById('modalTemperament').textContent = cat.temperament;
        document.getElementById('modalOrigin').textContent = cat.origin;
        document.getElementById('modalLifeSpan').textContent = cat.lifeSpan;
        
        const modal = new bootstrap.Modal(document.getElementById('catModal'));
        modal.show();
    }
}

function catData() {
    fetch('./data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro de rede: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            cat_gallery = data;
            renderGallery(cat_gallery);
        })
        .catch(error => {
            console.error("Houve um problema ao carregar os dados:", error);
            cats.innerHTML = `<p style="color: red;">Não foi possível carregar os dados. Por favor, verifique o console para mais detalhes.</p>`;
        });
}

catData();

search.addEventListener("input", function() {
  const term = search.value.toLowerCase(); 
  const filter = cat_gallery.filter(cat =>
    cat.name.toLowerCase().includes(term)
  );
  
  if (filter.length === 0) {
    cats.innerHTML = "<p>Nenhuma foto encontrada!</p>";
  } else {
    renderGallery(filter);
  }
});
