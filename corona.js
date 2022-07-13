const country=document.getElementById("country");
const selectBut=document.querySelector(".custom-select");
const hdrBody_1=document.getElementById("hdrBody1");
const hdrBody_2=document.getElementById("hdrBody2");
const hdrBody_3=document.getElementById("hdrBody3");
const hdrBody_4=document.getElementById("hdrBody4");

let kanvas = document.getElementById("ilk");
function coronaApi(e)
{
    console.log("merhaba");
}

coronaApi();

function coronaData(e)
{
   // e.preventDefault();
    let url="https://api.collectapi.com/corona/countriesData";
    fetch(url,
        {
            method:"get",
            withCredentials: true,
            headers: {
                "X-Auth-Token": "ef72570ff371408f9668e414353b7b2e",
                "Content-Type": "application/json",
                "authorization":"apikey 7gHB6dUK0n2TTlOsaGLDQM:1tRZIaH92z41vO9ePSEeUF"
              }


        })
        .then(response=>response.json())
    .then(sonuc=>yazdir(sonuc.result))
}

coronaData();
let dizi=[];
let obje;
function yazdir(veri)
{
   
  
    veri.forEach(element => {
        obje={
            country:element.country,
            newCases:element.newCases,
            newDeaths:element.newDeaths,
            activeCases:element.activeCases,
            totalRecovered:element.totalRecovered
        }
        country.innerHTML+=
        `<option value="${element.country}">${element.country}</option>`;

       dizi.push(obje);
        
    });
    selectMenu(veri.country);
    
   


}

function selectMenu(secilen)
{
    for(let i=0;i<dizi.length;i++)
    {
        if(secilen===dizi[i].country)
        {
            return hdrBody_1.innerHTML=`${dizi[i].totalRecovered}`;
            
        }
    }
}


let grafikDizi=[];
let baslikDizi=["NewCases","TotalRecovered","NewDeaths","ActiveCases"];
selectBut.addEventListener('change', (event) => {
    for(let i=0;i<dizi.length;i++)
    {
        if(dizi[i].country===event.target.value)
        {
            
            hdrBody_1.textContent=dizi[i].newCases;
            hdrBody_2.textContent=dizi[i].totalRecovered;
            hdrBody_3.textContent=dizi[i].newDeaths;
            hdrBody_4.textContent=dizi[i].activeCases;
            grafikDizi=[dizi[i].newCases,dizi[i].totalRecovered,dizi[i].newDeaths,dizi[i].activeCases];
            
            let grafik = new Chart(kanvas, {
                type: 'bar',
                data: {
                    labels: baslikDizi,
                    datasets: [{
                        label: dizi[i].country,
                        data: grafikDizi,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                            "rgba(255, 206, 86, 0.2)",
                            "rgba(75, 192, 192, 0.2)"
                            
                            ],
                            borderWidth: 2
                    }]
                }
        });
           
        }
    }

   
    
     
  });

  

  