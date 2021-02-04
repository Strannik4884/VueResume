<template>
  <div>
    <h4 class="text-center">{{ title + ' (' + resumes.length + ')' }}</h4>
    <draggable :list="resumes" group="user" @change="changeStatus">
      <div v-for="(item, index) in resumes" :key="index">
        <resume-item
            :photoUrl="item.photoUrl"
            :name="item.name"
            :profession="item.profession"
            :birthday="item.birthday"
            @click.native="itemClick(item.id)">
        </resume-item>
      </div>
    </draggable>
  </div>
</template>

<script>

import axios from 'axios'
import draggable from "vuedraggable/src/vuedraggable";
import ResumeItem from "@/components/ResumeItem";

export default {
  name: "ResumeList",
  components: {draggable, ResumeItem},
  props: ['title', 'resumes', 'resumesNew', 'resumesAssigned', 'resumesAccepted', 'resumesFault'],
  methods: {
    changeStatus: function (e) {
      let add = e.added;
      if (typeof add !== "undefined") {
        let new_status = '';
        let el = this.resumesNew.find(x => x.id === add.element.id);
        if (typeof el !== "undefined") {
          new_status = 'Новый';
        }
        el = this.resumesAssigned.find(x => x.id === add.element.id);
        if (typeof el !== "undefined") {
          new_status = 'Назначено собеседование';
        }
        el = this.resumesAccepted.find(x => x.id === add.element.id);
        if (typeof el !== "undefined") {
          new_status = 'Принят';
        }
        el = this.resumesFault.find(x => x.id === add.element.id);
        if (typeof el !== "undefined") {
          new_status = 'Отказ';
        }
        axios.post(process.env.VUE_APP_API_DOMAIN + "/api/cv/" + add.element.id + "/status/update", '{"new_status": "' + new_status + '"}')
            .catch(() => {
              this.$notify({
                group: 'message',
                type: 'error',
                title: 'Произошла ошибка при обновлении статуса!'
              })
            })
      }
    },
    itemClick(resume_id) {
      this.$router.push({name: 'edit', params: {id: resume_id}});
    }
  },
}
</script>

<style scoped>

</style>