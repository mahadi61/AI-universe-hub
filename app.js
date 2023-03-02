const fetchLoadDate = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools))
}

const displayData = (data) =>{
    // console.log(data);
    const dataArray = data;
    dataArray.forEach(singleData =>{
        console.log(singleData);


        const aiContainer = document.getElementById('ai-container');
        aiContainer.innerHTML += `
        <div class="col">
            <div class="card h-100 p-3">
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
              <hr />
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="fw-bold">ChatGPT</p>
                </div>
                <div>
                  <button class="btn btn-primary">Details</button>
                </div>
              </div>
            </div>
          </div>
        `
    })
}

// fetchLoadDate();