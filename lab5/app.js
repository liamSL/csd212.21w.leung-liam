function init(){
    document.getElementById('ingredients').onchange = async () => {
        let resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${document.getElementById('ingredients').selectedOptions[0].innerHTML}`, 
        {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }
        );
        if (! resp.ok){
            throw new Error("an error has occured, try reloading the page");
        }
        let data = await resp.json();
        document.getElementById('results').innerHTML = "";
        for (const sugg of data.drinks){
            const result = document.createElement('div');
            result.classList.add('result');
            const img = document.createElement('img');
            img.src = sugg.strDrinkThumb + "/preview";
            img.alt = "a photo of a drink";
            img.setAttribute('dID', sugg.idDrink);
            img.classList.add('photo');
            result.appendChild(img);
            const desc = document.createElement('caption');
            desc.textContent = sugg.strDrink;
            desc.classList.add('name');
            result.appendChild(desc);
            document.getElementById('results').appendChild(result);
        }
    const cts= document.querySelectorAll('.result');
    let history = new Map();
    cts.forEach(ct => {
    ct.querySelector('img').addEventListener('click',  function response() {fetchExdata(ct, history, response)});
});
}
}

addEventListener('load', getIngredients);

async function getIngredients(){
    try{
        let resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list',
        {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
            }
        }
        );
        if (! resp.ok){
            throw new Error("an error has occured, try reloading the page");
        }
        let data = await resp.json();
        document.getElementById('ingredients').innerHTML = "";
        for (const sugg of data.drinks){
            const sl = document.createElement('option');
            sl.textContent = sugg.strIngredient1;
            document.getElementById('ingredients').appendChild(sl);
        }
        document.getElementById('ingredients').selectedIndex = -1;
        init();
    } catch(error) {
        console.log(error);
    }
}

function fetchExdata(ct, history, response)
{
    console.log(ct);
    const exs = document.querySelectorAll('.expanded');
    if(!exs.length == 0){
        exs.forEach(ex => {
            let previous = document.getElementsByClassName('focused')[0];
            ex.addEventListener('click', function response() {fetchExdata(previous, history, response)});
            previous.children[2].remove();
            previous.classList.remove('focused');
            ex.classList.remove('expanded');
        });
    }
    let img = ct.querySelector('img');
    ct.classList.add('focused');
    img.classList.add('expanded');
    let entry = String(img.getAttribute('dID'));
    if (history.has(entry)){
        ct.appendChild(history.get(entry));
    }
    else{
        getDetail(ct, img, history);
    }
    img.removeEventListener('click', response);
}

async function getDetail(c, i, h){
    let resp =  await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${i.getAttribute('dID')}`,
    {
        method: 'POST',
            headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
            }
    });
    if (! resp.ok){
        throw new Error("an error has occured, try reloading the page");
    }
    let dat = await resp.json();
    data = dat.drinks[0];

    let exdata = document.createElement('div');
    exdata.classList.add('exData');

    let cat = document.createElement('div');
    cat.classList.add('category');
    cat.textContent = "Category: " + data.strCategory;
    exdata.appendChild(cat);

    let glass = document.createElement('div');
    glass.classList.add('glass');
    glass.textContent = "Recommended Glass:" + data.strGlass;
    exdata.appendChild(glass);

    let ingredientsM = document.createElement('div');
    let ingList = document.createElement('ul');
    ingredients.classList.add('ingredients');
    if(data.strIngredient1){
        let IM1 = document.createElement('li');
        IM1.textContent = "Ingredient 1: " + data.strIngredient1 + "\nMeasurement: " + data.strMeasure1;
        ingList.appendChild(IM1); 
    }
    if(data.strIngredient2){
        let IM2 = document.createElement('li');
        IM2.textContent = "Ingredient 2: " + data.strIngredient2 + "\nMeasurement: " + data.strMeasure2;
        ingList.appendChild(IM2); 
    }
    if(data.strIngredient3){
        let IM3 = document.createElement('li');
        IM3.textContent = "Ingredient 3: " + data.strIngredient3 + "\nMeasurement: " + data.strMeasure3;
        ingList.appendChild(IM3); 
    }
    if(data.strIngredient4){
        let IM4 = document.createElement('li');
        IM4.textContent = "Ingredient 4: " + data.strIngredient4 + "\nMeasurement: " + data.strMeasure4;
        ingList.appendChild(IM4); 
    }
    if(data.strIngredient5){
        let IM5 = document.createElement('li');
        IM5.textContent = "Ingredient 5: " + data.strIngredient5 + "\nMeasurement: " + data.strMeasure5;
        ingList.appendChild(IM5); 
    }
    if(data.strIngredient6){
        let IM6 = document.createElement('li');
        IM6.textContent = "Ingredient 6: " + data.strIngredient6 + "\nMeasurement: " + data.strMeasure6;
        ingList.appendChild(IM6); 
    }
    if(data.strIngredient7){
        let IM7 = document.createElement('li');
        IM7.textContent = "Ingredient 7: " + data.strIngredient7 + "\nMeasurement: " + data.strMeasure7;
        ingList.appendChild(IM7); 
    }
    if(data.strIngredient8){
        let IM8 = document.createElement('li');
        IM8.textContent = "Ingredient 8: " + data.strIngredient8 + "\nMeasurement: " + data.strMeasure8;
        ingList.appendChild(IM8); 
    }
    if(data.strIngredient9){
        let IM9 = document.createElement('li');
        IM9.textContent = "Ingredient 9: " + data.strIngredient9 + "\nMeasurement: " + data.strMeasure9;
        ingList.appendChild(IM9); 
    }
    if(data.strIngredient10){
        let IM10 = document.createElement('li');
        IM10.textContent = "Ingredient 10: " + data.strIngredient10 + "\nMeasurement: " + data.strMeasure10;
        ingList.appendChild(IM10); 
    }
    if(data.strIngredient11){
        let IM11 = document.createElement('li');
        IM11.textContent = "Ingredient 11: " + data.strIngredient11 + "\nMeasurement: " + data.strMeasure11;
        ingList.appendChild(IM11); 
    }
    if(data.strIngredient12){
        let IM12 = document.createElement('li');
        IM12.textContent = "Ingredient 12: " + data.strIngredient12 + "\nMeasurement: " + data.strMeasure12;
        ingList.appendChild(IM12); 
    }
    if(data.strIngredient13){
        let IM13 = document.createElement('li');
        IM13.textContent = "Ingredient 13: " + data.strIngredient13 + "\nMeasurement: " + data.strMeasure13;
        ingList.appendChild(IM13); 
    }
    if(data.strIngredient14){
        let IM14 = document.createElement('li');
        IM14.textContent = "Ingredient 14: " + data.strIngredient14 + "\nMeasurement: " + data.strMeasure14;
        ingList.appendChild(IM14); 
    }
    if(data.strIngredient15){
        let IM15 = document.createElement('li');
        IM15.textContent = "Ingredient 15: " + data.strIngredient15 + "\nMeasurement: " + data.strMeasure15;
        ingList.appendChild(IM15); 
    }
    ingredientsM.appendChild(ingList);
    exdata.appendChild(ingredientsM);

    let instructions = document.createElement('div');
    instructions.classList.add('instructions');
    instructions.textContent = "How to make:\n"+ data.strInstructions;
    exdata.appendChild(instructions);
    c.appendChild(exdata);
    h.set(String(i.getAttribute('dID')), exdata);
}