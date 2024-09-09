import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MapApp',

  setup() {
    const pinStyleLeft = ref('0');
    const pinStyleTop = ref('0');

    /**
     * Обработчик клика по карте для установки координат метки
     * @param {MouseEvent} event
     */
    function handleClick(event) {
      pinStyleLeft.value =`${event.offsetX}px`;
      pinStyleTop.value =`${event.offsetY}px`;
    }

    return {
      handleClick, pinStyleLeft, pinStyleTop
    }
  },

  template: `
    <div class="map" @click="handleClick">
      <img class="map-image" src="./map.png" alt="Map" draggable="false" />
      <span :style="{left: pinStyleLeft, top: pinStyleTop}" class="pin">📍</span>
    </div>
  `,
})
