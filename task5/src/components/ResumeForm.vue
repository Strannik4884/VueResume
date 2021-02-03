<template>
  <div>
    <h2 class="text-center form-col-title">Форма резюме</h2>
    <form ref="form" @submit.prevent="applyResumeForm" @reset.prevent="clearResumeForm" v-if="showResumeForm">
      <div v-if="this.resumeFormErrors.length !== 0">
        <div class="form-group row" :key="error" v-for="error in this.resumeFormErrors">
          <label class="col-sm-3 col-form-label"></label>
          <div class="col-lg-8">
            <div class="input-control bg-danger text-white pb-2 pt-2">
              <div class="pl-2">{{ error }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Профессия:</label>
        <div class="col-lg-8">
          <input type="text" class="form-control" maxlength="100" placeholder="Программист" required
                 v-model="resume.profession">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Город:</label>
        <div class="col-lg-8">
          <input type="text" class="form-control" maxlength="100" placeholder="Липецк" required
                 @input="cityInputHandler" list="vkCities" v-model="resume.city">
          <datalist id="vkCities">
            <option v-for="city in cities" :key="city.id">{{ city.title }}</option>
          </datalist>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Фото (URL):</label>
        <div class="col-lg-8">
          <input type="text" class="form-control" v-model="resume.photoUrl">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">ФИО:</label>
        <div class="col-lg-8">
          <input type="text" class="form-control" maxlength="150" placeholder="Петров Пётр Петрович" required
                 v-model="resume.name">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Номер телефона:</label>
        <div class="col-lg-8">
          <input type="text" class="form-control" maxlength="10" placeholder="9876543210" required
                 v-model="resume.phone">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Email:</label>
        <div class="col-lg-8">
          <input type="email" aria-describedby="emailHelp" class="form-control" maxlength="255"
                 placeholder="mail@example.ru" required v-model="resume.email">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Дата рождения:</label>
        <div class="col-lg-8">
          <input type="date" class="form-control" :placeholder="birthdayPlaceholder" required v-model="resume.birthday">
        </div>
      </div>
      <education v-for="(education, index) in resume.educations" :key="index" @removeEducation="removeEducation"
                 :city="resume.city" :education="education" :index="index" :education-levels="educationLevels"/>
      <button type="button" class="btn btn-primary add-education-button" @click="addEducation">Добавить образование
      </button>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Желаемая зарплата:</label>
        <div class="col-lg-8">
          <input type="text" class="form-control" maxlength="10" placeholder="50000" required
                 v-model="resume.desiredSalary">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Навыки:</label>
        <div class="col-lg-8">
          <textarea class="form-control form-text-area" maxlength="500" rows="3" required
                    v-model="resume.skills"></textarea>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">О себе:</label>
        <div class="col-lg-8">
          <textarea class="form-control form-text-area" maxlength="500" v-model="resume.about" rows="3"></textarea>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Статус:</label>
        <div class="col-lg-8">
          <select class="form-control" required v-model="resume.resumeStatus">
            <option disabled>Выберите один из вариантов</option>
            <option :key="status" v-for="status in resumeStatuses">{{ status }}</option>
          </select>
        </div>
      </div>
      <button type="reset" class="btn btn-danger">Очистить форму</button>
      <button type="submit" class="btn btn-primary apply-btn-style">Применить</button>
    </form>
  </div>
</template>

<script>
import Education from './Education.vue'
import axios from "axios";
import router from "@/router";

const jsonp = require('jsonp');

export default {
  name: "ResumeForm",
  // переданный объект резюме
  props: ['resume', 'resumeView', 'educationLevels', 'resumeStatuses'],
  data() {
    return {
      // список городов
      cities: [],
      // получаем текущую дату в формате dd.mm.yyyy
      birthdayPlaceholder: new Date(Date.now()).toLocaleString().slice(0, 10),
      showResumeForm: true,
      resumeFormErrors: []
    }
  },
  components: {
    // компонент дополнительных сведений об образовании
    'education': Education,
  },
  // функция, вызываемая при создании компонента
  created: function () {
    // если это страница редактирования с переданным id
    if (this.$route.params.id !== undefined) {
      let loc = this
      // пытаемся получить резюме по его id
      axios.get(process.env.VUE_APP_API_DOMAIN + '/api/cv/' + this.$route.params.id)
          // если ошибка при получении
          .catch(function (error) {
                if (error.response) {
                  let errorText = ''
                  if (error.response.status === 400) {
                    errorText = 'Некорректный id резюме'
                  } else if (error.response.status === 404) {
                    errorText = 'Данное резюме не найдено'
                  }
                  loc.$notify({
                    group: 'message',
                    type: 'error',
                    title: 'Произошла ошибка!',
                    text: errorText
                  })
                  router.push({path: '/'})
                }
              }
          )
          // если резюме получено
          .then((response) => {
            if (response.status === 200) {
              // то выводим данные в форму
              this.resume.profession = response.data['profession']
              this.resume.city = response.data['city']
              this.resume.photoUrl = response.data['photoUrl']
              this.resumeView.photoUrl = response.data['photoUrl']
              this.resume.name = response.data['name']
              this.resume.phone = response.data['phone']
              this.resume.email = response.data['email']
              // конвертируем день рождения
              this.resume.birthday = response.data['birthday'].replace( /(\d{2}).(\d{2}).(\d{4})/, "$3-$2-$1")
              // добавляем образования
              this.resume.educations = []
              this.resumeView.educations = []
              for (let i = 0; i < response.data['educations'].length; ++i) {
                if (response.data['educations'][i]['educationLevel'] !== this.educationLevels[0]) {
                  this.resume.educations.push({
                    educationLevel: response.data['educations'][i]['educationLevel'],
                    educationPlace: response.data['educations'][i]['educationPlace'],
                    educationFaculty: response.data['educations'][i]['educationFaculty'],
                    educationSpecialization: response.data['educations'][i]['educationSpecialization'],
                    educationEndDate: response.data['educations'][i]['educationEndDate']
                  })
                  // если образование Среднее
                } else {
                  this.resume.educations.push({
                    educationLevel: response.data['educations'][i]['educationLevel'],
                    educationPlace: '',
                    educationFaculty: '',
                    educationSpecialization: '',
                    educationEndDate: ''
                  })
                }
                // обновляем в шаблоне список образований
                this.resumeView.educations.push({
                  educationLevel: '',
                  educationPlace: '',
                  educationFaculty: '',
                  educationSpecialization: '',
                  educationEndDate: ''
                })
              }
              this.resume.desiredSalary = response.data['desiredSalary']
              this.resume.skills = response.data['skills']
              this.resume.about = response.data['about']
              this.resume.resumeStatus = response.data['resumeStatus']
            }
          })
    }
  },
  methods: {
    // загрузка городов от VK API
    cityInputHandler() {
      jsonp('https://api.vk.com/method/database.getCities?country_id=1&need_all=1&count=10&v=5.126&access_token=' + process.env.VUE_APP_VK_API_KEY + '&lang=ru&q=' + this.resume.city + '', null, (err, data) => {
        if (err) {
          console.error(err.message);
        } else {
          this.cities = data.response.items;
        }
      });
    },
    // метод добавления образования
    addEducation() {
      this.resume.educations.push({
        educationLevel: '',
        educationPlace: '',
        educationFaculty: '',
        educationSpecialization: '',
        educationEndDate: ''
      })
      this.resumeView.educations.push({
        educationLevel: '',
        educationPlace: '',
        educationFaculty: '',
        educationSpecialization: '',
        educationEndDate: ''
      })
    },
    // метод удаления образования
    removeEducation(education) {
      let index = this.resume.educations.indexOf(education)
      this.resume.educations.splice(index, 1)
      this.resumeView.educations.splice(index, 1)
    },
    // метод очистки полей формы резюме
    clearResumeForm() {
      this.resumeFormErrors = []
      this.resume.profession = ''
      this.resume.city = ''
      this.resume.photoUrl = ''
      this.resume.name = ''
      this.resume.phone = ''
      this.resume.email = ''
      this.resume.birthday = ''
      this.resume.educations = [
        {
          educationLevel: '',
          educationPlace: '',
          educationFaculty: '',
          educationSpecialization: '',
          educationEndDate: ''
        }
      ]
      this.resume.desiredSalary = ''
      this.resume.skills = ''
      this.resume.about = ''
      this.resume.resumeStatus = 'Новый'
      this.resumeView.educations = [
        {
          educationLevel: '',
          educationPlace: '',
          educationFaculty: '',
          educationSpecialization: '',
          educationEndDate: ''
        }
      ]
      this.showResumeForm = false
      this.$nextTick(() => {
        this.showResumeForm = true
      })
    },
    applyResumeForm() {
      this.resumeFormErrors = [];
      let phoneRegexp = new RegExp('\\d{' + this.resume.phone.length + '}', 'gim');
      let desiredSalaryRegexp = new RegExp('\\d{' + this.resume.desiredSalary.length + '}', 'gim');
      // валидация номера телефона
      if (this.resume.phone.length < 6 || this.resume.phone.length > 10 || !phoneRegexp.test(this.resume.phone)) {
        this.resumeFormErrors.push('Номер телефона должен состоять из цифр и быть в длину от 6 до 10 символов');
      }
      // проверяем во всех указанных образованиях
      for (let i = 0; i < this.resume.educations.length; ++i) {
        let education = this.resume.educations[i]
        if (education.educationLevel !== this.educationLevels[0]) {
          // валидация даты окончания
          let endYearRegexp = new RegExp('\\d{' + education.educationEndDate.length + '}', 'gim');
          if (education.educationEndDate === '' || (parseInt(education.educationEndDate) < 1945 || parseInt(education.educationEndDate) > 2030) || !endYearRegexp.test(education.educationEndDate)) {
            this.resumeFormErrors.push('Укажите корректную дату окончания обучения')
          }
        }
      }
      // валидация желаемой зарплаты
      if (!desiredSalaryRegexp.test(this.resume.desiredSalary)) {
        this.resumeFormErrors.push('Укажите корректный размер желаемой зарплаты')
      }
      // если ошибок нет - отрисовываем полученное резюме
      if (this.resumeFormErrors.length === 0) {
        this.renderResumeTemplate()
      }
    },
    renderResumeTemplate() {
      this.resumeView.profession = this.resume.profession
      this.resumeView.city = this.resume.city
      this.resumeView.photoUrl = this.resume.photoUrl
      this.resumeView.name = this.resume.name
      this.resumeView.phone = this.resume.phone
      this.resumeView.email = this.resume.email
      this.resumeView.birthday = new Date(this.resume.birthday).toLocaleDateString()
      this.resumeView.educations = []
      for (let i = 0; i < this.resume.educations.length; ++i) {
        this.resumeView.educations.push(
            {
              educationLevel: this.resume.educations[i].educationLevel,
              educationPlace: this.resume.educations[i].educationPlace,
              educationFaculty: this.resume.educations[i].educationFaculty,
              educationSpecialization: this.resume.educations[i].educationSpecialization,
              educationEndDate: this.resume.educations[i].educationEndDate
            })
      }
      this.resumeView.desiredSalary = this.resume.desiredSalary
      this.resumeView.skills = this.resume.skills
      this.resumeView.about = this.resume.about
      this.resumeView.resumeStatus = this.resume.resumeStatus
      // если это форма редактирования, то обновляем резюме по его id
      if(this.$route.params.id !== undefined){
        axios.post(process.env.VUE_APP_API_DOMAIN + "/api/cv/" + this.$route.params.id + "/edit", this.resumeView)
            .then((response) => {
              if (response.status === 200) {
                this.$notify({
                  group: 'message',
                  type: 'info',
                  title: 'Резюме успешно обновлено!'
                })
              } else {
                this.$notify({
                  group: 'message',
                  type: 'error',
                  title: 'Произошла ошибка!',
                  text: response.request
                })
              }
            })
      }
      // иначе создаём новое
      else{
        axios.post(process.env.VUE_APP_API_DOMAIN + "/api/cv/add", this.resumeView)
            .then((response) => {
              if (response.status === 201) {
                this.$notify({
                  group: 'message',
                  type: 'info',
                  title: 'Резюме успешно создано!'
                })
                router.push({path: '/'})
              } else {
                this.$notify({
                  group: 'message',
                  type: 'error',
                  title: 'Произошла ошибка!',
                  text: response.request
                })
              }
            })
      }
    }
  }
}
</script>

<style scoped>
.form-col-title {
  padding-bottom: 20px;
}

.form-text-area {
  min-height: 38px;
  max-height: 350px;
}

.add-education-button {
  margin-bottom: 20px;
}

.apply-btn-style {
  margin-left: 10px;
}
</style>