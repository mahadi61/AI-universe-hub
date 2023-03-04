const fetchLoadDate = (dataLimit) =>{
 // loader
 toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools, dataLimit))
}
// get the button to show all rest data
const showAllBtn = document.getElementById('show-all-btn');

const displayData = (data ,dataLimit) =>{

   
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
    
    
    dataArray.forEach(singleData =>{
        // console.log(singleData.features[0]);

        aiContainer.innerHTML += `
        <div class="col">
            <div class="card h-100 p-3">
              <img src="${singleData.image}" class="card-img-top rounded" alt="..." />
              <div class="mt-2">
                <h5 class="card-title fw-bold">Features</h5>
                <ol id="features-body" class="card-text">
                <li>${singleData.features[0]}</li>
                <li>${singleData.features[1]}</li>
                <li>${singleData.features[2]}</li>
                </ol>
              </div>
              <hr />
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <p class="fw-bold">${singleData.name}</p>
                  <p><i class="fa-solid fa-calendar-days"></i> ${singleData.published_in}</p>
                </div>
                <div>
                <button class="bg-danger-subtle border border-0 rounded-circle" onclick="loadAiDetails('${singleData.id}')" data-bs-toggle="modal"
                data-bs-target="#detailsModal"><i class="fa-solid fa-arrow-right text-danger"></i></button>
                
                </div>
              </div>
            </div>
          </div>
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

// modal api
const loadAiDetails = async(id) =>{
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayAiDetails(data.data))
  }

const displayAiDetails = (data) =>{

  const accuracy = data.accuracy.score;
  const accuracyPercentage = accuracy * 100;
  
  // const dataPriceType = typeof(dataPrice);
  // console.log(dataPriceType);
  // try{
  //   const dataPrice = data.pricing[0].price;
  //   console.log(dataPrice);
  // }
  // catch(error){
  //   console.log(error);

  // }
const data2Price = () =>{
  
  if(data.pricing === null ){
   return "Free of cost"
  } 
  else{
    const dataPrice2 = data.pricing ? data.pricing[1].price : "Free of cost"
    return dataPrice2;
  }
}

// single modal 1
const modalBody = document.getElementById('modal-body-details');

modalBody.innerHTML = `
          <div class="row row-cols-1 row-cols-md-2 g-4">
                <div class="col">
                  <div class="border border-black shadow p-3 mb-5 bg-body-tertiary rounded">
                    <div class="">
                      <p class="fw-bold">
                        ${data.description}
                      </p>
                      <div style="height: 120px;" class="d-flex justify-content-between align-items-center  gap-2">
                        <div class="h-100 border rounded-3 p-2 text-success">
                          
                          <span>${data.pricing ? data.pricing[0].price : "Free of cost"}</span>
                          <span>${data.pricing ? data.pricing[0].plan : " "}</span>
                        </div>
                        <div class="h-100 border rounded-3 p-2 text-warning">
                        <span>${data2Price()}</span>
                        <span>${data.pricing ? data.pricing[1].plan : " "}</span> 
                        </div>
                        <div class="h-100 border rounded-3 p-2 text-danger">
                        <span>${data.pricing ? data.pricing[2].price : "Free of cost"}</span>
                        <span>${data.pricing ? data.pricing[2].plan : ""}</span> 
                        </div>
                      </div>
                      <!-- feature -->
                      <div class="d-flex justify-content-between align-items-center gap-2">
                        <div>
                          <h4>Features</h4>
                          <ol id="modal-feature">
      
                          </ol>
                        </div>
                        <div>
                          <h4>Integrations</h4>
                          <ol id="modal-integrations">
      
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col  ">
                  <div class="d-flex flex-column justify-content-between align-items-center gap-4 border  border-black shadow p-3 mb-5 bg-body-tertiary rounded">
                    <div class="bg-danger-subtle position-relative">
                        <img src="${data.image_link[0]}" class="img-fluid" alt="" />
                        <span id="accuracy" class="bg-danger-subtle p-1 rounded position-absolute top-0 end-0">${accuracyPercentage} % Accuracy</span>
                    </div>
                    <div class="">
                      <h5 class="text-center card-title">${data.input_output_examples ? data.input_output_examples[0].input : "Can you give any example?"}</h5>
                      <p class="card-text">
                        ${data.input_output_examples ? data.input_output_examples[0].output : "No! Not yet! Take a break!!"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
`


const accuracyBody = document.getElementById('accuracy');

if(accuracy === null){
  
    accuracyBody.classList.add('d-none');
  }

const featuresArray = data.features;
for(const feature in featuresArray){
  const featureList = featuresArray[feature].feature_name;
   const modalFeature = document.getElementById('modal-feature');
   modalFeature.innerHTML += `
   <li>${featureList ? featureList : "No features"}</li>
   `
  
}



const modalIntegrations = document.getElementById('modal-integrations');
const integrationsArray = data.integrations;
if(integrationsArray === null){
  modalIntegrations.innerHTML += `
  <li>No integrations</li>
  `
}
else{
  integrationsArray.forEach(integrations =>{
    modalIntegrations.innerHTML += `
    <li>${integrations}</li>
    `
    
  })
}




}




