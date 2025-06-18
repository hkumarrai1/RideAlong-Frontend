const fetchLatLonFromAddress = async (address) => {
  const apiKey = import.meta.env.VITE_GEOAPIFY_KEY;
  if (!address || typeof address !== "string" || address.trim().length < 4) {
    return null;
  }
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    address
  )}&limit=1&apiKey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const [lon, lat] = data.features[0].geometry.coordinates;
      return { lon, lat };
    }
    return null;
  } catch (err) {
    return null;
  }
};
export default fetchLatLonFromAddress;
