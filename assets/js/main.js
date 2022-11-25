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
    var plan = selection;
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
    var list=await getData();
    console.log(list.length)

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

//Submit request
function submitCriteria(){
  //animation
  document.getElementById('submitRequest').style.opacity = 0;
  setTimeout(function (){ document.getElementById('submitRequest').style.display = "none";}, 800);
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
