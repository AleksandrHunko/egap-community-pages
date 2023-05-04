const community_id = 3

if (document.querySelector(".ecomonitoring") != null) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const response = JSON.parse(this.responseText)
        document.querySelector(".ecomonitoring").querySelector('.aqi').style.padding = "12px 8px"
        document.querySelector(".ecomonitoring").querySelector('.aqi').style.margin = "12px 0 -10px 0"
        let aqi = addAQI(response.pm25, document.querySelector(".ecomonitoring").querySelector('.aqi'))
        console.log(aqi);
        document.querySelector(".ecomonitoring").querySelector('.humidity').innerHTML = `${response.humidity}%`
        document.querySelector(".ecomonitoring").querySelector('.temperature').innerHTML = `${response.temperature}<sup>℃</sup>`
      }
    }
    xmlhttp.open("GET", `https://api.toolkit.in.ua/ecoapi/v1/get-data-short/${community_id}`, true);
    xmlhttp.send();
} 

function addAQI(pm25, element) {
    let aqi;
    if (pm25 >= 0 && pm25 <= 12.0) {
        element.style.background = "#2CE07F"
        element.innerHTML = "Добрий рівень"
    } else if (pm25 > 12.0 && pm25 <= 35.4) {
        element.style.background = "#E4FF3D"
        element.innerHTML = "Задовільний рівень"
    } else if (pm25 > 35.4 && pm25 <= 55.4) {
        element.style.background = "#FF9A3D"
        element.innerHTML = "Поганий рівень"
    } else if (pm25 > 55.4 && pm25 <= 150.4) {
        element.style.background = "#B52626"
        element.innerHTML = "Дуже поганий рівень"
    } else if (pm25 > 150.4 && pm25 <= 250.4) {
        element.style.background = "#B52626"
        element.innerHTML = "Небезпечний рівень"
    } else {
        element.style.background = "#B52626"
        element.innerHTML = "Надзвичайно небезпечний рівень"
    }
    return;
}


 /* function calculateAQI(pm25) {
    let aqi;
    if (pm25 >= 0 && pm25 <= 12.0) {
      aqi = interpolate(pm25, 0, 12.0, 0, 50);
    } else if (pm25 > 12.0 && pm25 <= 35.4) {
      aqi = interpolate(pm25, 12.1, 35.4, 51, 100);
    } else if (pm25 > 35.4 && pm25 <= 55.4) {
      aqi = interpolate(pm25, 35.5, 55.4, 101, 150);
    } else if (pm25 > 55.4 && pm25 <= 150.4) {
      aqi = interpolate(pm25, 55.5, 150.4, 151, 200);
    } else if (pm25 > 150.4 && pm25 <= 250.4) {
      aqi = interpolate(pm25, 150.5, 250.4, 201, 300);
    } else if (pm25 > 250.4 && pm25 <= 350.4) {
      aqi = interpolate(pm25, 250.5, 350.4, 301, 400);
    } else if (pm25 > 350.4 && pm25 <= 500.4) {
      aqi = interpolate(pm25, 350.5, 500.4, 401, 500);
    } else {
      aqi = "out of range";
    }
    return aqi;
  }
  
  function interpolate(value, low1, high1, low2, high2) {
    return Math.round(((high2 - low2) * (value - low1)) / (high1 - low1) + low2);
  }*/