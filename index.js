document.addEventListener('DOMContentLoaded', function () {
    const productImage = document.getElementById('productImage');
    const imgContainer = productImage.parentElement;

    const zoomLens = document.createElement('div');
    zoomLens.setAttribute('class', 'zoom-lens');
    imgContainer.appendChild(zoomLens);

    const zoomResult = document.createElement('div');
    zoomResult.setAttribute('class', 'zoom-result');
    imgContainer.appendChild(zoomResult);

    const resultImg = document.createElement('img');
    resultImg.setAttribute('src', productImage.src);
    zoomResult.appendChild(resultImg);

    function moveLens(event) {
        event.preventDefault();
        const { left, top, width, height } = productImage.getBoundingClientRect();
        const lensSize = 100;

        let x, y;
        if (event.touches) {
            x = event.touches[0].clientX - left - lensSize / 2;
            y = event.touches[0].clientY - top - lensSize / 2;
        } else {
            x = event.clientX - left - lensSize / 2;
            y = event.clientY - top - lensSize / 2;
        }

        if (x > width - lensSize) x = width - lensSize;
        if (x < 0) x = 0;
        if (y > height - lensSize) y = height - lensSize;
        if (y < 0) y = 0;

        zoomLens.style.left = x + 'px';
        zoomLens.style.top = y + 'px';

        const cx = zoomResult.offsetWidth / lensSize;
        const cy = zoomResult.offsetHeight / lensSize;

        resultImg.style.width = productImage.width * cx + 'px';
        resultImg.style.height = productImage.height * cy + 'px';

        resultImg.style.transform = `translate(-${x * cx}px, -${y * cy}px)`;
    }

    function showLens() {
        zoomLens.style.visibility = 'visible';
        zoomResult.style.visibility = 'visible';
    }

    function hideLens() {
        zoomLens.style.visibility = 'hidden';
        zoomResult.style.visibility = 'hidden';
    }

    productImage.addEventListener('mousemove', function (event) {
        showLens();
        moveLens(event);
    });

    productImage.addEventListener('mouseleave', hideLens);

    productImage.addEventListener('touchmove', function (event) {
        showLens();
        moveLens(event);
    });

    productImage.addEventListener('touchend', hideLens);
});
