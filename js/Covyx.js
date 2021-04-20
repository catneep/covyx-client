function positionIsDrawable(point) {
    return true;
    var img = document.getElementById('lungsArea');

    var canvas = document.createElement('canvas');
    let dim = img.getBoundingClientRect();
    canvas.width = dim.width;
    canvas.height = dim.height;

    canvas.getContext('2d').drawImage(img, 0, 0, dim.width, dim.height);
    var alpha = canvas.getContext('2d').getImageData(point.x, point.y, 1, 1).data[3];
    return alpha > 0;
}

function calculatePoints() {
    let count = 0;
    var img = document.getElementById('lungsArea');

    var canvas = document.createElement('canvas');
    let dim = img.getBoundingClientRect();
    canvas.width = dim.width;
    canvas.height = dim.height;

    canvas.getContext('2d').drawImage(img, 0, 0, dim.width, dim.height);

    for (j = 0; j < dim.width; j++) {
        for (i = 0; i < dim.height; i++) {
            var alpha = canvas.getContext('2d').getImageData(j, i, 1, 1).data[3];
            if (alpha > 0) {
                count++;
                console.log(i + ', ' + j + ' is a valid point');
            } else {
                console.log('nope');
            }
        }
    }
    console.log('valid points: ' + count);
}

function randomPoint(width, i) {
    var point = {
        x: Math.floor(Math.random() * width),
        y: i,
        value: Math.floor(Math.random() * 100),
        radius: Math.floor(Math.random() * 30)
    };
    return point;
}

function drawHeatMapToCanvas(containerID) {
    calculatePoints();
    var canvasParent = document.getElementById(containerID);
    var mapInstance = h337.create({
        container: canvasParent,
        maxOpacity: 0.9,
        gradient: {
            '.50': 'blue',
            '.80': 'red',
            '.95': 'white'
        }
    });
    
    let dim = canvasParent.getBoundingClientRect();
    var points = [];
    var width = dim.width;
    var height = dim.height;

    console.log(canvasParent)
    console.log(dim);

    for (i = 0; i < height; i++) {
        var point;
        point = randomPoint(width, i);
        if (positionIsDrawable(point)) {
            points.push(point);
        }
    }

    var data = {
        max: 100,
        data: points
    };

    mapInstance.setData(data);

    //let areaElem = document.getElementById('lungsArea');
    //let parent = areaElem.parentNode;
    //parent.remove();

    //canvasParent.style.position = 'relative';
    let heat = document.querySelector('.heatmap-canvas');
    heat.classList.add('is-4by3');
}

function addContentClass() {
    let box = document.getElementById('resultBox');
    box.classList.add('content');
}

function testHeat() {
    var cont = document.getElementById('drawable');
    // minimal heatmap instance configuration
    var heatmapInstance = h337.create({
        // only container is required, the rest will be defaults
        container: cont
    });

    var pos = cont.getBoundingClientRect();
    // now generate some random data
    var points = [];
    var max = 0;
    var width = pos.width;
    //var height = pos.height;
    var height = 300;
    var len = 100;

    console.log(cont);
    console.log(pos);

    while (len--) {
        var val = Math.floor(Math.random() * 100);
        max = Math.max(max, val);
        var point = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height),
            value: val
        };
        points.push(point);
    }
    // heatmap data format
    var data = {
        max: max,
        data: points
    };
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    heatmapInstance.setData(data);

}