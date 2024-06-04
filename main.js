function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
};

function loadingAnimation() {
    var tl = gsap.timeline()
tl.from("#page1",{
    opacity:0,
    duration:0.2,
    delay:0.2
})
tl.from("#page1",{
    transform:"scaleX(0.7)  scaleY(0.2)",
    borderRadius:"150px",
    duration:2,
    ease:"expo.out"
})
tl.from("nav",{
    opacity:0,
    delay:-0.1
})
tl.from("#page1 h1, #page1 p, #page1 div",{
    opacity:0,
    duration:0.5,
    stagger:0.2
})
}

function navAnimation(){
    var nav = document.querySelector("nav");

nav.addEventListener("mouseenter",function (){
    let tl = gsap.timeline()

    tl.to("#nav-bottom",{
        height: "21vh" 
    })
    tl.to("nav h5",{
        display: "block"
    })
    tl.from(".nav-part2 h5 span",{
        y:0,
        stagger: {
            amount: 0.6
        }
    })
});
nav.addEventListener("mouseleave",function (){
    let tl = gsap.timeline()
    tl.to(".nav-part2 h5 span",{
        y:25,
        stagger: {
            amount: 0.2
        }
    })
    tl.to(".nav-part2 h5", {
        display: "none",
        duration: 0.2
    })
    tl.to("#nav-bottom",{
        height: 0,
        duration : 0.3
    })
});
}


// var relem = document.querySelector("#right-elem1");
// var relemImg = document.querySelector("#right-elem1 img");
// relem.addEventListener("mouseenter", function (){
//     relemImg.style.opacity = 1
// })

function page2Animation(){
    let relem = document.querySelectorAll(".right-elem");
relem.forEach(function(elem){
    elem.addEventListener("mouseenter", function(){
        gsap.to(elem.childNodes[3], {
            opacity: 1,
            scale: 1
        })
    })
    elem.addEventListener("mouseleave", function(){
        gsap.to(elem.childNodes[3], {
            opacity: 0,
            scale: 0
        })
    })
    elem.addEventListener("mousemove", function(dets){
        gsap.to(elem.childNodes[3], {
            x:dets.x - elem.getBoundingClientRect().x - 70,
            y:dets.y - elem.getBoundingClientRect().y - 170
            
        })
    })
});
}
function page3VideoAnimation (){
    var page3Centre = document.querySelector(".page3-centre")
var video = document.querySelector("#page3 video")
page3Centre.addEventListener("click", function (){
    video.play()
    gsap.to(video,{
        transfom: "scaleX(1) scaleY(1)",
        opacity:1,
        borderRadius:0
    })
})
video.addEventListener("click", function (){
    video.pause()
    gsap.to(video,{
        transfom: "scaleX(0.7) scaleY(0)",
        opacity:0,
        borderRadius:"30px"
    })
})
}
function page3Videos (){
    var section = document.querySelectorAll(".sec-right")
section.forEach(function(elem){
    elem.addEventListener("mouseenter", function (){
        elem.childNodes[3].style.opacity = 1
        elem.childNodes[3].play()
    })
    elem.addEventListener("mouseleave", function (){
        elem.childNodes[3].style.opacity = 0
        elem.childNodes[3].load()
    })
})
}
function page6Animations (){
    // gsap.to("#btm6-part2 h4",{
    //     x:100,
    //     duration:1,
    //     stagger:{
    //         amount:-0.3
    //     },
    //     scrollTrigger:{
    //         trigger:"#btm6-part2",
    //         scroller:"#main",
    //         start:"top 80%",
    //         end:"top -50%",
    //         scrub:true
    //     }
    // });
    gsap.from("#btm6-part2 h4",{
        x:0,
        duration:1.2,
        scrollTrigger:{
            trigger:"#btm6-part2",
            scroller:"#main",
            start:"top 80%",
            end:"top 10%",
            scrub:true
        }
    });
};

locomotiveAnimation();

loadingAnimation();

page3VideoAnimation();

navAnimation();

page2Animation();

page3Videos();

page6Animations();

//loading Animation
// gsap.from("#page1",{
//     transform:"scaleX(0.7) scaleY(0)",
// })


