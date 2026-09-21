const WATTCALC_RATES={
"US Average":0.1834,"Alabama":0.1640,"Alaska":0.2821,"Arizona":0.1518,"Arkansas":0.1412,"California":0.3474,"Colorado":0.1713,"Connecticut":0.2432,"Delaware":0.1929,"District of Columbia":0.2439,"Florida":0.1510,"Georgia":0.1636,"Hawaii":0.5272,"Idaho":0.1437,"Illinois":0.1989,"Indiana":0.1751,"Iowa":0.1593,"Kansas":0.1571,"Kentucky":0.1426,"Louisiana":0.1349,"Maine":0.2959,"Maryland":0.2184,"Massachusetts":0.2961,"Michigan":0.2299,"Minnesota":0.1752,"Mississippi":0.1488,"Missouri":0.1622,"Montana":0.1514,"Nebraska":0.1325,"Nevada":0.1311,"New Hampshire":0.2701,"New Jersey":0.2495,"New Mexico":0.1506,"New York":0.2949,"North Carolina":0.1474,"North Dakota":0.1412,"Ohio":0.1919,"Oklahoma":0.1433,"Oregon":0.1632,"Pennsylvania":0.2173,"Rhode Island":0.2923,"South Carolina":0.1555,"South Dakota":0.1536,"Tennessee":0.1407,"Texas":0.1594,"Utah":0.1337,"Vermont":0.2444,"Virginia":0.1722,"Washington":0.1491,"West Virginia":0.1545,"Wisconsin":0.1956,"Wyoming":0.1524
};
function money(n){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(Number(n)||0)}
function number(v,d=2){return Number(v||0).toLocaleString('en-US',{maximumFractionDigits:d})}
function populateRates(root=document){
  root.querySelectorAll('[data-rate-select]').forEach(select=>{
    if(select.options.length) return;
    Object.entries(WATTCALC_RATES).forEach(([name,rate])=>{
      const o=document.createElement('option');o.value=rate;o.textContent=`${name} — ${(rate*100).toFixed(2)}¢/kWh`;select.appendChild(o);
    });
    select.value=WATTCALC_RATES["US Average"];
    const input=select.closest('.calculator-shell')?.querySelector('[data-rate]');
    select.addEventListener('change',()=>{if(input){input.value=Number(select.value).toFixed(4);input.dispatchEvent(new Event('input'));}});
  });
}
function initEnergyCalculators(){
 document.querySelectorAll('[data-calc="energy"]').forEach(c=>{
  const q=s=>c.querySelector(s), watts=q('[data-watts]'),hours=q('[data-hours]'),days=q('[data-days]'),duty=q('[data-duty]'),rate=q('[data-rate]'),out=q('[data-output]');
  const run=()=>{const w=+watts.value||0,h=+hours.value||0,d=+days.value||30,u=(+duty.value||100)/100,r=+rate.value||0;
   const kwhHour=w/1000*u,kwhDay=kwhHour*h,kwhMonth=kwhDay*d,kwhYear=kwhDay*365;
   out.innerHTML=`<div class="result-grid"><div><span>Per scheduled hour</span><strong>${money(kwhHour*r)}</strong></div><div><span>Per day</span><strong>${money(kwhDay*r)}</strong></div><div><span>Per month</span><strong>${money(kwhMonth*r)}</strong></div><div><span>Per year</span><strong>${money(kwhYear*r)}</strong></div></div><p class="calc-detail">${number(kwhDay)} kWh/day · ${number(kwhMonth)} kWh/month · ${number(kwhYear,0)} kWh/year at ${number(r*100,2)}¢/kWh</p><code>(${number(w,0)} W ÷ 1,000) × ${number(h,1)} h/day × ${number(u*100,0)}% active × ${d} days × ${money(r)}/kWh</code>`;
  };
  c.querySelectorAll('input,select').forEach(x=>x.addEventListener('input',run));run();
 });
}
function initAnnualCalculators(){
 document.querySelectorAll('[data-calc="annual"]').forEach(c=>{
  const q=s=>c.querySelector(s),kwh=q('[data-annual-kwh]'),rate=q('[data-rate]'),out=q('[data-output]');
  const run=()=>{const e=+kwh.value||0,r=+rate.value||0,cost=e*r;out.innerHTML=`<div class="result-grid"><div><span>Per month</span><strong>${money(cost/12)}</strong></div><div><span>Per year</span><strong>${money(cost)}</strong></div><div><span>Monthly energy</span><strong>${number(e/12)} kWh</strong></div><div><span>Daily average</span><strong>${number(e/365)} kWh</strong></div></div><p class="calc-detail">${number(e,0)} kWh/year at ${number(r*100,2)}¢/kWh</p><code>${number(e,0)} kWh/year × ${money(r)}/kWh = ${money(cost)}/year</code>`;};
  c.querySelectorAll('input,select').forEach(x=>x.addEventListener('input',run));run();
 });
}
function initLoadCalculators(){
 document.querySelectorAll('[data-calc="loads"]').forEach(c=>{
  const q=s=>c.querySelector(s),kwh=q('[data-kwh-load]'),loads=q('[data-loads-week]'),rate=q('[data-rate]'),out=q('[data-output]');
  const run=()=>{const e=+kwh.value||0,l=+loads.value||0,r=+rate.value||0,week=e*l,year=week*52,month=year/12;out.innerHTML=`<div class="result-grid"><div><span>Per load</span><strong>${money(e*r)}</strong></div><div><span>Per week</span><strong>${money(week*r)}</strong></div><div><span>Per month</span><strong>${money(month*r)}</strong></div><div><span>Per year</span><strong>${money(year*r)}</strong></div></div><p class="calc-detail">${number(e)} kWh/load · ${number(l,1)} loads/week · ${number(year,0)} kWh/year</p>`;};
  c.querySelectorAll('input,select').forEach(x=>x.addEventListener('input',run));run();
 });
}
document.addEventListener('DOMContentLoaded',()=>{
 populateRates();initEnergyCalculators();initAnnualCalculators();initLoadCalculators();
 document.querySelectorAll('.site-footer').forEach(f=>{if(!f.querySelector('.footer-links'))f.insertAdjacentHTML('beforeend','<div class="footer-links"><a href="/WattCalc/about.html">About</a><a href="/WattCalc/editorial-policy.html">Editorial Policy</a><a href="/WattCalc/electricity-rates-by-state.html">Electricity Rates</a><a href="/WattCalc/privacy.html">Privacy</a><a href="/WattCalc/terms.html">Terms</a></div>')});
});
