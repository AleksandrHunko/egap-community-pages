"use_strict"

const map = L.map('map').setView([48.447, 31.182], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const drawnItems = new L.FeatureGroup();

let geojsonFeature = null
geojsonFeature = {"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[32.06929,49.94346],[32.06929,49.94346],[32.06929,49.94346],[29.982232,47.092771],[29.982232,47.092771],[29.982232,47.092771],[27.433823,50.056414],[27.433823,50.056414],[27.433823,50.056414],[28.905749,50.686843],[28.905749,50.686843],[28.905749,50.686843],[32.06929,49.94346]]]}}

if (geojsonFeature != null) {
  const geojsonLayer = L.geoJson(geojsonFeature);
  geojsonLayer.eachLayer(
      function(l){
          drawnItems.addLayer(l);
  });

}

L.drawLocal = {
  draw: {
    toolbar: {
      // #TODO: this should be reorganized where actions are nested in actions
      // ex: actions.undo  or actions.cancel
      actions: {
        title: 'Відмінити створення фігури',
        text: 'Відмінити'
      },
      finish: {
        title: 'Завершити фігуру та зберегти',
        text: 'Зберегти'
      },
      undo: {
        title: 'Видалити останню поставлену точку',
        text: 'Видалити останню точку'
      },
      buttons: {
        polyline: '- your text-',
        polygon: 'Створити фігуру',
        rectangle: '- your text-',
        circle: '- your text-',
        marker: '- your text-',
        circlemarker: '- your text-'
      }
    },
    handlers: {
      
      circle: {
        tooltip: {
          start: '- your text-'
        },
        radius: '- your text-'
      },
      circlemarker: {
        tooltip: {
          start: '- your text-.'
        }
      },
      marker: {
        tooltip: {
          start: '- your text-.'
        }
      },
      polygon: {
        tooltip: {
          start: 'Поставте першу точку фігури',
          cont: '2',
          end: 'Поставте наступну точку фігури'
        }
      },
      polyline: {
        error: '<strong>Error:</strong> shape edges cannot cross!',
        tooltip: {
          start: 'Click to start drawing line.',
          cont: 'Click to continue drawing line.',
          end: 'Click last point to finish line.'
        }
      },
      rectangle: {
        tooltip: {
          start: '- your text-.'
        }
      },
      simpleshape: {
        tooltip: {
          end: 'Release mouse to finish drawing.'
        }
      }
    }
  },
  edit: {
    toolbar: {
      actions: {
        save: {
          title: 'Зберегти зміни',
          text: 'Зберегти'
        },
        cancel: {
          title: 'Відмінити всі зміни',
          text: 'Відмінити'
        }
      },
      buttons: {
        edit: 'Редагувати фігуру',
        editDisabled: 'Не знайдено фігур для редагування',
        remove: 'Видалити фігуру',
        removeDisabled: 'Не знайдено фігур для видалення'
      }
    },
    handlers: {
      edit: {
        tooltip: {
          text: 'Тягніть точки для того щоб змінити фігуру',
          subtext: 'Натисніть Відмінити для того щоб відмінити всі зміни'
        }
      },
      remove: {
        tooltip: {
          text: 'Натисніть на фігуру для її видалення, потім натисніть "Зберегти"'
        }
      }
    }
  }
};


map.addLayer(drawnItems);

const drawControlFull = new L.Control.Draw({
  edit: {
      featureGroup: drawnItems
  },
  draw: {
    polyline: false,
    rectangle: false,
    circle: false,
    marker: false
  }
});


const drawControlEditOnly = new L.Control.Draw({
  edit: {
      featureGroup: drawnItems
  },
  draw: false
});


map.addControl(drawControlFull);

if (drawnItems.getLayers().length !== 0){
  map.addControl(drawControlEditOnly);
  map.removeControl(drawControlFull);
}

map.on(L.Draw.Event.CREATED, function (e) {
  drawnItems.addLayer(e.layer);
  map.removeControl(drawControlFull);
  map.addControl(drawControlEditOnly);

  const shape = e.layer.toGeoJSON()
  console.log(JSON.stringify(shape));
});

map.on('draw:edited', function (e) {
  let layers = e.layers;
  layers.eachLayer(function (layer) {
    const shape = layer.toGeoJSON()
    console.log(JSON.stringify(shape));
  });
})

map.on(L.Draw.Event.DELETED, function(e) {
  if (drawnItems.getLayers().length === 0){
      map.removeControl(drawControlEditOnly);
      map.addControl(drawControlFull);
  }
});