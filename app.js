const loadAllData = ()=> {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
        .then(response => response.json())
        .then(responseData => showDataOnUi(responseData.data))
      
}

// API টা fetch করছেন ঐখানে একটা প্যারামিটার নেন। এরপর fetch করা ডাটা পাস করার সময় ২টা প্যারামিটার পাস করবেন।
// পরবর্তী ফাংশনে ২টা আলাদা প্যারামিটার আকারে এগুলো রিসিভ করবেন। এরপর if কন্ডিশন দিবেন এভাবে if( technologies.length>6 && limit) {
// এরপর fetch করছেন ঐ ফাংশনটা ২ জায়গা থেকে কল দিবেন।
// প্যারামিটারসহ গ্লোবালি এবং প্যারামিটার ছাড়া Show All Button এর ভেতর থেকে।


const showDataOnUi = (data) => {
    const cardContainer = document.getElementById('card-container');

    console.log(data.tools.length)

    const slicingBtn = document.getElementById('selicing-BTN');

    if (data.tools.length > 6){
        sliceing = data.tools.slice(0,6)
        slicingBtn.classList.remove('invisible')

    }
    else{
        slicingBtn.classList.add('invisible')
    }

    

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
            <h1>Features</h1>
            <li>${element[1].feature_name}</li>
        `
        featursContainer.appendChild(ol)
    });

    const IntegrationsContainer = document.getElementById('IntegrationsContainer');
    IntegrationsContainer.textContent = ''
    
    
    modalData.integrations.forEach(element => {
        const ol = document.createElement('ol');
        ol.innerHTML = `
            <h1>Integrations</h1>
            <li>${element}</li>
        `
        IntegrationsContainer.appendChild(ol);
    });

    const modalImageContainer = document.getElementById('modalImageContainer');
    modalImageContainer.innerHTML = ''
    // console.log(modalData.image_link[0])
        
        const div = document.createElement('div');
        div.classList.add('modal-img')
        div.innerHTML = `
            <img class="w-6/12 h-2/3" src="${modalData.image_link[0]}" alt="">
            <h1>${modalData.input_output_examples[0].input}</h1>
            <p>${modalData.input_output_examples[0].output}</p>
        `
        modalImageContainer.appendChild(div);
    
    
    console.log(modalData.input_output_examples[0].input       )

    
}



loadAllData()




