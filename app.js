const loadAllData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
        .then(response => response.json())
        .then(responseData => showDataOnUi(responseData.data))
       
}



const showDataOnUi = (data) => {
    const cardContainer = document.getElementById('card-container');

    data.tools.forEach(DataElement => {
        // console.log(DataElement)
        const div = document.createElement('div');
        div.classList.add('insideCard');
        div.innerHTML = `
        <div class="card w-full bg-base-100 shadow-xl lg:px-5 lg:py-5">
        <figure><img class="rounded w-full" src="${DataElement.image}" alt="" /></figure>
        <div class="card-body">
          <h2 class="card-title">Features</h2>
          <p>${DataElement.features}</p>
          <hr>
        <div class="card-actions justify-between">
          <div>
            <h2 class="card-title">${DataElement.name}</h2>
            <p><i class="fa-solid fa-calendar-days"></i> ${DataElement.published_in}</p>
        </div>
        <label onclick="loadSingleDataDetails('${DataElement.id}')" for="my-modal-5" class="btn">open modal</label>
        
        `
        cardContainer.appendChild(div);
    });

}



loadAllData()

const loadSingleDataDetails = id => {
    fetch (`https://openapi.programming-hero.com/api/ai/tool/${id}`)
        .then(response => response.json())
        .then(data => showDataOnModal(data.data))
}

const showDataOnModal = (modalData) => {
    
    const  modalPragraph = document.getElementById('pragraph');
    modalPragraph.textContent = modalData.description;

    const pricingContainer = document.getElementById('pricing');
    pricingContainer.innerText = ''
    Object.entries(modalData.pricing).map(element => {
        const div = document.createElement('div');
        div.innerHTML = `
        <h1>${element[1].price}</h1>
        <h1>${element[1].plan}</h1>
        `
        pricingContainer.appendChild(div);
        // console.log(element)
    });

    const featursContainer = document.getElementById('featursContainer');
    featursContainer.textContent = ''

    Object.entries(modalData.features).forEach(element => {

        const ol = document.createElement('ol');
        ol.innerHTML = `
            <li>${element[1].feature_name}</li>
        `
        featursContainer.appendChild(ol)
    });

    const IntegrationsContainer = document.getElementById('IntegrationsContainer');
    IntegrationsContainer.textContent = ''
    
    
    modalData.integrations.forEach(element => {
        const ol = document.createElement('ol');
        ol.innerHTML = `
            <li>${element}</li>
        `
        IntegrationsContainer.appendChild(ol);
    });

    const modalImageContainer = document.getElementById('modalImageContainer');
    modalImageContainer.innerHTML = ''
    console.log(modalData.image_link[0])
        
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${modalData.image_link[0]}" alt="">
        `
        modalImageContainer.appendChild(div);
    

}



    