import {City, Point} from '../../types';
import {useEffect, useRef} from 'react';
import {Icon, layerGroup, Marker} from 'leaflet';
import {URL_MARKER_ACTIVE, URL_MARKER_DEFAULT} from '../../consts.ts';
import useMap from '../hooks/use-map.tsx';
import 'leaflet/dist/leaflet.css';

type MapComponentProps = {
  city: City;
  points: Point[];
  selectedPoint: Point | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function MapComponent({ city, points, selectedPoint }: MapComponentProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (!map) {
      return;
    }
    const markerLayer = layerGroup().addTo(map);
    points.forEach((point) => {
      const marker = new Marker({
        lat: point.lat,
        lng: point.long
      });
      marker
        .setIcon(
          selectedPoint !== undefined && point.title === selectedPoint.title
            ? currentCustomIcon
            : defaultCustomIcon
        )
        .addTo(markerLayer);
    });

    return () => {
      map.removeLayer(markerLayer);
    };

  }, [map, points, selectedPoint]);

  return (
    <div style={{ height: '100%' }} ref={mapRef}></div>
  );
}

export default MapComponent;
