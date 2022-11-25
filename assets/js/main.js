/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// const sections = document.querySelectorAll('section[id]')
//
// function scrollActive(){
//     const scrollY = window.pageYOffset
//
//     sections.forEach(current =>{
//         const sectionHeight = current.offsetHeight,
//             sectionTop = current.offsetTop - 50,
//             sectionId = current.getAttribute('id')
//
//         if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
//             document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
//         }else{
//             document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
//         }
//     })
// }
// window.addEventListener('scroll', scrollActive)

var googleList;
var plan;

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== UI FLOW CONTROL ===============*/

function toggleBox(){

}


function backToIndex(){
  // Hide all the options
  document.getElementById('criteriaContainer').style.opacity = 0;
  setTimeout(function (){
  document.getElementById('criteriaContainer').style.display = "none";
  document.getElementById('randomOrList').style.display = "none";
  document.getElementById('randomCheckBoxes').style.display = "none";
  document.getElementById('randomAndRepeat').style.display = "none";
  document.getElementById('randomCheckBoxes2').style.display = "none";}, 800);

  // Turn the index on
  document.getElementById('planTitle').style.display = "block";
  document.getElementById('dayPlan').style.display = "block";
  document.getElementById('weekPlan').style.display = "block";
  setTimeout(function (){ document.getElementById('planTitle').style.opacity = 1;
                          document.getElementById('dayPlan').style.opacity = 1;
                          document.getElementById('weekPlan').style.opacity = 1;}, 800);

  // Clear the checkbox selections
  for (let i = 1; i <= 6; i++){
  document.getElementById("box-" + i).checked = false;
  }
  document.getElementById("random").checked = false;
  document.getElementById("list").checked = false;
  document.getElementById("yes").checked = false;
  document.getElementById("no").checked = false;
}

// function checkRandom(options){
//   var randomOrNot = options;
//   if (randomOrNot == 2) {
//   document.getElementById('list'). = "block";
//   }
//
// }

function showCriteria(selection){
  var planSelection = selection;
  console.log(planSelection);
  if (planSelection == "d") {
    document.getElementById('criteriaContainer').style.display = "block";
    document.getElementById('randomOrList').style.display = "block";
    document.getElementById('randomCheckBoxes').style.display = "block";
    setTimeout(function (){
    document.getElementById('criteriaContainer').style.opacity = 1;
    document.getElementById('randomOrList').style.opacity = 1;
    document.getElementById('randomCheckBoxes').style.opacity = 1;}, 800);
  } else if (planSelection == "w") {
    document.getElementById('criteriaContainer').style.display = "block";
    document.getElementById('randomAndRepeat').style.display = "block";
    document.getElementById('randomCheckBoxes2').style.display = "block";
    setTimeout(function (){
    document.getElementById('criteriaContainer').style.opacity = 1;
    document.getElementById('randomAndRepeat').style.opacity = 1;
    document.getElementById('randomCheckBoxes2').style.opacity = 1;}, 800);
  }

  }

function planSelection(selection){
    plan = selection;
    console.log(plan);
    document.getElementById('planTitle').style.opacity = 0;
    document.getElementById('dayPlan').style.opacity = 0;
    document.getElementById('weekPlan').style.opacity = 0;
    setTimeout(function (){ document.getElementById('planTitle').style.display = "none";
                            document.getElementById('dayPlan').style.display = "none";
                            document.getElementById('weekPlan').style.display = "none"}, 800);
    showCriteria(plan);
    // showCriteria(plan);
}

async function getData() {
  let response;
  try {
    // Fetch first 10 files
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '14LpZyU4BGI0z062kYYC9bvUdkYWtxYqw-rQpxEEMBq0',
      range: 'Restaurants',
    });
  } catch (err) {
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    return;
  }
  return range.values;
}

function onLoadhandler(){
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    googleList=await getData();
    console.log(googleList.length)
  };

  if (gapi.client.getToken() === null&&tokenClient.getToken===null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});
  }
}

// Converts numeric degrees to radians
function toRad(Value) {
  return Value * Math.PI / 180
}

function calcCrow(lat1, lon1, lat2, lon2) {
  var R = 6371 // km
  var dLat = toRad(lat2 - lat1)
  var dLon = toRad(lon2 - lon1)
  var lat1 = toRad(lat1)
  var lat2 = toRad(lat2)
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return d
}

function filterList(element,index){
  if(index===0)return false;
  var dict={};
  var allEmpty= true;
  var radius = parseFloat(document.getElementById("myRange").value);
  let cord = [22.337346694909733, 114.15070943918803]
  let len=6
  console.log(radius)
  console.log(calcCrow(cord[0],cord[1],element[6],element[7])*1000);
  if(calcCrow(cord[0],cord[1],element[6],element[7])*1000>radius)return false;

  for(var i=1;i<=len;i++){
    dict[document.getElementById('box-'+i).value]=document.getElementById('box-'+i).checked;
    if(document.getElementById('box-'+i).checked) allEmpty=false;
  }
  if(allEmpty) return true;
  for (const [key, value] of Object.entries(dict)) {
    if(value&&element[3].includes(key)) return true;
  }
  return false;
}

//Submit request
function submitCriteria(){
  var filteredList=googleList.filter((filterList));
  var result=[];
  console.log(filteredList.length);
  if(plan==="d")
  {
    if(document.getElementById("list").checked){
      result=filteredList;
    }
    else //random or did not select
    {
      var index = Math.floor(Math.random()*filteredList.length);
      result.push(filteredList[index]);
    }
  }
  else if (plan==="w")
  {
    if(document.getElementById("yes").checked){
      for(var i =0;i<5;i++){
        var index = Math.floor(Math.random()*filteredList.length);
        result.push(filteredList[index]);
      }
    }
    else{
      var indices=[];
      for(var i =0;i<5;i++){
        var index = Math.floor(Math.random()*filteredList.length);
        while(indices.find(index)){
          index = Math.floor(Math.random()*filteredList.length);
        }
        result.push(filteredList[index]);
      }
    }
  }
  else{
    console.error("undefined plan")
  }
  console.log(result.length);
  console.log(result);

  //animation
  document.getElementById('submitRequest').style.opacity = 0;
  setTimeout(function (){ document.getElementById('submitRequest').style.display = "none";}, 800);
  document.getElementById('name').lastChild.textContent = result[0][0];
  document.getElementById('address').lastChild.textContent = result[0][1];
  document.getElementById('price').lastChild.textContent = result[0][2];
  document.getElementById('type').lastChild.textContent = result[0][3];
  document.getElementById('positive').lastChild.textContent = result[0][4];
  document.getElementById('negative').lastChild.textContent = result[0][5];
  var paramAddress = result[0][1].replaceAll(' ','+');
  console.log(paramAddress);
  document.getElementById("mapIframe").src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q="+paramAddress+"&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
  //for UI testing
  document.getElementById('criteriaContainer').style.opacity = 0;
  setTimeout(function (){ document.getElementById('criteriaContainer').style.display = "none";}, 800);
  document.getElementById('singleResultContainer').style.display = "block";
  setTimeout(function (){
  document.getElementById('singleResultContainer').style.opacity = 1;}, 800)

}


// UI control of slider section
var slider = document.getElementById("myRange");
var output = document.getElementById("rangeIndicator");
output.innerHTML = slider.value;

slider.oninput = function() {
if (this.value >= 1000) {
	output.innerHTML = this.value/1000 + "k";
} else
  output.innerHTML = this.value;
}
