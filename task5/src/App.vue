<template>
  <div id="app">
    <notifications position="top center" group="message" />
    <router-view></router-view>
  </div>
</template>

<script>

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
        educations: [
          {
            educationLevel: '',
            educationPlace: '',
            educationFaculty: '',
            educationSpecialization: '',
            educationEndDate: ''
          }
        ],
        desiredSalary: '',
        skills: '',
        about: '',
        resumeStatus: 'Новый'
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
        educations: [
          {
            educationLevel: '',
            educationPlace: '',
            educationFaculty: '',
            educationSpecialization: '',
            educationEndDate: ''
          }
        ],
        desiredSalary: '',
        skills: '',
        about: '',
        resumeStatus: ''
      },
      // уровни образования
      educationLevels: ['Среднее', 'Среднее специальное', 'Неоконченное высшее', 'Высшее'],
      resumeStatuses: ['Новый', 'Назначено собеседование', 'Принят', 'Отказ']
    }
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