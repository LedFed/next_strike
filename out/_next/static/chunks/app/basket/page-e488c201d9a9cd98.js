(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[26],{6640:function(e,s,t){Promise.resolve().then(t.bind(t,2512))},2512:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return d}});var a=t(7437),l=t(2265),r=t(384),c=t(385),i=t(7409),n=t(7648);function o(e){let{active:s,handleOrder:t,setActive:c}=e,{cart:i,totalQuant:n,totalSum:o,formatNumber:d}=(0,r.j)(),[m,u]=(0,l.useState)(""),[h,_]=(0,l.useState)(""),x=""!==m.trim()&&""!==h.trim();return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)("div",{className:s?"modal is-open":"modal",onClick:()=>c(!1),children:(0,a.jsx)("div",{className:"modal__container order-modal",onClick:e=>e.stopPropagation(),children:(0,a.jsxs)("div",{className:"modal-content order-modal__content",children:[(0,a.jsxs)("div",{className:"order-modal__top",children:[(0,a.jsx)("h2",{className:"order-modal__title",children:"Оформление заказа"}),(0,a.jsx)("span",{className:"order-modal__number",children:"Заказ № 3456 67"})]}),(0,a.jsxs)("div",{className:"order-modal__info",children:[(0,a.jsxs)("div",{className:"order-modal__quantity order-modal__info-item",children:["Товаров в заказе: ",(0,a.jsx)("span",{children:n})]}),(0,a.jsxs)("div",{className:"order-modal__summ order-modal__info-item",children:["Общая сумма заказа: ",(0,a.jsxs)("span",{children:[d(o)," ₽"]})]})]}),(0,a.jsxs)("div",{className:"order-modal__form order",children:[(0,a.jsxs)("label",{className:"order__label",children:[(0,a.jsx)("span",{className:"order__text",children:"Ваше имя"}),(0,a.jsx)("input",{type:"text",name:"Имя",className:"order__input",value:m,onChange:e=>u(e.target.value)})]}),(0,a.jsxs)("label",{className:"order__label",children:[(0,a.jsx)("span",{className:"order__text",children:"Номер телефона"}),(0,a.jsx)("input",{type:"tel",name:"Телефон",className:"order__input",placeholder:"+7 (___)___-__-__",value:h,onChange:e=>_(e.target.value)})]}),(0,a.jsx)("button",{className:"order__btn btn",onClick:e=>{e.preventDefault(),t(m,h)},disabled:!x,children:" ".concat(x?"Оформить заказ":"Заполните поля")})]})]})})})})}function d(){let{cart:e,toggleCartItem:s,totalQuant:t,totalSum:d,increment:m,decrement:u}=(0,r.j)(),[h,_]=(0,l.useState)(!1),x=async(s,t)=>{try{let a=await fetch("http://localhost:3000/api/telegram",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"order",data:{cart:e,totalSum:d,customer:{name:s,phone:t}}})});(await a.json()).success?(_(!1),i.Am.success("Заказ успешно отправлен!",{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})):i.Am.error("Ошибка при отправке заказа.",{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}catch(e){i.Am.error("Ошибка при отправке заказа.",{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})}};return console.log(e),(0,a.jsx)(a.Fragment,{children:(0,a.jsxs)("div",{className:"container",children:[(0,a.jsx)(c.Z,{items:[{title:"Главная",link:"/"},{title:"Корзина",link:"/basket"}]}),(0,a.jsx)(o,{active:h,handleOrder:x,setActive:_}),(0,a.jsxs)("div",{className:"basket_block",children:[(0,a.jsx)("div",{className:"basket_items",children:e.length>0?e.map(e=>(0,a.jsxs)("div",{className:"basket_item",children:[(0,a.jsx)("img",{src:"../img/".concat(e.src[0]),alt:"",className:"basket_picture"}),(0,a.jsxs)("div",{className:"basket_item_right",children:[(0,a.jsxs)(n.default,{className:"basket_block_column",href:"/product/".concat(e.code),passHref:!0,children:[(0,a.jsx)("h4",{className:"basket_block_title",children:e.name}),(0,a.jsxs)("p",{className:"basket_articul",children:["Артикул:",e.article]})]}),(0,a.jsxs)("div",{className:"basket_functional",children:[(0,a.jsx)("button",{className:"decrement",onClick:()=>u(e),children:"-"}),(0,a.jsx)("div",{className:"count",children:e.count}),(0,a.jsx)("button",{className:"increment",onClick:()=>m(e,e.count),children:"+"})]}),(0,a.jsxs)("div",{className:"bakset_item_bottom",children:[(0,a.jsx)("p",{className:"price",children:e.price}),(0,a.jsx)("img",{className:"deleted",onClick:()=>s(e),src:"./icons/free-icon-delete-1214428 1.svg",alt:""})]})]})]},e.id)):(0,a.jsx)("p",{children:" Ничего не нашли "})}),(0,a.jsxs)("div",{className:"basket_info_block",children:[(0,a.jsx)("h4",{className:"basket_info_title",children:"Оплата после примерки"}),(0,a.jsxs)("p",{className:"basket_info_text",children:["Товары, ",t," шт."]}),(0,a.jsxs)("div",{className:"basket_info_total",children:[(0,a.jsx)("div",{className:"result",children:"Итого"}),(0,a.jsx)("div",{className:"all_price",children:d})]}),(0,a.jsx)("div",{className:"btn",onClick:()=>_(!0),children:"Заказать"}),(0,a.jsx)("div",{className:"basket_info_polity",children:(0,a.jsxs)("span",{children:["Соглашаюсь с правилами пользования торговой площадкой и ",(0,a.jsx)(n.default,{href:"/delivery",children:"возврата"})," "]})})]})]}),(0,a.jsx)(i.Ix,{})]})})}},385:function(e,s,t){"use strict";var a=t(7437),l=t(7648);s.Z=e=>{let{items:s}=e;return(0,a.jsxs)("nav",{"aria-label":"Breadcrumb",children:[(0,a.jsx)("div",{}),(0,a.jsx)("ol",{className:"breadcrumb",children:s.map((e,s)=>(0,a.jsx)("li",{className:"breadcrumb_text",children:e.link?(0,a.jsx)(l.default,{href:e.link,children:e.title}):(0,a.jsx)("span",{"aria-current":"page",children:e.title})},s))})]})}},384:function(e,s,t){"use strict";t.d(s,{CartProvider:function(){return i},j:function(){return c}});var a=t(7437),l=t(2265);let r=(0,l.createContext)(),c=()=>(0,l.useContext)(r),i=e=>{let{children:s}=e,[t,c]=(0,l.useState)([]),[i,n]=(0,l.useState)(0),[o,d]=(0,l.useState)(0),[m,u]=(0,l.useState)([]);(0,l.useEffect)(()=>{(async()=>{try{let e=await fetch("/bdlist.json"),s=await e.json();u(s),console.log("Полученные данные:",s)}catch(e){console.log(e)}})()},[]);let h=()=>{let e=localStorage.getItem("cart");e&&(c(JSON.parse(e)),x(JSON.parse(e)))};(0,l.useEffect)(()=>{h()},[]);let _=e=>{x(e),localStorage.setItem("cart",JSON.stringify(e))},x=e=>{let s=0,t=0;e.map(e=>{s+=e.count,t+=e.count*e.price}),n(s),d(t)};return(0,a.jsx)(r.Provider,{value:{cart:t,toggleCartItem:e=>{let s;c(s=t.some(s=>s.code===e.code)?t.filter(s=>s.code!==e.code):[...t,{...e,count:1}]),_(s)},loadCartFromLocalStorage:h,totalQuant:i,totalSum:o,formatNumber:e=>{let s=Number(String(e).replace(/\s+/g,"").slice(0,-2));return isNaN(s)?"":s.toLocaleString("ru-RU")},increment:e=>{let s=t.map(s=>s.id===e.id?{...s,count:++s.count}:s);c(s),_(s)},decrement:e=>{let s=t.map(s=>s.id===e.id&&1!==s.count?{...s,count:--s.count}:s);c(s),_(s)},products:m},children:s})}}},function(e){e.O(0,[648,644,971,117,744],function(){return e(e.s=6640)}),_N_E=e.O()}]);