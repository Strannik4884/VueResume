<template>
  <div>
    <h2 class="text-center form-col-title">Сформированное резюме</h2>
    <div>
      <div class="d-flex justify-content-center">
        <!-- Если фотография не загружается, то отображаем стандартную фотографию для резюме -->
        <img :src="resumeView.photoUrl" class="resume-image rounded-circle mb-2" alt="Image not found"
             onerror="this.src='person.jpg';">
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Профессия: {{ resumeView.profession }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Город: {{ resumeView.city }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">ФИО: {{ resumeView.name }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Номер телефона: {{ resumeView.phone }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Email: {{ resumeView.email }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Дата рождения: {{ resumeView.birthday }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Образование: {{ resumeView.educationLevel }}</div>
        </div>
      </div>
      <div v-if="resume.educationLevel !== educationLevels[0] && resume.educationLevel !== ''">
        <div class="row">
          <div class="col">
            <div class="text-wrap mb-2" style="width: 100%">Учебное заведение: {{ resumeView.educationPlace }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="text-wrap mb-2" style="width: 100%">Факультет: {{ resumeView.educationFaculty }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="text-wrap mb-2" style="width: 100%">Специализация: {{ resumeView.educationSpecialization }}</div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="text-wrap mb-2" style="width: 100%">Год окончания: {{ resumeView.educationEndDate }}</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Желаемая зарплата: {{ resumeView.desiredSalary }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Навыки: {{ resumeView.skills }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">О себе: {{ resumeView.about }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResumeTemplate",
  // переданный объект резюме
  props: ['resume', 'resumeView', 'educationLevels'],
  data() {
    return {}
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