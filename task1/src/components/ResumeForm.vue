<template>
  <div>
    <h2 class="text-center form-col-title" >Форма резюме</h2>
    <form action="">
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Профессия:</label>
        <div class="col-lg-8">
          <input type="text" class="form-control" placeholder="Программист" v-model="resume.profession">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Город:</label>
        <div class="col-lg-8">
          <input type="text" class="form-control" placeholder="Липецк" v-model="resume.city">
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
          <input type="text" class="form-control" placeholder="Петров Пётр Петрович" v-model="resume.name">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Номер телефона:</label>
        <div class="col-lg-8">
          <input class="form-control" placeholder="+70123456789" v-model="resume.phone">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Email:</label>
        <div class="col-lg-8">
          <input type="email" aria-describedby="emailHelp" class="form-control"
                 placeholder="mail@example.ru" v-model="resume.email">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Дата рождения:</label>
        <div class="col-lg-8">
          <input class="form-control" :placeholder="birthdayPlaceholder" v-model="resume.birthday">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Образование:</label>
        <div class="col-lg-8">
          <input type="text" class="form-control"
                 placeholder="Липецкий Государственный Технический Университет" v-model="resume.education">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Желаемая зарплата:</label>
        <div class="col-lg-8">
          <input type="text" class="form-control" placeholder="50000" v-model="resume.desiredSalary">
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">Навыки:</label>
        <div class="col-lg-8">
          <textarea class="form-control form-text-area" rows="3" v-model="resume.skills"></textarea>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label">О себе:</label>
        <div class="col-lg-8">
          <textarea class="form-control form-text-area" v-model="resume.about" rows="3"></textarea>
        </div>
      </div>
      <button type="button" class="btn btn-danger" @click="clearResumeForm">Очистить форму</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ResumeForm",
  // переданный объект резюме
  props:['resume'],
  data () {
    return {
      // получаем текущую дату в формате dd.mm.yyyy
      birthdayPlaceholder: new Date(Date.now()).toLocaleString().slice(0, 10)
    }
  },
  methods: {
    // метод очистки полей формы резюме
    clearResumeForm() {
      this.resume.profession = ''
      this.resume.city = ''
      this.resume.photoUrl = ''
      this.resume.name = ''
      this.resume.phone =''
      this.resume.email = ''
      this.resume.birthday = ''
      this.resume.education = ''
      this.resume.desiredSalary = ''
      this.resume.skills = ''
      this.resume.about = ''
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
</style>