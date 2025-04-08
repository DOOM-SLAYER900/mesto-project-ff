(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,r,n,o,a,c,u,i){var l=e.querySelector(".card").cloneNode(!0),s=l.querySelector(".card__image").src=t.link,d=l.querySelector(".card__image").alt=t.name,p=l.querySelector(".card__title").textContent=t.name,f=l.querySelector(".card__delete-button");t.owner._id===a._id&&(f.style.display="block",f.addEventListener("click",(function(){return e=t._id,r=l,void c(e).then((function(){return o(r)})).catch((function(e){console.error("Ошибка:",e)}));var e,r})));var m=l.querySelector(".card__like-counter");m.textContent=t.likes.length;var v=l.querySelector(".card__like-button");return v.addEventListener("click",(function(e){r(e.target,t,m,u,i)})),t.likes.some((function(e){return e._id===a._id}))&&v.classList.add("card__like-button_is-active"),l.querySelector(".card__image").addEventListener("click",(function(){n(s,d,p)})),l}function r(e){e.remove()}function n(e,t,r,n,o){(e.classList.contains("card__like-button_is-active")?o:n)(t._id).then((function(t){r.textContent=t.likes.length,e.classList.toggle("card__like-button_is-active")})).catch((function(e){console.error("Ошибка:",e)}))}function o(e){"Escape"===e.key&&(document.querySelector(".popup_is-opened").classList.remove("popup_is-opened"),document.removeEventListener("keydown",o))}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}var u=function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent=""},i=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);l(r,n,t),r.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,r):function(e,t,r,n){t.classList.add(n.inputErrorClass);var o=e.querySelector(".".concat(t.id,"-error"));o.textContent=r,o.classList.add(n.errorClass)}(e,t,t.validationMessage,r)}(e,o,t),l(r,n,t)}))}))},l=function(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(r.inactiveButtonClass),t.removeAttribute("disabled","true")):(t.classList.add(r.inactiveButtonClass),t.setAttribute("disabled","true"))};function s(e,t){var r=Array.from(t.querySelectorAll(e.inputSelector)),n=t.querySelector(e.submitButtonSelector);r.forEach((function(r){u(t,r,e)})),l(r,n,e),t.reset()}var d={baseUrl:"https://nomoreparties.co/v1/wff-cohort-35",headers:{authorization:"fd732c30-2a2d-43fe-b40a-380c50279641","Content-Type":"application/json"}},p=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status," ").concat(e.statusText))},f=fetch("".concat(d.baseUrl,"/users/me"),{headers:d.headers}).then(p),m=fetch("".concat(d.baseUrl,"/cards"),{headers:d.headers}).then(p),v=function(e){return fetch("".concat(d.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:d.headers}).then(p)},_=function(e){return fetch("".concat(d.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:d.headers}).then(p)},y=function(e){return fetch("".concat(d.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:d.headers}).then(p)};function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var S=document.querySelector(".places__list"),b=document.querySelector(".popup_type_update-avatar"),q=document.querySelector(".popup_type_edit"),C=document.querySelector(".popup_type_new-card"),E=document.querySelector(".popup_type_image"),g=document.querySelectorAll(".popup"),L=document.querySelector(".profile__update-avatar-button"),k=document.querySelector(".profile__edit-button"),x=document.querySelector(".profile__add-button"),A=document.forms.updateAvatar,w=A.elements.link,U=document.forms.editProfile,T=U.elements.name,P=U.elements.description,j=document.forms.newPlace,O=j.elements.placeName,B=j.elements.link,D=document.querySelector(".profile__title"),I=document.querySelector(".profile__description"),N=document.querySelector(".profile__image"),M=null,J=function(e){console.error("Ошибка:",e)},H={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible",spanErrorClass:".popup__input-error"};function V(e,t,r){var n=E.querySelector(".popup__image"),o=E.querySelector(".popup__caption");a(E),n.src=e,n.alt=t,o.textContent=r}L.addEventListener("click",(function(){var e=b.querySelector(H.formSelector);s(H,e),a(b)})),A.addEventListener("submit",(function(e){e.preventDefault();var t=e.target.querySelector(".popup__button");t.textContent="Сохранение...";var r=w.value;N.style.backgroundImage="url(".concat(r,")"),function(e){return fetch("".concat(d.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:d.headers,body:JSON.stringify({avatar:e})}).then(p)}(r).catch(J).finally((function(){t.textContent="Сохранить"})),A.reset(),c(b)})),k.addEventListener("click",(function(){T.value=D.textContent,P.value=I.textContent,a(q)})),U.addEventListener("submit",(function(e){e.preventDefault();var t=e.target.querySelector(".popup__button");t.textContent="Сохранение...";var r=T.value,n=P.value,o={name:r,about:n};D.textContent=r,I.textContent=n,function(e){return fetch("".concat(d.baseUrl,"/users/me"),{method:"PATCH",headers:d.headers,body:JSON.stringify({name:e.name,about:e.about})}).then(p)}(o).catch(J).finally((function(){t.textContent="Сохранить"})),c(q)})),x.addEventListener("click",(function(){var e=b.querySelector(H.formSelector);s(H,e),a(C)})),j.addEventListener("submit",(function(e){e.preventDefault();var o,a=e.target.querySelector(".popup__button");a.textContent="Сохранение...",(o={name:O.value,link:B.value},fetch("".concat(d.baseUrl,"/cards"),{method:"POST",headers:d.headers,body:JSON.stringify(o)}).then(p)).then((function(e){var o=e;S.prepend(t(o,n,V,r,M,v,_,y)),j.reset(),c(C)})).catch(J).finally((function(){a.textContent="Сохранить"}))})),g.forEach((function(e){e.addEventListener("mousedown",(function(t){if((t.target.classList.contains("popup_is-opened")||t.target.classList.contains("popup__close"))&&(c(e),e.querySelector(H.formSelector))){var r=e.querySelector(H.formSelector);s(H,r)}}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(r){r.preventDefault(),i(t,e)})),i(t,e)}))}(H),Promise.all([f,m]).then((function(e){var o,a,c=(a=2,function(e){if(Array.isArray(e))return e}(o=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a,c,u=[],i=!0,l=!1;try{if(a=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=a.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(c=r.return(),Object(c)!==c))return}finally{if(l)throw o}}return u}}(o,a)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?h(e,t):void 0}}(o,a)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=c[0],i=c[1];D.textContent=u.name,I.textContent=u.about,N.style.backgroundImage="url(".concat(u.avatar,")"),M=u,i.forEach((function(e){S.append(t(e,n,V,r,M,v,_,y))}))})).catch(J)})();