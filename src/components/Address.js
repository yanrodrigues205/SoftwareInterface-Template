import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { Container, Form, Button } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Configuração do ícone do marcador para compatibilidade com o Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Função para mover o mapa para o local pesquisado
function SetViewOnClick({ center }) {
  const map = useMap();
  map.setView(center, 30);
  return null;
}

const OpenStreetMapSearch = ({ onAddressSelect, selectedAddress }) => {
  const defaultCenter = [-14.235, -51.9253];// Coordenadas padrão (Londres)
  const [center, setCenter] = useState(defaultCenter);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState(''); // Novo estado para o número
  const [latLon, setLatLon] = useState({ lat: null, lon: null });
  const [addressDetails, setAddressDetails] = useState(null); // Detalhes do endereço
  const [showMap, setShowMap] = useState(true); // Controla a exibição do mapa

  useEffect(() => {
    if (selectedAddress) {
        setShowMap(false)
        setAddressDetails(selectedAddress);
        setLatLon({ lat: selectedAddress.lat, lon: selectedAddress.lon });
        setCenter([selectedAddress.lat, selectedAddress.lon]);
    }
    else
    {
      setShowMap(true)
      setLatLon({ lat: 0, lon: 0 });
      setCenter([-14.235, -51.9253]);

    }
  }, [selectedAddress]);

  const handleSearch = async () => {
    const fullAddress = `${address} ${number}`; 
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${fullAddress}`
    );
    const data = await response.json();
  
    if (data.length > 0) {
      let { lat, lon } = data[0];
      
      // Aplicar um pequeno ajuste para mover o marcador
      const offsetLat = 0.0003; // ajuste para mover o marcador
      const offsetLon = -0.0002; // ajuste para mover o marcador
  
      lat = parseFloat(lat) + offsetLat;
      lon = parseFloat(lon) + offsetLon;
  
      setCenter([lat, lon]);
      setLatLon({ lat, lon });
    } else {
      alert('Endereço não encontrado');
    }
  };
  

  // Função para buscar detalhes do endereço usando Nominatim Reverse Geocoding
  const fetchAddressDetails = async (lat, lon) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    const details = {
      road: data.address.road,
      city: data.address.city || data.address.town || data.address.village,
      state: data.address.state,
      country: data.address.country,
      lat,
      lon,
      number, // Inclui o número no objeto do endereço
    };
    setAddressDetails(details);

    // Enviar os dados do endereço selecionado para o componente pai
    onAddressSelect(details);
  };

  // Função para limpar o campo de endereço e resetar o mapa
  const handleClear = () => {
    setAddress('');
    setNumber(''); // Limpa o número também
    setCenter(defaultCenter);
    setLatLon({ lat: null, lon: null });
    setAddressDetails(null);
    setShowMap(true);
  };

  // Função para salvar a latitude e longitude
  const handleSave = () => {
    if (latLon.lat && latLon.lon) {
      fetchAddressDetails(latLon.lat, latLon.lon); // Busca os detalhes do endereço
      setShowMap(false); // Esconde o mapa
    } else {
      alert('Por favor, busque e selecione um endereço antes de salvar.');
    }
  };

  return (
    <Container>
      {showMap ? (
        <>
          <Form>
            <Form.Group>
              <Form.Label>Insira um endereço</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Buscar endereço"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Número"
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSearch}>
              Buscar
            </Button>
            <Button variant="secondary" onClick={handleClear}>
              Limpar
            </Button>
            <Button variant="success" onClick={handleSave}>
              Confirmar Endereço
            </Button>
          </Form>

          <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="leaflet-container mt-3">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center} />
            <SetViewOnClick center={center} />
          </MapContainer>
        </>
      ) : (
        <div>
          <br/>
          <h5>Endereço Selecionado:</h5>
          <p>
            <strong>Rua:</strong> {addressDetails?.road || 'Não disponível'}<br />
            <strong>Número:</strong> {addressDetails?.number || 'Não disponível'}<br />
            <strong>Cidade:</strong> {addressDetails?.city || 'Não disponível'}<br />
            <strong>Estado:</strong> {addressDetails?.state || 'Não disponível'}<br />
            <strong>País:</strong> {addressDetails?.country || 'Não disponível'}<br />
            <strong>Latitude:</strong> {latLon.lat}<br />
            <strong>Longitude:</strong> {latLon.lon}
          </p>
          <Button variant="primary" onClick={() => setShowMap(true)}>
            Alterar Endereço
          </Button>
        </div>
      )}
    </Container>
  );
};

export default OpenStreetMapSearch;
