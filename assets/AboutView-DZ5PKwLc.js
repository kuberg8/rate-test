import{d as z,r as v,c as D,o as E,w as I,a as x,b as a,e as t,f as d,g as l,h as B,i as M,F as O,j as i,t as s,k as j,n as P,_ as $}from"./index-VsCt4rsx.js";const q={class:"text-overline mb-1"},G={class:"text-caption mb-1"},H={class:"text-caption mb-1"},J={key:0},K=z({__name:"AboutView",setup(Q){const _=(o,e)=>o.toLocaleString("ru-RU",{style:"currency",currency:e}),u=v(null),n=v(null),r=v(null),N=v(["Китайский юань","Казахстанский тенге"]),h={Стандартный:{month:100,year:1e3},Продвинутый:{month:150,year:1400}},V={"Китайский юань":{value:0,code:""},"Казахстанский тенге":{value:0,code:""}},b=v(null),m=v(null),R=o=>u.value=o,p=D(()=>n.value&&V[n.value]||{value:0,code:""});return E(async()=>{const{Valute:o}=await fetch("https://www.cbr-xml-daily.ru/daily_json.js").then(e=>e.json());for(const e in o){const{Name:f,Nominal:w,Value:y}=o[e];f in V&&(V[f]={value:y/w,code:e})}}),I([u,n,r],()=>{if(u.value&&n.value&&r.value){const o=h[u.value][r.value]/p.value.value;b.value=o,r.value==="year"?m.value=h[u.value].month*12/p.value.value-o:m.value=null}}),(o,e)=>{const f=t("v-card-item"),w=t("v-card"),y=t("v-col"),g=t("v-row"),U=t("v-select"),C=t("v-radio"),A=t("v-radio-group"),F=t("v-form"),L=t("v-divider"),S=t("v-container");return d(),x(S,null,{default:a(()=>[l(g,{class:"mb-2"},{default:a(()=>[(d(!0),B(O,null,M(Object.entries(h),([c,k],T)=>(d(),x(y,{key:T,cols:"12",md:"6"},{default:a(()=>[l(w,{variant:"outlined",class:P(["mx-auto cursor-pointer",{active:u.value==c}]),onClick:W=>R(c)},{default:a(()=>[l(f,null,{default:a(()=>[i("div",null,[i("div",q,s(c),1),i("div",G,"месяц - "+s(_(k.month,"RUB")),1),i("div",H,"год - "+s(_(k.year,"RUB")),1)])]),_:2},1024)]),_:2},1032,["class","onClick"])]),_:2},1024))),128))]),_:1}),l(F,null,{default:a(()=>[l(U,{label:"Выберите валюту",modelValue:n.value,"onUpdate:modelValue":e[0]||(e[0]=c=>n.value=c),items:N.value,color:"green"},null,8,["modelValue","items"]),l(A,{modelValue:r.value,"onUpdate:modelValue":e[1]||(e[1]=c=>r.value=c),color:"green"},{default:a(()=>[l(C,{label:"За месяц",value:"month"}),l(C,{label:"За год",value:"year"})]),_:1},8,["modelValue"])]),_:1}),l(L),l(g,{class:"amount"},{default:a(()=>[b.value!==null?(d(),x(y,{key:0},{default:a(()=>[i("p",null,"Сумма для оплаты: "+s(_(b.value,p.value.code))+" ("+s(n.value)+")",1),m.value!==null?(d(),B("p",J,"Сумма скидки: "+s(_(m.value,p.value.code))+" ("+s(n.value)+")",1)):j("",!0)]),_:1})):j("",!0)]),_:1})]),_:1})}}}),Y=$(K,[["__scopeId","data-v-1969801e"]]);export{Y as default};
