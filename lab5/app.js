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
    } catch(error) {
        console.log(error);
    }
}