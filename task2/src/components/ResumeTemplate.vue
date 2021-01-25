<template>
  <div>
    <h2 class="text-center form-col-title">Сформированное резюме</h2>
    <div>
      <div class="d-flex justify-content-center">
        <!-- Если фотография не загружается, то отображаем стандартную фотографию для резюме -->
        <img :src="resume.photoUrl" class="resume-image rounded-circle mb-2" alt="Image not found" onerror="this.src='person.jpg';">
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Профессия: {{ resume.profession }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Город: {{ resume.city }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">ФИО: {{ resume.name }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Номер телефона: {{ resume.phone }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Email: {{ resume.email }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Дата рождения: {{ resume.birthday }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Образование: {{ resume.education }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Желаемая зарплата: {{ resume.desiredSalary }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Навыки: {{ resume.skills }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">О себе: {{ resume.about }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResumeTemplate",
  // переданный объект резюме
  props:['resume'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.form-col-title {
  padding-bottom: 20px;
}

.resume-image {
  max-width: 250px;
  max-height: 250px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>