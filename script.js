const openTab = document.querySelectorAll('[data-section-target]')
const openLi = document.querySelectorAll('[data-li-target]')
openTab.forEach(a => {
    a.addEventListener('click',() => {
        const tab=document.querySelector(a.dataset.sectionTarget)
        const tabLi=document.querySelector(a.dataset.liTarget)
        opentab(tab,tabLi)
    })
})
function opentab(tab,tabLi){
    if(tab==null) return
    const sections=document.querySelectorAll('section');
    const Li=document.querySelectorAll('.nav-list');
    sections.forEach(section=>{
        section.classList.remove('active')
        section.classList.add('inactive')
    });
    Li.forEach(li=>{
        li.classList.remove('open-list')
        li.classList.add('close-list')
    });
    tabLi.classList.add('open-list');
    tabLi.classList.remove('close-list');
    tab.classList.add('active');
    tab.classList.remove('inactive');
}
