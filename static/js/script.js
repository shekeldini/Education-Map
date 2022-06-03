var tree = document.getElementById('tree');

for(let ul of tree.querySelectorAll('ul')){
    ul.hidden = true;
}

for ( let li of tree.querySelectorAll('li')){
    let span = document.createElement('span');
    span.classList.add('show');
    span.classList.add('closed');
    li.prepend(span);
    span.append(span.nextSibling);
}

tree.onclick = function (event) {
    if (event.target.tagName != 'SPAN') return;

    let childrenContainer = event.target.parentNode.querySelector('ul');

    if (!childrenContainer) return;

    childrenContainer.hidden = !childrenContainer.hidden;

    if(childrenContainer.hidden) {
        event.target.classList.add('hide');
        event.target.classList.remove('show');
	event.target.classList.remove('open');
        event.target.classList.remove('active');
    } else {
        event.target.classList.toggle('active');
	event.target.classList.toggle("open");
        event.target.classList.add('show');
        event.target.classList.remove('hide');
    }
};

const openMenu = document.querySelector('.open-menu'),
     menuPanel = document.querySelector('.menu');

openMenu.addEventListener('click', () => {
  menuPanel.classList.add('visible');

})

