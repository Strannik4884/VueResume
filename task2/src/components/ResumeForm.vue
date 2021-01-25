<template>
  <div>
    <h2 class="text-center form-col-title">Форма резюме</h2>
    <form ref="form" @reset.prevent="clearResumeForm" v-if="showResumeForm">
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Профессия:</label>
        <div class="col-lg-8">
          <input type="text" class="form-control" placeholder="Программист" required v-model="resume.profession">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Город:</label>
        <div class="col-lg-8">
          <input type="text" class="form-control" placeholder="Липецк" required v-model="resume.city">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Фото (URL):</label>
        <div class="col-lg-8">
          <input class="form-control" placeholder="" v-model="resume.photoUrl">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">ФИО:</label>
        <div class="col-lg-8">
          <input type="text" class="form-control" placeholder="Петров Пётр Петрович" required v-model="resume.name">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Номер телефона:</label>
        <div class="col-lg-8">
          <input class="form-control" placeholder="+70123456789" required v-model="resume.phone">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Email:</label>
        <div class="col-lg-8">
          <input type="email" aria-describedby="emailHelp" class="form-control"
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
            <option :key="level" v-for="level in educationLevels">{{ level }}</option>
          </select>
        </div>
      </div>
      <education-special v-if="resume.educationLevel !== educationLevels[0] && resume.educationLevel !== ''"
                         :resume="resume"/>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Желаемая зарплата:</label>
        <div class="col-lg-8">
          <input type="number" class="form-control" placeholder="50000" required v-model="resume.desiredSalary">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Навыки:</label>
        <div class="col-lg-8">
          <textarea class="form-control form-text-area" rows="3" required v-model="resume.skills"></textarea>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">О себе:</label>
        <div class="col-lg-8">
          <textarea class="form-control form-text-area" v-model="resume.about" rows="3"></textarea>
        </div>
      </div>
      <button type="reset" class="btn btn-danger">Очистить форму</button>
      <button type="button" class="btn btn-primary apply-btn-style" @click="applyResume">Применить</button>
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
      showResumeForm: true
    }
  },
  components: {
    // компонент дополнитедьных сведений об образовании
    'educationSpecial': EducationSpecial,
  },
  methods: {
    // метод очистки полей формы резюме
    clearResumeForm() {
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
    applyResume() {

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
}

.apply-btn-style {
  margin-left: 10px;
}
</style>