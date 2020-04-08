import{iventory}from"./manageStore.js";import{events}from"./events.js";export default class Filters{constructor(){this.selectors(),this.eventListeners()}selectors(){this.products=iventory.getData(),this.colorGroup=document.querySelectorAll("#colorFilter label input[type='checkbox']"),this.colorClicked={},this.sizeGroup=document.querySelectorAll("#sizeFilter label input[type='checkbox']"),this.sizeClicked={},this.priceGroup=document.querySelectorAll("#priceFilter label input[type='radio']"),this.priceCliked={},this.filterOn={}}eventListeners(){for(let t of this.colorGroup)t.addEventListener("change",this.filterColor.bind(this)),t.addEventListener("click",this.colorOut.bind(this));for(let t of this.sizeGroup)t.addEventListener("change",this.filterSize.bind(this)),t.addEventListener("click",this.sizeOut.bind(this))}filterColor(t){this.filterOn[t.target.name]?(this.products=iventory.backToInitialData(),this.products=this.products.filter(e=>e.color.includes(t.target.value))):(this.products=this.products.filter(e=>e.color.includes(t.target.value)),iventory.setData(this.products),this.filterOn={[t.target.name]:!0})}colorOut(t){this.colorClicked[t.target.name]?(this.products=iventory.backToInitialData(),iventory.setData(this.products),this.colorClicked={[event.target.value]:!0}):this.colorClicked={[event.target.value]:!1}}filterSize(t){this.filterOn[t.target.name]?(this.products=iventory.backToInitialData(),this.products=this.products.filter(e=>e.sizes.includes(t.target.value))):(this.products=this.products.filter(e=>e.sizes.includes(t.target.value)),iventory.setData(this.products),this.filterOn={[t.target.name]:!0})}sizeOut(t){this.sizeClicked[t.target.name]?(this.products=iventory.backToInitialData(),iventory.setData(this.products),this.sizeClicked={[event.target.value]:!0}):this.colorClicked={[event.target.value]:!1}}}