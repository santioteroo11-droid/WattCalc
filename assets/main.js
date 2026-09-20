
function money(n){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(n)}
function number(v,d=2){return Number(v).toLocaleString('en-US',{maximumFractionDigits:d})}
function calcEnergyCost(watts,hours,rate,days=1){const kwh=(watts/1000)*hours*days;return {kwh,cost:kwh*rate}}
