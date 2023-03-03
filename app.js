const fetchLoadDate = (dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools, dataLimit))
}
// get the button to show all rest data
const showAllBtn = document.getElementById('show-all-btn');

const displayData = (data ,dataLimit) =>{
 // loader
 toggleSpinner(true);
    // console.log(data);
    let dataArray = data;
    const aiContainer = document.getElementById('ai-container');
    // show only 6 ai item
    if(dataLimit > dataArray.length){
      dataArray = data
      showAllBtn.classList.add('d-none');
      aiContainer.innerHTML = '';
    }
    else{
      dataArray = dataArray.slice(0, 6);
      showAllBtn.classList.remove('d-none');
    }
    /*  const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
      phones = phones.slice(0,10);
      showAll.classList.remove('d-none');
    }
    else{
      showAll.classList.add('d-none');
    } */
    
    dataArray.forEach(singleData =>{
        // console.log(singleData.features);
      /*   const features = () =>{
          const featuresArray = singleData.features;
          for (const feature of featuresArray) {
          return feature;
        }
        }
        const featureList = features();
        console.log(featureList); */
        
        aiContainer.innerHTML += `
        <div class="col">
            <div class="card h-100 p-3">
              <img src="${singleData.image}" class="card-img-top rounded" alt="..." />
              <div class="mt-2">
                <h5 class="card-title fw-bold">Features</h5>
                <p class="card-text">
                  
                </p>
              </div>
              <hr />
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="fw-bold">${singleData.name}</p>
                  <p><i class="fa-solid fa-calendar-days"></i> ${singleData.published_in}</p>
                </div>
                <div>
                <a  data-bs-toggle="modal"
                data-bs-target="#detailsModal"><i class="fa-solid fa-arrow-right text-danger"></i></a>
                
                </div>
              </div>
            </div>
          </div>
        `
        const modalContainer = document.getElementById('modal-body-details');
        const modalDiv = document.createElement('div');
        modalDiv.innerHTML = `
        
        `

       
    })

    // stop loader
    toggleSpinner(false);
}


const showRestAi = () =>{
 
//  close show all btn
  showAllBtn.classList.add('d-none');
 
  
  fetchLoadDate(13);
}




// fetchLoadDate();