var trash = document.getElementsByClassName("fa-trash");

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    fetch('/messages', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'anime': this.dataset.animeid,
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});
