<template>
  <div>
    <div>
      <div class="field">
        <div class="photo">
          <div v-if="photoUrl">
            <img class="resume-image rounded-circle" v-bind:src="photoUrl"/>
          </div>
          <div v-if="photoUrl===''|| !photoUrl">
            <img class="resume-image rounded-circle" src="/person.jpg"/>
          </div>
        </div>
        <div>{{ name }}</div>
        <div>{{ profession }}</div>
        <div>Дата рождения: {{ birthday }}</div>
        <hr/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResumeItem",
  props: ['name', 'profession', 'birthday', 'photoUrl'],
}
</script>

<style scoped>
.field{
  background: #ededed;
}

.photo {
  width: 60px;
  height: 60px;
  margin: 0 auto;
  overflow: hidden;
}

.resume-image {
  max-width: 60px;
  max-height: 60px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>