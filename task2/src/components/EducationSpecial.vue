<template>
  <div>
    <div class="form-group row">
      <label class="col-sm-3 col-form-label">Учебное заведение:</label>
      <div class="col-lg-8">
        <input type="text" class="form-control" placeholder="Липецкий Государственный Технический Университет" required
               v-model="resume.educationPlace">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-3 col-form-label">Факультет:</label>
      <div class="col-lg-8">
        <input type="text" class="form-control" placeholder="Автоматизации и информатики" required
               v-model="resume.educationFaculty">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-3 col-form-label">Специализация:</label>
      <div class="col-lg-8">
        <input type="text" class="form-control"
               placeholder="Математическое обеспечение и администрирование информационных систем" required
               v-model="resume.educationSpecialization">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-3 col-form-label">Год окончания:</label>
      <div class="col-lg-8">
        <input type="text" class="form-control" placeholder="2021" required v-model="resume.educationEndDate">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EducationSpecial",
  props: ['resume']
}
</script>

<style scoped>

</style>