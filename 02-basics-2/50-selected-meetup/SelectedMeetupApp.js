import {defineComponent, ref} from 'vue'
 import { getMeetup } from './meetupsService.ts'
import {watchImmediate} from "@vueuse/core";

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const meetupId = ref(1);
    const meetup = ref(null);

    watchImmediate(meetupId, async () => {
      if(!meetupId.value) return;
      meetup.value = await getMeetup(meetupId.value);
    })
    return { meetupId, meetup }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="meetupId <= 1" @click="meetupId--">Предыдущий</button>
        <div class="radio-group" role="radiogroup">

          <div v-for="meetup in 5" class="radio-group__button">
            <input
              :id="'meetup-id-' + meetup"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="meetup"
              v-model="meetupId"
            />
            <label :for="'meetup-id-' + meetup" class="radio-group__label">{{ meetup }}</label>
          </div>
        </div>
        <button class="button button--secondary" type="button" :disabled="meetupId >= 5" @click="meetupId++">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetup?.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
