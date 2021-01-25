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
          <input type="text" class="form-control" maxlength="100" placeholder="Липецк" required v-model="resume.city">
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
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Образование:</label>
        <div class="col-lg-8">
          <select class="form-control" required v-model="resume.educationLevel">
            <option disabled>Выберите один из вариантов</option>
            <option :key="level" v-for="level in educationLevels">{{ level }}</option>
          </select>
        </div>
      </div>
      <education-special v-if="resume.educationLevel !== educationLevels[0] && resume.educationLevel !== ''"
                         :resume="resume"/>
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
      <button type="reset" class="btn btn-danger">Очистить форму</button>
      <button type="submit" class="btn btn-primary apply-btn-style">Применить</button>
    </form>
  </div>
</template>

<script>
import EducationSpecial from './EducationSpecial.vue'

export default {
  name: "ResumeForm",
  // переданный объект резюме
  props: ['resume', 'resumeView', 'educationLevels'],
  data() {
    return {
      // получаем текущую дату в формате dd.mm.yyyy
      birthdayPlaceholder: new Date(Date.now()).toLocaleString().slice(0, 10),
      showResumeForm: true,
      resumeFormErrors: []
    }
  },
  components: {
    // компонент дополнительных сведений об образовании
    'educationSpecial': EducationSpecial,
  },
  methods: {
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
      this.resume.educationLevel = ''
      this.resume.educationPlace = ''
      this.resume.educationFaculty = ''
      this.resume.educationSpecialization = ''
      this.resume.educationEndDate = ''
      this.resume.desiredSalary = ''
      this.resume.skills = ''
      this.resume.about = ''
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
      if (this.resume.educationLevel !== this.educationLevels[0]) {
        // валидация даты окончания
        let endYearRegexp = new RegExp('\\d{' + this.resume.educationEndDate.length + '}', 'gim');
        if (this.resume.educationEndDate === '' || (parseInt(this.resume.educationEndDate) < 1945 || parseInt(this.resume.educationEndDate) > 2030) || !endYearRegexp.test(this.resume.educationEndDate)) {
          this.resumeFormErrors.push('Укажите корректную дату окончания обучения')
        }
      }
      // валидация желаемой зарплаты
      if (!desiredSalaryRegexp.test(this.resume.desiredSalary)) {
        this.resumeFormErrors.push('Укажите корректный размер желаемой зарплаты')
      }
      // если ошибок нет - отрисовываем полученное резюме
      if(this.resumeFormErrors.length === 0) {
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
      this.resumeView.educationLevel = this.resume.educationLevel
      this.resumeView.educationPlace = this.resume.educationPlace
      this.resumeView.educationFaculty = this.resume.educationFaculty
      this.resumeView.educationSpecialization = this.resume.educationSpecialization
      this.resumeView.educationEndDate = this.resume.educationEndDate
      this.resumeView.desiredSalary = this.resume.desiredSalary
      this.resumeView.skills = this.resume.skills
      this.resumeView.about = this.resume.about
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

.apply-btn-style {
  margin-left: 10px;
}
</style>