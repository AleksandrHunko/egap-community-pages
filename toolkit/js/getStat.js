if (document.getElementById('communities_sum') && document.querySelector('.map')) {

    const xmlHttp = new XMLHttpRequest();
    const host = window.location.hostname;
    xmlHttp.open( "GET", '/getStat?data=connectedCommunity', false );
    xmlHttp.send();
    const regions = JSON.parse(xmlHttp.responseText);
    
    const svg_map_text = document.querySelector('.map').querySelector('svg').querySelector('#layer3').querySelectorAll('tspan')
    
    for (let i = 0; i < svg_map_text.length; i++) {
        svg_map_text[i].innerHTML = getRegionValue(regions, svg_map_text[i].dataset.region);
    }
    
    document.getElementById('communities_sum').innerHTML = getTotalValue(regions) + ' громад підключено';
    
}

function getRegionValue(regions, region_id) {
    const answer = regions.filter(function(el) {
         return el.id  == region_id;
    });

    if (answer != 0) {
        return answer.shift().communities_count;
    } else {
        return '';
    }
}

function getTotalValue(regions) {
    let total = 0;
    regions.forEach(function(element) {
        total = total + element.communities_count;
    });
    return total;
}
