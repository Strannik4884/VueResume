<template>
  <div>
    <div class="form-group row">
      <label class="col-sm-3 col-form-label">Образование:</label>
      <div class="col-lg-8">
        <select class="form-control" required v-model="education.educationLevel">
          <option disabled>Выберите один из вариантов</option>
          <option :key="level" v-for="level in educationLevels">{{ level }}</option>
        </select>
      </div>
    </div>
    <div v-if="education.educationLevel !== educationLevels[0] && education.educationLevel !== ''">
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Учебное заведение:</label>
        <div class="col-lg-8">
          <input type="text" class="form-control" maxlength="100"
                 placeholder="Липецкий Государственный Технический Университет" required
                 :list="'educationPlaces-' + index + ''"
                 @input="universiteInputHandler" v-model="education.educationPlace">
          <datalist :id="'educationPlaces-' + index + ''">
            <option v-for="place in places" :key="place.id">{{ place.title }}</option>
          </datalist>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Факультет:</label>
        <div class="col-lg-8">
          <input type="text" class="form-control" maxlength="100" placeholder="Автоматизации и информатики" required
                 v-model="education.educationFaculty">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Специализация:</label>
        <div class="col-lg-8">
          <input type="text" class="form-control" maxlength="100"
                 placeholder="Математическое обеспечение и администрирование информационных систем" required
                 v-model="education.educationSpecialization">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Год окончания:</label>
        <div class="col-lg-8">
          <input type="text" class="form-control" maxlength="4" placeholder="2021" required
                 v-model="education.educationEndDate">
        </div>
      </div>
    </div>
    <button v-if="index !== 0" type="button" class="btn btn-danger remove-education-button" @click="removeEducation">
      Удалить образование
    </button>
    <div class="form-group row">
      <label class="col-sm-3 col-form-label"></label>
      <div class="col-lg-8">
        <hr/>
      </div>
    </div>
  </div>
</template>

<script>
import jsonp from "jsonp";

export default {
  name: "Education",
  props: ['city', 'education', 'index', 'educationLevels'],
  data() {
    return {
      places: []
    }
  },
  methods: {
    // получаем список университетов в городе и по вводимому ключу
    universiteInputHandler() {
      jsonp('https://api.vk.com/method/database.getCities?country_id=1&need_all=1&count=10&v=5.126&access_token=' + process.env.VUE_APP_VK_API_KEY + '&lang=ru&q=' + this.city + '', null, (err, data) => {
        if (err) {
          console.error(err.message);
        } else {
          let currentCityId = data.response.items[0].id;
          jsonp('https://api.vk.com/method/database.getUniversities?city_id=' + currentCityId + '&country_id=1&count=10&v=5.126&access_token=' + process.env.VUE_APP_VK_API_KEY + '&q=' + this.education.educationPlace + '', null, (err, data) => {
            if (err) {
              console.error(err.message);
            } else {
              this.places = data.response.items;
            }
          });
        }
      });

    },
    removeEducation() {
      this.$emit('removeEducation', this.education)
    }
  }
}
</script>

<style scoped>
.remove-education-button {
  margin-bottom: 20px;
  width: 207px;
}
</style>