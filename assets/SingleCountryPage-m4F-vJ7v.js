import{r as l,k as r,l as i,j as s}from"./index-BLvm8fUY.js";const d=()=>{const[e,c]=l.useState(null),{countryName:n}=r();return l.useEffect(()=>{i(n).then(a=>c(a[0]))},[n]),console.log(e==null?void 0:e.borders),e&&s.jsxs("section",{className:"country-details-container",children:[s.jsx("span",{className:"back-button",children:"Back"}),s.jsxs("div",{className:"country-details",children:[s.jsx("img",{src:e.flagImg,alt:e.flagAlt}),s.jsxs("div",{className:"details-text-container",children:[s.jsx("h1",{children:e.name}),s.jsxs("div",{className:"details-text",children:[s.jsxs("p",{children:[s.jsx("b",{children:"Native Name: "}),s.jsx("span",{className:"native-name",children:"England"})]}),s.jsxs("p",{children:[s.jsx("b",{children:"Population: "}),s.jsx("span",{className:"population",children:e.population})]}),s.jsxs("p",{children:[s.jsx("b",{children:"Region: "}),s.jsx("span",{className:"region",children:e.region})]}),s.jsxs("p",{children:[s.jsx("b",{children:"Sub Region: "}),s.jsx("span",{className:"sub-region",children:e.subregion})]}),s.jsxs("p",{children:[s.jsx("b",{children:"Capital: "}),s.jsx("span",{className:"capital",children:e.capital})]}),s.jsxs("p",{children:[s.jsx("b",{children:"Top Level Domain: "}),s.jsx("span",{className:"top-level-domain",children:e.topLevelDomain.join(", ")})]}),s.jsxs("p",{children:[s.jsx("b",{children:"Currencies: "}),s.jsx("span",{className:"currencies",children:Object.values(e.currencies)[0].name})]}),s.jsxs("p",{children:[s.jsx("b",{children:"Languages: "}),s.jsx("span",{className:"languages",children:Object.values(e.languages)})]})]}),s.jsx("div",{className:"border-countries",children:s.jsxs("b",{children:["Border Countries: ",e.borders.map(a=>s.jsx("a",{children:a},a))]})})]})]})]})};export{d as default};