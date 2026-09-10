const WHATSAPP="573157745826";
const HELP_URL="https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent("Hola, tengo problemas con mi cuenta. Necesito ayuda.");
const PRODUCTS=[
 {id:"netflix",name:"Netflix",price:15000,delivery:"🔑 Se entrega correo y clave asignados",detail:"👤 Cuenta compartida · perfil individual con PIN",logo:"imagenes/logos/netflix.svg"},
 {id:"disney-premium",name:"Disney+ Premium",price:13000,delivery:"🔑 Se entrega correo y clave asignados",detail:"👤 Cuenta compartida · perfil individual · Disney+ Premium",logo:"imagenes/logos/disney-premium.jpg"},
 {id:"disney-estandar",name:"Disney+ Estándar",price:10000,delivery:"🔑 Se entrega correo y clave asignados",detail:"👤 Cuenta compartida · perfil individual",logo:"imagenes/logos/disney-estandar.jpg"},
 {id:"prime-video",name:"Prime Video",price:9000,delivery:"🔑 Se entrega correo y clave asignados",detail:"👤 Cuenta compartida · perfil individual",logo:"imagenes/logos/prime-video.jpg"},
 {id:"hbo-max",name:"HBO Max",price:8000,delivery:"🔑 Se entrega correo y clave asignados",detail:"👤 Cuenta compartida · perfil individual",logo:"imagenes/logos/hbo-max.jpg"},
 {id:"hbo-max-platino",name:"HBO Max Platino",price:13000,delivery:"🔑 Se entrega correo y clave asignados",detail:"👤 Cuenta compartida · perfil individual",logo:"imagenes/logos/hbo-max-platino.jpg"},
 {id:"paramount",name:"Paramount+",price:10000,delivery:"🔑 Se entrega correo y clave asignados",detail:"👤 Cuenta compartida · perfil individual",logo:"imagenes/logos/paramount-final.png"},
 {id:"vix-premium",name:"ViX Premium",price:6000,delivery:"🔑 Se entrega correo y clave asignados",detail:"👤 Cuenta compartida · perfil individual",logo:"imagenes/logos/vix-premium.jpg"},
 {id:"crunchyroll",name:"Crunchyroll",price:10000,delivery:"🔑 Se entrega correo y clave asignados",detail:"👤 Cuenta compartida · perfil individual",logo:"imagenes/logos/crunchyroll-user.png"},
 {id:"iptv",name:"IPTV",price:10000,delivery:"🔑 Se entrega correo y clave asignados",detail:"",logo:"imagenes/logos/iptv-final.png"},
 {id:"magis-tv-pro",name:"Magis TV Pro",price:11000,delivery:"🔑 Se entrega correo y clave asignados",detail:"",logo:"imagenes/logos/magis-tv-pro.jpg"},
 {id:"spotify-1-mes",name:"Spotify × 1 mes",price:12000,delivery:"🔑 Se entrega correo y clave asignados",detail:"",logo:"imagenes/logos/spotify.svg"},
 {id:"spotify-3-meses",name:"Spotify × 3 meses",price:23000,delivery:"🔑 Se entrega correo y clave asignados",detail:"",logo:"imagenes/logos/spotify.svg"},
 {id:"youtube-premium",name:"YouTube Premium",price:11000,delivery:"🔑 Se entrega correo y clave asignados",detail:"",logo:"imagenes/logos/youtube.svg"},
 {id:"deezer-premium",name:"Deezer Premium",price:8000,delivery:"🔑 Se entrega correo y clave asignados",detail:"",logo:"imagenes/logos/deezer-premium.jpg"},
 {id:"canva-45-dias",name:"Canva 45 días",price:10000,delivery:"🔑 Se entrega correo y clave asignados",detail:"",logo:"imagenes/logos/canva-final.png"},
 {id:"canva-12-meses",name:"Canva × 12 meses",price:23000,delivery:"🔑 Se entrega correo y clave asignados",detail:"",logo:"imagenes/logos/canva-final.png"},
 {id:"office-2024",name:"Office 2024",price:25000,delivery:"💻 Activación virtual mediante los servicios oficiales de Microsoft",detail:"",logo:"imagenes/logos/office-2024-final.png"},
 {id:"office-365",name:"Office 365",price:60000,delivery:"🔑 Se entrega correo y contraseña",detail:"📅 Suscripción anual",logo:"imagenes/logos/office-365-final.png"}
];
let cart=JSON.parse(localStorage.getItem("todo_streaming_cart")||"[]");
const money=n=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(n);
const productsEl=document.querySelector("#products");
function renderProducts(q=""){
 productsEl.innerHTML="";
 PRODUCTS.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())).forEach(p=>{
  const c=document.createElement("article");c.className="card card-"+p.id;
  c.innerHTML='<div class="logo"><img src="'+p.logo+'" alt="'+p.name+'" loading="lazy" referrerpolicy="no-referrer"></div><h3>'+p.name+'</h3><div class="meta">'+p.delivery+(p.detail?"<br>"+p.detail:"")+'</div><div class="price">'+money(p.price)+'</div><button class="add" data-id="'+p.id+'">+ Agregar al carrito</button>';
  productsEl.append(c);
 });
}
function addToCart(id){
 const p=PRODUCTS.find(x=>x.id===id);
 if(!p)return;
 const x=cart.find(x=>x.id===id);
 if(x)x.qty=(Number(x.qty)||0)+1;
 else cart.push({id,qty:1});
 save();
}
productsEl.addEventListener("click",e=>{
 const b=e.target.closest("button.add");
 if(!b)return;
 addToCart(b.dataset.id);
 openCart();
});
function save(){localStorage.setItem("todo_streaming_cart",JSON.stringify(cart));renderCart()}
function durationFor(p){
 if(p.id.includes("spotify-3-meses")) return "3 meses";
 if(p.id.includes("spotify-1-mes")) return "1 mes";
 if(p.id.includes("canva-45-dias")) return "45 días";
 if(p.id.includes("canva-12-meses")) return "12 meses";
 if(p.id==="office-365") return "12 meses";
 if(p.id==="office-2024") return "Activación";
 return "1 mes";
}
function renderCart(){
 const box=document.querySelector("#cartItems");let total=0;box.innerHTML="";
 cart.forEach(x=>{
  const p=PRODUCTS.find(y=>y.id===x.id);if(!p)return;
  const qty=Math.max(1,Number(x.qty)||1);x.qty=qty;total+=p.price*qty;
  const d=document.createElement("div");d.className="cartline";
  d.innerHTML='<div class="cartinfo"><strong>'+p.name+'</strong><small>'+money(p.price)+'</small><div class="cartcontrols"><span class="control-label">Cantidad</span><button class="qtybtn" data-action="minus" data-id="'+p.id+'">−</button><span class="qtyvalue">'+qty+'</span><button class="qtybtn" data-action="plus" data-id="'+p.id+'">+</button></div></div><button class="remove" data-id="'+p.id+'" aria-label="Eliminar">×</button>';
  box.append(d);
 });
 if(!cart.length)box.innerHTML='<p style="color:#697386">Tu carrito está vacío.</p>';
 document.querySelector("#cartTotal").textContent=money(total);document.querySelector("#cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);
}
document.querySelector("#cartItems").onclick=e=>{
 const b=e.target.closest("button");if(!b)return;
 const id=b.dataset.id;const x=cart.find(x=>x.id===id);if(!x)return;
 if(b.dataset.action==="plus") x.qty++;
 else if(b.dataset.action==="minus") x.qty=Math.max(1,x.qty-1);
 else if(b.classList.contains("remove")) cart=cart.filter(x=>x.id!==id);
 save();
};
function openCart(){document.querySelector("#cartDrawer").classList.add("open")}
function closeCart(){document.querySelector("#cartDrawer").classList.remove("open")}
document.querySelector("#cartBtn").onclick=openCart;
document.querySelector("#closeCart").onclick=closeCart;
document.querySelector("#checkout").onclick=()=>{
 if(!cart.length)return alert("Tu carrito está vacío.");
 let total=0,lines=["Hola, quiero realizar este pedido:",""];
 cart.forEach(x=>{const p=PRODUCTS.find(y=>y.id===x.id);if(!p)return;total+=p.price*x.qty;lines.push("• "+p.name+" x"+x.qty+" — "+money(p.price))});
 lines.push("","Total: "+money(total));location.href="https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(lines.join("\n"));cart=[];saveCart();renderCart();
};
const heroSearch=document.querySelector("#heroSearch");
let searchTimer, searchRenderTimer;
heroSearch.oninput=e=>{
  const query=e.target.value.trim();
  document.body.classList.toggle("searching", query.length > 0);
  clearTimeout(searchTimer);
  clearTimeout(searchRenderTimer);

  // Primero dejamos que la vista actual se desvanezca y luego mostramos los resultados.
  productsEl.classList.add("search-fading");
  searchTimer=setTimeout(()=>{
    renderProducts(query);
    requestAnimationFrame(()=>productsEl.classList.remove("search-fading"));
  }, 320);
};
renderProducts();renderCart();
