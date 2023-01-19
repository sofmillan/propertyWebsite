import {printCards} from "./printCards.js"; 

export const btnFilters = (arrayBtn,propertyList,container)=>{
    arrayBtn.forEach(btn=>{
        btn.addEventListener('click',()=>{
            const filter = propertyList.filter(
                (property)=>property.type===btn.id
                );
            const arrayFilter = btn.id === 'all' ? propertyList:filter;
            printCards(container,arrayFilter);
          
        })
    })
}