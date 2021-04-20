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
            img.src = sugg.strDrinkThumb;
            img.alt = sugg.idDrink;
            img.classList.add('photo');
            result.appendChild(img);
            const desc = document.createElement('label');
            desc.textContent = sugg.strDrink;
            desc.classList.add('name');
            result.appendChild(desc);
            document.getElementById('results').appendChild(result);
        }
    }
}

addEventListener('load', getIngredients);

async function getIngredients(){
    try{
        let resp = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
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