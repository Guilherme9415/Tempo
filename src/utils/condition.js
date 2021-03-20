export function condition(condition) {

  switch (condition) {
    case 'storm':
      return icon = {
        name: 'thunderstorm-outline',
        color: '#1ec9ff'
      };
      break;

    case 'clear_day':
      return icon = {
        name: 'partly-sunny-outline',
        color: '#ffc107'
      };
      break;

    case 'cloudly_night':
        return icon = {
          name: 'cloudy-night-outline',
          color: '#ffc107'
        };
        break;

    case 'rain':
      return icon = {
        name: 'rainy-outline',
        color: '#1ec9ff'
      };
      case 'fog ':
      return icon = {  
        name: 'weather-fog',
        color: '#f5f5f5'
      };
      case 'cloud ':
      return icon = {
        name: 'cloudy',
        color: '#ccc'
      };
      break;
    default:
      return icon = {
        name: 'cloud-outline',
        color: '#1ec9ff'
      };

  }
}