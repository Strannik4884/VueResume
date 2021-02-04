<template>
  <div>
    <h2 class="text-center form-col-title">Сформированное резюме</h2>
    <div>
      <div class="d-flex justify-content-center">
        <!-- Если фотография не загружается, то отображаем стандартную фотографию для резюме -->
        <img :src="resumeView.photoUrl" class="resume-image rounded-circle mb-2" alt="Image not found"
             onerror="this.src='/person.jpg';">
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
      <div v-for="(education, index) in resumeView.educations" :key="index">
        <div class="row">
          <div class="col">
            <div class="text-wrap mb-2" style="width: 100%">Образование: {{ education.educationLevel }}</div>
          </div>
        </div>
        <div
            v-if="resume.educations[index].educationLevel !== educationLevels[0] && resume.educations[index].educationLevel !== ''">
          <div class="row">
            <div class="col">
              <div class="text-wrap mb-2" style="width: 100%">Учебное заведение: {{ education.educationPlace }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="text-wrap mb-2" style="width: 100%">Факультет: {{ education.educationFaculty }}</div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="text-wrap mb-2" style="width: 100%">Специализация: {{
                  education.educationSpecialization
                }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="text-wrap mb-2" style="width: 100%">Год окончания: {{ education.educationEndDate }}</div>
            </div>
          </div>
        </div>
        <hr v-if="resumeView.educations.length > 1"/>
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
      <div class="row">
        <div class="col">
          <div class="text-wrap mb-2" style="width: 100%">Статус: {{ resumeView.resumeStatus }}</div>
        </div>
      </div>
      <button type="button" class="btn btn-danger" @click="clearResumeTemplate">Очистить резюме</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResumeTemplate",
  // переданные объекты
  props: ['resume', 'resumeView', 'educationLevels'],
  methods: {
    clearResumeTemplate() {
      this.resumeView.profession = ''
      this.resumeView.city = ''
      this.resumeView.photoUrl = ''
      this.resumeView.name = ''
      this.resumeView.phone = ''
      this.resumeView.email = ''
      this.resumeView.birthday = ''
      for (let i = 0; i < this.resumeView.educations.length; ++i) {
        this.resumeView.educations[i].educationLevel = ''
        this.resumeView.educations[i].educationPlace = ''
        this.resumeView.educations[i].educationFaculty = ''
        this.resumeView.educations[i].educationSpecialization = ''
        this.resumeView.educations[i].educationEndDate = ''
      }
      this.resumeView.desiredSalary = ''
      this.resumeView.skills = ''
      this.resumeView.about = ''
      this.resumeView.resumeStatus = ''
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