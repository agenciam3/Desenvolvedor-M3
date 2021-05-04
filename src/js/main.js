'use strict';
import showcase from "./ASP/showcase.js";

showcase(0, 900, {colors_name:[], sizes:[], price_range:[50, 100]} ).then((result)=>{
    console.log(result);
}, (error) => {
    console.log(error);
})