import { defineComponent } from 'vue/dist/vue.esm-bundler.js'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',
  setup() {
    const countMinutesFromMidnight = (hhmm) => {
      const hoursAndMinutes = hhmm.split(':');
      return hoursAndMinutes[0] * 60 + hoursAndMinutes[1] * 1;
    }
    const isNight = ({dt, sunrise, sunset}) => {
      const dateMinutesFromMidnight = countMinutesFromMidnight(dt);
      const sunriseMinutesFromMidnight = countMinutesFromMidnight(sunrise);
      const sunsetMinutesFromMidnight = countMinutesFromMidnight(sunset);

      return dateMinutesFromMidnight < sunriseMinutesFromMidnight || dateMinutesFromMidnight > sunsetMinutesFromMidnight;
    };
    return {
      weathers: getWeatherData(),
      weatherConditionIcons: WeatherConditionIcons,
      isNight
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="weather in weathers" :class="{'weather-card--night': isNight(weather.current)}" class="weather-card">
          <div v-if="weather.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ weather.alert.sender_name }}: {{ weather.alert.description }}}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ weather.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ weather.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weather.current.weather.description">{{ weatherConditionIcons[weather.current.weather.id] }}</div>
            <div class="weather-conditions__temp">  {{ (weather.current.temp - 273.15).toFixed(1) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ (weather.current.pressure * 0.75).toFixed() }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weather.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weather.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weather.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
