//intro webpage effect transition 

let intro = document.querySelector(".intro")
let logo = document.querySelector(".logo-header")
let logoSpan = document.querySelectorAll(".logo")


window.addEventListener("DOMContentLoaded", () =>{
    setTimeout(() =>{
        logoSpan.forEach((span,index) => {
            setTimeout(() =>{
                span.classList.add("active")
            }, (index + 1) * 400)

        })

        setTimeout(() =>{
            logoSpan.forEach((span, index) => {
                setTimeout(() => {
                    span.classList.remove('active')
                    span.classList.add('fade')
                }, (index +  1) * 50)
            })
        }, 2000)

        setTimeout(() =>{
            intro.style.top = '-100vh'
        }, 2300)

    })
})


//creating header text reveal effect
const h1Elements = []
const h1Array =[...document.querySelectorAll(".page__header")]
const specialChars = [...'!@£$%&}{":;?><][+=-_qwertyuiopasdfghjklzxcvbnm'.split('')]


class Header {
    constructor(id, element){
        this.id = id;
        this.idx = 0;
        this.frame = 0;
        this.element = element;
        this.element.className = `${id}`;
        this.originalString = element.innerText;
        this.innerHtml = '';
        this.intersecting = false;
        this.createSpans();
    }
    createSpans(){
        for(let i = 0; i < this.originalString.length; i++){
            this.innerHtml += `<span>${this.originalString[i]}</span>`;
        }
        this.element.innerHTML = this.innerHtml;
        this.spans = [...this.element.querySelectorAll('span')]
        
    
    }

    hanimate(){
        if(this.idx !== this.originalString.length && this.intersecting){
            this.spans[this.idx].style.opacity = 1;
            this.spans[this.idx].style.transform = `translateX(0)`
            if(this.frame % 3 === 0 && this.spans[this.idx].innerText !== ' '){
                this.spans[this.idx].innerText = specialChars[Math.floor(Math.random() * specialChars.length)]
            }
            if(this.frame % 8 == 0 && this.frame !== 0){ // Tweak the frame % number to adjust animation time
                this.spans[this.idx].innerText = this.originalString[this.idx]
                this.idx++
            }
            this.frame++;
            requestAnimationFrame(this.hanimate.bind(this))
        }
    }

    reset() {
        this.idx = 0; 
        this.frame = 0;
        this.intersecting = false;
        this.spans.forEach(span => {
            span.style.opacity = 0;
            span.style.transform = `translateX(-10px)`
        })
    }
}

window.addEventListener('DOMContentLoaded', () =>{
    setTimeout(() => {
        h1Array.forEach((header, index) => {
            h1Elements[index] = new Header(index, header)
        })

        // once element is out of view port thats when we apply animation 
        let options = {
            rootMargin: '0px',
            threshold: 0.0
          }
          
          let callback = (entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting){
                    h1Elements[+entry.target.className].intersecting = true;
                    h1Elements[+entry.target.className].hanimate()
                  
                }else{
                    h1Elements[+entry.target.className].reset()
                }
            });
          };
        
          let observer = new IntersectionObserver(callback, options);
    
          h1Elements.forEach(instance => {
            observer.observe(instance.element)
            instance.element.style.opacity = 1
          });
    }, 200)
})



