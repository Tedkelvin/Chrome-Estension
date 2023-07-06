let myLeads= []
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const saveBtn = document.getElementById("save-btn")

const leadsfromLocalstorage = JSON.parse(localStorage.getItem("myLeads"))
if(leadsfromLocalstorage){
  myLeads=leadsfromLocalstorage
  render(myLeads)
  
}


saveBtn.addEventListener("click", function(){
  chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    myLeads.push(tabs[0].url)
  localStorage.setItem("myLeads",JSON.stringify(myLeads))
  render(myLeads)
  })

})

function render(leads){
  let listItem = ""

for(l=0; l<leads.length;l++){
  listItem += `
  <li>
    <a target='_blank' href='${leads[l]}'>
     ${leads[l]}
    </a>
    </li>
    `
  }
  ulEl.innerHTML= listItem
}

deleteBtn.addEventListener("dblclick",function(){
  localStorage.clear()
  myLeads = []
  render(myLeads) 

})


inputBtn.addEventListener("click", function(){
   myLeads.push(inputEl.value)
   inputEl.value = ""
   localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    
})





 