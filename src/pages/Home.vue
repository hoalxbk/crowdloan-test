<template>
  <div>
    <Introduction/>
    <OngoingEvents :hiddenTitle="false"/>
    <Infomation/>
    <Team/>
    <Faq/>
    <Subscribe/>
  </div>
</template>

<script>
import OngoingEvents from "@/components/OngoingEvent";
import Subscribe from "@/section/Subscribe";
import Faq from "@/section/Faq";
import Team from "@/section/Team";
import Infomation from "@/section/Infomation";
import Introduction from "@/section/Introduction";

export default {
name: "Home",
  components: {
    OngoingEvents,
    Subscribe,
    Faq,
    Team,
    Infomation,
    Introduction,
  }
}
</script>

<style scoped>

</style>
