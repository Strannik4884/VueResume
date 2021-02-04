<template>
  <div>
    <div class=" mt-2 mb-2 text-center">
      <router-link class="btn btn-primary" to="/add">Добавить резюме</router-link>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-3">
          <resume-list :title="'Новый'" :resumes="resumesNew" :resumes-accepted="resumesAccepted"
                       :resumes-fault="resumesFault" :resumes-assigned="resumesAssigned" :resumes-new="resumesNew"
          ></resume-list>
        </div>
        <div class="col-3">
          <resume-list :title="'Назначено собеседование'" :resumes="resumesAssigned"
                       :resumes-accepted="resumesAccepted"
                       :resumes-fault="resumesFault" :resumes-assigned="resumesAssigned" :resumes-new="resumesNew"
          ></resume-list>
        </div>
        <div class="col-3">
          <resume-list :title="'Принят'" :resumes="resumesAccepted" :resumes-accepted="resumesAccepted"
                       :resumes-fault="resumesFault" :resumes-assigned="resumesAssigned" :resumes-new="resumesNew"
          ></resume-list>
        </div>
        <div class="col-3">
          <resume-list :title="'Отказ'" :resumes="resumesFault" :resumes-accepted="resumesAccepted"
                       :resumes-fault="resumesFault" :resumes-assigned="resumesAssigned" :resumes-new="resumesNew"
          ></resume-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ResumeList from "./ResumeList";

export default {
  name: "ResumeMain",
  components: {ResumeList},
  data() {
    return {
      resumes: [],
      resumesNew: [],
      resumesAssigned: [],
      resumesAccepted: [],
      resumesFault: [],
    }
  },
  watch: {
    resumesNew() {
      this.updateList(this.resumesNew, 'Новый')
    },
    resumesAssigned() {
      this.updateList(this.resumesAssigned, 'Назначено собеседование')
    },
    resumesAccepted() {
      this.updateList(this.resumesAccepted, 'Принят')
    },
    resumesFault() {
      this.updateList(this.resumesFault, 'Отказ')
    }
  },
  mounted() {
    axios.get(process.env.VUE_APP_API_DOMAIN + "/api/cv/")
        .then((response) => {
          if (response.status === 200) {
            this.resumes = response.data
            this.resumesNew = this.filterResumes(this.resumes, 'Новый')
            this.resumesAssigned = this.filterResumes(this.resumes, 'Назначено собеседование')
            this.resumesAccepted = this.filterResumes(this.resumes, 'Принят')
            this.resumesFault = this.filterResumes(this.resumes, 'Отказ')
          } else {
            this.$notify({
              group: 'message',
              type: 'error',
              title: 'Произошла ошибка!',
              text: response.request
            })
          }
        })
  },
  methods: {
    filterResumes: function (resumes, status) {
      function check(value) {
        let result = false;
        if (value['resumeStatus'] === status) {
          result = true;
        }
        return result;
      }

      return resumes.filter(check);
    },
    updateList: function (list, status) {
      axios.get(process.env.VUE_APP_API_DOMAIN + "/api/cv/")
          .then((response) => {
            if (response.status === 200) {
              list = this.filterResumes(response.data, status)
            } else {
              this.$notify({
                group: 'message',
                type: 'error',
                title: 'Произошла ошибка!',
                text: response.request
              })
            }
          })
    }
  }
}
</script>

<style scoped>

</style>