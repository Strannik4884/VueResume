<template>
  <div id="app">
    <div class="form container" style="display: inline;">
      <div class="d-flex">
        <div class="left-col form-input col">
          <resume-form :resume="resume" :resume-view="resumeView" :education-levels="educationLevels"/>
        </div>
        <div class="right-col form-output col">
          <resume-template :resume="resume" :resume-view="resumeView" :education-levels="educationLevels"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResumeForm from './components/ResumeForm.vue'
import ResumeTemplate from './components/ResumeTemplate.vue'

export default {
  data() {
    return {
      // объект Resume с необходимыми полями
      resume: {
        profession: '',
        city: '',
        photoUrl: '',
        name: '',
        phone: '',
        email: '',
        birthday: '',
        educationLevel: '',
        educationPlace: '',
        educationFaculty: '',
        educationSpecialization: '',
        educationEndDate: '',
        desiredSalary: '',
        skills: '',
        about: ''
      },
      // объект ResumeView с необходимыми полями
      resumeView: {
        profession: '',
        city: '',
        photoUrl: '',
        name: '',
        phone: '',
        email: '',
        birthday: '',
        educationLevel: '',
        educationPlace: '',
        educationFaculty: '',
        educationSpecialization: '',
        educationEndDate: '',
        desiredSalary: '',
        skills: '',
        about: ''
      },
      // уровни образования
      educationLevels: ['Среднее', 'Среднее специальное', 'Неоконченное высшее', 'Высшее']
    }
  },
  components: {
    // компонент формы резюме
    'resumeForm': ResumeForm,
    // компонент шаблона резюме
    'resumeTemplate': ResumeTemplate
  }
}
</script>

<style scoped>
.left-col {
  padding: 20px 0px 20px 100px;
}

.right-col {
  padding: 20px 100px 20px 0px;
}
</style>